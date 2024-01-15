import { Injectable, Logger } from '@nestjs/common';
import { ExchangeRateRepository } from './exchange_rate.repository';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DummyExchangeRates } from '../common';
import { CurrencyPairDto } from './dto/currency_pair';

@Injectable()
export class ExchangeRateService {
  private readonly logger = new Logger(ExchangeRateService.name);

  constructor(private readonly repository: ExchangeRateRepository) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  private async dailyExchangeRates(): Promise<void> {
    this.logger.log(
      `Uploading ${DummyExchangeRates.length} exchange rates on: ${Date.now()}`,
    );
    await this.repository.addMany(DummyExchangeRates);
    this.logger.log(`New exchange rates uploaded ${Date.now()}`);
  }

  async getCurrentRates() {
    return this.repository.getAllCurrentRates();
  }

  async getCurrentPairRates(dto: CurrencyPairDto) {
    return this.repository.getCurrentRatePair(dto);
  }
}
