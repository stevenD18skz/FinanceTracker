import React from 'react';
import { X, Calendar, TrendingUp, Edit2, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import type { Subscription } from './types';

interface SubscriptionDetailsProps {
  subscription: Subscription;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function SubscriptionDetails({
  subscription,
  onClose,
  onEdit,
  onDelete,
}: SubscriptionDetailsProps) {
  const dueDate = new Date(subscription.renewalDate);
  const isOverdue = !subscription.status && dueDate < new Date();
  const daysUntilDue = Math.ceil((dueDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24));

  return (
    <div className="h-full">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl"
            style={{ backgroundColor: subscription.color }}
          >
            {subscription.icon}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{subscription.name}</h2>
            <p className="text-sm text-gray-500">{subscription.category}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-8 space-y-6">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
            <TrendingUp className="h-4 w-4" />
            <span>Monthly Cost</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            ${subscription.cost.toFixed(2)}
          </p>
        </div>

        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>Next Payment</span>
          </div>
          <p className="flex items-center gap-2 text-gray-900">
            {new Date(subscription.renewalDate).toLocaleDateString()}
            {subscription.status ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : isOverdue ? (
              <AlertCircle className="h-5 w-5 text-red-500" />
            ) : null}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            {subscription.status
              ? 'Paid'
              : isOverdue
                ? `Overdue by ${Math.abs(daysUntilDue)} days`
                : `Due in ${daysUntilDue} days`}
          </p>
        </div>

        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
            <span>Status</span>
          </div>
          <div
            className={`inline-flex rounded-full px-3 py-1 text-sm font-medium
              ${subscription.status
                ? 'bg-green-100 text-green-700'
                : isOverdue
                  ? 'bg-red-100 text-red-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}
          >
            {subscription.status ? 'Paid' : isOverdue ? 'Overdue' : 'Pending'}
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
            <span>Billing Cycle</span>
          </div>
          <p className="text-gray-900 capitalize">{subscription.billingCycle}</p>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onEdit}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-violet-600 py-2 font-medium text-white hover:bg-violet-700"
        >
          <Edit2 className="h-4 w-4" />
          Edit
        </button>
        <button
          onClick={onDelete}
          className="flex items-center justify-center gap-2 rounded-lg bg-red-100 px-4 py-2 font-medium text-red-600 hover:bg-red-200"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}