import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICardsService } from './interfaces/cards.interface';
import { Card } from './entities/card.entity';

@Injectable()
export class CardsService implements ICardsService {
  constructor(
    @InjectRepository(Card) private readonly cardsRepository: Repository<Card>,
  ) {}

  create(): Promise<Card[]> {
    const cards: Card[] = [];
    const suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
    const values = [
      'Ace',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      'Jack',
      'Queen',
      'King',
    ];

    return new Promise((resolve) => {
      for (const suit in suits) {
        for (const value in values) {
          const curValue = values[value];
          const curSuit = suits[suit];
          const curCode =
            +curValue > 0 ? curValue + curSuit[0] : curValue[0] + curSuit[0];

          const card: Card = {
            value: curValue,
            suit: curSuit,
            code: curCode,
          };

          cards.push(card);
        }
      }

      return resolve(cards);
    });
  }
}
