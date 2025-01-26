import React from "react";
import {
  Calendar,
  AlertCircle,
  CheckCircle2,
  Eye,
  Edit2,
  Trash2,
} from "lucide-react";
import { type Subscription } from "./types";

interface SubscriptionCardProps {
  subscription: Subscription;
  onPay: (id: number) => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function SubscriptionCard({
  subscription,
  onPay,
  onEdit,
  onDelete,
}: SubscriptionCardProps) {
  const dueDate = new Date(subscription.renewalDate);
  const isOverdue = !subscription.status && dueDate < new Date();
  const daysUntilDue = Math.ceil(
    (dueDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24),
  );

  return (
    <div
      className={`group relative rounded-2xl p-6 transition-all duration-300 hover:shadow-lg ${
        subscription.status
          ? "bg-gray-50 hover:bg-gray-100"
          : isOverdue
            ? "bg-red-50 hover:bg-red-100"
            : "bg-white hover:bg-gray-50"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
            style={{ backgroundColor: subscription.color }}
          >
            {subscription.icon}
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {subscription.name}
              </h3>
              {subscription.status ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : isOverdue ? (
                <AlertCircle className="h-5 w-5 text-red-500" />
              ) : null}
            </div>

            <span className="text-sm text-gray-500">
              {subscription.billingCycle || "Monthly"} subscription
            </span>

            <div className="mt-2 flex items-center gap-1 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              {subscription.status
                ? `Next payment on ${new Date(subscription.renewalDate).toLocaleDateString()}`
                : isOverdue
                  ? `Overdue since ${new Date(subscription.renewalDate).toLocaleDateString()}`
                  : `Due in ${daysUntilDue} days`}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3">
          <span className="text-2xl font-bold text-gray-900">
            ${subscription.cost.toFixed(2)}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onPay(subscription.id);
            }}
            className={`rounded-full px-6 py-2.5 font-medium transition-all duration-300 ${
              subscription.status
                ? "cursor-default bg-green-100 text-green-700"
                : isOverdue
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-violet-600 text-white hover:bg-violet-700"
            }`}
            disabled={subscription.status}
          >
            {subscription.status
              ? "Paid"
              : isOverdue
                ? "Pay Now (Overdue)"
                : "Pay Now"}
          </button>
        </div>
      </div>

      <div className="absolute right-4 top-4 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
        >
          <Edit2 className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="rounded-full bg-red-100 p-2 text-red-600 hover:bg-red-200"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
