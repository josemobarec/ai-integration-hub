import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ApprovalStatus,
  Prisma,
  WorkflowRunStatus,
  WorkflowType,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { TriggerEmailTriageDto } from './dto/trigger-email-triage.dto';

@Injectable()
export class WorkflowsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.workflow.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        organization: true,
        runs: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }

  async create(createWorkflowDto: CreateWorkflowDto) {
    const organization = await this.prisma.organization.findUnique({
      where: {
        id: createWorkflowDto.organizationId,
      },
    });

    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    const data: Prisma.WorkflowUncheckedCreateInput = {
      organizationId: createWorkflowDto.organizationId,
      name: createWorkflowDto.name,
      type: createWorkflowDto.type,
      isActive: createWorkflowDto.isActive ?? true,
    };

    if (createWorkflowDto.config !== undefined) {
      data.config = createWorkflowDto.config as Prisma.InputJsonValue;
    }

    return this.prisma.workflow.create({
      data,
      include: {
        organization: true,
        runs: true,
      },
    });
  }

  async triggerEmailTriage(id: string, triggerDto: TriggerEmailTriageDto) {
    const workflow = await this.prisma.workflow.findUnique({
      where: { id },
      include: {
        organization: true,
      },
    });

    if (!workflow) {
      throw new NotFoundException('Workflow not found');
    }

    if (!workflow.isActive) {
      throw new BadRequestException('Workflow is not active');
    }

    if (workflow.type !== WorkflowType.EMAIL_TRIAGE) {
      throw new BadRequestException(
        'This trigger is only supported for EMAIL_TRIAGE workflows',
      );
    }

    const priority = this.detectPriority(triggerDto);
    const summary = this.buildSummary(triggerDto);
    const suggestedAction = this.buildSuggestedAction(triggerDto, priority);

    const requiresApproval =
      priority === 'HIGH' &&
      this.getBooleanConfigFlag(
        workflow.config,
        'requireApprovalForHighPriority',
      );

    const runStatus = requiresApproval
      ? WorkflowRunStatus.WAITING_APPROVAL
      : WorkflowRunStatus.COMPLETED;

    const now = new Date();

    const runData: Prisma.WorkflowRunUncheckedCreateInput = {
      workflowId: workflow.id,
      status: runStatus,
      triggerSource: 'email-triage-trigger',
      startedAt: now,
      finishedAt: requiresApproval ? undefined : now,
      inputPayload: {
        from: triggerDto.from,
        subject: triggerDto.subject,
        message: triggerDto.message ?? null,
      } as Prisma.InputJsonValue,
      outputPayload: {
        summary,
        priority,
        suggestedAction,
      } as Prisma.InputJsonValue,
    };

    const createdRun = await this.prisma.workflowRun.create({
      data: runData,
    });

    if (requiresApproval) {
      await this.prisma.approvalRequest.create({
        data: {
          workflowRunId: createdRun.id,
          status: ApprovalStatus.PENDING,
          reason: `High priority triage requires approval for workflow "${workflow.name}".`,
        },
      });
    }

    await this.prisma.auditLog.create({
      data: {
        workflowRunId: createdRun.id,
        action: 'WORKFLOW_TRIGGERED',
        entityType: 'WorkflowRun',
        entityId: createdRun.id,
        metadata: {
          workflowId: workflow.id,
          workflowType: workflow.type,
          priority,
          requiresApproval,
          suggestedAction,
        } as Prisma.InputJsonValue,
      },
    });

    return this.prisma.workflowRun.findUnique({
      where: { id: createdRun.id },
      include: {
        workflow: {
          include: {
            organization: true,
          },
        },
        approvals: true,
        auditLogs: true,
      },
    });
  }

  private detectPriority(
    triggerDto: TriggerEmailTriageDto,
  ): 'HIGH' | 'MEDIUM' | 'LOW' {
    const content =
      `${triggerDto.subject} ${triggerDto.message ?? ''}`.toLowerCase();

    const highPriorityKeywords = [
      'urgent',
      'asap',
      'critical',
      'blocked',
      'outage',
      'payment failed',
      'invoice issue',
      'billing issue',
      'escalation',
    ];

    const mediumPriorityKeywords = [
      'help',
      'support',
      'review',
      'question',
      'follow up',
      'invoice',
      'billing',
    ];

    if (highPriorityKeywords.some((keyword) => content.includes(keyword))) {
      return 'HIGH';
    }

    if (mediumPriorityKeywords.some((keyword) => content.includes(keyword))) {
      return 'MEDIUM';
    }

    return 'LOW';
  }

  private buildSummary(triggerDto: TriggerEmailTriageDto): string {
    const message = triggerDto.message?.trim();

    if (message) {
      return `${triggerDto.from} reports: ${message}`;
    }

    return `${triggerDto.from} sent an email about "${triggerDto.subject}".`;
  }

  private buildSuggestedAction(
    triggerDto: TriggerEmailTriageDto,
    priority: 'HIGH' | 'MEDIUM' | 'LOW',
  ): string {
    const content =
      `${triggerDto.subject} ${triggerDto.message ?? ''}`.toLowerCase();

    if (content.includes('invoice') || content.includes('billing')) {
      return priority === 'HIGH'
        ? 'Create high-priority billing ticket'
        : 'Create billing support ticket';
    }

    if (priority === 'HIGH') {
      return 'Create high-priority support ticket';
    }

    if (priority === 'MEDIUM') {
      return 'Create support ticket';
    }

    return 'Log for review';
  }

  private getBooleanConfigFlag(
    config: Prisma.JsonValue | null,
    key: string,
  ): boolean {
    if (!config || typeof config !== 'object' || Array.isArray(config)) {
      return false;
    }

    const value = (config as Record<string, unknown>)[key];
    return typeof value === 'boolean' ? value : false;
  }
}
