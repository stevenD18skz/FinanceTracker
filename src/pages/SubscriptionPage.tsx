import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { differenceInDays } from "date-fns";

// Componentes internos
import SubscriptionStats from "../components/subscriptionsPage/SubscriptionStats.tsx";
import SubscriptionItem from "../components/subscriptionsPage/SubscriptionItem.tsx";
import SubscriptionDetail from "../components/subscriptionsPage/SubscriptionDetail.jsx";
import CreateEditSubscriptionModal from "../components/subscriptionsPage/CreateEditSubscriptionModal.tsx";

// Componentes UI
import Loading from "../components/ui/Loading.jsx";
import EmptyResults from "../components/ui/EmptyResults";
import ModalGeneric from "../components/ui/ModalGeneric";
import PageHeader from "../components/ui/HeaderControllers";

// Puertos
import {
  createSubscription,
  getSubscriptions,
  updateSubscription,
  deleteSubscription,
} from "../utils/ports/Subscription.js";
import { paymentHistoryData } from "../utils/Data.jsx";

// Tipos
import { Subscription } from "../types/subscription.ts";
import { PaymentHistory } from "../types/subscription.ts";

const SubscriptionPage = () => {
  const [view, setView] = useState("grid");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("progress");
  const [searchQuery, setSearchQuery] = useState("");
  const [allItems, setAllItems] = useState<Subscription[]>([]);

  // Estados para el manejo de carga
  const [loading, setLoading] = useState(false);

  // CRUD
  const [selectedGoal, setSelectedGoal] = useState<Subscription | null>(null);
  const [showModalCreateUpdate, setShowModalCreateUpdate] = useState(false);
  const [goalToUpdate, setGoalToUpdate] = useState<Subscription | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState<Subscription | null>(null);

  // Función para obtener metas
  const fetchGoals = useCallback(async () => {
    setLoading(true);

    try {
      const goals = await getSubscriptions();
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

  // Lógica para filtrar y ordenar las metas
  const processedGoals: Subscription[] = allItems;

  // Funciones inline extraídas y memorizadas con useCallback

  // Manejar la acción de ver detalles de la meta
  const handleViewGoal = useCallback((goal: Subscription) => {
    setSelectedGoal(goal);
  }, []);

  // Manejar la acción de actualizar la meta
  const handleUpdateGoal = useCallback((goal: Subscription) => {
    setGoalToUpdate(goal);
    setShowModalCreateUpdate(true);
  }, []);

  // Manejar la acción de eliminar la meta
  const handleDeleteGoal = useCallback((goal: Subscription) => {
    setGoalToDelete(goal);
    setShowDeleteModal(true);
  }, []);

  // Manejo del submit para crear o actualizar una meta
  const handleSubmit = useCallback(
    async (
      goal: Omit<Subscription, "id" | "createdAt" | "updatedAt" | "current">,
    ) => {
      setLoading(true);
      try {
        if (goalToUpdate) {
          await updateSubscription(goalToUpdate.id, goal);
        } else {
          await createSubscription(goal);
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
      await deleteSubscription(goalToDelete.id);
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
    <div className="min-h-screen bg-slate-200 p-8">
      {/** Stats Summary */}

      <SubscriptionStats
        subscriptions={allItems}
        paymentHistory={paymentHistoryData}
      />

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
            <SubscriptionItem subscription={goal} />
          ))}
        </div>

        {selectedGoal && (
          <SubscriptionDetail
            subscription={selectedGoal}
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

      {/** Modal para Crear/Editar */}
      <CreateEditSubscriptionModal
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
            <strong> {goalToDelete?.name} </strong>
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

export default SubscriptionPage;
