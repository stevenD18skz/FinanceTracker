import React from "react";
import BalanceMetric from "./BalanceMetric";

import { ArrowUpRight, ArrowDownRight, Wallet, Receipt } from "lucide-react";

const TotalBalance = ({ balance, income, expense, saving }) => {
  const data = [
    { title: "Employee", amount: "1,000.00", percentage: 40, color: "#f472b6" },
    { title: "Bills", amount: "1,000.00", percentage: 40, color: "#a78bfa" },
    { title: "Other", amount: "456.00", percentage: 20, color: "#93c5fd" },
  ];

  return (
    <div className="grid grid-cols-2 rounded-xl bg-white p-4">
      {/* Total Income Card */}
      <div className="border-b-2 border-r-2 bg-white p-6">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <p className="mb-1 text-gray-500">Total Income</p>
            <h2 className="text-3xl font-bold">$10,456.00</h2>
          </div>
          <div className="rounded-xl bg-blue-100 p-3">
            <Wallet className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <div className="flex items-center text-emerald-500">
          <ArrowUpRight className="mr-1 h-4 w-4" />
          <span className="font-medium">+12.1 %</span>
          <span className="ml-1 text-sm text-gray-500">from last weeks</span>
        </div>
      </div>

      {/* Spending Limit Card */}
      <div className="border-b-2 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-500">Spending limit</p>
          <select className="rounded-md border px-2 py-1 text-sm text-gray-500">
            <option>Weeks</option>
          </select>
        </div>
        <div className="mb-4">
          <div className="mb-2 flex justify-between">
            <span className="text-2xl font-bold">$2,456.00</span>
            <span className="text-gray-500">used from $10,000.00</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-blue-600"
              style={{ width: "24.56%" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Total Expense Card */}
      <div className="border-r-2 bg-white p-6">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <p className="mb-1 text-gray-500">Total Expense</p>
            <h2 className="text-3xl font-bold">$2,456.00</h2>
          </div>
          <div className="rounded-xl bg-red-100 p-3">
            <Receipt className="h-6 w-6 text-red-600" />
          </div>
        </div>
        <div className="flex items-center text-red-500">
          <ArrowDownRight className="mr-1 h-4 w-4" />
          <span className="font-medium">-2.5 %</span>
          <span className="ml-1 text-sm text-gray-500">from last weeks</span>
        </div>
      </div>

      {/* Expenses Analytics Card */}
      <div className="bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-500">Expenses Analytics</p>
          <select className="rounded-md border px-2 py-1 text-sm text-gray-500">
            <option>Weeks</option>
          </select>
        </div>

        <div className="mb-4">
          <div className="relative h-2 w-full rounded-full bg-gray-200">
            {data.map((item, index) => (
              <div
                key={index}
                className="absolute top-0 h-full rounded-full"
                style={{
                  backgroundColor: item.color,
                  width: `${item.percentage}%`,
                  left: `${data
                    .slice(0, index)
                    .reduce((acc, curr) => acc + curr.percentage, 0)}%`,
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-gray-600">{item.title}</span>
              <span className="text-sm font-semibold text-gray-800">
                ${item.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TotalBalance;
