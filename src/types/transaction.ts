import { ReactNode } from "react";

export interface Transaction {
  id: number;
  icon: ReactNode;
  name: string;
  date: string;
  amount: number;
  type: string; // "income" | "expense";
  cardId: number;
}
