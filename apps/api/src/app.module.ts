import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ApprovalsModule } from './approvals/approvals.module';
import { AuditModule } from './audit/audit.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { PrismaModule } from './prisma/prisma.module';
import { RunsModule } from './runs/runs.module';
import { WorkflowsModule } from './workflows/workflows.module';

@Module({
  imports: [
    PrismaModule,
    OrganizationsModule,
    IntegrationsModule,
    WorkflowsModule,
    ApprovalsModule,
    RunsModule,
    AuditModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
