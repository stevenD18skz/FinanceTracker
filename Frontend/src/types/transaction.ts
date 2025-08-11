export interface Transaction {
  id: number;
  icon: string;
  name: string;
  date: string;
  amount: number;
  type: string; // "income" | "expense";
  cardId: number;
}
