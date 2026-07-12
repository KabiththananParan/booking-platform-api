import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  readonly name!: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  readonly email!: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(50)
  readonly password!: string;
}
