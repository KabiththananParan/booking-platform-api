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
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({
    description: 'Name of the customer making the booking',
    example: 'Jane Doe',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  readonly customerName!: string;

  @ApiProperty({
    description: 'Email address of the customer making the booking',
    example: 'jane@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  readonly customerEmail!: string;

  @ApiProperty({
    description: 'Phone number of the customer making the booking',
    example: '0761234567',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(12)
  readonly customerPhone!: string;

  @ApiProperty({
    description: 'Date of the booking',
    example: '2023-10-15',
  })
  @IsDateString()
  @IsNotEmpty()
  readonly bookingDate!: string;

  @ApiProperty({
    description: 'Time of the booking',
    example: '10:00',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(10)
  readonly bookingTime!: string;

  @ApiProperty({
    description: 'Additional notes for the booking',
    example: 'Please prepare a vegan meal.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  readonly notes?: string;

  @IsNumber()
  @IsNotEmpty()
  readonly serviceId!: number;
}
