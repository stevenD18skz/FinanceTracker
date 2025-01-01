import React from "react";

const ExpensesProgress = ({ expenses, budget }) => {
  const percentage = Math.min((expenses / budget) * 100, 100);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Define segments colors
  const segments = [
    { color: "#EF4444", percentage: 33 }, // Red
    { color: "#3B82F6", percentage: 33 }, // Blue
    { color: "#F59E0B", percentage: 34 }, // Yellow
  ];

  return (
    <div className="rounded-xl bg-white p-6">
      <div className="relative mx-auto h-32 w-32">
        {segments.map((segment, index) => {
          const segmentStart = segments
            .slice(0, index)
            .reduce((acc, curr) => acc + curr.percentage, 0);
          const dashArray = `${(segment.percentage / 100) * circumference} ${circumference}`;
          const rotate = `rotate(${segmentStart * 3.6}deg)`;

          return (
            <svg
              key={index}
              className="absolute inset-0 origin-center transform"
              style={{ transform: rotate }}
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth="8"
                strokeDasharray={dashArray}
                className="transition-all duration-500"
                transform="rotate(-90 50 50)"
              />
            </svg>
          );
        })}

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold">${expenses.toFixed(2)}</span>
          <span className="text-xs text-gray-500">of ${budget}</span>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 grid grid-cols-3 gap-2">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#EF4444]" />
          <span className="text-xs text-gray-600">Food</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#3B82F6]" />
          <span className="text-xs text-gray-600">Bills</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#F59E0B]" />
          <span className="text-xs text-gray-600">Other</span>
        </div>
      </div>
    </div>
  );
};

export default ExpensesProgress;
