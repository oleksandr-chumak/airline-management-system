import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class CreatePassengerDto {
  @IsString({ message: 'First name must be a valid text string' })
  @IsNotEmpty({ message: 'First name is required and cannot be empty' })
  @MinLength(2, {
    message: 'First name must be at least 2 characters long',
  })
  @MaxLength(50, {
    message: 'First name cannot exceed 50 characters',
  })
  @Matches(/^[a-zA-Z\s'-]+$/, {
    message:
      "First name can only contain letters, spaces, hyphens, and apostrophes (e.g., John, Mary-Jane, O'Connor)",
  })
  firstName: string;

  @IsString({ message: 'Last name must be a valid text string' })
  @IsNotEmpty({ message: 'Last name is required and cannot be empty' })
  @MinLength(2, {
    message: 'Last name must be at least 2 characters long',
  })
  @MaxLength(50, {
    message: 'Last name cannot exceed 50 characters',
  })
  @Matches(/^[a-zA-Z\s'-]+$/, {
    message:
      "Last name can only contain letters, spaces, hyphens, and apostrophes (e.g., Smith, Van Der Berg, O'Neil)",
  })
  lastName: string;

  @IsEmail(
    {},
    {
      message:
        'Email must be a valid email address format (e.g., user@example.com)',
    },
  )
  @IsNotEmpty({ message: 'Email address is required and cannot be empty' })
  @MaxLength(100, {
    message: 'Email address cannot exceed 100 characters',
  })
  email: string;

  @IsString({ message: 'Phone number must be a valid text string' })
  @IsNotEmpty({ message: 'Phone number is required and cannot be empty' })
  @Matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/, {
    message:
      'Phone number must be a valid format (e.g., +1234567890, (123) 456-7890, 123-456-7890)',
  })
  @MinLength(10, {
    message: 'Phone number must be at least 10 characters long',
  })
  @MaxLength(20, {
    message: 'Phone number cannot exceed 20 characters',
  })
  phoneNumber: string;
}