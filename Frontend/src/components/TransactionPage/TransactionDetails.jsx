import { X, DollarSign } from "lucide-react";

const TransactionDetails = ({ transaction, onClose }) => {
  return (
    <aside className="bg-white p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between border-b pb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Transaction Details
        </h2>
        <button
          onClick={onClose}
          className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
          {transaction.icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {transaction.name}
          </h3>
          <p className="text-sm text-gray-500">{transaction.date}</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between text-lg font-medium text-gray-700">
          <span>Amount</span>
          <span className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-gray-400" />$
            {transaction.amount}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="mb-2 text-lg font-medium text-gray-800">
          Transaction Type
        </h3>
        <p
          className={`text-sm font-medium ${transaction.type === "income" ? "text-green-500" : "text-red-500"}`}
        >
          {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
        </p>
      </div>

      <div>
        <h3 className="mb-2 text-lg font-medium text-gray-800">Card Used</h3>
        <p className="text-sm text-gray-600">Card ID: {transaction.cardId}</p>
      </div>
    </aside>
  );
};

export default TransactionDetails;
