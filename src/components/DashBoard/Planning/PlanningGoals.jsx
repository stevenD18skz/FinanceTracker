import React, { useState } from "react";
import {
  ArrowUpRight,
  TrendingUp,
  Target,
  Award,
  Trophy,
  Rocket,
  Timer,
  MoreHorizontal,
  Plus,
  ChevronRight,
  Layout,
  ListFilter,
} from "lucide-react";

const GoalItem = ({
  title,
  current,
  target,
  dueDate,
  linkGoal,
  onEdit,
  onAddAmount,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              🚗
            </div>
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

        {/* Menu de puntos suspensivos */}
        <div className="relative">
          <button
            className="rounded-lg p-2 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Open menu"
          >
            <MoreHorizontal className="h-5 w-5 text-gray-400" />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white ring-1 ring-black ring-opacity-5">
              <ul className="py-1">
                <li>
                  <a
                    href={linkGoal}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    View Details{" "}
                    <ArrowUpRight className="h-4 w-4 text-gray-400" />
                  </a>
                </li>
                <li>
                  <button
                    onClick={onEdit}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Edit Item
                  </button>
                </li>
                <li>
                  <button
                    onClick={onAddAmount}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Add Amount
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
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

const PlanningGoals = ({ goals }) => {
  const [view, setView] = useState("grid"); // 'grid' or 'list'
  const [filter, setFilter] = useState("all"); // 'all', 'active', 'completed'

  const filteredGoals = goals.filter((goal) => {
    const progress = (goal.current / goal.target) * 100;
    if (filter === "completed") return progress >= 100;
    if (filter === "active") return progress < 100;
    return true;
  });

  return (
    <div className="w-full max-w-4xl rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-100/50 backdrop-blur-lg transition-all hover:shadow-2xl">
      <div className="mb-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold text-gray-800">
              Planning Goals
            </h2>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
              {filteredGoals.length} {filter === "all" ? "total" : filter}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg bg-gray-100 p-1">
              <button
                onClick={() => setView("grid")}
                className={`rounded-md p-2 transition-all ${
                  view === "grid"
                    ? "bg-white text-gray-800 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <Layout className="h-4 w-4" />
              </button>
              <button
                onClick={() => setView("list")}
                className={`rounded-md p-2 transition-all ${
                  view === "list"
                    ? "bg-white text-gray-800 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <ListFilter className="h-4 w-4" />
              </button>
            </div>
            <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-indigo-700">
              <Plus className="h-4 w-4" />
              New Goal
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {["all", "active", "completed"].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                filter === filterType
                  ? "bg-gray-100 text-gray-800"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div
        className={`grid gap-4 ${view === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}
      >
        {filteredGoals.map((goal) => (
          <GoalItem
            key={goal.id}
            title={goal.title}
            current={goal.current}
            target={goal.target}
            linkGoal={goal.linkGoal}
            dueDate={goal.dueDate}
          />
        ))}
      </div>

      {filteredGoals.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl bg-gray-50 py-12">
          <p className="text-gray-500">
            No goals found for the selected filter.
          </p>
          <button className="mt-4 flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700">
            Create your first goal
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PlanningGoals;
