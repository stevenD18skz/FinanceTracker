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
import {
  Music2,
  ArrowRightLeft,
  ShoppingBag,
  Apple,
  Coffee,
  Croissant,
  Projector,
  Gamepad,
} from "lucide-react";

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
    {
      id: 11,
      icon: <Coffee className="h-6 w-6 text-[#654321]" />,
      name: "Starbucks",
      date: "2 January 2025, 09:15 AM",
      amount: "20000", // 5 USD to COP
      type: "expenses",
    },
    {
      id: 12,
      icon: <ShoppingBag className="h-6 w-6 text-[#FF0000]" />,
      name: "Zara Payment",
      date: "3 January 2025, 03:45 PM",
      amount: "350000", // 87.5 USD to COP
      type: "expenses",
    },
    {
      id: 13,
      icon: <ArrowRightLeft className="h-6 w-6 text-[#00B9FF]" />,
      name: "PayPal - Received",
      date: "4 January 2025, 11:20 AM",
      amount: "2400000", // 600 USD to COP
      type: "income",
    },
    {
      id: 14,
      icon: <Gamepad className="h-6 w-6 text-[#FF4500]" />,
      name: "Steam Purchase",
      date: "5 January 2025, 05:35 PM",
      amount: "160000", // 40 USD to COP
      type: "expenses",
    },
    {
      id: 15,
      icon: <Music2 className="h-6 w-6 text-[#1DB954]" />,
      name: "Amazon Music",
      date: "6 January 2025, 02:25 PM",
      amount: "996000", // 249 USD to COP (variedad)
      type: "expenses",
    },
    {
      id: 16,
      icon: <ArrowRightLeft className="h-6 w-6 text-[#00B9FF]" />,
      name: "Venmo - Sent",
      date: "7 January 2025, 10:15 AM",
      amount: "1200000", // 300 USD to COP
      type: "expenses",
    },
    {
      id: 17,
      icon: <Croissant className="h-6 w-6 text-[#FFA500]" />,
      name: "Dinner at Croissant",
      date: "8 January 2025, 08:00 PM",
      amount: "100000", // 25 USD to COP
      type: "expenses",
    },
    {
      id: 18,
      icon: <ArrowRightLeft className="h-6 w-6 text-[#00B9FF]" />,
      name: "Bank Transfer - Received",
      date: "9 January 2025, 09:00 AM",
      amount: "4000000", // 1000 USD to COP
      type: "income",
    },
    {
      id: 19,
      icon: <ShoppingBag className="h-6 w-6 text-[#FF0000]" />,
      name: "Nike Purchase",
      date: "10 January 2025, 04:30 PM",
      amount: "800000", // 200 USD to COP
      type: "expenses",
    },
    {
      id: 20,
      icon: <Projector className="h-6 w-6 text-[#FFD700]" />,
      name: "Cinema Tickets",
      date: "11 January 2025, 07:45 PM",
      amount: "50000", // 12.5 USD to COP
      type: "expenses",
    },
    {
      id: 21,
      icon: <ArrowRightLeft className="h-6 w-6 text-[#00B9FF]" />,
      name: "Freelance Payment - Received",
      date: "12 January 2025, 11:30 AM",
      amount: "16000000", // 4000 USD to COP
      type: "income",
    },
    {
      id: 22,
      icon: <ShoppingBag className="h-6 w-6 text-[#FF0000]" />,
      name: "Walmart Purchase",
      date: "13 January 2025, 03:00 PM",
      amount: "400000", // 100 USD to COP
      type: "expenses",
    },
    {
      id: 23,
      icon: <ShoppingBag className="h-6 w-6 text-[#008000]" />,
      name: "Netflix Subscription",
      date: "14 January 2025, 02:25 PM",
      amount: "64000", // 16 USD to COP
      type: "expenses",
    },
    {
      id: 24,
      icon: <ArrowRightLeft className="h-6 w-6 text-[#00B9FF]" />,
      name: "Bank Transfer - Sent",
      date: "15 January 2025, 09:00 AM",
      amount: "2000000", // 500 USD to COP
      type: "expenses",
    },
    {
      id: 25,
      icon: <Music2 className="h-6 w-6 text-[#1DB954]" />,
      name: "Apple Music",
      date: "16 January 2025, 02:25 PM",
      amount: "996000", // 249 USD to COP (variedad)
      type: "expenses",
    },
    {
      id: 26,
      icon: <ArrowRightLeft className="h-6 w-6 text-[#00B9FF]" />,
      name: "Stripe Payment - Received",
      date: "17 January 2025, 09:30 AM",
      amount: "9600000", // 2400 USD to COP
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
      link: "https://www.ktronix.com/celular-motorola-edge-50-fusion-256gb-verde/p/840023261879?fuente=google&medio=cpc&campaign=KT_COL_MAX_PEF_CPC_AON_CEL_TLP_Celulares_PAC&keyword=&gad_source=1&gclid=Cj0KCQiA7NO7BhDsARIsADg_hIbjZEsiOHtoghzOG300x2F5G-42ThEA_RpaUBWnaYsfo7sGUywo62MaAkxpEALw_wcB",
    },
    {
      id: "2",
      title: "College",
      current: 15000,
      target: 50000,
      link: "",
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
