// IMPORTACION DE LIBRERIAS
import React, { useState } from "react";

// IMPORTACION DE COMPONENTES
import NavBar from "../components/NavBar";
import TransactionHistory from "../components/Transaction/TransactionHistory";
import ActivityChart from "../components/ActivityChart";
import SpendingStats from "../components/Stadistics/SpendingStats";
import UsageStats from "../components/CreditCard/UsageStats";
import Card from "../components/CreditCard/Card";
import PlanningGoals from "../components/Planning/PlanningGoals";
import TotalBalance from "../components/Balance/TotalBalance";
import ExpensesProgress from "../components/Balance/ExpensesProgress";
import ContendCards from "../components/CreditCard/ContendCards";

// IMPORTACION DE HOOKS O UTILIDADES
import { test_data } from "../utils/dataJson";
import { Music2, ArrowRightLeft, ShoppingBag, Apple } from "lucide-react";

export default function Home() {
  const balanceData = {
    balance: 32000.0,
    income: 3670.0,
    expenses: 1230.0,
    creditLimit: 15000.0,
  };

  const transactions = [
    {
      id: 1,
      icon: <Music2 className="h-6 w-6 text-[#1DB954]" />,
      name: "YouTube Premium",
      date: "1 January 2025, 02:25 PM",
      amount: "796000", // 199 USD to COP
      type: "expenses",
    },
    {
      id: 2,
      icon: <Music2 className="h-6 w-6 text-[#1DB954]" />,
      name: "Spotify Premium",
      date: "19 December 2024, 02:25 PM",
      amount: "796000", // 199 USD to COP
      type: "expenses",
    },
    {
      id: 3,
      icon: <ArrowRightLeft className="h-6 w-6 text-[#00B9FF]" />,
      name: "Transferwise - Received",
      date: "19 December 2024, 10:15 AM",
      amount: "4800000", // 1200 USD to COP
      type: "income",
    },
    {
      id: 4,
      icon: <ShoppingBag className="h-6 w-6 text-[#FF0000]" />,
      name: "H&M Payment",
      date: "15 December 2024, 06:30 PM",
      amount: "8800000", // 2200 USD to COP
      type: "expenses",
    },
    {
      id: 5,
      icon: <Apple className="h-6 w-6 text-[#424147]" />,
      name: "iPhone 12 Pro Max",
      date: "24 December 2024, 01:30 PM",
      amount: "8800000", // 2200 USD to COP
      type: "expenses",
    },
    {
      id: 6,
      icon: <Music2 className="h-6 w-6 text-[#1DB954]" />,
      name: "Spotify Family",
      date: "25 December 2024, 02:25 PM",
      amount: "996000", // 249 USD to COP (variedad)
      type: "expenses",
    },
    {
      id: 7,
      icon: <ArrowRightLeft className="h-6 w-6 text-[#00B9FF]" />,
      name: "Transferwise - Sent",
      date: "26 December 2024, 10:15 AM",
      amount: "4800000", // 1200 USD to COP
      type: "expenses",
    },
    {
      id: 8,
      icon: <ShoppingBag className="h-6 w-6 text-[#FF0000]" />,
      name: "Amazon Purchase",
      date: "28 December 2024, 06:30 PM",
      amount: "2000000", // 500 USD to COP
      type: "expenses",
    },
    {
      id: 9,
      icon: <Apple className="h-6 w-6 text-[#424147]" />,
      name: "MacBook Pro",
      date: "28 December 2024, 01:30 PM",
      amount: "10000000", // 2500 USD to COP
      type: "expenses",
    },
    {
      id: 10,
      icon: <Music2 className="h-6 w-6 text-[#1DB954]" />,
      name: "Spotify Annual",
      date: "1 December 2024, 02:25 PM",
      amount: "3980000", // 995 USD to COP (variedad)
      type: "expenses",
    },
  ];

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
    currentValue: 2,
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
      balance: 80_000.0,
      cardNumber: "5282345678901289",
      expiryDate: "09/28",
    },
    {
      type: "nubank",
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
        <div className="col-span-12 rounded-xl border bg-gray-100 shadow-md">
          <TotalBalance {...balanceData}></TotalBalance>
        </div>

        <div className="col-span-12 w-full rounded-xl border bg-gray-100 p-6 shadow-md">
          <ContendCards cardData={cardData} />
        </div>

        <div className="col-span-6 w-full rounded-xl border bg-gray-100 shadow-md">
          <TransactionHistory dataTransaction={transactions} />
        </div>

        <div className="col-span-6 w-full rounded-xl border bg-gray-100 shadow-md">
          <SpendingStats stats={spendingStats} />
        </div>

        <div className="col-span-6 w-full rounded-xl border bg-gray-100 shadow-md">
          <ActivityChart dataTransaction={transactions} />
        </div>

        <div className="col-span-6 w-full rounded-xl border bg-gray-100 shadow-md">
          {/* {<UsageStats totalExpenses={524.0} />} */}

          <PlanningGoals goals={planningGoals} />
        </div>
      </div>
    </main>
  );
}
