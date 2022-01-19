import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { CARDS_SERVICE } from './interfaces/cards.interface';
import { CardsController } from './cards.controller';

const CardsProvider = {
  provide: CARDS_SERVICE,
  useClass: CardsService,
};

@Module({
  imports: [TypeOrmModule.forFeature([Card])],
  controllers: [CardsController],
  providers: [CardsService, CardsProvider],
  exports: [CardsService, CardsProvider],
})
export class CardsModule {}
