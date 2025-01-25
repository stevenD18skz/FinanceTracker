// IMPORTACION DE LIBRERIAS
import React, { useState } from "react";

// IMPORTACION DE COMPONENTES
import TotalBalance from "../components/Balance/TotalBalance";

import ContendCards from "../components/CreditCard/ContendCards";

import TransactionHistory from "../components/Transaction/TransactionHistory";

import ContendSubscription from "../components/Subscriptions/ContendSubscription";

import ActivityChart from "../components/Stadistics/ActivityChart";

import PlanningGoals from "../components/Planning/PlanningGoals";

//REVIEW
import SpendingStats from "../components/Stadistics/SpendingStats";

import {
  balanceData,
  cardData,
  transactions,
  subscriptions,
  planningGoals,
  valueSpendingStats,
} from "../utils/Data";

export default function Dashboard() {
  console.log(transactions);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 pt-24 lg:px-6">
        {/* Welcome Section */}
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white lg:p-8">
          <h2 className="text-2xl font-bold lg:text-3xl">
            Welcome back, Bariy! 👋
          </h2>
          <p className="mt-2 text-blue-100">
            Here's what's happening with your finances today.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Total Balance - Full Width */}
          <div className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md lg:col-span-12">
            <TotalBalance {...balanceData} />
          </div>

          {/* Cards Section - Full Width */}
          <div className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md lg:col-span-12">
            <ContendCards cardData={cardData} />
          </div>

          {/* Transaction History - Half Width */}
          <div className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md lg:col-span-6">
            <TransactionHistory dataTransaction={transactions} />
          </div>

          {/* Subscriptions - Half Width */}
          <div className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md lg:col-span-6">
            <ContendSubscription subscriptionData={subscriptions} />
          </div>

          {/* Activity Chart - Half Width */}
          <div className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md lg:col-span-6">
            <ActivityChart dataTransaction={transactions} />
          </div>

          {/* Planning Goals - Half Width */}
          <div className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md lg:col-span-6">
            <PlanningGoals goals={planningGoals} />
          </div>
        </div>
      </main>
    </div>
  );
}
