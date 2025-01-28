export interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export const formatCurrency = (
  amount: number,
  currencyCode: string = "USD",
): string => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const currencies: Currency[] = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "COP", symbol: "$", name: "Colombian Peso" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  // Add more currencies as needed
];

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
