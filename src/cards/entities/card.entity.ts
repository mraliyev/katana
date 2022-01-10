import { Deck } from '../../decks/entities/deck.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id?: number;

  @Column()
  code: string;

  @Column()
  suit: string;

  @Column()
  value: string;

  @ManyToMany(() => Deck, (deck) => deck.cards)
  deck?: Deck;
}
