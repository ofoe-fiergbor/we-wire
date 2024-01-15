import { CurrencyType, ExchangeRatePair } from '../../common';

export class Add implements ExchangeRatePair {
  from: CurrencyType;
  rate: number;
  to: CurrencyType;
}
