import React from "react";
import StatCard from "./StatCard";
import { PlusCircle, ChevronDown } from "lucide-react";

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
        <button className="flex items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-4 transition-colors hover:border-gray-300">
          <div className="flex flex-col items-center text-gray-400 hover:text-gray-600">
            <PlusCircle className="mb-1 h-6 w-6" />
            <span className="text-sm">Add</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SpendingStats;
