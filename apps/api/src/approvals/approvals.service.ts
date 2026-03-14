import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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
}
