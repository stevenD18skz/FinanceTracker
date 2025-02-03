import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { differenceInDays } from "date-fns";

// Componentes internos
import PlanningGoalStats from "../components/PlanningPage/PlanningGoalStats";
import GoalItem from "../components/PlanningPage/GoalItem";
import GoalDetails from "../components/PlanningPage/GoalDetails";
import CreateEditGoalModalProps from "../components/PlanningPage/CreateEditGoalModalProps";
import ModalGeneric from "../components/ui/ModalGeneric";
import PageHeader from "../components/ui/HeaderControllers";

// Componente UI
import EmptyResults from "../components/ui/EmptyResults";

// Puertos (se asume que estas funciones retornan promesas)
import {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
} from "../utils/ports/PlanningPort.tsx";

// Tipos
import { Goal } from "../types/goal";

/**
 * TODO:
 * fallback
 * skeletons
 * revisar ux
 */

const PlanningGoalsPage = () => {
  const [view, setView] = useState("grid");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("progress");
  const [searchQuery, setSearchQuery] = useState("");
  const [allItems, setAllItems] = useState<Goal[]>([]);

  // Estados para el manejo de errores y carga
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // CRUD
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [showModalCreateUpdate, setShowModalCreateUpdate] = useState(false);
  const [goalToUpdate, setGoalToUpdate] = useState<Goal | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState<Goal | null>(null);

  // Función para obtener metas
  const fetchGoals = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const goals = await getGoals();
      setAllItems(goals);
    } catch (err) {
      console.error("Error al obtener las metas:", err);
      setError("Error al cargar las metas.");
    } finally {
      setLoading(false);
    }
  }, []);

  // useEffect con dependencias adecuadas
  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  // Lógica para filtrar y ordenar las metas
  const processedGoals: Goal[] = allItems
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
      const getProgress = (goal: Goal) => (goal.current / goal.target) * 100;

      switch (sortBy) {
        case "progress":
          return getProgress(b) - getProgress(a);
        case "dueDate":
          return differenceInDays(new Date(a.dueDate), new Date(b.dueDate));
        case "amount":
          return b.target - a.target;
        default:
          return 0;
      }
    });

  // Funciones inline extraídas y memorizadas con useCallback

  // Manejar la acción de ver detalles de la meta
  const handleViewGoal = useCallback((goal: Goal) => {
    setSelectedGoal(goal);
  }, []);

  // Manejar la acción de actualizar la meta
  const handleUpdateGoal = useCallback((goal: Goal) => {
    setGoalToUpdate(goal);
    setShowModalCreateUpdate(true);
  }, []);

  // Manejar la acción de eliminar la meta
  const handleDeleteGoal = useCallback((goal: Goal) => {
    setGoalToDelete(goal);
    setShowDeleteModal(true);
  }, []);

  // Manejo del submit para crear o actualizar una meta
  const handleSubmit = useCallback(
    async (goal: Omit<Goal, "id" | "createdAt" | "updatedAt" | "current">) => {
      setLoading(true);
      setError(null);
      try {
        if (goalToUpdate) {
          await updateGoal(goalToUpdate.id, goal);
        } else {
          await createGoal(goal);
        }
        // Actualizar el estado con la nueva lista de metas
        await fetchGoals();
        setShowModalCreateUpdate(false);
      } catch (err) {
        console.error("Error al guardar la meta:", err);
        setError("Error al guardar la meta.");
      } finally {
        setLoading(false);
      }
    },
    [goalToUpdate, fetchGoals],
  );

  // Manejo de la eliminación de una meta
  const confirmDelete = useCallback(async () => {
    if (!goalToDelete) return;
    setLoading(true);
    setError(null);
    try {
      await deleteGoal(goalToDelete.id);
      // Actualizar el estado con la nueva lista de metas
      await fetchGoals();
      setShowDeleteModal(false);
      setGoalToDelete(null);
    } catch (err) {
      console.error("Error al eliminar la meta:", err);
      setError("Error al eliminar la meta.");
    } finally {
      setLoading(false);
    }
  }, [goalToDelete, fetchGoals]);

  return (
    <div className="min-h-screen space-y-8 bg-slate-200 p-8">
      {/** Mensajes de carga o error */}
      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/** Stats Summary */}
      <PlanningGoalStats goals={allItems} />

      {/** Header and Controllers */}
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

      {/** View Items */}
      <div className="flex gap-4">
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
              // Uso de funciones memorizadas en lugar de inline
              onView={() => handleViewGoal(goal)}
              onUpdate={() => handleUpdateGoal(goal)}
              onDelete={() => handleDeleteGoal(goal)}
            />
          ))}
        </div>

        {selectedGoal && (
          <GoalDetails
            goal={selectedGoal}
            onClose={() => setSelectedGoal(null)}
          />
        )}
      </div>

      {/** Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center rounded-2xl bg-gray-50 py-12">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 animate-bounce rounded-full bg-blue-500"></div>
            <div className="h-4 w-4 animate-bounce rounded-full bg-blue-500 delay-150"></div>
            <div className="h-4 w-4 animate-bounce rounded-full bg-blue-500 delay-300"></div>
          </div>
          <p className="mt-4 text-sm font-medium text-gray-600">Cargando...</p>
        </div>
      )}

      {/** Empty results */}
      <EmptyResults
        items={processedGoals}
        loading={loading}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onClickButton={() => {
          setGoalToUpdate(null);
          setShowModalCreateUpdate(true);
        }}
      />

      {/** Modal para Crear/Editar */}
      <CreateEditGoalModalProps
        isOpen={showModalCreateUpdate}
        onClose={() => setShowModalCreateUpdate(false)}
        onSubmit={handleSubmit}
        initialData={goalToUpdate}
      />

      {/** Modal para Eliminar */}
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
