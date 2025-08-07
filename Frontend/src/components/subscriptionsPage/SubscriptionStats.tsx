import React from "react";
import { Subscription, PaymentHistory } from "../../types/subscription";

// Helper functions
export const formatCurrency = (
  amount: number,
  currencyCode: string,
): string => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
import {
  TrendingUp,
  Calendar,
  AlertCircle,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface StatisticsProps {
  subscriptions: Subscription[];
  paymentHistory: PaymentHistory[];
}

const SubscriptionStats: React.FC<StatisticsProps> = ({
  subscriptions,
  paymentHistory,
}) => {
  const totalMonthlyExpenses = subscriptions.reduce((total, sub) => {
    if (sub.status === "active") {
      const monthlyCost =
        sub.paymentFrequency === "yearly"
          ? sub.cost / 12
          : sub.paymentFrequency === "quarterly"
            ? sub.cost / 3
            : sub.cost;
      return total + monthlyCost;
    }
    return total;
  }, 0);

  const activeSubscriptions = subscriptions.filter(
    (sub) => sub.status === "active",
  ).length;
  const totalAnnualProjected = totalMonthlyExpenses * 12;

  const lastMonthExpenses = paymentHistory
    .filter((payment) => {
      const date = new Date(payment.date);
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      return (
        date.getMonth() === lastMonth.getMonth() &&
        date.getFullYear() === lastMonth.getFullYear()
      );
    })
    .reduce((total, payment) => total + payment.amount, 0);

  const monthlyChange = totalMonthlyExpenses - lastMonthExpenses;
  const changePercentage = (monthlyChange / lastMonthExpenses) * 100;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-xl bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Monthly Expenses
            </p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {formatCurrency(totalMonthlyExpenses, "USD")}
            </p>
          </div>
          <div
            className={`rounded-full p-3 ${
              monthlyChange >= 0 ? "bg-red-100" : "bg-green-100"
            }`}
          >
            {monthlyChange >= 0 ? (
              <TrendingUp className="h-6 w-6 text-red-600" />
            ) : (
              <ArrowDownRight className="h-6 w-6 text-green-600" />
            )}
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <span
            className={`text-sm ${
              monthlyChange >= 0 ? "text-red-600" : "text-green-600"
            }`}
          >
            {changePercentage.toFixed(1)}%
          </span>
          <span className="ml-2 text-sm text-gray-500">vs last month</span>
        </div>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Active Subscriptions
            </p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {activeSubscriptions}
            </p>
          </div>
          <div className="rounded-full bg-blue-100 p-3">
            <CreditCard className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          {subscriptions.length - activeSubscriptions} inactive
        </p>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Next Payment</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {formatCurrency(
                subscriptions
                  .filter((sub) => sub.status === "active")
                  .sort(
                    (a, b) =>
                      new Date(a.nextPaymentDate).getTime() -
                      new Date(b.nextPaymentDate).getTime(),
                  )[0]?.cost || 0,
                "USD",
              )}
            </p>
          </div>
          <div className="rounded-full bg-purple-100 p-3">
            <Calendar className="h-6 w-6 text-purple-600" />
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500">Due in 5 days</p>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Annual Projected
            </p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {formatCurrency(totalAnnualProjected, "USD")}
            </p>
          </div>
          <div className="rounded-full bg-orange-100 p-3">
            <AlertCircle className="h-6 w-6 text-orange-600" />
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Based on current subscriptions
        </p>
      </div>
    </div>
  );
};

export default SubscriptionStats;
