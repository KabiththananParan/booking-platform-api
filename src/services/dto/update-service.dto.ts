import {
  IsString,
  IsNumber,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class UpdateServiceDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  readonly title!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  readonly description!: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  readonly duration!: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  readonly price!: number;
}
