import React from "react";
import { ChevronDown } from "lucide-react";

//IMPORTACION DE COMPONENTES
const CircularProgress = ({
  percentage,
  color,
  size = 60,
  strokeWidth = 8,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} className="-rotate-90">
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#f3f4f6"
        strokeWidth={strokeWidth}
        fill="none"
      />
      {/* Progress circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="transition-all duration-500 ease-out"
      />
    </svg>
  );
};

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

const SpendingStats = () => {
  const period = "1 month";
  const stats = [
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
