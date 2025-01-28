// React y hooks
import * as React from "react";
import { useState, useEffect } from "react";
import { differenceInDays } from "date-fns";

// Componentes internos
import GoalItem from "../components/PlanningPage/GoalItem";
import GoalDetails from "../components/PlanningPage/GoalDetails";
import ModalGeneric from "../components/ui/ModalGeneric";
import CreateGoalModal from "../components/PlanningPage/CreateGoalModal";

// Utilidades y datos
import { planningGoalsData } from "../utils/Data";
import {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
} from "../utils/ports/PlanningPort";

// Tipos
import { Goal } from "../types/goal"; // Nuevo import

// Iconos de Lucide React (agrupados por funcionalidad o categoría)
import {
  Plus,
  ChevronRight,
  Layout,
  ListFilter,
  Search,
  PackageOpen,
} from "lucide-react";

const PlanningGoalsPage = () => {
  const [view, setView] = useState("grid");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("progress");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState<Goal | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  const confirmDelete = () => {
    if (goalToDelete) {
      //hacer la accion de eliminar
      deleteGoal(goalToDelete.id);
      setShowDeleteModal(false);
      setGoalToDelete(null);
    }
  };

  const handleCreateGoal = (
    newGoal: Omit<Goal, "id" | "createdAt" | "updatedAt" | "current">,
  ) => {
    // Here you would typically make an API call to create the goal
    const goalFinal = {
      ...newGoal,
      id: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
      current: 0,
    };
    console.log("New goal:", goalFinal);
    createGoal(goalFinal);
    setShowCreateModal(false);
  };

  const processedGoals = getGoals()
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
          //return new Date(a.dueDate) - new Date(b.dueDate);
          return differenceInDays(new Date(a.dueDate), new Date(b.dueDate));
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
    <div className="min-h-screen bg-slate-200 p-8">
      {/**Stats Summary */}

      {/**Header and Controllers */}
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
            <button
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => setShowCreateModal(true)}
            >
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

      {/**View Items */}
      <div className="flex gap-6">
        <div
          className={`grid flex-1 gap-3 ${
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
              onAddAmount={() => {}}
              onDelete={() => {
                setShowDeleteModal(true);
                setGoalToDelete(goal);
              }}
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

      {/**Empty results */}
      {processedGoals.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl bg-gray-50 py-12">
          {searchQuery ? (
            <>
              <PackageOpen className="h-24 w-24 text-gray-500" />
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
              <button
                className="mt-4 flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                onClick={() => setShowCreateModal(true)}
              >
                Create your first goal
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      )}

      {/**Modal to Eliminate */}
      <ModalGeneric
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Goal"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Are you sure you want to delete
            <strong> {goalToDelete?.title} </strong>
            goal? This action cannot be undone.
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

      {/* Create Goal Modal */}
      <CreateGoalModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateGoal}
      />
    </div>
  );
};

export default PlanningGoalsPage;
