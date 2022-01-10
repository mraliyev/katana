import { IsNotEmpty, IsUUID } from 'class-validator';

export class DrawCardDto {
  @IsNotEmpty()
  count: number;

  @IsUUID()
  @IsNotEmpty()
  uuid: string;
}
