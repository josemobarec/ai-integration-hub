import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(workflowRunId?: string) {
    return this.prisma.auditLog.findMany({
      where: workflowRunId
        ? {
            workflowRunId,
          }
        : undefined,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
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
}
