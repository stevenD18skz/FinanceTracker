import * as React from "react";
import { useState, useEffect, useCallback } from "react";

// Componentes internos
import TransactionStats from "../../components/TransactionPage/TransactionStats.tsx";
import TransactionItem from "../../components/TransactionPage/TransactionItem.jsx";
import TransactionDetails from "../../components/TransactionPage/TransactionDetails.jsx";
import TransactionModal from "../../components/TransactionPage/TransactionModal.tsx";

// Componentes UI
import Loading from "../../components/ui/Loading.jsx";
import EmptyResults from "../../components/ui/EmptyResults.jsx";
import ModalGeneric from "../../components/ui/ModalGeneric.tsx";
import PageHeader from "../../components/ui/HeaderControllers.tsx";

// Puertos
import {
  createTransaction,
  getAllTransactions,
  updateTransaction,
  deleteTransaction,
} from "../../utils/ports/TransactionPort.js";

// Tipos
import { Transaction } from "../../types/transaction.ts";

const TransactionPage = () => {
  const [view, setView] = useState("grid");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("progress");
  const [searchQuery, setSearchQuery] = useState("");
  const [allItems, setAllItems] = useState<Transaction[]>([]);

  // Estados para el manejo de carga
  const [loading, setLoading] = useState(false);

  // CRUD
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const [showModalCreateUpdate, setShowModalCreateUpdate] = useState(false);
  const [transactionToUpdate, setTransactionToUpdate] =
    useState<Transaction | null>(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [transactionToDelete, setTransactionToDelete] =
    useState<Transaction | null>(null);

  // Función para obtener metas
  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const transactions = await getAllTransactions();
      setAllItems(transactions);
    } catch (err) {
      console.error("Error al obtener las metas:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // useEffect con dependencias adecuadas
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Lógica para filtrar y ordenar las metas
  const processedTransactions: Transaction[] = allItems;

  // Manejar la acción de ver detalles de la meta
  const handleViewTransaction = useCallback((transaction: Transaction) => {
    setSelectedTransaction(transaction);
  }, []);

  // Manejar la acción de actualizar la meta
  const handleUpdateTransaction = useCallback((transaction: Transaction) => {
    setTransactionToUpdate(transaction);
    setShowModalCreateUpdate(true);
  }, []);

  // Manejar la acción de eliminar la meta
  const handleDeleteTransaction = useCallback((transaction: Transaction) => {
    setTransactionToDelete(transaction);
    setShowDeleteModal(true);
  }, []);

  // Manejo del submit para crear o actualizar una meta
  const handleSubmit = useCallback(
    async (transaction: Omit<Transaction, "id">) => {
      setLoading(true);
      try {
        if (transactionToUpdate) {
          await updateTransaction(transactionToUpdate.id, transaction);
        } else {
          await createTransaction(transaction);
        }
        // Actualizar el estado con la nueva lista de metas
        await fetchTransactions();
        setShowModalCreateUpdate(false);
      } catch (err) {
        console.error("Error al guardar la meta:", err);
      } finally {
        setLoading(false);
      }
    },
    [transactionToUpdate, fetchTransactions],
  );

  // Manejo de la eliminación de una meta
  const confirmDelete = useCallback(async () => {
    if (!transactionToDelete) return;
    setLoading(true);

    try {
      await deleteTransaction(transactionToDelete.id);
      // Actualizar el estado con la nueva lista de metas
      await fetchTransactions();
      setShowDeleteModal(false);
      setTransactionToDelete(null);
    } catch (err) {
      console.error("Error al eliminar la meta:", err);
    } finally {
      setLoading(false);
    }
  }, [transactionToDelete, fetchTransactions]);

  return (
    <div className="min-h-screen bg-slate-200 p-8">
      {/** Stats Summary */}
      <TransactionStats transactions={allItems} />

      {/** Header and Controllers */}
      <PageHeader
        title="Transactions"
        itemCount={processedTransactions.length}
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
          setTransactionToUpdate(null);
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
          {processedTransactions.map((transaction) => (
            <TransactionItem
              {...transaction}
              onView={handleViewTransaction}
              onUpdate={handleUpdateTransaction}
              onDelete={handleDeleteTransaction}
            />
          ))}
        </div>

        {selectedTransaction && (
          <TransactionDetails
            transaction={selectedTransaction}
            onClose={() => setSelectedTransaction(null)}
          />
        )}
      </div>

      {/** Loading */}
      <Loading loading={loading}></Loading>

      {/** Empty results */}
      <EmptyResults
        items={processedTransactions}
        loading={loading}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onClickButton={() => {
          setTransactionToUpdate(null);
          setShowModalCreateUpdate(true);
        }}
      />

      {/** Modal para Crear/Editar */}
      <TransactionModal
        isOpen={showModalCreateUpdate}
        onClose={() => setShowModalCreateUpdate(false)}
        onSubmit={handleSubmit}
        initialData={transactionToUpdate}
      />

      {/** Modal para Eliminar */}
      <ModalGeneric
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Transaction"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Are you sure you want to delete transaction? This action cannot be
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

export default TransactionPage;
