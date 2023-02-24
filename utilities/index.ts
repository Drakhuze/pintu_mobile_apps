import { USD_TO_IDR_DEFAULT } from '../constants';

export const usdToIdr = (value: number): number => value * USD_TO_IDR_DEFAULT;

export const formatCurrency = (value: number, fraction: number): string => {
  const currencyFormatter = new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: fraction,
    maximumFractionDigits: fraction,
  });
  return currencyFormatter.format(value);
};

export const formatPercentage = (value: number, fraction: number): string => {
  const currencyFormatter = new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: fraction,
    maximumFractionDigits: fraction,
  });
  const result = value >= 0 ? value : value * -1;

  return currencyFormatter.format(result);
};
