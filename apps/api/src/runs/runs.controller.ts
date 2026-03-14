import { Controller, Get } from '@nestjs/common';
import { RunsService } from './runs.service';

@Controller('runs')
export class RunsController {
  constructor(private readonly runsService: RunsService) {}

  @Get()
  findAll() {
    return this.runsService.findAll();
  }
}
