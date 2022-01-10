import { Card } from '../../cards/entities/card.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { DeckType } from '../decks.enum';

@Entity()
export class Deck {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: DeckType;

  @Column()
  shuffled: boolean;

  @ManyToMany(() => Card, (cards) => cards.deck, { cascade: true })
  @JoinTable()
  cards: Card[];
}
