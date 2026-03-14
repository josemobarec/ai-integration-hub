import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { WorkflowRunStatus } from '@prisma/client';

export class CreateRunDto {
  @IsString()
  @IsNotEmpty()
  workflowId!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  triggerSource!: string;

  @IsOptional()
  @IsEnum(WorkflowRunStatus)
  status?: WorkflowRunStatus;

  @IsOptional()
  @IsObject()
  inputPayload?: Record<string, unknown>;
}
