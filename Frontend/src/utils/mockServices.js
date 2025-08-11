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
  "day-1": { income: 2500000, expense: 1200000, saving: 1300000 },
  "day-2": { income: 3000000, expense: 1500000, saving: 1500000 },
  "day-3": { income: 2200000, expense: 1000000, saving: 1200000 },
  "day-4": { income: 2800000, expense: 1800000, saving: 1000000 },
  "day-5": { income: 3200000, expense: 2000000, saving: 1200000 },
  "day-6": { income: 2400000, expense: 1400000, saving: 1000000 },
  "day-7": { income: 2600000, expense: 1600000, saving: 1000000 },
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
