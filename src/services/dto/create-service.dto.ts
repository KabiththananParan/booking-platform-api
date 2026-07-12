import {
  IsString,
  IsNumber,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  readonly title!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  readonly description!: string;

  @IsNumber()
  @IsNotEmpty()
  readonly duration!: number;

  @IsNumber()
  @IsNotEmpty()
  readonly price!: number;
}
