// React y hooks
import * as React from "react";
import { useState } from "react";

// Componentes internos
import SubscriptionStats from "../components/subscriptionsPage/SubscriptionStats";
import HistoryPayments from "../components/subscriptionsPage/HistoryPayments";
import SubscriptionDetail from "../components/subscriptionsPage/SubscriptionDetail";

// Utilidades y datos
import { formatCurrency, formatDate } from "../utils/formatters";
import { subscriptionsData, paymentHistoryData } from "../utils/Data";

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
  Layout,
  ListFilter,
  ChevronRight,
  PackageOpen,
} from "lucide-react";
import ModalGeneric from "../components/ui/ModalGeneric";

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

const SubscriptionManager = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  ////===============
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("progress");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [subscriptioToDelete, setSubscriptionToDelete] =
    useState<Subscription | null>(null);
  const [selectedSubscription, setSelectedSubscription] =
    useState<Subscription | null>(null);

  //===============

  const subscriptions: Subscription[] = subscriptionsData;
  const paymentHistory: PaymentHistory[] = paymentHistoryData;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/**Stats Summary */}
      <SubscriptionStats
        subscriptions={subscriptions}
        paymentHistory={paymentHistory}
      />

      {/**Header and Controllers */}
      <div className="my-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold text-gray-800">
              Planning Goals
            </h2>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
              {subscriptions.length} {filter === "all" ? "total" : filter}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg bg-gray-100 p-1">
              <button
                onClick={() => setView("grid")}
                className={`rounded-md p-2 transition-all ${
                  view === "grid"
                    ? "bg-white text-gray-800 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
                title="Grid view"
              >
                <Layout className="h-4 w-4" />
              </button>
              <button
                onClick={() => setView("list")}
                className={`rounded-md p-2 transition-all ${
                  view === "list"
                    ? "bg-white text-gray-800 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
                title="List view"
              >
                <ListFilter className="h-4 w-4" />
              </button>
            </div>
            <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <Plus className="h-4 w-4" />
              New Goal
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            {["all", "active", "completed"].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  filter === filterType
                    ? "bg-gray-100 text-gray-800"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div
              className={`relative transition-all ${
                isSearchFocused ? "w-64" : "w-48"
              }`}
            >
              <input
                type="text"
                placeholder="Search goals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full rounded-lg border-gray-200 bg-white py-2 pl-10 pr-4 text-sm placeholder-gray-400 shadow-sm transition-all focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border-gray-200 bg-white py-2 pl-3 pr-10 text-sm text-gray-600 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            >
              <option value="progress">Sort by Progress</option>
              <option value="dueDate">Sort by Due Date</option>
              <option value="amount">Sort by Amount</option>
            </select>
          </div>
        </div>
      </div>

      {/**View Items */}

      <div className="flex gap-6">
        <div
          className={`grid flex-1 gap-6 ${
            view === "grid"
              ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {subscriptions.map((subscription) => (
            <SubscriptionCard
              key={subscription.id}
              subscription={subscription}
            />
          ))}
        </div>

        {selectedSubscription && (
          <div className="w-96 shrink-0">
            <SubscriptionDetail
              subscription={selectedSubscription}
              onClose={() => {}}
            ></SubscriptionDetail>
          </div>
        )}
      </div>

      {/* Empty State */}
      {subscriptions.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl bg-gray-50 py-12">
          {searchQuery ? (
            <>
              <p className="text-gray-500">
                No goals found matching "{searchQuery}"
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                Clear search
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <PackageOpen className="h-24 w-24 text-gray-500" />
              <p className="text-gray-500">
                No goals found for the selected filter.
              </p>
              <button className="mt-4 flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700">
                Create your first goal
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      )}

      {/* History */}
      <HistoryPayments subscriptions={paymentHistory}></HistoryPayments>

      {/**Modal to Eliminate */}
      <ModalGeneric
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Goal"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Are you sure you want to delete this goal? This action cannot be
            undone.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {}}
              className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </ModalGeneric>
    </div>
  );
};

export default SubscriptionManager;
