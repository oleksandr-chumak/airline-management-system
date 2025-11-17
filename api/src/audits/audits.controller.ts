import { Controller, Get } from '@nestjs/common';
import { AuditsService } from './audits.service';
import { Audit } from '../entities/Audit';

@Controller('audits')
export class AuditsController {
  constructor(private readonly auditsService: AuditsService) {}

  @Get()
  async findAll(): Promise<Audit[]> {
    return await this.auditsService.findAll();
  }
}
