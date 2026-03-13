import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('health')
  getHealth() {
    return { status: 'ok' };
  }

  @Get('debug/organizations')
  getOrganizations() {
    return this.prisma.organization.findMany({
      include: {
        memberships: true,
        integrations: true,
        workflows: true,
      },
    });
  }
}
