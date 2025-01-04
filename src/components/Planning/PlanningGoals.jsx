import React from "react";
import GoalItem from "./GoalItem";

const PlanningGoals = ({ goals }) => {
  return (
    <div className="h-full rounded-xl bg-white p-6 shadow-lg">
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
            linkGoal={goal.linkGoal}
          />
        ))}
      </div>
    </div>
  );
};

export default PlanningGoals;
