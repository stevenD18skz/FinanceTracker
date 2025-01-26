export interface Subscription {
  id: number;
  name: string;
  cost: number;
  renewalDate: string;
  status: boolean;
  color: string;
  icon: React.ReactNode;
  description?: string;
  billingCycle?: "monthly" | "yearly";
  category?: "entertainment" | "productivity" | "utilities" | "other";
}

export interface SubscriptionStats {
  totalActive: number;
  monthlySpending: number;
  nextPayment: number;
  nextPaymentDate: string;
}
