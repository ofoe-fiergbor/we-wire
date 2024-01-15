import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { ExchangeRateService } from './exchange_rate.service';

@Controller('exchange-rates')
export class ExchangeRateController {
  constructor(private readonly service: ExchangeRateService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getExchangeRates() {
    return this.service.getCurrentRates();
  }

  @Get('pair')
  @HttpCode(HttpStatus.OK)
  async getPair(
    @Query('currencyA') currencyA: string,
    @Query('currencyB') currencyB: string,
  ) {
    const result = await this.service.getCurrentPairRates({
      currencyA,
      currencyB,
    });
    if (!result.length || result.length !== 2) {
      throw new NotFoundException();
    }
    return result;
  }
}
