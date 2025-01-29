// React y hooks
import * as React from "react";
import { useState } from "react";
import { differenceInDays } from "date-fns";

// Componentes internos
import PlanningGoalStats from "../components/PlanningPage/PlanningGoalStats";
import GoalItem from "../components/PlanningPage/GoalItem";
import GoalDetails from "../components/PlanningPage/GoalDetails";
import CreateEditGoalModalProps from "../components/PlanningPage/CreateEditGoalModalProps";
import ModalGeneric from "../components/ui/ModalGeneric";

//Componente UI
import EmptyResults from "../components/ui/EmptyResults";

// Utilidades y datos

// Puertos
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
import PageHeader from "../components/ui/HeaderControllers";

const PlanningGoalsPage = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("progress");
  const [searchQuery, setSearchQuery] = useState("");

  // CRUD
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  const [showModalCreateUpdate, setShowModalCreateUpdate] = useState(false);
  const [goalToUpdate, setGoalToUpdate] = useState<Goal | null>(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState<Goal | null>(null);

  //Functions
  const processedGoals: Goal[] = getGoals()
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

  const handleSubmit = (
    goal: Omit<Goal, "id" | "createdAt" | "updatedAt" | "current">,
  ) => {
    if (goalToUpdate) {
      updateGoal(goalToUpdate?.id, goal);
    } else {
      createGoal(goal);
    }
    setShowModalCreateUpdate(false);
  };

  const confirmDelete = () => {
    if (goalToDelete) {
      deleteGoal(goalToDelete.id);
      setShowDeleteModal(false);
      setGoalToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 p-8">
      {/**Stats Summary */}
      <PlanningGoalStats goals={getGoals()} />

      {/**Header and Controllers */}
      <PageHeader
        title="Goals"
        itemCount={processedGoals.length}
        filterOptions={["all", "active", "completed"]}
        selectedFilter={filter}
        setFilter={setFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
        view={view}
        setView={setView}
        onNewItem={() => {
          setGoalToUpdate(null);
          setShowModalCreateUpdate(true);
        }}
      />

      {/**View Items */}
      <div className="mb-8 flex gap-6">
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
              onAddAmount={() => {}}
              onComplete={() => {}}
              onView={() => setSelectedGoal(goal)}
              onUpdate={() => {
                setGoalToUpdate(goal);
                setShowModalCreateUpdate(true);
              }}
              onDelete={() => {
                setShowDeleteModal(true);
                setGoalToDelete(goal);
              }}
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
      <EmptyResults
        items={processedGoals}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onClickButton={() => {
          setGoalToUpdate(null);
          setShowModalCreateUpdate(true);
        }}
      />

      {/* Modal to Create and Update */}
      <CreateEditGoalModalProps
        isOpen={showModalCreateUpdate}
        onClose={() => setShowModalCreateUpdate(false)}
        onSubmit={handleSubmit}
        initialData={goalToUpdate}
      />

      {/* Modal to Delete */}
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
    </div>
  );
};

export default PlanningGoalsPage;
