import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';

@Injectable()
export class OrganizationsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.organization.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        memberships: true,
        integrations: true,
        workflows: true,
      },
    });
  }

  async create(createOrganizationDto: CreateOrganizationDto) {
    const existingOrganization = await this.prisma.organization.findUnique({
      where: {
        slug: createOrganizationDto.slug,
      },
    });

    if (existingOrganization) {
      throw new ConflictException('Organization slug already exists');
    }

    return this.prisma.organization.create({
      data: {
        name: createOrganizationDto.name,
        slug: createOrganizationDto.slug,
      },
    });
  }
}
