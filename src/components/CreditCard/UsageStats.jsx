import React from "react";

function UsageStats({
  totalExpenses,
  categories = [
    { name: "Online", percentage: 45 },
    { name: "Game online", percentage: 30 },
    { name: "Other", percentage: 25 },
  ],
}) {
  return (
    <div className="mt-4 rounded-xl bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Average usage</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>
      </div>

      <div className="relative">
        <svg className="h-48 w-full" viewBox="0 0 100 50">
          {/* Background arc */}
          <path
            d="M5 45 A 40 40 0 0 1 95 45"
            fill="none"
            stroke="#f3f4f6"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Progress arc - using multiple segments for different colors */}
          <path
            d="M5 45 A 40 40 0 0 1 50 5"
            fill="none"
            stroke="#374151"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M50 5 A 40 40 0 0 1 75 15"
            fill="none"
            stroke="#9ca3af"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M75 15 A 40 40 0 0 1 95 45"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="10"
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[-30%] transform text-center">
          <p className="mb-1 text-sm text-gray-500">Total expenses</p>
          <p className="text-2xl font-bold">${totalExpenses}</p>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        {categories.map((category, index) => (
          <div key={category.name} className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                index === 0
                  ? "bg-gray-800"
                  : index === 1
                    ? "bg-gray-400"
                    : "bg-gray-200"
              }`}
            />
            <span className="text-sm text-gray-600">{category.name}</span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-gray-400">
        Keep getting the latest updates about your monthly expenses here
      </p>
    </div>
  );
}

export default UsageStats;
