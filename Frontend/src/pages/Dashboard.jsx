import { useEffect, useState, useCallback } from "react";

import PlanningGoalsContainer from "../components/DashBoard/PlanningGoalsContainer";
import SubscriptionContainer from "../components/DashBoard/SubscriptionContainer";
import TransactionContainer from "../components/DashBoard/TransactionContainer";
import CardsContainer from "../components/DashBoard/CardsContainer";
import BalanceContainer from "../components/DashBoard/BalanceContainer";
import FinancialChart from "../components/DashBoard/FinancialChart.tsx";

// components/DashBoard/ErrorState.tsx
import { CircleAlert } from "lucide-react";

// Importa un ícono para hacerlo más visual. Puedes usar react-icons o un SVG.
import PropTypes from "prop-types";

const ErrorState = ({ onRetry }) => {
  return (
    <div className="grid min-h-screen place-content-center bg-slate-200 p-8 text-center">
      <div className="flex flex-col items-center gap-4 rounded-xl bg-white p-12 shadow-lg">
        <CircleAlert className="h-16 w-16 text-red-600" />
        <h2 className="text-2xl font-bold text-slate-800">
          ¡Oops! Algo salió mal
        </h2>
        <p className="max-w-sm text-slate-600">
          No pudimos cargar los datos de tu dashboard. Por favor, revisa tu
          conexión e inténtalo de nuevo.
        </p>
        <button
          onClick={onRetry}
          className="mt-4 rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Volver a intentar
        </button>
      </div>
    </div>
  );
};

ErrorState.propTypes = {
  onRetry: PropTypes.func.isRequired,
};

// Skeleton Loader mejorado
const SkeletonDashboard = () => (
  <div className="grid min-h-screen grid-cols-1 gap-4 bg-slate-200 p-8 lg:grid-cols-3">
    {/* Columna Izquierda */}
    <div className="space-y-4">
      {/* Skeleton para CardsContainer */}
      <div className="h-80 w-full animate-pulse rounded-xl bg-gray-300" />
      {/* Skeleton para PlanningGoalsContainer */}
      <div className="h-96 w-full animate-pulse rounded-xl bg-gray-300" />
    </div>
    {/* Columna Derecha */}
    <div className="col-span-2 space-y-4">
      {/* Skeleton para BalanceContainer */}
      <div className="h-40 w-full animate-pulse rounded-xl bg-gray-300" />
      <div className="grid grid-cols-2 gap-4">
        {/* Skeleton para TransactionContainer */}
        <div className="h-80 w-full animate-pulse rounded-xl bg-gray-300" />
        {/* Skeleton para SubscriptionContainer */}
        <div className="h-80 w-full animate-pulse rounded-xl bg-gray-300" />
      </div>
    </div>
    {/* Skeleton para FinancialChart */}
    <div className="col-span-3">
      <div className="h-96 w-full animate-pulse rounded-xl bg-gray-300" />
    </div>
  </div>
);

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Nuevo estado para el error

  // Datos para el FinancialChart (puedes reemplazarlo por datos reales)
  const weekFinances = {
    "day-1": { income: 100, expense: 50, saving: 50 },
    "day-2": { income: 120, expense: 60, saving: 60 },
    "day-3": { income: 90, expense: 40, saving: 50 },
    "day-4": { income: 110, expense: 70, saving: 40 },
    "day-5": { income: 130, expense: 80, saving: 50 },
    "day-6": { income: 95, expense: 55, saving: 40 },
    "day-7": { income: 105, expense: 65, saving: 40 },
  };

  // Usamos useCallback para que la función no se recree en cada render
  const fetchAllData = useCallback(async () => {
    // Al reintentar, reseteamos el error y mostramos el loader
    setError(null);
    setLoading(true);

    try {
      const responses = await Promise.all([
        fetch("http://localhost:3000/api/planning-goals"),
        fetch("http://localhost:3000/api/subscriptions"),
        fetch("http://localhost:3000/api/transactions"),
        fetch("http://localhost:3000/api/wallets"),
        fetch("http://localhost:3000/api/user"),
      ]);

      // Verificamos si alguna de las respuestas no fue exitosa (status no es 2xx)
      for (const res of responses) {
        if (!res.ok) {
          throw new Error(
            `Error en la petición: ${res.status} ${res.statusText}`,
          );
        }
      }

      // Procesamos los JSONs solo si todas las respuestas fueron OK
      const [
        planningResponse,
        subscriptionsResponse,
        transactionsResponse,
        cardsResponse,
        balanceResponse,
      ] = await Promise.all(responses.map((res) => res.json()));

      setData({
        cards: cardsResponse,
        balance: balanceResponse,
        planning: planningResponse,
        transactions: transactionsResponse,
        subscriptions: subscriptionsResponse,
      });
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      // Guardamos el error en el estado para mostrar el componente de error
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("Ocurrió un error desconocido"));
      }
    } finally {
      // Ocultamos el loader independientemente del resultado
      setLoading(false);
    }
  }, []); // El array de dependencias vacío asegura que la función solo se crea una vez

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // ---- Lógica de renderizado ----

  // 1. Muestra el Skeleton mientras carga
  if (loading) return <SkeletonDashboard />;

  // 2. Si hay un error, muestra el componente de error
  if (error) return <ErrorState onRetry={fetchAllData} />;

  // 3. Si todo está bien, muestra el Dashboard
  // (Añadimos una comprobación por si `data` aún es nulo por alguna razón)
  if (!data) return null;

  return (
    <div className="grid grid-cols-1 gap-4 bg-slate-200 p-8 lg:grid-cols-3">
      {/* Columna Izquierda */}
      <div className="space-y-4">
        <CardsContainer cardData={data.cards} />
        <PlanningGoalsContainer planningGoalsData={data.planning} />
      </div>

      {/* Columna Derecha */}
      <div className="col-span-2 space-y-4">
        <BalanceContainer balanceData={data.balance} />
        <div className="grid grid-cols-2 rounded-xl bg-white">
          <TransactionContainer transactionData={data.transactions} />
          <SubscriptionContainer subscriptionData={data.subscriptions} />
        </div>
      </div>

      {/* Sección de FinancialChart */}
      <div className="col-span-3">
        <FinancialChart data={weekFinances} />
      </div>
    </div>
  );
}
