import { IsEnum } from 'class-validator';
import { CurrencyType } from '../../common';

export class CurrencyPairDto {
  @IsEnum([Object.keys(CurrencyType)])
  currencyA: string;
  @IsEnum([Object.keys(CurrencyType)])
  currencyB: string;
}
