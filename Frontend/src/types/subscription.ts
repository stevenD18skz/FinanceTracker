import { Currency } from "./currency";

export type SubscriptionCategory =
  | "streaming"
  | "software"
  | "gym"
  | "utilities"
  | "entertainment"
  | "education"
  | "other";

export type PaymentFrequency = string; //"monthly" | "yearly" | "quarterly" | "weekly";

export type NotificationType = string; // "email" | "push" | "both";

export type PaymentStatus = string; //"pending" | "completed" | "failed" | "cancelled";

export interface NotificationSettings {
  type: string; // "email" | "sms" | "push";
  daysBeforePayment: number;
  enabled: boolean;
}

export interface Subscription {
  id: string;
  name: string;
  cost: number;
  currency: string;
  category: string;
  paymentFrequency: string; //"monthly" | "yearly";
  nextPaymentDate: string;
  startDate: string;
  status: string; //"active" | "inactive";
  icon: React.ReactNode;
  notificationSettings: NotificationSettings;
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
