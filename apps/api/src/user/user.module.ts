import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaClient } from '@prisma/client';
import { WalletService } from '../wallet/wallet.service';

@Module({
  providers: [UserService, PrismaClient, WalletService],
  exports: [UserService],
})
export class UserModule {}
