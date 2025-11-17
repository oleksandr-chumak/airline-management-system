import { IsString, IsNotEmpty } from 'class-validator';

export class MixStringsDto {
  @IsString()
  @IsNotEmpty()
  str1: string;

  @IsString()
  @IsNotEmpty()
  str2: string;
}