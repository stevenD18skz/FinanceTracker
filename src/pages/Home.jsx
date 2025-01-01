// IMPORTACION DE LIBRERIAS
import React, { useState } from "react";

// IMPORTACION DE COMPONENTES
import NavBar from "../components/NavBar";
import TransactionHistory from "../components/TransactionHistory";
import Modal from "../components/Modal";
import WishList from "./WishList";
import ActivityChart from "../components/ActivityChart";
import SpendingStats from "../components/Stadistics/SpendingStats";
import UsageStats from "../components/CreditCard/UsageStats";
import Card from "../components/CreditCard/Card";

// IMPORTACION DE HOOKS O UTILIDADES
import { test_data } from "../utils/dataJson";

export default function Home() {
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

  const cardData = {
    type: "mastercard",
    balance: 3190.0,
    cardNumber: "5282345678901289",
    expiryDate: "09/25",
  };

  return (
    <main className="min-h-screen bg-gray-100 text-gray-800">
      <NavBar />
      <div className="container mx-auto grid grid-cols-12 gap-6 p-6">
        <div className="col-span-12 w-full rounded-xl border border-gray-300 bg-gray-500 p-6 shadow-md">
          <Card {...cardData} />
        </div>
        <div className="col-span-6 w-full rounded-xl border border-gray-300 bg-gray-500 p-6 shadow-md">
          <SpendingStats stats={spendingStats} />
        </div>
        <div className="col-span-6 w-full rounded-xl border border-gray-300 bg-gray-500 p-6 shadow-md">
          <ActivityChart {...activityData} />
        </div>
        <div className="col-span-6 w-full rounded-xl border border-gray-300 bg-gray-500 p-6 shadow-md">
          <TransactionHistory />
        </div>
        <div className="col-span-6 w-full rounded-xl border border-gray-300 bg-gray-500 p-6 shadow-md">
          <UsageStats totalExpenses={524.0} />
        </div>
      </div>
    </main>
  );
}
