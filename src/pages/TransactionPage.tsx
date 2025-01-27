import { planningGoalsData } from "../utils/Data";

import { PackageOpen } from "lucide-react";

import React, { useState, useEffect } from "react";
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
  Calendar,
  TrendingDown,
  Search,
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
  const [view, setView] = useState("grid");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("progress");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const processedGoals = goals
    .filter((goal) => {
      const progress = (goal.current / goal.target) * 100;
      const matchesFilter =
        filter === "all" ||
        (filter === "completed" && progress >= 100) ||
        (filter === "active" && progress < 100);

      const matchesSearch = goal.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      const getProgress = (goal) => (goal.current / goal.target) * 100;

      switch (sortBy) {
        case "progress":
          return getProgress(b) - getProgress(a);
        case "dueDate":
          return new Date(a.dueDate) - new Date(b.dueDate);
        case "amount":
          return b.target - a.target;
        default:
          return 0;
      }
    });

  useEffect(() => {
    localStorage.setItem("planningGoalsView", view);
  }, [view]);

  return (
    <div className="w-full rounded-3xl bg-gradient-to-b from-white to-gray-50/50 p-8 shadow-xl ring-1 ring-gray-100/50 backdrop-blur-lg transition-all hover:shadow-2xl">
      <div className="mb-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold text-gray-800">
              Planning Goals
            </h2>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
              {processedGoals.length} {filter === "all" ? "total" : filter}
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
                title="Grid view"
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
                title="List view"
              >
                <ListFilter className="h-4 w-4" />
              </button>
            </div>
            <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <Plus className="h-4 w-4" />
              New Goal
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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

          <div className="flex items-center gap-4">
            <div
              className={`relative transition-all ${
                isSearchFocused ? "w-64" : "w-48"
              }`}
            >
              <input
                type="text"
                placeholder="Search goals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full rounded-lg border-gray-200 bg-white py-2 pl-10 pr-4 text-sm placeholder-gray-400 shadow-sm transition-all focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border-gray-200 bg-white py-2 pl-3 pr-10 text-sm text-gray-600 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            >
              <option value="progress">Sort by Progress</option>
              <option value="dueDate">Sort by Due Date</option>
              <option value="amount">Sort by Amount</option>
            </select>
          </div>
        </div>
      </div>

      <div
        className={`grid gap-4 ${
          view === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
        }`}
      >
        {processedGoals.map((goal) => (
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

      {processedGoals.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl bg-gray-50 py-12">
          {searchQuery ? (
            <>
              <p className="text-gray-500">
                No goals found matching "{searchQuery}"
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                Clear search
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <PackageOpen className="h-24 w-24 text-gray-500" />
              <p className="text-gray-500">
                No goals found for the selected filter.
              </p>
              <button className="mt-4 flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700">
                Create your first goal
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

const TransactionPage = () => {
  return <PlanningGoals goals={planningGoalsData} />;
};

export default TransactionPage;
