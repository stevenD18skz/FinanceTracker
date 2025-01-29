import React from "react";
import { Goal } from "../../types/goal";

import { formatCurrency } from "../../utils/formatters";

import {
  TrendingUp,
  Calendar,
  AlertCircle,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface StatisticsProps {
  goals: Goal[];
}

const SubscriptionStats: React.FC<StatisticsProps> = ({ goals }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-xl bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Monthly Expenses
            </p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {formatCurrency(122, "USD")}
            </p>
          </div>
          <div
            className={`rounded-full p-3 ${
              12 >= 0 ? "bg-red-100" : "bg-green-100"
            }`}
          >
            {12 >= 0 ? (
              <TrendingUp className="h-6 w-6 text-red-600" />
            ) : (
              <ArrowDownRight className="h-6 w-6 text-green-600" />
            )}
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <span
            className={`text-sm ${12 >= 0 ? "text-red-600" : "text-green-600"}`}
          >
            {12}%
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
            <p className="mt-2 text-3xl font-bold text-gray-900">{12}</p>
          </div>
          <div className="rounded-full bg-blue-100 p-3">
            <CreditCard className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          {goals.length - 12} inactive
        </p>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Next Payment</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {formatCurrency(12, "USD")}
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
              {formatCurrency(12, "USD")}
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
