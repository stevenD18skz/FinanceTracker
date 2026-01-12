import React from "react";
import { Transaction } from "../../types/transaction";
import { ArrowDownRight, ArrowUpRight, Wallet, TrendingUp } from "lucide-react";

interface StatisticsProps {
  transactions: Transaction[];
}

const StatCard = ({ title, amount, source, icon: Icon, colorClass, bgClass, iconColorClass }) => (
  <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-100 transition-all hover:shadow-md dark:bg-zinc-900 dark:ring-zinc-800">
    <div className="relative z-10 flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{title}</p>
        <h3 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          {amount?.toLocaleString()} <span className="text-sm font-normal text-zinc-500">COP</span>
        </h3>
        {source && (
          <p className="mt-1 text-xs font-medium text-zinc-400">
            {source}
          </p>
        )}
      </div>
      <div className={`rounded-xl p-3 ${bgClass}`}>
        <Icon className={`h-6 w-6 ${iconColorClass}`} />
      </div>
    </div>
  </div>
);

const TransactionStats: React.FC<StatisticsProps> = ({ transactions }) => {
  const expenses = transactions.filter((t) => t.type === "expense");
  const incomes = transactions.filter((t) => t.type === "income");

  const highestExpense = expenses.reduce(
    (max, t) => (t.amount > max.amount ? t : max),
    expenses[0] || { amount: 0, name: "N/A" }
  );

  const highestIncome = incomes.reduce(
    (max, t) => (t.amount > max.amount ? t : max),
    incomes[0] || { amount: 0, name: "N/A" }
  );

  const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
  const totalIncome = incomes.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Highest Expense"
        amount={highestExpense.amount}
        source={`In ${highestExpense.name}`}
        icon={ArrowDownRight}
        bgClass="bg-red-50 dark:bg-red-900/20"
        iconColorClass="text-red-600 dark:text-red-400"
        colorClass=""
      />

      <StatCard
        title="Highest Income"
        amount={highestIncome.amount}
        source={`From ${highestIncome.name}`}
        icon={ArrowUpRight}
        bgClass="bg-emerald-50 dark:bg-emerald-900/20"
        iconColorClass="text-emerald-600 dark:text-emerald-400"
        colorClass=""
      />

      <StatCard
        title="Total Expenses"
        amount={totalExpenses}
        source="This Month"
        icon={Wallet}
        bgClass="bg-zinc-100 dark:bg-zinc-800"
        iconColorClass="text-zinc-600 dark:text-zinc-400"
        colorClass=""
      />

      <StatCard
        title="Total Income"
        amount={totalIncome}
        source="This Month"
        icon={TrendingUp}
        bgClass="bg-indigo-50 dark:bg-indigo-900/20"
        iconColorClass="text-indigo-600 dark:text-indigo-400"
        colorClass=""
      />
    </div>
  );
};

export default TransactionStats;
