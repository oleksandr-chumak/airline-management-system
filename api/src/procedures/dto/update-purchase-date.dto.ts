import { IsInt, IsPositive } from 'class-validator';

export class UpdatePurchaseDateDto {
  @IsInt()
  @IsPositive()
  ticketId: number;
}