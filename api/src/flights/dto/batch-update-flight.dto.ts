import { UpdateFlightDto } from './update-flight.dto';
import {
  IsNumber,
  IsPositive,
  IsArray,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';

export class BatchUpdateFlightItemDto extends UpdateFlightDto {
  @IsNumber(
    {},
    { message: 'Flight ID must be a valid number for identifying the flight' },
  )
  @IsPositive({
    message: 'Flight ID must be a positive number greater than zero',
  })
  @Type(() => Number)
  flightId: number;
}

export class BatchUpdateFlightsDto {
  @IsArray({
    message: 'Flights must be provided as an array of flight objects to update',
  })
  @ArrayMinSize(1, {
    message: 'At least one flight must be provided in the batch update request',
  })
  @ValidateNested({
    each: true,
    message:
      'Each flight in the array must be a valid flight update object with proper structure',
  })
  @Type(() => BatchUpdateFlightItemDto)
  flights: BatchUpdateFlightItemDto[];
}
