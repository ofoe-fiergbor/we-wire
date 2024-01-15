import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TransactionRepository } from './transaction.repository';
import { WalletService } from '../wallet/wallet.service';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [TransactionController],
  providers: [
    TransactionService,
    TransactionRepository,
    WalletService,
    PrismaClient,
  ],
})
export class TransactionModule {}
