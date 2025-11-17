import { Controller, Get } from '@nestjs/common';
import { TicketDescriptionsService } from './ticket-descriptions.service';

@Controller('ticket-descriptions')
export class TicketDescriptionsController {
  constructor(
    private readonly ticketDescriptionsService: TicketDescriptionsService,
  ) {}

  @Get()
  findAll() {
    return this.ticketDescriptionsService.findAll();
  }
}
