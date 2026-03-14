import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { OrganizationsModule } from './organizations/organizations.module';
import { PrismaModule } from './prisma/prisma.module';
import { IntegrationsModule } from './integrations/integrations.module';

@Module({
  imports: [PrismaModule, OrganizationsModule, IntegrationsModule],
  controllers: [AppController],
})
export class AppModule {}
