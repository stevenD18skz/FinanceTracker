import React from "react";
import { PlusCircle, ChevronDown } from "lucide-react";

//IMPORTACION DE COMPONENTES
import StatCard from "./StatCard";

const SpendingStats = ({ period = "1 month", stats }) => {
  return (
    <div className="h-full rounded-xl bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          Spending Statistics
        </h3>
        <button className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800">
          {period}
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default SpendingStats;
