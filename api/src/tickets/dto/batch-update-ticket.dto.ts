import { UpdateTicketDto } from './update-ticket.dto';

export class BatchUpdateTicketItemDto extends UpdateTicketDto {
  ticketId: number;
}

export class BatchUpdateTicketsDto {
  tickets: BatchUpdateTicketItemDto[];
}