import { formatCurrency } from "../../utils/formatters";
import { getCategoryIcon } from "../../utils/categoryIcons";
import { ChevronRight, Clock, CreditCard, Edit2, Trash2 } from "lucide-react";

interface TransactionItemProps {
  icon: React.ReactNode | string;
  name: string;
  date: string;
  amount: number;
  type: "income" | "expense" | "transfer";
  cardId?: string | number;
  onView?: () => void;
  onUpdate?: () => void;
  onDelete?: () => void;
}

export default function TransactionItem({
  icon,
  name,
  date,
  amount,
  type,
  cardId,
  onView,
  onUpdate,
  onDelete,
}: TransactionItemProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleUpdate = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdate?.();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.();
  };

  const renderIcon = () => {
    if (typeof icon === "string") {
      return getCategoryIcon(icon);
    }
    return icon;
  };

  return (
    <div
      onClick={onView}
      className="group relative flex cursor-pointer items-center justify-between rounded-2xl border border-transparent bg-white p-5 shadow-sm ring-1 ring-zinc-100 transition-all duration-300 hover:shadow-md hover:ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:ring-zinc-700"
    >
      {/* Left section: Icon + Info */}
      <div className="flex items-center gap-5">
        <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-zinc-50 text-zinc-600 transition-transform duration-300 group-hover:scale-105 group-hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-400 dark:group-hover:bg-zinc-700`}>
          {renderIcon()}
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            {name}
          </span>
          <div className="flex items-center gap-3 text-xs font-medium text-zinc-500">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-zinc-400" />
              <span>{formattedDate}</span>
            </div>
            {cardId && (
              <>
                <span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                <div className="flex items-center gap-1.5">
                  <CreditCard className="h-3.5 w-3.5 text-zinc-400" />
                  <span>Card ending in {String(cardId).slice(-4)}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Right section: Amount + Actions */}
      <div className="flex items-center gap-6">
        {/* Amount & Badge */}
        <div className="flex flex-col items-end gap-1.5">
          <span
            className={`text-base font-bold tracking-tight ${type === "income"
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-zinc-900 dark:text-zinc-100"
              }`}
          >
            {type === "income" ? "+" : "-"} {formatCurrency(Math.abs(amount))}
          </span>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${type === "income"
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                : type === "expense"
                  ? "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  : "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
              }`}
          >
            {type}
          </span>
        </div>

        {/* Actions - Visible on hover only */}
        <div className="flex items-center gap-1 opacity-0 transition-all duration-200 group-hover:opacity-100 sm:gap-2">
          <button
            onClick={handleUpdate}
            className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-indigo-600 dark:hover:bg-zinc-800 dark:hover:text-indigo-400"
            title="Edit"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={handleDelete}
            className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-red-600 dark:hover:bg-zinc-800 dark:hover:text-red-400"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <ChevronRight className="h-5 w-5 text-zinc-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-zinc-400 dark:text-zinc-700" />
      </div>
    </div>
  );
}
