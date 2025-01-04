import React from "react";
import { Wallet, ArrowUpRight, ArrowDownRight, PiggyBank } from "lucide-react";

const BalanceMetric = ({ label, amount, type, className = "" }) => {
  // Seleccionar ícono según el tipo
  const iconMap = {
    wallet: <Wallet className="h-6 w-6 text-blue-500" />,
    income: <ArrowUpRight className="h-6 w-6 text-green-500" />,
    expense: <ArrowDownRight className="h-6 w-6 text-red-500" />,
    saving: <PiggyBank className="h-6 w-6 text-yellow-500" />,
  };

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

  return (
    <div
      className={`flex flex-col items-center rounded-lg bg-white p-4 ${className}`}
    >
      <div className="flex flex-col items-start rounded-2xl bg-white p-4 shadow-sm">
        <div className="rounded-lg p-2">
          <Wallet className="h-5 w-5" />
        </div>
        <p className="mt-3 text-sm font-medium text-gray-500">{label}</p>
        <p className="mt-1 text-2xl font-semibold text-blue-600">
          {formattedAmount}
        </p>
      </div>
    </div>
  );
};

export default BalanceMetric;
