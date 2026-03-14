import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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
}
