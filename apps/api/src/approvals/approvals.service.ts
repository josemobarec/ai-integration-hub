import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ApprovalStatus, Prisma, WorkflowRunStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { DecisionApprovalDto } from './dto/decision-approval.dto';

@Injectable()
export class ApprovalsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.approvalRequest.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        workflowRun: {
          include: {
            workflow: {
              include: {
                organization: true,
              },
            },
          },
        },
      },
    });
  }

  async approve(id: string, decisionApprovalDto: DecisionApprovalDto) {
    const approval = await this.prisma.approvalRequest.findUnique({
      where: { id },
      include: {
        workflowRun: true,
      },
    });

    if (!approval) {
      throw new NotFoundException('Approval not found');
    }

    if (approval.status !== ApprovalStatus.PENDING) {
      throw new ConflictException('Approval is no longer pending');
    }

    const [updatedApproval] = await this.prisma.$transaction([
      this.prisma.approvalRequest.update({
        where: { id },
        data: {
          status: ApprovalStatus.APPROVED,
          decisionNote: decisionApprovalDto.decisionNote,
          decidedAt: new Date(),
        },
        include: {
          workflowRun: {
            include: {
              workflow: {
                include: {
                  organization: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.workflowRun.update({
        where: { id: approval.workflowRunId },
        data: {
          status: WorkflowRunStatus.COMPLETED,
          finishedAt: new Date(),
        },
      }),
      this.prisma.auditLog.create({
        data: {
          workflowRunId: approval.workflowRunId,
          action: 'APPROVAL_APPROVED',
          entityType: 'ApprovalRequest',
          entityId: approval.id,
          metadata: {
            decisionNote: decisionApprovalDto.decisionNote ?? null,
          } as Prisma.InputJsonValue,
        },
      }),
    ]);

    return updatedApproval;
  }

  async reject(id: string, decisionApprovalDto: DecisionApprovalDto) {
    const approval = await this.prisma.approvalRequest.findUnique({
      where: { id },
      include: {
        workflowRun: true,
      },
    });

    if (!approval) {
      throw new NotFoundException('Approval not found');
    }

    if (approval.status !== ApprovalStatus.PENDING) {
      throw new ConflictException('Approval is no longer pending');
    }

    const [updatedApproval] = await this.prisma.$transaction([
      this.prisma.approvalRequest.update({
        where: { id },
        data: {
          status: ApprovalStatus.REJECTED,
          decisionNote: decisionApprovalDto.decisionNote,
          decidedAt: new Date(),
        },
        include: {
          workflowRun: {
            include: {
              workflow: {
                include: {
                  organization: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.workflowRun.update({
        where: { id: approval.workflowRunId },
        data: {
          status: WorkflowRunStatus.CANCELED,
          finishedAt: new Date(),
        },
      }),
      this.prisma.auditLog.create({
        data: {
          workflowRunId: approval.workflowRunId,
          action: 'APPROVAL_REJECTED',
          entityType: 'ApprovalRequest',
          entityId: approval.id,
          metadata: {
            decisionNote: decisionApprovalDto.decisionNote ?? null,
          } as Prisma.InputJsonValue,
        },
      }),
    ]);

    return updatedApproval;
  }
}
