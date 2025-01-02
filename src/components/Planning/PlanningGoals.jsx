import React from "react";
import GoalItem from "./GoalItem";

const PlanningGoals = ({ goals }) => {
  return (
    <div className="rounded-xl bg-gray-50 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Planning</h2>
        <button className="text-sm text-indigo-600 hover:text-indigo-700">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {goals.map((goal) => (
          <GoalItem
            key={goal.id}
            title={goal.title}
            current={goal.current}
            target={goal.target}
            link={goal.target}
          />
        ))}
      </div>
    </div>
  );
};

export default PlanningGoals;
