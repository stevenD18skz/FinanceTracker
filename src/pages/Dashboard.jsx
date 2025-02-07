import React, { useEffect, useState } from "react";

import PlanningGoalsContainer from "../components/DashBoard/PlanningGoalsContainer";
import SubscriptionContainer from "../components/DashBoard/SubscriptionContainer";
import TransactionContainer from "../components/DashBoard/TransactionContainer";
import CardsContainer from "../components/DashBoard/CardsContainer";
import BalanceContainer from "../components/DashBoard/BalanceContainer";
import FinancialChart from "../components/DashBoard/FinancialChart.tsx";

// Skeleton Loader mejorado
const SkeletonDashboard = () => (
  <div className="grid min-h-screen grid-cols-1 gap-4 bg-slate-200 p-8 lg:grid-cols-3">
    {/* Columna Izquierda */}
    <div className="space-y-4">
      {/* Skeleton para CardsContainer */}
      <div className="h-80 w-full animate-pulse rounded-xl bg-gray-300" />
      {/* Skeleton para PlanningGoalsContainer */}
      <div className="h-96 w-full animate-pulse rounded-xl bg-gray-300" />
    </div>
    {/* Columna Derecha */}
    <div className="col-span-2 space-y-4">
      {/* Skeleton para BalanceContainer */}
      <div className="h-40 w-full animate-pulse rounded-xl bg-gray-300" />
      <div className="grid grid-cols-2 gap-4">
        {/* Skeleton para TransactionContainer */}
        <div className="h-80 w-full animate-pulse rounded-xl bg-gray-300" />
        {/* Skeleton para SubscriptionContainer */}
        <div className="h-80 w-full animate-pulse rounded-xl bg-gray-300" />
      </div>
    </div>
    {/* Skeleton para FinancialChart */}
    <div className="col-span-3">
      <div className="h-96 w-full animate-pulse rounded-xl bg-gray-300" />
    </div>
  </div>
);

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Datos para el FinancialChart (puedes reemplazarlo por datos reales)
  const weekFinances = {
    "day-1": { income: 100, expense: 50, saving: 50 },
    "day-2": { income: 120, expense: 60, saving: 60 },
    "day-3": { income: 90, expense: 40, saving: 50 },
    "day-4": { income: 110, expense: 70, saving: 40 },
    "day-5": { income: 130, expense: 80, saving: 50 },
    "day-6": { income: 95, expense: 55, saving: 40 },
    "day-7": { income: 105, expense: 65, saving: 40 },
  };

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
      {/* Columna Izquierda */}
      <div className="space-y-4">
        <CardsContainer cardData={data.cards} />
        <PlanningGoalsContainer planningGoalsData={data.planning} />
      </div>

      {/* Columna Derecha */}
      <div className="col-span-2 space-y-4">
        <BalanceContainer balanceData={data.balance} />
        <div className="grid grid-cols-2 rounded-xl bg-white">
          <TransactionContainer transactionData={data.transactions} />
          <SubscriptionContainer subscriptionData={data.subscriptions} />
        </div>
      </div>

      {/* Sección de FinancialChart */}
      <div className="col-span-3">
        <FinancialChart data={weekFinances} />
      </div>
    </div>
  );
}
