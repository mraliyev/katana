import { Module } from '@nestjs/common';
import { DecksService } from './decks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deck } from './entities/deck.entity';
import { DECKS_SERVICE } from './interfaces/decks.interface';
import { DecksController } from './decks.controller';
import { CardsModule } from 'src/cards/cards.module';

const DecksProvider = {
  provide: DECKS_SERVICE,
  useClass: DecksService,
};

@Module({
  imports: [TypeOrmModule.forFeature([Deck]), CardsModule],
  controllers: [DecksController],
  providers: [DecksService, DecksProvider],
  exports: [DecksService, DecksProvider],
})
export class DecksModule {}
