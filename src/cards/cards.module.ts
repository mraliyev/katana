import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { CARDS_SERVICE } from './interfaces/cards.interface';

const CardsProvider = {
  provide: CARDS_SERVICE,
  useClass: CardsService,
};

@Module({
  imports: [TypeOrmModule.forFeature([Card])],
  controllers: [],
  providers: [CardsService],
  exports: [CardsService],
})
export class CardsModule {}
