import { IsString } from 'class-validator';

export class CreateCardDto {
  @IsString()
  value: string;

  @IsString()
  suit: string;

  @IsString()
  code: string;
}
