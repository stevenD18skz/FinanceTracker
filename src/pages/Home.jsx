// IMPORTACION DE LIBRERIAS
import React, { useState } from "react";

// IMPORTACION DE COMPONENTES
import NavBar from "../components/NavBar";
import TransactionHistory from "../components/TransactionHistory";
import ActivityChart from "../components/ActivityChart";
import SpendingStats from "../components/Stadistics/SpendingStats";
import UsageStats from "../components/CreditCard/UsageStats";
import Card from "../components/CreditCard/Card";
import PlanningGoals from "../components/Planning/PlanningGoals";
import TotalBalance from "../components/Balance/TotalBalance";
import ExpensesProgress from "../components/Balance/ExpensesProgress";

import { PlusCircle, ChevronDown } from "lucide-react";

// IMPORTACION DE HOOKS O UTILIDADES
import { test_data } from "../utils/dataJson";

export default function Home() {
  const balanceData = {
    balance: 32000.0,
    income: 3670.0,
    expenses: 1230.0,
    creditLimit: 15000.0,
  };
  
  const expensesData = {
    expenses: 85.44,
    budget: 100,
  };

  const spendingStats = [
    {
      title: "Transactions",
      amount: 546,
      percentage: 67,
      color: "#22C55E",
      incomePercentage: 21,
    },
    {
      title: "Entertainment",
      amount: 245,
      percentage: 34,
      color: "#EAB308",
      incomePercentage: 11,
    },
  ];

  const activityData = {
    data: [1.2, 1.8, 2.5, 2.0, 3.5, 2.8, 3.2],
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    currentValue: 2500.15,
    currentDay: "Wednesday, 14 July",
  };

  const cardData = [
    {
      type: "visa",
      balance: 3390.0,
      cardNumber: "5282345678901289",
      expiryDate: "09/26",
    },
    {
      type: "mastercard",
      balance: 200_000.0,
      cardNumber: "5282345678901289",
      expiryDate: "09/28",
    },
  ];

  const planningGoals = [
    {
      id: "1",
      title: "Buy a car",
      current: 25000,
      target: 47000,
    },
    {
      id: "2",
      title: "College",
      current: 15000,
      target: 50000,
    },
  ];

  return (
    <main className="min-h-screen bg-gray-200">
      <NavBar />
      <div className="container mx-auto grid grid-cols-12 gap-6 p-6">
        <div className="col-span-12 w-full rounded-xl border bg-gray-100 p-6 shadow-md">
          <ExpensesProgress {...expensesData} />
          <TotalBalance {...balanceData} />
        </div>

        <div className="col-span-12 w-full rounded-xl border bg-gray-100 p-6 shadow-md">
          <h3 className="mb-2 text-xl font-semibold text-gray-800">Cards</h3>

          <div className="flex w-full space-x-6">
            {cardData.map((card) => (
              <Card key={card.cardNumber} {...card} />
            ))}

            <button className="flex w-full items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
              <div className="flex flex-col items-center text-gray-400 hover:text-gray-600">
                <PlusCircle className="mb-1 h-6 w-6" />
                <span className="text-sm">Add</span>
              </div>
            </button>
          </div>
        </div>

        <div className="col-span-6 w-full rounded-xl border bg-gray-100 shadow-md">
          <TransactionHistory />
        </div>

        <div className="col-span-6 w-full rounded-xl border bg-gray-100 shadow-md">
          <SpendingStats stats={spendingStats} />
        </div>

        <div className="col-span-6 w-full rounded-xl border bg-gray-100 shadow-md">
          <ActivityChart {...activityData} />
        </div>

        <div className="col-span-6 w-full rounded-xl border bg-gray-100 shadow-md">
          {/* {<UsageStats totalExpenses={524.0} />} */}

          <PlanningGoals goals={planningGoals} />
        </div>
      </div>
    </main>
  );
}
