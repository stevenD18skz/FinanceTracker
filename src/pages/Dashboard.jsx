// IMPORTACION DE LIBRERIAS
import React from "react";

// IMPORTACION DE COMPONENTES
import ContendCards from "../components/DashBoard/CreditCard/ContendCards";

import TotalBalance from "../components/DashBoard/Balance/TotalBalance";

import PlanningGoals from "../components/DashBoard/Planning/PlanningGoals";

import TransactionHistory from "../components/DashBoard/Transaction/TransactionHistory";

import ContendSubscription from "../components/DashBoard/Subscriptions/ContendSubscription";

//IMPORTACION DE MOCKS
import {
  balanceData,
  cardData,
  transactions,
  subscriptions,
  planningGoals as df,
} from "../utils/Data";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 gap-6 bg-slate-100 px-12 pt-4 lg:grid-cols-3">
      {/* Left Column */}
      <div className="max-w-md space-y-6">
        <ContendCards cardData={cardData} />
        <PlanningGoals goals={df} />
      </div>

      {/* Middle and Right Columns */}
      <div className="col-span-2 space-y-6">
        <TotalBalance {...balanceData} />

        <div className="grid grid-cols-2 gap-4 rounded-xl bg-white">
          <TransactionHistory dataTransaction={transactions} />
          <ContendSubscription subscriptionData={subscriptions} />
        </div>
      </div>
    </div>
  );
}
