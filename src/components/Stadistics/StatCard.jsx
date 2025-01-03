import React from "react";

//IMPORTACION DE COMPONENTES
import CircularProgress from "./CircularProgress";

const StatCard = ({ title, amount, percentage, color, incomePercentage }) => {
  return (
    <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full`}
            style={{ backgroundColor: color }}
          />
          <span className="text-sm text-gray-600">{title}</span>
        </div>
        <div className="text-2xl font-semibold">${amount}</div>
        <div className="text-sm text-gray-500">
          {incomePercentage}% of income
        </div>
        <div className="text-sm text-gray-500">
          {100 - incomePercentage}% of Expense
        </div>
      </div>
      <div className="relative">
        <CircularProgress
          percentage={percentage}
          color={color}
          size={60}
          strokeWidth={8}
        />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-sm font-medium">
          {percentage}%
        </span>
      </div>
    </div>
  );
};

export default StatCard;
