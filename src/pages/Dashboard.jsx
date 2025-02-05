import React, { useEffect, useState } from "react";

import PlanningGoalsContainer from "../components/DashBoard/PlanningGoalsContainer";
import SubscriptionContainer from "../components/DashBoard/SubscriptionContainer";
import TransactionContainer from "../components/DashBoard/TransactionContainer";
import CardsContainer from "../components/DashBoard/CardsContainer";
import BalanceContainer from "../components/DashBoard/BalanceContainer";

// Skeleton Loader
const SkeletonDashboard = () => (
  <div className="grid min-h-screen grid-cols-1 gap-4 bg-slate-200 p-8 lg:grid-cols-3">
    <div className="space-y-4">
      <div className="h-80 w-full animate-pulse rounded-xl bg-gray-300" />
      <div className="h-96 w-full animate-pulse rounded-xl bg-gray-300" />
    </div>
    <div className="col-span-2 space-y-4">
      <div className="h-96 w-full animate-pulse rounded-xl bg-gray-300" />
      <div className="grid grid-cols-2 gap-4">
        <div className="h-80 w-full animate-pulse rounded-xl bg-gray-300" />
        <div className="h-80 w-full animate-pulse rounded-xl bg-gray-300" />
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        // Ejecutar todas las peticiones en paralelo
        const [
          planningResponse,
          subscriptionsResponse,
          transactionsResponse,
          cardsResponse,
          balanceResponse,
        ] = await Promise.all([
          fetch("http://localhost:3000/api/planning-goals").then((res) =>
            res.json(),
          ),
          fetch("http://localhost:3000/api/subscriptions").then((res) =>
            res.json(),
          ),
          fetch("http://localhost:3000/api/transactions").then((res) =>
            res.json(),
          ),
          fetch("http://localhost:3000/api/wallets").then((res) => res.json()),
          fetch("http://localhost:3000/api/users").then((res) => res.json()),
        ]);

        // Guardar los datos en el estado
        setData({
          cards: cardsResponse,
          balance: balanceResponse,
          planning: planningResponse,
          transactions: transactionsResponse,
          subscriptions: subscriptionsResponse,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) return <SkeletonDashboard />;

  return (
    <div className="grid grid-cols-1 gap-4 bg-slate-200 p-8 lg:grid-cols-3">
      {/* Left Column */}
      <div className="space-y-4">
        <CardsContainer cardData={data.cards} />
        <PlanningGoalsContainer planningGoalsData={data.planning} />
      </div>

      {/* Right Columns */}
      <div className="col-span-2 space-y-4">
        <BalanceContainer balanceData={data.balance} />

        <div className="grid grid-cols-2 rounded-xl bg-white">
          <TransactionContainer transactionData={data.transactions} />
          <SubscriptionContainer subscriptionData={data.subscriptions} />
        </div>
      </div>
    </div>
  );
}
