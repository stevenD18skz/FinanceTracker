import React from "react";
import { Transaction } from "../../types/transaction";
import { Calendar, DollarSign, Target, Clock } from "lucide-react";

interface StatisticsProps {
  goals: Transaction[];
}

const TransactionStats: React.FC<StatisticsProps> = ({ goals }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {/* Meta más cercana */}
      <div className="rounded-xl bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Next Goal</p>
            <p className="mt-2 text-lg font-bold text-gray-900">{12}</p>
          </div>
          <div className="rounded-full bg-blue-100 p-3">
            <Calendar className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500">Due: {12}</p>
      </div>

      {/* Dinero total requerido */}
      <div className="rounded-xl bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Total Target Amount
            </p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{12}</p>
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
            <p className="mt-2 text-3xl font-bold text-gray-900">{12}</p>
          </div>
          <div className="rounded-full bg-purple-100 p-3">
            <Clock className="h-6 w-6 text-purple-600" />
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500">Needed per week for {12}</p>
      </div>

      {/* Progreso general en porcentaje */}
      <div className="rounded-xl bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Overall Progress
            </p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{12}%</p>
          </div>
          <div className="rounded-full bg-orange-100 p-3">
            <Target className="h-6 w-6 text-orange-600" />
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500">{12} saved so far</p>
      </div>
    </div>
  );
};

export default TransactionStats;
