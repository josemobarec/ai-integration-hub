import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { DecisionApprovalDto } from './dto/decision-approval.dto';
import { ApprovalsService } from './approvals.service';

@Controller('approvals')
export class ApprovalsController {
  constructor(private readonly approvalsService: ApprovalsService) {}

  @Get()
  findAll() {
    return this.approvalsService.findAll();
  }

  @Patch(':id/approve')
  approve(
    @Param('id') id: string,
    @Body() decisionApprovalDto: DecisionApprovalDto,
  ) {
    return this.approvalsService.approve(id, decisionApprovalDto);
  }

  @Patch(':id/reject')
  reject(
    @Param('id') id: string,
    @Body() decisionApprovalDto: DecisionApprovalDto,
  ) {
    return this.approvalsService.reject(id, decisionApprovalDto);
  }
}
