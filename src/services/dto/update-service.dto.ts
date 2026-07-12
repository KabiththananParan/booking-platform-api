import {
  IsString,
  IsNumber,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateServiceDto {
  @ApiProperty({
    description: 'Title of the service',
    example: 'Haircut',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  readonly title!: string;

  @ApiProperty({
    description: 'Description of the service',
    example: 'A professional haircut service for men and women.',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  readonly description!: string;

  @ApiProperty({
    description: 'Duration of the service in minutes',
    example: 30,
  })
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  readonly duration!: number;

  @ApiProperty({
    description: 'Price of the service',
    example: 50,
  })
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  readonly price!: number;
}
