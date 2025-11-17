import { Module } from '@nestjs/common';
import { TicketDescriptionsService } from './ticket-descriptions.service';
import { TicketDescriptionsController } from './ticket-descriptions.controller';

@Module({
  controllers: [TicketDescriptionsController],
  providers: [TicketDescriptionsService],
})
export class TicketDescriptionsModule {}
