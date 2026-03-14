import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, WorkflowRunStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRunDto } from './dto/create-run.dto';

@Injectable()
export class RunsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.workflowRun.findMany({
      orderBy: {
        createdAt: 'desc',
      },
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

  async create(createRunDto: CreateRunDto) {
    const workflow = await this.prisma.workflow.findUnique({
      where: {
        id: createRunDto.workflowId,
      },
      include: {
        organization: true,
      },
    });

    if (!workflow) {
      throw new NotFoundException('Workflow not found');
    }

    const data: Prisma.WorkflowRunUncheckedCreateInput = {
      workflowId: createRunDto.workflowId,
      triggerSource: createRunDto.triggerSource,
      status: createRunDto.status ?? WorkflowRunStatus.PENDING,
      startedAt: new Date(),
    };

    if (createRunDto.inputPayload !== undefined) {
      data.inputPayload = createRunDto.inputPayload as Prisma.InputJsonValue;
    }

    const [run] = await this.prisma.$transaction([
      this.prisma.workflowRun.create({
        data,
        include: {
          workflow: {
            include: {
              organization: true,
            },
          },
          approvals: true,
          auditLogs: true,
        },
      }),
    ]);

    await this.prisma.auditLog.create({
      data: {
        workflowRunId: run.id,
        action: 'WORKFLOW_RUN_CREATED',
        entityType: 'WorkflowRun',
        entityId: run.id,
        metadata: {
          triggerSource: createRunDto.triggerSource,
          status: run.status,
        } as Prisma.InputJsonValue,
      },
    });

    return this.prisma.workflowRun.findUnique({
      where: { id: run.id },
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
}
