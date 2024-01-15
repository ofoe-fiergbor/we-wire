import { IsNotEmpty } from 'class-validator';

export class Create {
  @IsNotEmpty()
  amount: number;
  @IsNotEmpty()
  fromWalletId: string;
  @IsNotEmpty()
  toWalletId: string;
  @IsNotEmpty()
  exchangeRateId: string;
}
