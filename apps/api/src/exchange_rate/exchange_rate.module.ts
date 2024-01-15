import { Module } from '@nestjs/common';
import { ExchangeRateController } from './exchange_rate.controller';
import { ExchangeRateService } from './exchange_rate.service';
import { PrismaClient } from '@prisma/client';
import { ExchangeRateRepository } from './exchange_rate.repository';

@Module({
  controllers: [ExchangeRateController],
  providers: [ExchangeRateService, PrismaClient, ExchangeRateRepository],
})
export class ExchangeRateModule {}
