import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

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
} from "../../lib/TransactionPort.js";

// Tipos
import { Transaction } from "../../types/transaction.ts";

const TransactionPage = () => {
  // --- Global State & Params ---
  const [searchParams, setSearchParams] = useSearchParams();
  const [allItems, setAllItems] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  // Local UI State
  const [view, setView] = useState("grid");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("progress");
  const [searchQuery, setSearchQuery] = useState("");

  // --- Derived State from URL ---
  const modalType = searchParams.get("modal");
  const activeId = searchParams.get("id");

  const activeTransaction = useMemo(() => {
    if (!activeId) return null;
    return allItems.find((t) => String(t.id) === activeId) || null;
  }, [allItems, activeId]);

  const isCreateMode = modalType === "create";
  const isEditMode = modalType === "edit";
  const isDeleteMode = modalType === "delete";
  const isDetailsMode = modalType === "details";

  const showCreateUpdateModal = isCreateMode || (isEditMode && !!activeTransaction);
  const showDeleteModal = isDeleteMode && !!activeTransaction;
  const showDetailsModal = isDetailsMode && !!activeTransaction;

  // --- Handlers: Data Fetching ---
  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const transactions = await getAllTransactions();
      setAllItems(transactions);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // --- Handlers: URL Management ---
  const updateParams = useCallback((newParams: Record<string, string | null>) => {
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      Object.entries(newParams).forEach(([key, value]) => {
        if (value === null) {
          p.delete(key);
        } else {
          p.set(key, value);
        }
      });
      return p;
    });
  }, [setSearchParams]);

  const closeModal = useCallback(() => {
    updateParams({ modal: null, id: null });
  }, [updateParams]);

  const openCreateModal = useCallback(() => {
    updateParams({ modal: "create", id: null });
  }, [updateParams]);

  const openEditModal = useCallback((id: number | string) => {
    updateParams({ modal: "edit", id: String(id) });
  }, [updateParams]);

  const openDeleteModal = useCallback((id: number | string) => {
    updateParams({ modal: "delete", id: String(id) });
  }, [updateParams]);

  const openDetailsModal = useCallback((id: number | string) => {
    updateParams({ modal: "details", id: String(id) });
  }, [updateParams]);

  // --- Handlers: Actions ---
  const handleSubmit = useCallback(
    async (transactionData: Omit<Transaction, "id">) => {
      setLoading(true);
      try {
        if (isEditMode && activeTransaction) {
          await updateTransaction(activeTransaction.id, transactionData);
        } else {
          await createTransaction(transactionData);
        }
        await fetchTransactions();
        closeModal();
      } catch (err) {
        console.error("Error saving transaction:", err);
      } finally {
        setLoading(false);
      }
    },
    [isEditMode, activeTransaction, fetchTransactions, closeModal]
  );

  const confirmDelete = useCallback(async () => {
    if (!activeTransaction) return;
    setLoading(true);
    try {
      await deleteTransaction(activeTransaction.id);
      await fetchTransactions();
      closeModal();
    } catch (err) {
      console.error("Error deleting transaction:", err);
    } finally {
      setLoading(false);
    }
  }, [activeTransaction, fetchTransactions, closeModal]);

  // --- Filtering & Sorting Logic ---
  const processedTransactions = useMemo(() => {
    let result = [...allItems];

    // Filter
    if (filter !== "all") {
      if (filter === "income" || filter === "expense") {
        result = result.filter(t => t.type === filter);
      }
    }

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter((t) =>
        t.name.toLowerCase().includes(lowerQuery)
      );
    }

    // Sort
    if (sortBy === "amount") {
      result.sort((a, b) => b.amount - a.amount);
    } else if (sortBy === "dueDate") {
      // date descending
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else {
      // Default (progress/index) - keep original or modify if needed
    }

    return result;
  }, [allItems, filter, searchQuery, sortBy]);

  return (
    <div className="min-h-screen space-y-8 p-6 lg:p-10">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Stats Summary */}
        <TransactionStats transactions={allItems} />

        {/* Header and Controllers */}
        <PageHeader
          title="Transactions"
          itemCount={processedTransactions.length}
          filterOptions={["all", "income", "expense"]}
          selectedFilter={filter}
          setFilter={setFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          view={view}
          setView={setView}
          onNewItem={openCreateModal}
        />

        {/* View Items */}
        <div className="flex gap-4">
          <div
            className={`grid flex-1 gap-4 ${view === "grid"
              ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
              : "grid-cols-1"
              }`}
          >
            {processedTransactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                {...transaction}
                onView={() => openDetailsModal(transaction.id)}
                onUpdate={() => openEditModal(transaction.id)}
                onDelete={() => openDeleteModal(transaction.id)}
              />
            ))}
          </div>

          {/* Details Modal (was sidebar) */}
          {showDetailsModal && activeTransaction && (
            <TransactionDetails
              transaction={activeTransaction as any}
              onClose={closeModal}
            />
          )}
        </div>

        {/* Loading State */}
        <Loading loading={loading} />

        {/* Empty State */}
        {processedTransactions.length === 0 && !loading && (
          <EmptyResults
            items={processedTransactions}
            loading={loading}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onClickButton={openCreateModal}
          />
        )}

        {/* Create/Edit Modal */}
        <TransactionModal
          isOpen={showCreateUpdateModal}
          onClose={closeModal}
          onSubmit={handleSubmit}
          initialData={isEditMode ? activeTransaction : null}
        />

        {/* Delete Confirmation Modal */}
        <ModalGeneric
          isOpen={showDeleteModal}
          onClose={closeModal}
          title="Delete Transaction"
        >
          <div className="space-y-6">
            <div className="rounded-xl bg-red-50 p-4 text-sm text-red-900 dark:bg-red-900/20 dark:text-red-200">
              <p className="leading-relaxed">
                Are you sure you want to delete this transaction? This action cannot be undone and will remove the transaction from your history permanently.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={closeModal}
                className="rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700 shadow-sm shadow-red-200 dark:shadow-none"
              >
                Delete Transaction
              </button>
            </div>
          </div>
        </ModalGeneric>
      </div>
    </div>
  );
};

export default TransactionPage;
