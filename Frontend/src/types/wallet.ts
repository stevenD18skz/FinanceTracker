export interface Card {
  id: number;
  type: string;
  balance: number;
  cardNumber: string;
  expiryDate: string;
}

export interface Transaction {
  id: number;
  icon: JSX.Element;
  name: string;
  date: string;
  amount: number;
  type: "income" | "expense";
  cardId: number;
}
