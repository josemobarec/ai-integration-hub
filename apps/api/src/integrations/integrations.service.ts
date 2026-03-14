import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class IntegrationsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.integrationConnection.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        organization: true,
      },
    });
  }
}
