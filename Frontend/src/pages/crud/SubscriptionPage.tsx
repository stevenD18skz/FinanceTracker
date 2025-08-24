import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { differenceInDays } from "date-fns";

// Componentes internos
import SubscriptionStats from "../../components/subscriptionsPage/SubscriptionStats.tsx";
import SubscriptionItem from "../../components/subscriptionsPage/SubscriptionItem.tsx";
import SubscriptionDetail from "../../components/subscriptionsPage/SubscriptionDetail.jsx";
import CreateEditSubscriptionModal from "../../components/subscriptionsPage/CreateEditSubscriptionModal.tsx";

// Componentes UI
import Loading from "../../components/ui/Loading.jsx";
import EmptyResults from "../../components/ui/EmptyResults.jsx";
import ModalGeneric from "../../components/ui/ModalGeneric.tsx";
import PageHeader from "../../components/ui/HeaderControllers.tsx";

// Puertos
import {
  createSubscription,
  getSubscriptions,
  updateSubscription,
  deleteSubscription,
} from "../../lib/SubscriptionPort.js";
import { paymentHistoryData } from "../../utils/Data.js";

// Tipos
import { Subscription } from "../../types/subscription.ts";
import { PaymentHistory } from "../../types/subscription.ts";

const SubscriptionPage = () => {
  const [view, setView] = useState("grid");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("progress");
  const [searchQuery, setSearchQuery] = useState("");
  const [allItems, setAllItems] = useState<Subscription[]>([]);
  const paymentHistory: PaymentHistory[] = paymentHistoryData;

  // Estados para el manejo de carga
  const [loading, setLoading] = useState(false);

  // CRUD
  const [selectedSubscription, setSelectedSubscription] =
    useState<Subscription | null>(null);
  const [showModalCreateUpdate, setShowModalCreateUpdate] = useState(false);
  const [subscriptionToUpdate, setSubscriptionToUpdate] =
    useState<Subscription | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [subscriptionToDelete, setSubscriptionToDelete] =
    useState<Subscription | null>(null);

  // Función para obtener metas
  const fetchSubscriptions = useCallback(async () => {
    setLoading(true);

    try {
      const subscriptions = await getSubscriptions();
      setAllItems(subscriptions);
    } catch (err) {
      console.error("Error al obtener las metas:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // useEffect con dependencias adecuadas
  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  // Lógica para filtrar y ordenar las metas
  const processedSubscriptions: Subscription[] = allItems;

  // Manejar la acción de ver detalles de la meta
  const handleViewSubscription = useCallback((subscription: Subscription) => {
    setSelectedSubscription(subscription);
  }, []);

  // Manejar la acción de actualizar la meta
  const handleUpdateSubscription = useCallback((subscription: Subscription) => {
    setSubscriptionToUpdate(subscription);
    setShowModalCreateUpdate(true);
  }, []);

  // Manejar la acción de eliminar la meta
  const handleDeleteSubscription = useCallback((subscription: Subscription) => {
    setSubscriptionToDelete(subscription);
    setShowDeleteModal(true);
  }, []);

  // Manejo del submit para crear o actualizar una meta
  const handleSubmit = useCallback(
    async (
      subscription: Omit<
        Subscription,
        "id" | "createdAt" | "updatedAt" | "current"
      >,
    ) => {
      setLoading(true);
      try {
        if (subscriptionToUpdate) {
          await updateSubscription(subscriptionToUpdate.id, subscription);
        } else {
          await createSubscription(subscription);
        }
        // Actualizar el estado con la nueva lista de metas
        await fetchSubscriptions();
        setShowModalCreateUpdate(false);
      } catch (err) {
        console.error("Error al guardar la meta:", err);
      } finally {
        setLoading(false);
      }
    },
    [subscriptionToUpdate, fetchSubscriptions],
  );

  // Manejo de la eliminación de una meta
  const confirmDelete = useCallback(async () => {
    if (!subscriptionToDelete) return;
    setLoading(true);

    try {
      await deleteSubscription(subscriptionToDelete.id);
      // Actualizar el estado con la nueva lista de metas
      await fetchSubscriptions();
      setShowDeleteModal(false);
      setSubscriptionToDelete(null);
    } catch (err) {
      console.error("Error al eliminar la meta:", err);
    } finally {
      setLoading(false);
    }
  }, [subscriptionToDelete, fetchSubscriptions]);

  return (
    <div className="min-h-screen   p-8">
      {/** Stats Summary */}

      <SubscriptionStats
        subscriptions={allItems}
        paymentHistory={paymentHistory}
      />

      {/** Header and Controllers */}
      <PageHeader
        title="Subscriptions"
        itemCount={processedSubscriptions.length}
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
          setSubscriptionToUpdate(null);
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
          {processedSubscriptions.map((subscription) => (
            <SubscriptionItem
              key={subscription.id}
              subscription={subscription}
            />
          ))}
        </div>

        {selectedSubscription && (
          <SubscriptionDetail
            subscription={selectedSubscription}
            onClose={() => setSelectedSubscription(null)}
          />
        )}
      </div>

      {/** Loading */}
      <Loading loading={loading}></Loading>

      {/** Empty results */}
      <EmptyResults
        items={processedSubscriptions}
        loading={loading}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onClickButton={() => {
          setSubscriptionToUpdate(null);
          setShowModalCreateUpdate(true);
        }}
      />

      {/** Modal para Crear/Editar */}
      <CreateEditSubscriptionModal
        isOpen={showModalCreateUpdate}
        onClose={() => setShowModalCreateUpdate(false)}
        onSubmit={handleSubmit}
        initialData={subscriptionToUpdate}
      />

      {/** Modal para Eliminar */}
      <ModalGeneric
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Subscription"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Are you sure you want to delete
            <strong> {subscriptionToDelete?.name} </strong>
            subscription? This action cannot be undone.
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
