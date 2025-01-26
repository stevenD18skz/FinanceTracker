import React from "react";
import { DollarSign, TrendingUp, Calendar, CreditCard } from "lucide-react";
import { type SubscriptionStats } from "./types";

interface StatsProps {
  stats: SubscriptionStats;
}

export function SubscriptionStats({ stats }: StatsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-blue-100 p-3">
            <CreditCard className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Active Subscriptions</p>
            <p className="text-2xl font-bold text-gray-900">
              {stats.totalActive}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-green-100 p-3">
            <DollarSign className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Monthly Spending</p>
            <p className="text-2xl font-bold text-gray-900">
              ${stats.monthlySpending.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-violet-100 p-3">
            <TrendingUp className="h-6 w-6 text-violet-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Next Payment</p>
            <p className="text-2xl font-bold text-gray-900">
              ${stats.nextPayment.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-orange-100 p-3">
            <Calendar className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Next Due Date</p>
            <p className="text-2xl font-bold text-gray-900">
              {new Date(stats.nextPaymentDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
