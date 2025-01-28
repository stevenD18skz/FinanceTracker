import { planningGoalsData } from "../utils/Data";

import {
  CheckCircle,
  Edit2,
  Eye,
  PackageOpen,
  PlusCircle,
  Trash2,
  X,
} from "lucide-react";

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
  Search,
} from "lucide-react";
import ModalGeneric from "../components/ui/ModalGeneric";

interface Goal {
  id: string;
  title: string;
  current: number;
  target: number;
  dueDate?: string;
  linkGoal?: string;
  category: string;
  description: string;
  status: "active" | "completed" | "inactive";
  priority: "high" | "medium" | "low";
  createdAt: string;
  updatedAt: string;
  milestones: Array<{
    title: string;
    completed: boolean;
  }>;
}

const GoalDetails = ({ goal, onClose }) => {
  const progress = (goal.current / goal.target) * 100;

  const getProgressColor = (progress) => {
    if (progress >= 100) return "bg-green-500";
    if (progress >= 75) return "bg-blue-500";
    if (progress >= 50) return "bg-yellow-500";
    return "bg-indigo-500";
  };

  return (
    <div className="rounded-xl bg-red-400 p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
            🎯
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {goal.title}
            </h2>
            <p className="text-sm text-gray-500">{goal.category}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-gray-400" />
            <span className="text-lg font-medium text-gray-700">
              ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
            </span>
          </div>
          {goal.dueDate && (
            <span className="text-sm text-gray-500">Due {goal.dueDate}</span>
          )}
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-gray-100">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${getProgressColor(
              progress,
            )}`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>

      <div className="mb-8">
        <h3 className="mb-4 text-lg font-medium text-gray-800">Description</h3>
        <p className="text-gray-600">{goal.description}</p>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-medium text-gray-800">Milestones</h3>
        <div className="space-y-3">
          {/*goal.milestones.map((milestone, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={milestone.completed}
                  className="h-5 w-5 rounded border-gray-300 text-indigo-600"
                  readOnly
                />
                <span
                  className={`${
                    milestone.completed
                      ? "text-gray-400 line-through"
                      : "text-gray-700"
                  }`}
                >
                  {milestone.title}
                </span>
              </div>
              {milestone.completed && (
                <Trophy className="h-5 w-5 text-yellow-500" />
              )}
            </div>
          ))*/}
        </div>
      </div>
    </div>
  );
};

const GoalItem = ({
  title,
  current,
  target,
  dueDate,
  linkGoal,
  onEdit,
  onDelete,
  onComplete,
  onView,
  onAddAmount,
}) => {
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

        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onView();
            }}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
            title="View Details"
          >
            <Eye className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
            title="Edit"
          >
            <Edit2 className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddAmount();
            }}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
            title="View Details"
          >
            <PlusCircle className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onComplete();
            }}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-green-600"
            title="Mark as Complete"
          >
            <CheckCircle className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-red-600"
            title="Delete"
          >
            <Trash2 className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => {
              if (linkGoal) {
                window.open(linkGoal, "_blank"); // Abre el enlace en una nueva pestaña
              } else {
                console.log("El enlace no está definido.");
              }
            }}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-red-600"
            title="Delete"
          >
            <ArrowUpRight className="h-5 w-5" />
          </button>
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

const PlanningGoalsPage = () => {
  const [view, setView] = useState("grid");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("progress");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState<Goal | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  const confirmDelete = () => {
    if (goalToDelete) {
      //hacer la accion de eliminar
      setShowDeleteModal(false);
      setGoalToDelete(null);
    }
  };

  const processedGoals = planningGoalsData
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

      <div className="flex gap-6">
        <div
          className={`grid flex-1 gap-4 space-y-4 ${
            view === "grid"
              ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {processedGoals.map((goal) => (
            <GoalItem
              key={goal.id}
              title={goal.title}
              current={goal.current}
              target={goal.target}
              dueDate={goal.dueDate}
              linkGoal={goal.linkGoal}
              onEdit={() => {}}
              onDelete={() => {}}
              onComplete={() => {}}
              onView={() => setSelectedGoal(goal)}
            />
          ))}
        </div>
        {selectedGoal && (
          <div className="w-96 shrink-0">
            <GoalDetails
              goal={selectedGoal}
              onClose={() => setSelectedGoal(null)}
            />
          </div>
        )}
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

      <ModalGeneric
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Goal"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Are you sure you want to delete this goal? This action cannot be
            undone.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </ModalGeneric>
    </div>
  );
};

export default PlanningGoalsPage;
