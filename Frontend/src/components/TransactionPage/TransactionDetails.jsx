import PropTypes from "prop-types";
import { X, DollarSign, Calendar, CreditCard } from "lucide-react";
import { getCategoryIcon } from "../../utils/categoryIcons";
import ModalGeneric from "../ui/ModalGeneric";

const TransactionDetails = ({ transaction, onClose }) => {
  const renderIcon = () => {
    if (typeof transaction.icon === "string") {
      return getCategoryIcon(transaction.icon);
    }
    return transaction.icon;
  };

  const formattedDate = new Date(transaction.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <ModalGeneric
      isOpen={!!transaction}
      onClose={onClose}
      title="Transaction Details"
    >
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className={`flex h-20 w-20 items-center justify-center rounded-2xl shadow-sm ${transaction.type === 'income'
              ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30'
              : 'bg-red-100 text-red-600 dark:bg-red-900/30'
            }`}>
            {/* Increase icon size */}
            <div className="scale-150 transform">
              {renderIcon()}
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
              {transaction.name}
            </h3>
            <span className={`inline-block rounded-full px-3 py-1 text-sm font-medium capitalize ${transaction.type === 'income'
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
              }`}>
              {transaction.type}
            </span>
          </div>
        </div>

        {/* Details Data Grid */}
        <div className="grid grid-cols-2 gap-4 rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
          <div className="space-y-1 p-2">
            <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
              <DollarSign className="h-3.5 w-3.5" /> Amount
            </span>
            <p className={`text-xl font-bold ${transaction.type === 'income' ? 'text-emerald-600' : 'text-zinc-900 dark:text-white'
              }`}>
              ${Math.abs(transaction.amount).toLocaleString()}
            </p>
          </div>

          <div className="space-y-1 p-2">
            <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
              <Calendar className="h-3.5 w-3.5" /> Date
            </span>
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {formattedDate}
            </p>
          </div>

          <div className="space-y-1 p-2">
            <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
              <CreditCard className="h-3.5 w-3.5" /> Payment Method
            </span>
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Card ending in {String(transaction.cardId).slice(-4)}
            </p>
          </div>

          <div className="space-y-1 p-2">
            <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
              ID
            </span>
            <p className="font-mono text-sm font-medium text-zinc-500">
              #{transaction.id}
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-zinc-100 pt-6 dark:border-zinc-800">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Close Details
          </button>
        </div>
      </div>
    </ModalGeneric>
  );
};

TransactionDetails.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    type: PropTypes.oneOf(["income", "expense"]).isRequired,
    cardId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TransactionDetails;
