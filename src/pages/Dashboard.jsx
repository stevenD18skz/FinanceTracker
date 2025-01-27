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
  transactionsData,
  subscriptionsData,
  planningGoalsData,
} from "../utils/Data";

export default function Dashboard() {
  return (
    <div className="grid min-h-screen grid-cols-1 gap-4 bg-slate-600 px-12 pt-4 lg:grid-cols-3">
      {/* Left Column */}
      <div className="space-y-4">
        <ContendCards cardData={cardData} />
        <PlanningGoals goals={planningGoalsData} />
      </div>

      {/* Middle and Right Columns */}
      <div className="col-span-2 space-y-4">
        <TotalBalance {...balanceData} />

        <div className="grid grid-cols-2 rounded-xl bg-white">
          <TransactionHistory dataTransaction={transactionsData} />
          <ContendSubscription subscriptionData={subscriptionsData} />
        </div>
      </div>
    </div>
  );
}
