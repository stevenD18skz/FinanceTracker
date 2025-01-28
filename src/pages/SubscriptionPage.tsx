// React y hooks
import * as React from "react";
import { useState } from "react";

// Componentes internos
import { SubscriptionCard } from "../components/subscriptionsPage/SubscriptionCard";
import { SubscriptionStats } from "../components/subscriptionsPage/SubscriptionStats";
import { SubscriptionForm } from "../components/subscriptionsPage/SubscriptionForm";
import { SubscriptionDetails } from "../components/subscriptionsPage/SubscriptionDetails";

// Utilidades y datos
import { subscriptionsData as initialSubscriptions } from "../utils/Data";

// Tipos
import type {
  Subscription,
  SubscriptionStats as Stats,
} from "../components/subscriptionsPage/types";

// Iconos de Lucide React (agrupados por funcionalidad o categoría)
import { Plus, Search, ArrowUpDown } from "lucide-react";

export default function SubscriptionPage() {
  const [subscriptions, setSubscriptions] =
    useState<Subscription[]>(initialSubscriptions);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState<
    Subscription | undefined
  >();
  const [selectedSubscription, setSelectedSubscription] =
    useState<Subscription | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");

  const calculateStats = (subs: Subscription[]): Stats => {
    const activeSubscriptions = subs.filter((sub) => sub.status);
    const unpaidSubscriptions = subs.filter((sub) => !sub.status);

    return {
      totalActive: activeSubscriptions.length,
      monthlySpending: subs.reduce((acc, sub) => acc + sub.cost, 0),
      nextPayment:
        unpaidSubscriptions.length > 0 ? unpaidSubscriptions[0].cost : 0,
      nextPaymentDate:
        unpaidSubscriptions.length > 0
          ? unpaidSubscriptions[0].renewalDate
          : new Date().toISOString(),
    };
  };

  const stats = calculateStats(subscriptions);

  const handlePayment = (id: number) => {
    setSubscriptions((subs) =>
      subs.map((sub) => (sub.id === id ? { ...sub, status: true } : sub)),
    );
  };

  const handleAddSubscription = (newSubscription: Omit<Subscription, "id">) => {
    setSubscriptions((subs) => [
      ...subs,
      {
        ...newSubscription,
        id: Math.max(...subs.map((s) => s.id)) + 1,
      },
    ]);
    setIsFormOpen(false);
  };

  const handleEditSubscription = (subscription: Omit<Subscription, "id">) => {
    if (!editingSubscription) return;

    setSubscriptions((subs) =>
      subs.map((sub) =>
        sub.id === editingSubscription.id
          ? { ...subscription, id: sub.id }
          : sub,
      ),
    );
    setEditingSubscription(undefined);
    setIsFormOpen(false);
  };

  const handleDeleteSubscription = (id: number) => {
    if (window.confirm("Are you sure you want to delete this subscription?")) {
      setSubscriptions((subs) => subs.filter((sub) => sub.id !== id));
      setSelectedSubscription(null);
    }
  };

  const handleSort = (value: string) => {
    setSortBy(value);
    let sortedSubs = [...subscriptions];

    switch (value) {
      case "date-desc":
        sortedSubs.sort(
          (a, b) =>
            new Date(b.renewalDate).getTime() -
            new Date(a.renewalDate).getTime(),
        );
        break;
      case "date-asc":
        sortedSubs.sort(
          (a, b) =>
            new Date(a.renewalDate).getTime() -
            new Date(b.renewalDate).getTime(),
        );
        break;
      case "cost-desc":
        sortedSubs.sort((a, b) => b.cost - a.cost);
        break;
      case "cost-asc":
        sortedSubs.sort((a, b) => a.cost - b.cost);
        break;
      case "status-paid":
        sortedSubs.sort((a, b) =>
          a.status === b.status ? 0 : a.status ? -1 : 1,
        );
        break;
      case "status-unpaid":
        sortedSubs.sort((a, b) =>
          a.status === b.status ? 0 : a.status ? 1 : -1,
        );
        break;
    }

    setSubscriptions(sortedSubs);
  };

  const filteredSubscriptions = subscriptions.filter((sub) =>
    sub.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const sortOptions = [
    {
      label: "Date",
      value: "date",
      options: [
        { label: "Newest First", value: "date-desc" },
        { label: "Oldest First", value: "date-asc" },
      ],
    },
    {
      label: "Cost",
      value: "cost",
      options: [
        { label: "Highest First", value: "cost-desc" },
        { label: "Lowest First", value: "cost-asc" },
      ],
    },
    {
      label: "Status",
      value: "status",
      options: [
        { label: "Paid First", value: "status-paid" },
        { label: "Unpaid First", value: "status-unpaid" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <div className="flex-1 p-8">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-4xl font-bold text-gray-900">
              Subscription Manager
            </h1>
            <button
              onClick={() => setIsFormOpen(true)}
              className="flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 font-medium text-white transition-colors hover:bg-violet-700"
            >
              <Plus className="h-5 w-5" />
              Add Subscription
            </button>
          </div>

          <div className="mb-8">
            <SubscriptionStats stats={stats} />
          </div>

          <div className="mb-6 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search subscriptions..."
                className="w-full rounded-lg border-gray-200 pl-10 focus:border-violet-500 focus:ring-violet-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className="rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
              >
                {sortOptions.map((group) => (
                  <optgroup key={group.value} label={group.label}>
                    {group.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <ArrowUpDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="space-y-4">
            {filteredSubscriptions.map((subscription) => (
              <div
                key={subscription.id}
                onClick={() => setSelectedSubscription(subscription)}
                className="cursor-pointer"
              >
                <SubscriptionCard
                  subscription={subscription}
                  onPay={handlePayment}
                  onEdit={() => {
                    setEditingSubscription(subscription);
                    setIsFormOpen(true);
                  }}
                  onDelete={() => handleDeleteSubscription(subscription.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {selectedSubscription && (
          <div className="w-96 border-l border-gray-200 bg-white p-6">
            <SubscriptionDetails
              subscription={selectedSubscription}
              onClose={() => setSelectedSubscription(null)}
              onEdit={() => {
                setEditingSubscription(selectedSubscription);
                setIsFormOpen(true);
              }}
              onDelete={() => handleDeleteSubscription(selectedSubscription.id)}
            />
          </div>
        )}
      </div>

      <SubscriptionForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingSubscription(undefined);
        }}
        onSubmit={
          editingSubscription ? handleEditSubscription : handleAddSubscription
        }
        editingSubscription={editingSubscription}
      />
    </div>
  );
}
