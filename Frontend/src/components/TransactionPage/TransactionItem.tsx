import { formatCurrency } from "../../utils/formatters";
import { ChevronRight, Clock, CreditCard, Edit, Trash2 } from "lucide-react";

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
}) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      onClick={onView}
      className="hover:bg-accent/50 hover:border-accent group relative flex cursor-pointer items-center justify-between rounded-xl border border-transparent bg-slate-100 p-4 transition-all duration-300 hover:shadow-lg"
    >
      {/* Left section */}
      <div className="flex items-center gap-4">
        <div className="from-accent/30 to-accent/10 flex-shrink-0 rounded-xl bg-gradient-to-br p-3 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110">
          {icon}
        </div>

        <div className="flex flex-col">
          <span className="text-foreground text-lg font-semibold">{name}</span>
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <Clock className="h-3 w-3" />
            {cardId && (
              <>
                <p>{formattedDate}</p>
                <span className="text-muted-foreground">•</span>
                <div className="flex items-center gap-1">
                  <CreditCard className="h-3 w-3" />
                  <span>Card *{cardId}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end">
          <span
            className={`text-lg font-semibold tabular-nums tracking-tight ${
              type === "income"
                ? "text-emerald-500 dark:text-emerald-400"
                : "text-destructive dark:text-red-400"
            }`}
          >
            {type === "income" ? "+" : "-"} {formatCurrency(Math.abs(amount))}
          </span>
          <span
            className={`rounded-full px-2 py-0.5 text-xs capitalize ${
              type === "income"
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                : type === "expense"
                  ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
            }`}
          >
            {type}
          </span>
        </div>
        <ChevronRight className="text-muted-foreground h-5 w-5 transform opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
      </div>

      <button onClick={onUpdate}>
        <Edit className="h-5 w-5 text-muted-foreground" />
      </button>
      <button onClick={onDelete}>
        <Trash2 className="h-5 w-5 text-muted-foreground" />
      </button>

      {/* Hover effect overlay */}
      <div className="via-accent/5 pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}
