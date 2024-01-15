import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { PrismaClient } from '@prisma/client';
import { WalletController } from './wallet.controller';

@Module({
  controllers: [WalletController],
  providers: [WalletService, PrismaClient],
  exports: [WalletService],
})
export class WalletModule {}
