import { Card } from '../entities/card.entity';

export const CARDS_SERVICE = 'CARDS_SERVICE';

export interface ICardsService {
  create(): Promise<Card[]>;
}
