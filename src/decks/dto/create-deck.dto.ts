import { IsBoolean, IsEnum, IsNotEmpty } from 'class-validator';
import { DeckType } from '../decks.enum';

export class CreateDeckDto {
  @IsEnum(DeckType, {
    message: `$property must be '${Object.values(DeckType).join("' or '")}'`,
  })
  type: DeckType;

  @IsNotEmpty()
  @IsBoolean()
  shuffled: boolean;
}
