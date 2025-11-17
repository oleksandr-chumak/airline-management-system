import {
  IsNumber,
  IsPositive,
  IsString,
  IsNotEmpty,
  IsDateString,
  IsIn,
  MinLength,
  MaxLength,
  Matches,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTicketDto {
  @IsNumber(
    {},
    { message: 'Flight ID must be a valid number for identifying the flight' },
  )
  @IsPositive({
    message: 'Flight ID must be a positive number greater than zero',
  })
  @Type(() => Number)
  flightId: number;

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

  @IsString({ message: 'Seat number must be a valid text string' })
  @IsNotEmpty({ message: 'Seat number is required and cannot be empty' })
  @MinLength(2, {
    message: 'Seat number must be at least 2 characters long',
  })
  @MaxLength(10, {
    message: 'Seat number cannot exceed 10 characters',
  })
  @Matches(/^[A-Z0-9]+$/, {
    message:
      'Seat number must contain only uppercase letters and numbers (e.g., 12A, 23B, 1C)',
  })
  seatNumber: string;

  @IsString({ message: 'Status must be a valid text string' })
  @IsNotEmpty({ message: 'Ticket status is required and cannot be empty' })
  @IsIn(['CONFIRMED', 'PENDING', 'CANCELLED', 'CHECKED-IN'], {
    message:
      'Status must be one of the following: confirmed, pending, cancelled, or checked-in',
  })
  status: string;

  @IsDateString(
    {},
    {
      message:
        'Purchase date must be a valid ISO 8601 date-time string (e.g., 2024-01-15T14:30:00Z)',
    },
  )
  @IsNotEmpty({ message: 'Purchase date is required and cannot be empty' })
  purchaseDate: Date;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message:
        'Price must be a valid number with up to 2 decimal places (e.g., 299.99)',
    },
  )
  @Type(() => Number)
  @IsPositive({
    message: 'Price must be a positive number greater than zero',
  })
  @Min(0.01, {
    message: 'Price must be at least 0.01',
  })
  price: number;
}