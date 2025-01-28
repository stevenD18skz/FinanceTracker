// React y hooks
import * as React from "react";
import { useState, useEffect } from "react";

// Componentes internos
import SubscriptionStats from "../components/subscriptionsPage/SubscriptionStats";
import HistoryPayments from "../components/subscriptionsPage/HistoryPayments";

// Utilidades y datos
import { formatCurrency, formatDate } from "../utils/formatters";
import { subscriptionsData } from "../utils/Data";
import { currencies } from "../types/currency";

// Tipos
import {
  PaymentFrequency,
  Subscription,
  PaymentHistory,
} from "../types/subscription";

// Iconos de Lucide React (agrupados por funcionalidad o categoría)
import {
  Plus,
  BarChart3,
  Filter,
  Search,
  CreditCard,
  Settings2,
  CheckCircle2,
  XCircle,
  Edit3,
  Trash2,
  ArrowUpRight,
} from "lucide-react";

const SubscriptionCard = ({ subscription }: { subscription: Subscription }) => {
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

  const cycleInfo = getBillingCycleInfo(subscription.billingCycle);
  const daysUntilRenewal = Math.ceil(
    (new Date(subscription.renewalDate).getTime() - new Date().getTime()) /
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
            <p className="text-sm text-gray-500">{subscription.description}</p>
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
            {formatDate(subscription.renewalDate)}
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

const SubscriptionManager = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const subscriptions: Subscription[] = subscriptionsData;

  const paymentHistory: PaymentHistory[] = [
    {
      id: "1",
      subscriptionId: "1",
      amount: 19000,
      currency: currencies[2],
      date: "2024-02-25",
      status: "completed",
    },
    {
      id: "2",
      subscriptionId: "2",
      amount: 45000,
      currency: currencies[2],
      date: "2024-02-28",
      status: "completed",
    },
    {
      id: "3",
      subscriptionId: "4",
      amount: 120000,
      currency: currencies[2],
      date: "2024-02-01",
      status: "completed",
    },
    {
      id: "4",
      subscriptionId: "5",
      amount: 150000,
      currency: currencies[2],
      date: "2024-02-28",
      status: "completed",
    },
    // Previous months
    {
      id: "5",
      subscriptionId: "1",
      amount: 19000,
      currency: currencies[2],
      date: "2024-01-25",
      status: "completed",
    },
    {
      id: "6",
      subscriptionId: "2",
      amount: 45000,
      currency: currencies[2],
      date: "2024-01-28",
      status: "completed",
    },
    {
      id: "7",
      subscriptionId: "4",
      amount: 120000,
      currency: currencies[2],
      date: "2024-01-01",
      status: "completed",
    },
    {
      id: "8",
      subscriptionId: "5",
      amount: 150000,
      currency: currencies[2],
      date: "2024-01-28",
      status: "completed",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <SubscriptionStats
        subscriptions={subscriptions}
        paymentHistory={paymentHistory}
      />

      <HistoryPayments subscriptions={paymentHistory}></HistoryPayments>

      {/* Controls */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search subscriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 rounded-lg border-gray-200 pl-10 pr-4 focus:border-indigo-500 focus:ring-indigo-500"
            />
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-white p-1 shadow-sm">
            <button
              onClick={() => setView("grid")}
              className={`rounded-md p-2 ${
                view === "grid"
                  ? "bg-indigo-500 text-white"
                  : "text-gray-400 hover:bg-gray-100"
              }`}
            >
              <BarChart3 className="h-5 w-5" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`rounded-md p-2 ${
                view === "list"
                  ? "bg-indigo-500 text-white"
                  : "text-gray-400 hover:bg-gray-100"
              }`}
            >
              <Filter className="h-5 w-5" />
            </button>
          </div>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5" />
          Add Subscription
        </button>
      </div>

      {/* Subscriptions Grid */}
      <div
        className={`grid gap-6 ${view === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
      >
        {subscriptions.map((subscription) => (
          <SubscriptionCard key={subscription.id} subscription={subscription} />
        ))}
      </div>

      {/* Empty State */}
      {subscriptions.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg bg-white py-12">
          <CreditCard className="mb-4 h-12 w-12 text-gray-400" />
          <h3 className="mb-2 text-lg font-medium text-gray-900">
            No subscriptions yet
          </h3>
          <p className="mb-4 text-gray-500">
            Start by adding your first subscription
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5" />
            Add Subscription
          </button>
        </div>
      )}
    </div>
  );
};

export default SubscriptionManager;
