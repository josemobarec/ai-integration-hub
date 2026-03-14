import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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
}
