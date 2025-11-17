import { IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetTicketsByPriceDto {
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxPrice: number;
}