import React from "react";
import { ArrowUpRight } from "lucide-react";

const GoalItem = ({ title, current, target }) => {
  const progress = (current / target) * 100;

  return (
    <div className="rounded-xl bg-white p-4 transition-shadow hover:shadow-sm">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h3 className="mb-1 font-medium text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">
            ${current.toLocaleString()} / ${target.toLocaleString()}
          </p>
        </div>
        <button className="rounded-lg p-2 transition-colors hover:bg-gray-50">
          <ArrowUpRight className="h-4 w-4 text-gray-400" />
        </button>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-indigo-600 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default GoalItem;
