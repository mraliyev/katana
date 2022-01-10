import { Module } from '@nestjs/common';
import { DecksService } from './decks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deck } from './entities/deck.entity';
import { DECKS_SERVICE } from './interfaces/decks.interface';

const DecksProvider = {
  provide: DECKS_SERVICE,
  useClass: DecksService,
};

@Module({
  imports: [TypeOrmModule.forFeature([Deck])],
  controllers: [],
  providers: [DecksService, DecksProvider],
  exports: [DecksService, DecksProvider],
})
export class DecksModule {}
