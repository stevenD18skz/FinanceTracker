import React, { useState, useEffect } from "react";
import ModalGeneric from "../ui/ModalGeneric";
import { Transaction } from "../../types/transaction";
import { AlertCircle } from "lucide-react";

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
  const [amount, setAmount] = useState<number>();
  const [type, setType] = useState("expense");
  const [cardId, setCardId] = useState<number>();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDate(new Date(initialData.date).toISOString());
      setAmount(initialData.amount);
      setType(initialData.type);
      setCardId(initialData.cardId);
    } else {
      handleReset();
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!amount) newErrors.amount = "Amount is required";
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
      date,
      amount: Number(amount),
      type,
      cardId: Number(cardId),
    };
    onSubmit(newTransaction);
    handleReset();
  };

  const handleReset = () => {
    setName("");
    setDate("");
    setAmount(undefined);
    setType("expense");
    setCardId(undefined);
    setErrors({});
    onClose();
  };

  return (
    <ModalGeneric
      isOpen={isOpen}
      onClose={handleReset}
      title={initialData ? "Edit Transaction" : "Create New Transaction"}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full rounded-md border px-3 py-2 shadow-sm"
            placeholder="Enter transaction name"
          />
          {errors.name && (
            <p className="flex items-center gap-1 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" />
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            value={amount || ""}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="block w-full rounded-md border px-3 py-2 shadow-sm"
            placeholder="$0"
          />
          {errors.amount && (
            <p className="flex items-center gap-1 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" />
              {errors.amount}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="block w-full rounded-md border px-3 py-2 shadow-sm"
          />
          {errors.date && (
            <p className="flex items-center gap-1 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" />
              {errors.date}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <div className="flex gap-3">
            {["income", "expense"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`rounded-md px-3 py-2 ${type === t ? "bg-indigo-100 text-indigo-700" : "bg-gray-50 text-gray-700"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Card ID
          </label>
          <input
            type="number"
            value={cardId || ""}
            onChange={(e) => setCardId(Number(e.target.value))}
            className="block w-full rounded-md border px-3 py-2 shadow-sm"
            placeholder="Enter card ID"
          />
          {errors.cardId && (
            <p className="flex items-center gap-1 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" />
              {errors.cardId}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={handleReset}
            className="rounded-md border px-4 py-2 text-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-white"
          >
            {initialData ? "Save Changes" : "Create Transaction"}
          </button>
        </div>
      </form>
    </ModalGeneric>
  );
};

export default TransactionModal;
