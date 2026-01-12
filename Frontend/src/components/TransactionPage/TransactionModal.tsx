import React, { useState, useEffect } from "react";
import ModalGeneric from "../ui/ModalGeneric";
import { Transaction } from "../../types/transaction";
import { AlertCircle, Calendar, CreditCard, DollarSign, Type } from "lucide-react";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (transaction: Omit<Transaction, "id">) => void;
  initialData?: Transaction | null;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [cardId, setCardId] = useState<number | "">("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setName(initialData.name);
        // Format date to datetime-local string (YYYY-MM-DDTHH:mm)
        try {
          const d = new Date(initialData.date);
          d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
          setDate(d.toISOString().slice(0, 16));
        } catch (e) {
          setDate("");
        }
        setAmount(initialData.amount);
        setType(initialData.type as "income" | "expense");
        setCardId(initialData.cardId);
      } else {
        handleResetLocal();
      }
    }
  }, [initialData, isOpen]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!amount || Number(amount) <= 0) newErrors.amount = "Valid amount is required";
    if (!date) newErrors.date = "Date is required";
    if (!cardId) newErrors.cardId = "Card ID is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    const newTransaction = {
      name,
      date: new Date(date).toISOString(),
      amount: Number(amount),
      type,
      cardId: Number(cardId),
      icon: name, // Default icon mapping by name if not provided elsewhere
    };
    onSubmit(newTransaction);
    handleReset();
  };

  const handleResetLocal = () => {
    setName("");
    setDate("");
    setAmount("");
    setType("expense");
    setCardId("");
    setErrors({});
  }

  const handleReset = () => {
    handleResetLocal();
    onClose();
  };

  const inputClass = "w-full rounded-xl border-zinc-200 bg-zinc-50 px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all dark:bg-zinc-800 dark:border-zinc-700 dark:text-white";
  const labelClass = "text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 block";

  return (
    <ModalGeneric
      isOpen={isOpen}
      onClose={handleReset}
      title={initialData ? "Edit Transaction" : "New Transaction"}
    >
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Type Selector */}
        <div className="grid grid-cols-2 gap-3 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
          {["income", "expense"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t as "income" | "expense")}
              className={`rounded-lg py-2 text-sm font-medium capitalize transition-all duration-200 ${type === t
                  ? t === 'income'
                    ? "bg-white text-emerald-600 shadow-sm dark:bg-zinc-700 dark:text-emerald-400"
                    : "bg-white text-red-600 shadow-sm dark:bg-zinc-700 dark:text-red-400"
                  : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400"
                }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {/* Amount */}
          <div>
            <label className={labelClass}>Amount</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
                className={`${inputClass} pl-10`}
                placeholder="0.00"
                step="0.01"
              />
            </div>
            {errors.amount && <p className="mt-1 text-xs text-red-500">{errors.amount}</p>}
          </div>

          {/* Name */}
          <div>
            <label className={labelClass}>Transaction Name</label>
            <div className="relative">
              <Type className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`${inputClass} pl-10`}
                placeholder="e.g. Grocery Shopping"
              />
            </div>
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Date */}
            <div>
              <label className={labelClass}>Date & Time</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <input
                  type="datetime-local"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={`${inputClass} pl-10 text-sm`}
                />
              </div>
              {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date}</p>}
            </div>

            {/* Card ID */}
            <div>
              <label className={labelClass}>Card / Account</label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <input
                  type="number"
                  value={cardId}
                  onChange={(e) => setCardId(e.target.value === "" ? "" : Number(e.target.value))}
                  className={`${inputClass} pl-10`}
                  placeholder="Card ID"
                />
              </div>
              {errors.cardId && <p className="mt-1 text-xs text-red-500">{errors.cardId}</p>}
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {initialData ? "Save Changes" : "Create Transaction"}
          </button>
        </div>
      </form>
    </ModalGeneric>
  );
};

export default TransactionModal;
