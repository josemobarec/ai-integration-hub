import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { IntegrationsModule } from './integrations/integrations.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { PrismaModule } from './prisma/prisma.module';
import { WorkflowsModule } from './workflows/workflows.module';

@Module({
  imports: [
    PrismaModule,
    OrganizationsModule,
    IntegrationsModule,
    WorkflowsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
