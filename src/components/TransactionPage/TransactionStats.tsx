import React from "react";
import { Transaction } from "../../types/transaction";
import { ArrowDown, ArrowUp, DollarSign, TrendingUp } from "lucide-react";

interface StatisticsProps {
  transactions: Transaction[];
}

const TransactionStats: React.FC<StatisticsProps> = ({ transactions }) => {
  // Filtrar ingresos y gastos
  const expenses = transactions.filter((t) => t.type === "expense");
  const incomes = transactions.filter((t) => t.type === "income");

  // Calcular estadísticas
  const highestExpense = expenses.reduce(
    (max, t) => (t.amount > max.amount ? t : max),
    expenses[0],
  );
  const highestIncome = incomes.reduce(
    (max, t) => (t.amount > max.amount ? t : max),
    incomes[0],
  );
  const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
  const totalIncome = incomes.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {/* Mayor gasto */}
      <div className="rounded-xl bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Mayor Gasto</p>
            <p className="mt-2 text-lg font-bold text-gray-900">
              {highestExpense?.amount?.toLocaleString()} COP
            </p>
          </div>
          <div className="rounded-full bg-red-100 p-3">
            <ArrowDown className="h-6 w-6 text-red-600" />
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500">En {highestExpense?.name}</p>
      </div>

      {/* Mayor ingreso */}
      <div className="rounded-xl bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Mayor Ingreso</p>
            <p className="mt-2 text-lg font-bold text-gray-900">
              {highestIncome?.amount?.toLocaleString()} COP
            </p>
          </div>
          <div className="rounded-full bg-green-100 p-3">
            <ArrowUp className="h-6 w-6 text-green-600" />
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500">De {highestIncome?.name}</p>
      </div>

      {/* Total gastado este mes */}
      <div className="rounded-xl bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Gastado</p>
            <p className="mt-2 text-lg font-bold text-gray-900">
              {totalExpenses.toLocaleString()} COP
            </p>
          </div>
          <div className="rounded-full bg-purple-100 p-3">
            <DollarSign className="h-6 w-6 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Total recibido este mes */}
      <div className="rounded-xl bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Recibido</p>
            <p className="mt-2 text-lg font-bold text-gray-900">
              {totalIncome.toLocaleString()} COP
            </p>
          </div>
          <div className="rounded-full bg-blue-100 p-3">
            <TrendingUp className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionStats;
