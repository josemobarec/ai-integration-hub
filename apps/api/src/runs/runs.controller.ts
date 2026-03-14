import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateRunDto } from './dto/create-run.dto';
import { RunsService } from './runs.service';

@Controller('runs')
export class RunsController {
  constructor(private readonly runsService: RunsService) {}

  @Get()
  findAll() {
    return this.runsService.findAll();
  }

  @Post()
  create(@Body() createRunDto: CreateRunDto) {
    return this.runsService.create(createRunDto);
  }
}
