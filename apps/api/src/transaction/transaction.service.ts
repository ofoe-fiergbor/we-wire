import { Injectable } from '@nestjs/common';
import { TransactionRepository } from './transaction.repository';
import { Create } from './dto/create';
import { Transaction, Wallet } from '@prisma/client';

@Injectable()
export class TransactionService {
  constructor(private readonly repository: TransactionRepository) {}

  async create(body: Create) {
    return this.repository.createTransaction(body);
  }

  async getAllPaginated(args: {
    walletId: string;
    page: number;
    size: number;
  }) {
    return this.repository.getTransactionsPaginated(args);
  }

  async getOne(args: {
    walletId: Wallet['id'];
    transactionId: Transaction['id'];
  }) {
    return this.repository.getTransaction(args);
  }

  async computeFee(amount: number) {
    const fee = this.repository.computeFee(amount);
    return { fee };
  }
}
