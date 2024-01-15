import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Create } from './dto/create';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() create: Create) {
    return this.transactionService.create(create);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:walletId')
  getAllPaginated(
    @Param('walletId') walletId: string,
    @Query('page') page: string,
    @Query('size') size: string,
  ) {
    const pageVal = Number(page);
    const sizeVal = Number(size);
    return this.transactionService.getAllPaginated({
      walletId,
      page: pageVal || 1,
      size: sizeVal || 10,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:walletId/:transactionId')
  getOne(
    @Param('walletId') walletId: string,
    @Param('transactionId') transactionId: string,
  ) {
    return this.transactionService.getOne({ walletId, transactionId });
  }

  @HttpCode(HttpStatus.OK)
  @Get('transaction-fee')
  async getTransactionFee(@Query('amount') amount: string) {
    return this.transactionService.computeFee(+amount);
  }
}
