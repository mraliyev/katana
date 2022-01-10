import { Deck } from 'src/decks/entities/deck.entity';
import { Card } from '../entities/card.entity';

export const CARDS_SERVICE = 'CARDS_SERVICE';

export interface ICardsService {
  create(deck: Deck): Promise<Card[]>;
}
