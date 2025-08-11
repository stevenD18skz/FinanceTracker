import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { CircleAlert } from "lucide-react";

// Importacion de componentes
import CardsContainer from "../components/DashBoard/CardsContainer.tsx";
import BalanceContainer from "../components/DashBoard/BalanceContainer";
import PlanningGoalsContainer from "../components/DashBoard/PlanningGoalsContainer.tsx";
import TransactionContainer from "../components/DashBoard/TransactionContainer";
import SubscriptionContainer from "../components/DashBoard/SubscriptionContainer";
import FinancialChart from "../components/DashBoard/FinancialChart.tsx";

// Importacion de datos
import { mockFetch, weekFinancesData } from "../utils/mockServices.js";

// Manejar error de carga de datos
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
      <div className="h-[25rem] w-full animate-pulse rounded-xl bg-gray-300" />
      {/* Skeleton para PlanningGoalsContainer */}
      <div className="h-[25rem] w-full animate-pulse rounded-xl bg-gray-300" />
    </div>
    {/* Columna Derecha */}
    <div className="col-span-2 space-y-4">
      {/* Skeleton para BalanceContainer */}
      <div className="h-[25rem] w-full animate-pulse rounded-xl bg-gray-300" />
      <div className="grid grid-cols-2 gap-4">
        {/* Skeleton para TransactionContainer */}
        <div className="h-[25rem] w-full animate-pulse rounded-xl bg-gray-300" />
        {/* Skeleton para SubscriptionContainer */}
        <div className="h-[25rem] w-full animate-pulse rounded-xl bg-gray-300" />
      </div>
    </div>
    {/* Skeleton para FinancialChart */}
    <div className="col-span-3">
      <div className="h-[25rem] w-full animate-pulse rounded-xl bg-gray-300" />
    </div>
  </div>
);

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Nuevo estado para el error

  // Usamos useCallback para que la función no se recree en cada render
  const fetchAllData = useCallback(async () => {
    // Al reintentar, reseteamos el error y mostramos el loader
    setError(null);
    setLoading(true);

    try {
      // Usar mockFetch que automáticamente decide entre datos mock o API real
      const responses = await Promise.all([
        mockFetch("http://localhost:3000/api/planning-goals"),
        mockFetch("http://localhost:3000/api/subscriptions"),
        mockFetch("http://localhost:3000/api/transactions"),
        mockFetch("http://localhost:3000/api/wallets"),
        mockFetch("http://localhost:3000/api/user"),
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
        weekFinances: weekFinancesData,
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

  // 3. Si no hay error y hay datos, muestra el Dashboard
  // (Añadimos una comprobación por si `data` aún es nulo por alguna razón)
  if (!data) return null;

  return (
    <div className="grid grid-cols-1 gap-[--spacing-big] bg-[--background-page] p-[--spacing-big] lg:grid-cols-3">
      {/* Columna Izquierda */}
      <div className="space-y-[--spacing-big] lg:col-span-1">
        <CardsContainer cardData={data.cards} />
        <PlanningGoalsContainer planningGoalsData={data.planning} />
      </div>

      {/* Columna Derecha */}
      <div className="space-y-[--spacing-big] lg:col-span-2">
        <BalanceContainer balanceData={data.balance} />
        <div className="grid grid-cols-1 gap-[--spacing-big] rounded-xl lg:grid-cols-2">
          <TransactionContainer transactionData={data.transactions} />
          <SubscriptionContainer subscriptionData={data.subscriptions} />
        </div>
      </div>

      {/* Sección de FinancialChart */}
      <div className="col-span-1 lg:col-span-3">
        <FinancialChart data={data.weekFinances} />
      </div>
    </div>
  );
}
