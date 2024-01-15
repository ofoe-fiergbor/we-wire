import ngn from '@/public/svg/NGN.svg'
import gbp from '@/public/svg/GBP.svg'
import kes from '@/public/svg/KES.svg'
import usd from '@/public/svg/USD.svg'
import ghs from '@/public/svg/GHS.svg'
import {StaticImageData} from "next/image";
export const flagMapper: Record<string, StaticImageData> = {
    NGN: ngn,
    KES: kes,
    USD: usd,
    EUR: gbp,
    GHS: ghs,
}
export const currencyOrder: Record<string, number> = {
    NGN: 0,
    GHS: 1,
    USD: 2,
    KES: 3,
    EUR: 4,
}

export type currencies = 'NGN' | 'GHS' | 'KES' | 'USD' | 'EUR';
export interface ITransaction {
    id: string;
    amount: string;
    currency: string;
    fee: string;
    status: string;
    type: string;
    createdAt: string;
    exchangeRateId: string;
    walletId: string;
}

export interface IWallet {
    id: string;
    balance: number;
    currency: string;
}

export interface TableData {
    id: string;
    transactionType: 'Debit' | 'Credit';
    amount: string;
    status: string;
    date: string;
}

export interface Exchange {
    fromCurrency: string;
    id: string;
    rate: number;
    timestamp: string;
    toCurrency: string;
}
