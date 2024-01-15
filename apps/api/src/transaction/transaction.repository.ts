import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  PrismaClient,
  Transaction,
  TransactionStatus,
  TransactionType,
  Wallet,
} from '@prisma/client';
import { Create } from './dto/create';
import { WalletService } from '../wallet/wallet.service';
import { transactionConstants } from './constants';

@Injectable()
export class TransactionRepository {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly walletService: WalletService,
  ) {}

  async createTransaction(body: Create) {
    const [debitWallet, creditWallet] = await Promise.all([
      await this.walletService.getWallet(body.fromWalletId),
      await this.walletService.getWallet(body.toWalletId),
    ]);
    const exchangeRate = await this.prisma.exchangeRate.findUnique({
      where: { id: body.exchangeRateId },
    });
    if (!exchangeRate) {
      throw new NotFoundException('Exchange rate not found');
    }
    if (!debitWallet)
      throw new NotFoundException(`Wallet id: ${body.fromWalletId} not found`);
    if (!creditWallet)
      throw new NotFoundException(`Wallet id: ${body.toWalletId} not found`);
    if (!this.validateAmount(debitWallet, body.amount))
      throw new UnprocessableEntityException('Not enough funds on wallet');

    const newTransaction = await this.prisma.transaction.create({
      data: {
        amount: body.amount,
        currency: debitWallet.currency,
        fee: this.computeFee(body.amount),
        status: TransactionStatus.COMPLETED,
        type: TransactionType.DEBIT,
        wallet: {
          connect: {
            id: debitWallet.id,
          },
        },
        exchangeRate: {
          connect: {
            id: body.exchangeRateId,
          },
        },
      },
    });

    await this.prisma.transaction.create({
      data: {
        amount: body.amount * exchangeRate.rate,
        currency: creditWallet.currency,
        status: TransactionStatus.COMPLETED,
        type: TransactionType.CREDIT,
        wallet: {
          connect: {
            id: creditWallet.id,
          },
        },
        exchangeRate: {
          connect: {
            id: body.exchangeRateId,
          },
        },
      },
    });

    await this.updateWalletBalance(
      debitWallet,
      -(body.amount + this.computeFee(body.amount)),
    );
    await this.updateWalletBalance(
      creditWallet,
      body.amount * exchangeRate.rate,
    );
    return newTransaction;
  }

  async getTransactionsPaginated({
    walletId,
    size,
    page,
  }: {
    walletId: Wallet['id'];
    page: number;
    size: number;
  }) {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        walletId,
      },
      skip: (page - 1) * size,
      take: size,
    });
    const count = await this.prisma.transaction.count();
    return { transactions, pages: Math.ceil(count / size), page, size };
  }

  async getTransaction({
    walletId,
    transactionId,
  }: {
    walletId: Wallet['id'];
    transactionId: Transaction['id'];
  }) {
    return this.prisma.transaction.findUnique({
      where: {
        walletId,
        id: transactionId,
      },
    });
  }

  computeFee(amount: number) {
    return amount * transactionConstants.rate;
  }

  private validateAmount(wallet: Wallet, transactionAmt: number) {
    return wallet.balance > transactionAmt + this.computeFee(transactionAmt);
  }

  private async updateWalletBalance(wallet: Wallet, amount: number) {
    await this.prisma.wallet.update({
      where: {
        id: wallet.id,
      },
      data: {
        balance: wallet.balance + amount,
      },
    });
  }
}
