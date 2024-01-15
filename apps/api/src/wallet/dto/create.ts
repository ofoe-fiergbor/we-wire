import { IsEnum, IsNotEmpty } from 'class-validator';
import { CurrencyType } from '../../common';

export class Create {
  @IsNotEmpty()
  userId: string;
  @IsEnum(Object.keys(CurrencyType))
  currency: string;
}
