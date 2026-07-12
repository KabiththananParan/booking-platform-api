import {
  IsString,
  IsNumber,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty({
    description: 'Title of the service',
    example: 'Haircut',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  readonly title!: string;

  @ApiProperty({
    description: 'Description of the service',
    example: 'A professional haircut service for men and women.',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  readonly description!: string;

  @ApiProperty({
    description: 'Duration of the service in minutes',
    example: 30,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly duration!: number;

  @ApiProperty({
    description: 'Price of the service',
    example: 50,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly price!: number;
}
