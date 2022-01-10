import { Card } from 'src/cards/entities/card.entity';
import { DeckType } from '../decks.enum';

export interface ResponseDataDto {
  deckId: string;
  type: DeckType;
  shuffled: boolean;
  remaining: number;
  cards?: Card[];
}
