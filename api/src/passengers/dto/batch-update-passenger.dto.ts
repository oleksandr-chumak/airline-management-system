import { UpdatePassengerDto } from './update-passenger.dto';
import {
  IsNumber,
  IsPositive,
  IsArray,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';

export class BatchUpdatePassengerItemDto extends UpdatePassengerDto {
  @IsNumber(
    {},
    {
      message:
        'Passenger ID must be a valid number for identifying the passenger',
    },
  )
  @IsPositive({
    message: 'Passenger ID must be a positive number greater than zero',
  })
  @Type(() => Number)
  passengerId: number;
}

export class BatchUpdatePassengersDto {
  @IsArray({
    message:
      'Passengers must be provided as an array of passenger objects to update',
  })
  @ArrayMinSize(1, {
    message:
      'At least one passenger must be provided in the batch update request',
  })
  @ValidateNested({
    each: true,
    message:
      'Each passenger in the array must be a valid passenger update object with proper structure',
  })
  @Type(() => BatchUpdatePassengerItemDto)
  passengers: BatchUpdatePassengerItemDto[];
}