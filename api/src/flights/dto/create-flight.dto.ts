import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsNumber,
  IsPositive,
  MinLength,
  MaxLength,
  Matches,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFlightDto {
  @IsString({ message: 'Flight number must be a valid text string' })
  @IsNotEmpty({ message: 'Flight number is required and cannot be empty' })
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
  flightNumber: string;

  @IsString({ message: 'Origin must be a valid text string' })
  @IsNotEmpty({ message: 'Origin airport/city is required and cannot be empty' })
  @MinLength(3, {
    message: 'Origin must be at least 3 characters long',
  })
  @MaxLength(100, {
    message: 'Origin cannot exceed 100 characters',
  })
  origin: string;

  @IsString({ message: 'Destination must be a valid text string' })
  @IsNotEmpty({
    message: 'Destination airport/city is required and cannot be empty',
  })
  @MinLength(3, {
    message: 'Destination must be at least 3 characters long',
  })
  @MaxLength(100, {
    message: 'Destination cannot exceed 100 characters',
  })
  destination: string;

  @IsDateString(
    {},
    {
      message:
        'Departure time must be a valid ISO 8601 date-time string (e.g., 2024-01-15T14:30:00Z)',
    },
  )
  @IsNotEmpty({ message: 'Departure time is required and cannot be empty' })
  departureTime: Date;

  @IsDateString(
    {},
    {
      message:
        'Arrival time must be a valid ISO 8601 date-time string (e.g., 2024-01-15T18:30:00Z)',
    },
  )
  @IsNotEmpty({ message: 'Arrival time is required and cannot be empty' })
  arrivalTime: Date;

  @IsString({ message: 'Airplane model must be a valid text string' })
  @IsNotEmpty({ message: 'Airplane model is required and cannot be empty' })
  @MinLength(2, {
    message: 'Airplane model must be at least 2 characters long',
  })
  @MaxLength(50, {
    message: 'Airplane model cannot exceed 50 characters',
  })
  airplaneModel: string;

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
  capacity: number;
}