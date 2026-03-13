import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { OrganizationsModule } from './organizations/organizations.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, OrganizationsModule],
  controllers: [AppController],
})
export class AppModule {}
