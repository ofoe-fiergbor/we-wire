import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaClient, SupportedCurrency } from '@prisma/client';
import { walletConstants } from './constants';
import { CurrencyType } from '../common';
import { Create } from './dto/create';

@Injectable()
export class WalletService {
  constructor(private readonly prisma: PrismaClient) {}

  async generateWallets(userId: string) {
    await this.prisma.wallet.createMany({
      data: Object.keys(CurrencyType).map((currency) => ({
        currency: currency as CurrencyType,
        balance: walletConstants.initialBalance,
        userId,
      })),
    });
  }

  async getWallet(id: string) {
    return this.prisma.wallet.findUnique({ where: { id } });
  }

  async getWallets(userId: string) {
    return this.prisma.wallet.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        balance: true,
        currency: true,
      },
      orderBy: { currency: 'desc' },
    });
  }

  async getWalletByCurrencyAndUserId(currency: string, userId: string) {
    return this.prisma.wallet.findFirst({
      where: {
        currency: currency as SupportedCurrency,
        userId,
      }
    });
  }

  async createWallet(dto: Create) {
    const wallet = this.prisma.wallet.findFirst({
      where: {
        currency: dto.currency as SupportedCurrency,
        userId: dto.userId,
      },
    });
    if (wallet)
      throw new UnprocessableEntityException(
        'You already have a wallet with for this currency',
      );
    return this.prisma.wallet.create({
      data: {
        currency: dto.currency as CurrencyType,
        balance: walletConstants.initialBalance,
        userId: dto.userId,
      },
    });
  }
}
