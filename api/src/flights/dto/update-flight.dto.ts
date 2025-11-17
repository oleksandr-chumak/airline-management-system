import {
  IsString,
  IsOptional,
  IsDateString,
  IsNumber,
  IsPositive,
  MinLength,
  MaxLength,
  Matches,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateFlightDto {
  @IsOptional()
  @IsString({ message: 'Flight number must be a valid text string' })
  @MinLength(3, {
    message: 'Flight number must be at least 3 characters long',
  })
  @MaxLength(20, {
    message: 'Flight number cannot exceed 20 characters',
  })
  @Matches(/^[A-Z0-9]+$/, {
    message:
      'Flight number must contain only uppercase letters and numbers (e.g., AA123, BA456)',
  })
  flightNumber?: string;

  @IsOptional()
  @IsString({ message: 'Origin must be a valid text string' })
  @MinLength(3, {
    message: 'Origin must be at least 3 characters long',
  })
  @MaxLength(100, {
    message: 'Origin cannot exceed 100 characters',
  })
  origin?: string;

  @IsOptional()
  @IsString({ message: 'Destination must be a valid text string' })
  @MinLength(3, {
    message: 'Destination must be at least 3 characters long',
  })
  @MaxLength(100, {
    message: 'Destination cannot exceed 100 characters',
  })
  destination?: string;

  @IsOptional()
  @IsDateString(
    {},
    {
      message:
        'Departure time must be a valid ISO 8601 date-time string (e.g., 2024-01-15T14:30:00Z)',
    },
  )
  departureTime?: Date;

  @IsOptional()
  @IsDateString(
    {},
    {
      message:
        'Arrival time must be a valid ISO 8601 date-time string (e.g., 2024-01-15T18:30:00Z)',
    },
  )
  arrivalTime?: Date;

  @IsOptional()
  @IsString({ message: 'Airplane model must be a valid text string' })
  @MinLength(2, {
    message: 'Airplane model must be at least 2 characters long',
  })
  @MaxLength(50, {
    message: 'Airplane model cannot exceed 50 characters',
  })
  airplaneModel?: string;

  @IsOptional()
  @IsNumber(
    {},
    { message: 'Capacity must be a valid number representing seat count' },
  )
  @Type(() => Number)
  @IsPositive({
    message: 'Capacity must be a positive number greater than zero',
  })
  @Min(1, {
    message: 'Capacity must be at least 1 passenger',
  })
  capacity?: number;
}
