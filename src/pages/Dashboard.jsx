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

// IMPORTACION DE HOOKS O UTILIDADES
import { Moon, Bell, User } from "lucide-react";

import { Menu, Search } from "lucide-react";

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

export default function Dashboard() {
  const balanceData = {
    uid: "dgq3aca41fdafe1",
    name: "Bariy Vollendito",
    photo: "https://randomuser.me/api/portraits/lego/3.jpg",
    balance: 3_000_000,
    income: 465_000,
    expense: 120_000,
    saving: 80_000,
  };

  const cardData = [
    {
      id: 1,
      type: "visa",
      balance: 3_300,
      cardNumber: "5282345678901289",
      expiryDate: "09/26",
    },
    {
      id: 2,
      type: "mastercard",
      balance: 2_000,
      cardNumber: "5282345678901289",
      expiryDate: "09/28",
    },
    {
      id: 3,
      type: "nubank",
      balance: 200_000,
      cardNumber: "5282345678901289",
      expiryDate: "09/28",
    },
  ];

  const transactions = [
    {
      id: 1,
      icon: <Music2 className="h-6 w-6 text-[#1DB954]" />,
      name: "YouTube Premium",
      date: "1 January 2025, 02:25 PM",
      amount: 796_000, // 199 USD to COP
      type: "expense",
      cardId: 1,
    },
    {
      id: 2,
      icon: <Music2 className="h-6 w-6 text-[#1DB954]" />,
      name: "Spotify Premium",
      date: "19 December 2024, 02:25 PM",
      amount: 796_000, // 199 USD to COP
      type: "expense",
      cardId: 2,
    },
    {
      id: 3,
      icon: <ArrowRightLeft className="h-6 w-6 text-[#00B9FF]" />,
      name: "Transferwise - Received",
      date: "19 December 2024, 10:15 AM",
      amount: 4800_000, // 1200 USD to COP
      type: "income",
      cardId: 3,
    },
    {
      id: 4,
      icon: <ShoppingBag className="h-6 w-6 text-[#FF0000]" />,
      name: "H&M Payment",
      date: "15 December 2024, 06:30 PM",
      amount: 8800_000, // 2200 USD to COP
      type: "expense",
      cardId: 1,
    },
    {
      id: 5,
      icon: <Apple className="h-6 w-6 text-[#424147]" />,
      name: "iPhone 12 Pro Max",
      date: "24 December 2024, 01:30 PM",
      amount: 8800_000, // 2200 USD to COP
      type: "expense",
      cardId: 2,
    },
    {
      id: 6,
      icon: <Music2 className="h-6 w-6 text-[#1DB954]" />,
      name: "Spotify Family",
      date: "25 December 2024, 02:25 PM",
      amount: 996_000, // 249 USD to COP (variedad)
      type: "expense",
      cardId: 3,
    },
    {
      id: 7,
      icon: <ArrowRightLeft className="h-6 w-6 text-[#00B9FF]" />,
      name: "Transferwise - Sent",
      date: "26 December 2024, 10:15 AM",
      amount: 4800_000, // 1200 USD to COP
      type: "expense",
      cardId: 1,
    },
    {
      id: 8,
      icon: <ShoppingBag className="h-6 w-6 text-[#FF0000]" />,
      name: "Amazon Purchase",
      date: "28 December 2024, 06:30 PM",
      amount: 2000_000, // 500 USD to COP
      type: "expense",
      cardId: 2,
    },
    {
      id: 9,
      icon: <Apple className="h-6 w-6 text-[#424147]" />,
      name: "MacBook Pro",
      date: "28 December 2024, 01:30 PM",
      amount: 10000_000, // 2500 USD to COP
      type: "expense",
      cardId: 3,
    },
    {
      id: 10,
      icon: <Music2 className="h-6 w-6 text-[#1DB954]" />,
      name: "Spotify Annual",
      date: "1 December 2024, 02:25 PM",
      amount: 3980_000, // 995 USD to COP (variedad)
      type: "expense",
      cardId: 1,
    },
    {
      id: 11,
      icon: <Coffee className="h-6 w-6 text-[#654321]" />,
      name: "Starbucks",
      date: "2 January 2025, 09:15 AM",
      amount: 20_000, // 5 USD to COP
      type: "expense",
      cardId: 2,
    },
    {
      id: 12,
      icon: <ShoppingBag className="h-6 w-6 text-[#FF0000]" />,
      name: "Zara Payment",
      date: "3 January 2025, 03:45 PM",
      amount: 350_000, // 87.5 USD to COP
      type: "expense",
      cardId: 3,
    },
    {
      id: 13,
      icon: <ArrowRightLeft className="h-6 w-6 text-[#00B9FF]" />,
      name: "PayPal - Received",
      date: "4 January 2025, 11:20 AM",
      amount: 2400_000, // 600 USD to COP
      type: "income",
      cardId: 1,
    },
    {
      id: 14,
      icon: <Gamepad className="h-6 w-6 text-[#FF4500]" />,
      name: "Steam Purchase",
      date: "5 January 2025, 05:35 PM",
      amount: 160_000, // 40 USD to COP
      type: "expense",
      cardId: 2,
    },
    {
      id: 15,
      icon: <Music2 className="h-6 w-6 text-[#1DB954]" />,
      name: "Amazon Music",
      date: "6 January 2025, 02:25 PM",
      amount: 996_000, // 249 USD to COP (variedad)
      type: "expense",
      cardId: 3,
    },
    {
      id: 16,
      icon: <ArrowRightLeft className="h-6 w-6 text-[#00B9FF]" />,
      name: "Venmo - Sent",
      date: "7 January 2025, 10:15 AM",
      amount: 1200_000, // 300 USD to COP
      type: "expense",
      cardId: 1,
    },
    {
      id: 17,
      icon: <Croissant className="h-6 w-6 text-[#FFA500]" />,
      name: "Dinner at Croissant",
      date: "8 January 2025, 08:00 PM",
      amount: 100_000, // 25 USD to COP
      type: "expense",
      cardId: 2,
    },
    {
      id: 18,
      icon: <ArrowRightLeft className="h-6 w-6 text-[#00B9FF]" />,
      name: "Bank Transfer - Received",
      date: "9 January 2025, 09:00 AM",
      amount: 4000_000, // 1000 USD to COP
      type: "income",
      cardId: 3,
    },
    {
      id: 19,
      icon: <ShoppingBag className="h-6 w-6 text-[#FF0000]" />,
      name: "Nike Purchase",
      date: "10 January 2025, 04:30 PM",
      amount: 800_000, // 200 USD to COP
      type: "expense",
      cardId: 1,
    },
    {
      id: 20,
      icon: <Projector className="h-6 w-6 text-[#FFD700]" />,
      name: "Cinema Tickets",
      date: "11 January 2025, 07:45 PM",
      amount: 50_000, // 12.5 USD to COP
      type: "expense",
      cardId: 2,
    },
    {
      id: 21,
      icon: <ArrowRightLeft className="h-6 w-6 text-[#00B9FF]" />,
      name: "Freelance Payment - Received",
      date: "12 January 2025, 11:30 AM",
      amount: 16000_000, // 4000 USD to COP
      type: "income",
      cardId: 3,
    },
    {
      id: 22,
      icon: <ShoppingBag className="h-6 w-6 text-[#FF0000]" />,
      name: "Walmart Purchase",
      date: "13 January 2025, 03:00 PM",
      amount: 400_000, // 100 USD to COP
      type: "expense",
      cardId: 1,
    },
    {
      id: 23,
      icon: <ShoppingBag className="h-6 w-6 text-[#008000]" />,
      name: "Netflix Subscription",
      date: "14 January 2025, 02:25 PM",
      amount: 64_000, // 16 USD to COP
      type: "expense",
      cardId: 2,
    },

    {
      id: 24,
      icon: <ArrowRightLeft className="h-6 w-6 text-[#00B9FF]" />,
      name: "Bank Transfer - Sent",
      date: "15 January 2025, 09:00 AM",
      amount: 2000_000, // 500 USD to COP
      type: "expense",
      cardId: 2,
    },
    {
      id: 25,
      icon: <Music2 className="h-6 w-6 text-[#1DB954]" />,
      name: "Apple Music",
      date: "16 January 2025, 02:25 PM",
      amount: 996_000, // 249 USD to COP (variedad)
      type: "expense",
      cardId: 2,
    },
    {
      id: 26,
      icon: <ArrowRightLeft className="h-6 w-6 text-[#00B9FF]" />,
      name: "Stripe Payment - Received",
      date: "17 January 2025, 09:30 AM",
      amount: 9600_000, // 2400 USD to COP
      type: "expense",
      cardId: 2,
    },
  ];

  const subscriptions = [
    {
      id: 1,
      name: "Spotify Premium",
      cost: 9.99,
      renewalDate: "2023-11-01",
      status: true,
      color: "#1DB954",
      icon: <Music2 className="h-6 w-6 text-white" />,
    },
    {
      id: 2,
      name: "YouTube Premium",
      cost: 11.99,
      renewalDate: "2023-11-05",
      status: false,
      color: "#FF0000",
      icon: <Projector className="h-6 w-6 text-white" />,
    },
    {
      id: 3,
      name: "Netflix",
      cost: 15.99,
      renewalDate: "2023-11-10",
      status: false,
      color: "#E50914",
      icon: <Projector className="h-6 w-6 text-white" />,
    },
    {
      id: 4,
      name: "Amazon Prime",
      cost: 12.99,
      renewalDate: "2023-11-15",
      status: true,
      color: "#FF9900",
      icon: <ShoppingBag className="h-6 w-6 text-white" />,
    },
    {
      id: 5,
      name: "Hulu",
      cost: 7.99,
      renewalDate: "2023-11-20",
      status: true,
      color: "#3DBB3D",
      icon: <Projector className="h-6 w-6 text-white" />,
    },
  ];

  const planningGoals = [
    {
      id: 1,
      title: "Buy a car",
      current: 25000,
      target: 47000,
      dueDate: "Dec 2024",
      image: "",
      linkGoal: "https://www.ford.com.co/performance/mustang/",
    },
    {
      id: 2,
      title: "Motorola Edge 50 Fusion",
      current: 15000,
      target: 50000,
      dueDate: "Dec 2024",
      image: "",
      linkGoal:
        "https://www.ktronix.com/celular-motorola-edge-50-fusion-256gb-verde/p/840023261879?fuente=google&medio=cpc&campaign=KT_COL_MAX_PEF_CPC_AON_CEL_TLP_Celulares_PAC&keyword=&gad_source=1&gclid=Cj0KCQiAst67BhCEARIsAKKdWOl_tbaoz1uxTmnCwQOqRzED3OVtfCmI-j-uPaY7mTysDpspkrGVEh8aAvr7EALw_wcB",
    },
  ];

  const valueSpendingStats = [
    {
      title: "Visa",
      amount: 59_000,
      percentage: 67,
      color: "#22C55E",
      incomePercentage: 21,
    },
    {
      title: "Master Card",
      amount: 120_000,
      percentage: 34,
      color: "#EAB308",
      incomePercentage: 11,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="fixed left-0 right-0 top-0 z-10 border-b bg-white/80 px-6 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="rounded-lg p-2 hover:bg-gray-100 lg:hidden">
              <Menu className="h-5 w-5 text-gray-700" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">FinBank</h1>
              <p className="text-sm text-gray-600">Dashboard Overview</p>
            </div>
          </div>

          <div className="hidden flex-1 items-center justify-center px-8 lg:flex">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions, cards, etc..."
                className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="rounded-lg p-2 text-gray-700 hover:bg-gray-100">
              <Moon className="h-5 w-5" />
            </button>
            <div className="relative">
              <button className="rounded-lg p-2 text-gray-700 hover:bg-gray-100">
                <Bell className="h-5 w-5" />
              </button>
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden flex-col text-right lg:flex">
                <span className="text-sm font-medium">Bariy Vollendito</span>
                <span className="text-xs text-gray-500">Premium Account</span>
              </div>
              <button className="group relative h-10 w-10 overflow-hidden rounded-full border-2 border-gray-200 hover:ring-2 hover:ring-blue-500">
                <img
                  src={balanceData.photo}
                  alt="Profile"
                  className="h-full w-full object-cover transition-transform group-hover:scale-110"
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

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
