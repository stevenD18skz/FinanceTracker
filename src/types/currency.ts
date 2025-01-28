export interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export const currencies: Currency[] = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "COP", symbol: "$", name: "Colombian Peso" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  // Add more currencies as needed
];
