import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Add } from './dto/add';
import { CurrencyPairDto } from './dto/currency_pair';
import { CurrencyType } from '../common';

/**
 * working on the assumption that
 * exchange rates are set once a day
 * **/
@Injectable()
export class ExchangeRateRepository {
  constructor(private readonly prisma: PrismaClient) {}

  get today() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }
  addMany(rates: Add[]) {
    return this.prisma.exchangeRate.createMany({
      data: rates.map((rate) => ({
        rate: rate.rate,
        fromCurrency: rate.from,
        toCurrency: rate.to,
      })),
    });
  }

  getAllCurrentRates() {
    return this.prisma.exchangeRate.findMany({
      where: {
        timestamp: {
          gte: this.today,
        },
      },
    });
  }

  getCurrentRatePair(pair: CurrencyPairDto) {
    const currA = pair.currencyA as CurrencyType;
    const currB = pair.currencyB as CurrencyType;

    return this.prisma.exchangeRate.findMany({
      where: {
        timestamp: { gte: this.today },
        OR: [
          { fromCurrency: currA, toCurrency: currB },
          { fromCurrency: currB, toCurrency: currA },
        ],
      },
    });
  }
}
