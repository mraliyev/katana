import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { DrawCardDto } from 'src/cards/dto/draw-card.dto';
import {
  CARDS_SERVICE,
  ICardsService,
} from 'src/cards/interfaces/cards.interface';
import { CreateDeckDto } from './dto/create-deck.dto';
import { ResponseDataDto } from './dto/response-data.dto';
import { DECKS_SERVICE, IDecksService } from './interfaces/decks.interface';

@Controller('decks')
export class DecksController {
  constructor(
    @Inject(DECKS_SERVICE) private readonly decksService: IDecksService,
    @Inject(CARDS_SERVICE) private readonly cardsService: ICardsService,
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
