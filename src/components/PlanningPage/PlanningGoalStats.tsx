import React from "react";
import { Goal } from "../../types/goal";
import { formatCurrency } from "../../utils/formatters";
import { TrendingUp, Calendar, DollarSign, Target, Clock } from "lucide-react";

interface StatisticsProps {
  goals: Goal[];
}

const GoalStats: React.FC<StatisticsProps> = ({ goals }) => {
  if (goals.length === 0) return <p>No goals available.</p>;

  // Meta más cercana
  const closestGoal = goals
    .filter((goal) => goal.status !== "completed")
    .sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
    )[0];

  // Dinero total requerido para todas las metas
  const totalTarget = goals.reduce((sum, goal) => sum + goal.target, 0);

  // Dinero necesario por semana para la meta más próxima
  const currentDate = new Date();
  const dueDate = new Date(closestGoal?.dueDate);
  const weeksRemaining =
    Math.ceil(
      (dueDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24 * 7),
    ) || 1;
  const moneyPerWeek = closestGoal
    ? (closestGoal.target - closestGoal.current) / weeksRemaining
    : 0;

  // Progreso general en porcentaje
  const totalSaved = goals.reduce((sum, goal) => sum + goal.current, 0);
  const progressPercentage =
    totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

  return (
    <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {/* Meta más cercana */}
      <div className="rounded-xl bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Next Goal</p>
            <p className="mt-2 text-lg font-bold text-gray-900">
              {closestGoal?.title}
            </p>
          </div>
          <div className="rounded-full bg-blue-100 p-3">
            <Calendar className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Due: {closestGoal?.dueDate}
        </p>
      </div>

      {/* Dinero total requerido */}
      <div className="rounded-xl bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Total Target Amount
            </p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {formatCurrency(totalTarget, "USD")}
            </p>
          </div>
          <div className="rounded-full bg-green-100 p-3">
            <DollarSign className="h-6 w-6 text-green-600" />
          </div>
        </div>
      </div>

      {/* Dinero necesario por semana para la meta más próxima */}
      <div className="rounded-xl bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Weekly Saving Goal
            </p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {formatCurrency(moneyPerWeek, "USD")}
            </p>
          </div>
          <div className="rounded-full bg-purple-100 p-3">
            <Clock className="h-6 w-6 text-purple-600" />
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Needed per week for {closestGoal?.title}
        </p>
      </div>

      {/* Progreso general en porcentaje */}
      <div className="rounded-xl bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Overall Progress
            </p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {progressPercentage.toFixed(2)}%
            </p>
          </div>
          <div className="rounded-full bg-orange-100 p-3">
            <Target className="h-6 w-6 text-orange-600" />
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          {formatCurrency(totalSaved, "USD")} saved so far
        </p>
      </div>
    </div>
  );
};

export default GoalStats;
