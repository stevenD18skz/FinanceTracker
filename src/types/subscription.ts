import { Currency, currencies } from "./currency";

export type SubscriptionCategory =
  | "streaming"
  | "software"
  | "gym"
  | "utilities"
  | "entertainment"
  | "education"
  | "other";

export type PaymentFrequency = "monthly" | "yearly" | "quarterly" | "weekly";

export type NotificationType = "email" | "push" | "both";

export type PaymentStatus = "pending" | "completed" | "failed" | "cancelled";

export interface Subscription {
  id: string;
  name: string;
  cost: number;
  currency: Currency;
  category: SubscriptionCategory;
  paymentFrequency: PaymentFrequency;
  nextPaymentDate: string;
  startDate: string;
  status: "active" | "cancelled";
  notes?: string;
  notificationSettings: {
    type: NotificationType;
    daysBeforePayment: number;
    enabled: boolean;
  };
}

export interface PaymentHistory {
  id: string;
  subscriptionId: string;
  amount: number;
  currency: Currency;
  date: string;
  status: PaymentStatus;
  notes?: string;
}
