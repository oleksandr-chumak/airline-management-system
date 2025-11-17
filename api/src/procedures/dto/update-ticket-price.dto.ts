import { IsInt, IsPositive, IsNumber, Min } from 'class-validator';

export class UpdateTicketPriceDto {
  @IsInt()
  @IsPositive()
  ticketId: number;

  @IsNumber()
  @Min(0)
  newPrice: number;
}