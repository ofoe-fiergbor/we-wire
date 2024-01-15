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
import { WalletService } from './wallet.service';
import { Create } from './dto/create';
@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createWallets(@Body() body: Create) {
    return this.walletService.createWallet(body);
  }
  @HttpCode(HttpStatus.OK)
  @Get()
  async getWallets(@Query('userId') userId: string) {
    return this.walletService.getWallets(userId);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:currency')
  async getWallet(
    @Param('currency') currency: string,
    @Query('userId') userId: string,
  ) {
    return this.walletService.getWalletByCurrencyAndUserId(currency, userId);
  }
}
