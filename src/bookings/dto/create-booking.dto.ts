import {
  IsString,
  IsNumber,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  readonly customerName!: string;

  @IsEmail()
  @IsNotEmpty()
  readonly customerEmail!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(12)
  readonly customerPhone!: string;

  @IsDateString()
  @IsNotEmpty()
  readonly bookingDate!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(10)
  readonly bookingTime!: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  readonly notes?: string;

  @IsNumber()
  @IsNotEmpty()
  readonly serviceId!: number;
}
