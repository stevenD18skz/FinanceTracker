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

  return (
    <div
      className={`flex flex-col items-center rounded-lg bg-white p-4 ${className}`}
    >
      {/* Icon */}
      <div className="mb-2 flex items-center justify-center">
        <div className="rounded-full p-2">
          <Wallet className="h-6 w-6 text-blue-500" />
        </div>
      </div>

      {/* Label */}
      <p className="mb-1 text-sm text-gray-500">{label}</p>

      {/* Amount */}
      <p className="text-xl font-semibold text-blue-600">${amount}</p>
    </div>
  );
};

export default BalanceMetric;
