import { UpdateTicketDto } from './update-ticket.dto';
import {
  IsNumber,
  IsPositive,
  IsArray,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';

export class BatchUpdateTicketItemDto extends UpdateTicketDto {
  @IsNumber(
    {},
    { message: 'Ticket ID must be a valid number for identifying the ticket' },
  )
  @IsPositive({
    message: 'Ticket ID must be a positive number greater than zero',
  })
  @Type(() => Number)
  ticketId: number;
}

export class BatchUpdateTicketsDto {
  @IsArray({
    message:
      'Tickets must be provided as an array of ticket objects to update',
  })
  @ArrayMinSize(1, {
    message: 'At least one ticket must be provided in the batch update request',
  })
  @ValidateNested({
    each: true,
    message:
      'Each ticket in the array must be a valid ticket update object with proper structure',
  })
  @Type(() => BatchUpdateTicketItemDto)
  tickets: BatchUpdateTicketItemDto[];
}