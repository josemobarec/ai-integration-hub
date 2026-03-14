import { IsOptional, IsString, MaxLength } from 'class-validator';

export class DecisionApprovalDto {
  @IsOptional()
  @IsString()
  @MaxLength(500)
  decisionNote?: string;
}
