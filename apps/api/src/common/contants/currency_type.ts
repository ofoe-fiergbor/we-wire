export type CurrencyType = 'NGN' | 'GHS' | 'USD' | 'KES' | 'EUR';

export const CurrencyType: Record<CurrencyType, CurrencyType> = {
  NGN: 'NGN',
  GHS: 'GHS',
  USD: 'USD',
  KES: 'KES',
  EUR: 'EUR',
};

export interface ExchangeRatePair {
  from: CurrencyType;
  to: CurrencyType;
  rate: number;
}
export const DummyExchangeRates: ExchangeRatePair[] = [
  { from: 'NGN', to: 'GHS', rate: 0.012 },
  { from: 'GHS', to: 'NGN', rate: 80.11 },
  { from: 'NGN', to: 'USD', rate: 0.001 },
  { from: 'USD', to: 'NGN', rate: 957.51 },
  { from: 'NGN', to: 'KES', rate: 0.17 },
  { from: 'KES', to: 'NGN', rate: 6.06 },
  { from: 'NGN', to: 'EUR', rate: 0.00095 },
  { from: 'EUR', to: 'NGN', rate: 1049.96 },
  { from: 'GHS', to: 'USD', rate: 0.084 },
  { from: 'USD', to: 'GHS', rate: 11.95 },
  { from: 'GHS', to: 'KES', rate: 13.22 },
  { from: 'KES', to: 'GHS', rate: 0.076 },
  { from: 'GHS', to: 'EUR', rate: 0.076 },
  { from: 'EUR', to: 'GHS', rate: 13.11 },
  { from: 'USD', to: 'KES', rate: 158.02 },
  { from: 'KES', to: 'USD', rate: 0.0063 },
  { from: 'USD', to: 'EUR', rate: 0.91 },
  { from: 'EUR', to: 'USD', rate: 1.1 },
  { from: 'KES', to: 'EUR', rate: 0.0058 },
  { from: 'EUR', to: 'KES', rate: 173.28 },
];
// export type CurrencyPair = {
//   from: CurrencyType;
//   to: CurrencyType;
// };
//
// export const CurrencyTypeList: CurrencyType[] = [
//   'NGN',
//   'GHS',
//   'USD',
//   'KES',
//   'EUR',
// ];

// export const generateCurrencyPairs = (): CurrencyPair[] => {
//   return CurrencyTypeList.reduce((pairs, from, index, arr) => {
//     const otherCurrencies = arr.slice(index + 1);
//
//     const currencyPairs = otherCurrencies.flatMap((to) => [
//       { from, to },
//       { from: to, to: from },
//     ]);
//
//     return [...pairs, ...currencyPairs];
//   }, [] as CurrencyPair[]);
// };
