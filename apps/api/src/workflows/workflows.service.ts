import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkflowDto } from './dto/create-workflow.dto';

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
}
