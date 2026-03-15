import { Controller, Get, Query } from '@nestjs/common';
import { AuditService } from './audit.service';

@Controller('audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get()
  findAll(@Query('workflowRunId') workflowRunId?: string) {
    return this.auditService.findAll(workflowRunId);
  }
}
