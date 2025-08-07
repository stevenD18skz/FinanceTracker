import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { differenceInDays } from "date-fns";
import { useLocation, useNavigate } from "react-router-dom";

// Componentes internos
import PlanningGoalStats from "../../components/PlanningGoalPage/PlanningGoalStats.tsx";
import GoalItem from "../../components/PlanningGoalPage/GoalItem.jsx";
import GoalDetails from "../../components/PlanningGoalPage/GoalDetails.jsx";
import CreateEditGoalModalProps from "../../components/PlanningGoalPage/CreateEditGoalModalProps.tsx";

// Componentes UI
import Loading from "../../components/ui/Loading.jsx";
import EmptyResults from "../../components/ui/EmptyResults.jsx";
import ModalGeneric from "../../components/ui/ModalGeneric.tsx";
import PageHeader from "../../components/ui/HeaderControllers.tsx";

// Puertos
import {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
} from "../../utils/ports/PlanningGoalPort.tsx";

// Tipos
import { Goal } from "../../types/goal.ts";

const PlanningGoalsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const editGoalId = queryParams.get("edit");

  const [view, setView] = useState("grid");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("progress");
  const [searchQuery, setSearchQuery] = useState("");
  const [allItems, setAllItems] = useState<Goal[]>([]);

  // Estados para el manejo de carga
  const [loading, setLoading] = useState(false);

  // CRUD
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [showModalCreateUpdate, setShowModalCreateUpdate] = useState(false);
  const [goalToUpdate, setGoalToUpdate] = useState<Goal | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState<Goal | null>(null);

  // Función para obtener metas
  const fetchGoals = useCallback(async () => {
    setLoading(true);
    try {
      const goals = await getGoals();
      setAllItems(goals);
    } catch (err) {
      console.error("Error al obtener las metas:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // useEffect con dependencias adecuadas
  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  useEffect(() => {
    if (editGoalId) {
      const goalToEdit = allItems.find(
        (goal) => goal.id === Number(editGoalId),
      );
      if (goalToEdit) {
        setGoalToUpdate(goalToEdit);
        setShowModalCreateUpdate(true);
      }
    }
  }, [editGoalId, allItems]);

  const handleCloseModal = () => {
    setShowModalCreateUpdate(false);
    setGoalToUpdate(null);
    navigate("/goals", { replace: true });
  };

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

    try {
      await deleteGoal(goalToDelete.id);
      // Actualizar el estado con la nueva lista de metas
      await fetchGoals();
      setShowDeleteModal(false);
      setGoalToDelete(null);
    } catch (err) {
      console.error("Error al eliminar la meta:", err);
    } finally {
      setLoading(false);
    }
  }, [goalToDelete, fetchGoals]);

  return (
    <div className="min-h-screen space-y-8 bg-slate-200 p-8">
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
      <Loading loading={loading}></Loading>

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

      <div className="absolue">
        <CreateEditGoalModalProps
          isOpen={showModalCreateUpdate}
          onClose={() => setShowModalCreateUpdate(false)}
          onSubmit={handleSubmit}
          initialData={goalToUpdate}
        />

        {/** Modal para Eliminar */}
        <ModalGeneric
          isOpen={showDeleteModal}
          onClose={handleCloseModal}
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

      {/** Modal para Crear/Editar */}
    </div>
  );
};

export default PlanningGoalsPage;
