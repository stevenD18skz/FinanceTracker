import React from "react";
import {
  ArrowUpRight,
  TrendingUp,
  Target,
  Award,
  Trophy,
  Rocket,
  Timer,
} from "lucide-react";

const GoalItem = ({ title, current, target, dueDate, linkGoal }) => {
  const progress = (current / target) * 100;
  const remaining = target - current;
  const isCompleted = progress >= 100;

  const getProgressColor = (progress) => {
    if (progress >= 100) return "bg-green-500";
    if (progress >= 75) return "bg-blue-500";
    if (progress >= 50) return "bg-yellow-500";
    return "bg-indigo-500";
  };

  const getMotivationalIcon = (progress) => {
    if (progress >= 100) return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (progress >= 75) return <Award className="h-5 w-5 text-blue-500" />;
    if (progress >= 50) return <Rocket className="h-5 w-5 text-purple-500" />;
    if (progress >= 25) return <Target className="h-5 w-5 text-indigo-500" />;
    return <Timer className="h-5 w-5 text-gray-500" />;
  };

  const getMotivationalMessage = (progress) => {
    if (progress >= 100) return "Amazing achievement! 🎉";
    if (progress >= 75) return "Almost there! 🚀";
    if (progress >= 50) return "Halfway there! 💪";
    if (progress >= 25) return "Great start! 👏";
    return "Let's get started! 🎯";
  };

  return (
    <div className="group relative rounded-xl bg-white p-5 transition-all hover:shadow-lg">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <h3 className="font-medium text-gray-800">{title}</h3>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-gray-400" />
            <p className="text-sm text-gray-500">
              <span className="font-medium text-gray-700">
                ${current.toLocaleString()}
              </span>
              {" / "}
              <span className="text-gray-500">${target.toLocaleString()}</span>
            </p>
          </div>
        </div>
        <a
          href={linkGoal}
          target="_blank"
          className="rounded-lg p-2 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          aria-label="View goal details"
        >
          <ArrowUpRight className="h-4 w-4 text-gray-400" />
        </a>
      </div>

      <div className="mb-2">
        <div className="mb-1 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            {getMotivationalIcon(progress)}
            <span className="font-medium text-gray-700">
              {progress.toFixed(1)}% Complete
            </span>
          </div>
          {dueDate && <span className="text-gray-500">Due {dueDate}</span>}
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${getProgressColor(
              progress,
            )}`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">
          {isCompleted ? (
            <span className="text-green-600">Goal Completed! 🎉</span>
          ) : (
            <>${remaining.toLocaleString()} to go</>
          )}
        </span>
        <span
          className={`font-medium ${
            isCompleted ? "text-green-600" : "text-gray-600"
          }`}
        >
          {getMotivationalMessage(progress)}
        </span>
      </div>
    </div>
  );
};

export default GoalItem;
