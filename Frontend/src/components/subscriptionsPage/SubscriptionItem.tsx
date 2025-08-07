import {
  ArrowUpRight,
  CheckCircle2,
  Edit3,
  Settings2,
  Trash2,
  XCircle,
} from "lucide-react";

import React from "react";

import { Subscription, PaymentFrequency } from "../../types/subscription";
import { useState } from "react";
import { formatDate } from "../../utils/formatters";
import { formatCurrency } from "../../utils/formatters";

const SubscriptionItem = ({ subscription }: { subscription: Subscription }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getBillingCycleInfo = (cycle: PaymentFrequency) => {
    const info = {
      monthly: { label: "Monthly", color: "text-blue-600", bg: "bg-blue-50" },
      yearly: { label: "Yearly", color: "text-green-600", bg: "bg-green-50" },
      quarterly: {
        label: "Quarterly",
        color: "text-purple-600",
        bg: "bg-purple-50",
      },
      weekly: { label: "Weekly", color: "text-orange-600", bg: "bg-orange-50" },
    };
    return info[cycle];
  };

  const cycleInfo = getBillingCycleInfo(subscription.paymentFrequency);
  const daysUntilRenewal = Math.ceil(
    (new Date(subscription.nextPaymentDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24),
  );

  return (
    <div className="group relative rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className={`rounded-xl bg-gray-100 p-3`}>
            {subscription.icon}
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{subscription.name}</h3>
            <p className="text-sm text-gray-500"></p>
          </div>
        </div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
        >
          <Settings2 className="h-5 w-5" />
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 top-12 z-10 w-48 rounded-lg bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5">
            <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <Edit3 className="mr-2 h-4 w-4" />
              Edit
            </button>
            <button className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(subscription.cost)}
          </p>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${cycleInfo.bg} ${cycleInfo.color}`}
          >
            {cycleInfo.label}
          </span>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Next renewal</p>
          <p className="font-medium text-gray-900">
            {formatDate(subscription.nextPaymentDate)}
          </p>
          <p
            className={`text-sm ${daysUntilRenewal <= 7 ? "text-red-500" : "text-gray-500"}`}
          >
            {daysUntilRenewal} days left
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t pt-4">
        <div className="flex items-center gap-2">
          {subscription.status ? (
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          ) : (
            <XCircle className="h-5 w-5 text-red-500" />
          )}
          <span
            className={`text-sm ${subscription.status ? "text-green-500" : "text-red-500"}`}
          >
            {subscription.status ? "Active" : "Inactive"}
          </span>
        </div>
        <button className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700">
          View Details
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default SubscriptionItem;
