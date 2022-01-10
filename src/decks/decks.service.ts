import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from 'src/cards/entities/card.entity';
import { Repository } from 'typeorm';
import { CreateDeckDto } from './dto/create-deck.dto';
import { Deck } from './entities/deck.entity';
import { IDecksService } from './interfaces/decks.interface';

@Injectable()
export class DecksService implements IDecksService {
  constructor(
    @InjectRepository(Deck) private readonly decksRepository: Repository<Deck>,
  ) {}

  create(createDeckDto: CreateDeckDto): Promise<Deck> {
    return Promise.resolve(this.decksRepository.create(createDeckDto));
  }

  save(deck: Deck): Promise<Deck> {
    return this.decksRepository.save(deck);
  }

  shuffle(deck: Deck): Deck {
    const cards = deck.cards;
    let numCards = cards.length;

    while (numCards) {
      const randomNumber: number = Math.floor(Math.random() * numCards--);

      [cards[numCards], cards[randomNumber]] = [
        cards[randomNumber],
        cards[numCards],
      ];
    }

    return deck;
  }

  drawCard(deck: Deck): Card {
    return deck.cards.pop();
  }

  findOne(id: string): Promise<Deck> {
    return this.decksRepository.findOneOrFail(id, { relations: ['cards'] });
  }
}
