import { IsString, IsNotEmpty } from 'class-validator';

export class GetCheapestFlightDto {
  @IsString()
  @IsNotEmpty()
  modelName: string;
}