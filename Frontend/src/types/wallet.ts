export interface Money {
  // amount en la unidad menor (enteros): centavos para USD/EUR/GBP, pesos para COP
  amount: number;
  currency: string; // ISO 4217, ej "COP", "USD"
}

export interface Wallet {
  id: number;
  bank: string;
  type: string;
  balance: Money;
  cardNumber: string;
  expiryDate: string;
}
