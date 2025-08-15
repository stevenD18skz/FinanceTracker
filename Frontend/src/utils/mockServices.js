import {
  balanceData,
  cardData,
  transactionsData,
  subscriptionsData,
  planningGoalsData,
  mockDashboardData,
} from "./Data.js";

// Simula delay de red para hacer más realista la experiencia
const simulateNetworkDelay = (ms = 800) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Servicios mock para simular las llamadas a la API
export const mockApiServices = {
  // Obtener datos de planning goals
  async getPlanningGoals() {
    await simulateNetworkDelay();
    return {
      ok: true,
      json: async () => planningGoalsData,
    };
  },

  // Obtener datos de suscripciones
  async getSubscriptions() {
    await simulateNetworkDelay();
    return {
      ok: true,
      json: async () => subscriptionsData,
    };
  },

  // Obtener datos de transacciones
  async getTransactions() {
    await simulateNetworkDelay();
    return {
      ok: true,
      json: async () => transactionsData,
    };
  },

  // Obtener datos de tarjetas/wallets
  async getWallets() {
    await simulateNetworkDelay();
    return {
      ok: true,
      json: async () => cardData,
    };
  },

  // Obtener datos de usuario/balance
  async getUser() {
    await simulateNetworkDelay();
    return {
      ok: true,
      json: async () => balanceData,
    };
  },

  // Obtener todos los datos del dashboard de una vez
  async getAllDashboardData() {
    await simulateNetworkDelay();
    return {
      ok: true,
      json: async () => mockDashboardData,
    };
  },
};

// Función helper para usar datos mock en lugar de fetch
export const useMockData = true; // Cambia a false para usar la API real

// Función que reemplaza fetch cuando useMockData es true
export const mockFetch = async (url) => {
  if (!useMockData) {
    return fetch(url);
  }

  // Simular diferentes endpoints
  if (url.includes("/api/planning-goals")) {
    return mockApiServices.getPlanningGoals();
  }
  if (url.includes("/api/subscriptions")) {
    return mockApiServices.getSubscriptions();
  }
  if (url.includes("/api/transactions")) {
    return mockApiServices.getTransactions();
  }
  if (url.includes("/api/wallets")) {
    return mockApiServices.getWallets();
  }
  if (url.includes("/api/user")) {
    return mockApiServices.getUser();
  }

  // Si no coincide con ningún endpoint, usar fetch normal
  return fetch(url);
};

// Datos adicionales para el gráfico financiero (ya estaba en Dashboard.jsx)
export const weekFinancesData = {
  "day-1": { income: 2500_000, expense: 1200_000, saving: 1300_000 },
  "day-2": { income: 3000_000, expense: 1500_000, saving: 1500_000 },
  "day-3": { income: 2200_000, expense: 1000_000, saving: 1200_000 },
  "day-4": { income: 2800_000, expense: 3800_000, saving: 1000_000 },
  "day-5": { income: 3200_000, expense: 2000_000, saving: 1200_000 },
  "day-6": { income: 2400_000, expense: 1400_000, saving: 1000_000 },
  "day-7": { income: 2600_000, expense: 1600_000, saving: 1000_000 },
};

// Función para obtener datos de ejemplo para testing
export const getExampleData = () => {
  return {
    sampleTransaction: transactionsData[0],
    sampleSubscription: subscriptionsData[0],
    samplePlanningGoal: planningGoalsData[0],
    sampleCard: cardData[0],
    sampleBalance: balanceData,
  };
};

export default mockApiServices;
