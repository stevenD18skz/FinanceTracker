import React from "react";
import { Music2, ArrowRightLeft, ShoppingBag } from "lucide-react";

const transactions = [
  {
    id: 2,
    icon: <Music2 className="h-6 w-6 text-[#1DB954]" />,
    name: "Spotify Premium",
    date: "19 December 2020, 02:25 PM",
    amount: "-$199.00",
    type: "debit",
  },
  {
    id: 3,
    icon: <ArrowRightLeft className="h-6 w-6 text-[#00B9FF]" />,
    name: "Transferwise - Received",
    date: "19 December 2020, 10:15 AM",
    amount: "+$1,200.00",
    type: "credit",
  },
  {
    id: 4,
    icon: <ShoppingBag className="h-6 w-6 text-[#FF0000]" />,
    name: "H&M Payment",
    date: "15 December 2020, 06:30 PM",
    amount: "-$2,200.00",
    type: "debit",
  },
];

const TransactionHistory = () => {
  return (
    <div className="mx-auto h-full rounded-xl bg-white p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Recent Transactions
        </h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Last 7 Days</span>
        </div>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between rounded-lg p-3 transition-colors duration-150 hover:bg-gray-50"
          >
            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                {transaction.icon}
              </div>
              <div>
                <p className="font-medium text-gray-800">{transaction.name}</p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
            </div>
            <span
              className={`font-semibold ${
                transaction.type === "credit"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {transaction.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
