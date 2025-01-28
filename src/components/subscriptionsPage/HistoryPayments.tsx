import React from "react";
import { PaymentHistory } from "../../types/subscription";
import { formatCurrency } from "../../utils/formatters";
import { format, differenceInDays } from "date-fns";
import { AlertCircle } from "lucide-react";

interface HistoryPaymentsProps {
  subscriptions: PaymentHistory[];
}

const HistoryPayments: React.FC<HistoryPaymentsProps> = ({ subscriptions }) => {
  const upcomingPayments = subscriptions
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <div className="rounded-xl bg-white p-6 shadow-lg">
      <h3 className="mb-6 text-lg font-semibold text-gray-900">
        Upcoming Payments
      </h3>
      <div className="space-y-4">
        {upcomingPayments.map((subscription) => {
          const daysUntilPayment = differenceInDays(
            new Date(subscription.date),
            new Date(),
          );
          const isUrgent = daysUntilPayment <= 3;

          return (
            <div
              key={subscription.id}
              className="flex items-center justify-between rounded-lg border border-gray-100 p-4"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`rounded-full p-2 ${
                    isUrgent ? "bg-red-100" : "bg-gray-100"
                  }`}
                >
                  <AlertCircle
                    className={`h-5 w-5 ${
                      isUrgent ? "text-red-500" : "text-gray-500"
                    }`}
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    {subscription.subscriptionId}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Due {format(new Date(subscription.date), "MMM d, yyyy")}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">
                  {formatCurrency(
                    subscription.amount,
                    subscription.currency.code,
                  )}
                </p>
                <p
                  className={`text-sm ${
                    isUrgent ? "text-red-500" : "text-gray-500"
                  }`}
                >
                  {daysUntilPayment} days left
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryPayments;
