import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { TriggerEmailTriageDto } from './dto/trigger-email-triage.dto';
import { WorkflowsService } from './workflows.service';

@Controller('workflows')
export class WorkflowsController {
  constructor(private readonly workflowsService: WorkflowsService) {}

  @Get()
  findAll() {
    return this.workflowsService.findAll();
  }

  @Post()
  create(@Body() createWorkflowDto: CreateWorkflowDto) {
    return this.workflowsService.create(createWorkflowDto);
  }

  @Post(':id/trigger')
  triggerEmailTriage(
    @Param('id') id: string,
    @Body() triggerDto: TriggerEmailTriageDto,
  ) {
    return this.workflowsService.triggerEmailTriage(id, triggerDto);
  }
}
