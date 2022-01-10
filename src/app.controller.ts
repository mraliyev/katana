import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CardsService } from './cards/cards.service';
import { DrawCardDto } from './cards/dto/draw-card.dto';
import { DecksService } from './decks/decks.service';
import { CreateDeckDto } from './decks/dto/create-deck.dto';
import { ResponseDataDto } from './decks/dto/response-data.dto';

@Controller('decks')
export class AppController {
  constructor(
    private readonly decksService: DecksService,
    private readonly cardsService: CardsService,
  ) {}

  @Post()
  async createDeck(@Body() createDeckDto: CreateDeckDto) {
    const { shuffled } = createDeckDto;
    const cards = await this.cardsService.create();
    let deck = await this.decksService.create(createDeckDto);
    deck.cards = cards;
    if (shuffled) {
      deck = this.decksService.shuffle(deck);
    }
    const deckModel = await this.decksService.save(deck);

    return {
      deckId: deckModel.id,
      type: createDeckDto.type,
      shuffled: createDeckDto.shuffled,
      remaining: cards.length,
    } as ResponseDataDto;
  }

  @Get(':uuid')
  async openDeck(@Param('uuid', new ParseUUIDPipe()) id: string) {
    const deckModel = await this.decksService.findOne(id);

    return {
      deckId: deckModel.id,
      type: deckModel.type,
      shuffled: deckModel.shuffled,
      remaining: deckModel.cards.length,
      cards: deckModel.cards,
    } as ResponseDataDto;
  }

  @Get(':uuid/draw/:count')
  async drawCard(@Param() params: DrawCardDto) {
    const { count, uuid: id } = params;
    const deckModel = await this.decksService.findOne(id);

    return { cards: deckModel.cards.slice(0, count) };
  }
}
