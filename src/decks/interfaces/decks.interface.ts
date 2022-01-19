import { CreateDeckDto } from '../dto/create-deck.dto';
import { Deck } from '../entities/deck.entity';

export const DECKS_SERVICE = 'DECK_SERVICE';

export interface IDecksService {
  create(createDeckDto: CreateDeckDto): Promise<Deck>;

  save(deck: Deck): Promise<Deck>;

  findOne(id: string): Promise<Deck>;

  shuffle(deck: Deck): Deck;
}
