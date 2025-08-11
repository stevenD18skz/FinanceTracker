# 📊 Datos Mock para Dashboard - Finance Tracker

Este documento explica cómo usar los datos mock creados para el Dashboard del Finance Tracker.

## 🗂️ Archivos Principales

### `Data.js`
Contiene todos los datos mock estructurados:
- **balanceData**: Información del usuario y balance general
- **cardData**: Datos de tarjetas/wallets del usuario
- **transactionsData**: Lista de transacciones de ejemplo
- **subscriptionsData**: Suscripciones activas e inactivas
- **planningGoalsData**: Metas de ahorro y planificación financiera
- **mockDashboardData**: Objeto completo con todos los datos del dashboard

### `mockServices.js`
Servicios para simular llamadas a la API:
- **mockApiServices**: Funciones que simulan endpoints de la API
- **mockFetch**: Función que reemplaza fetch() cuando se usan datos mock
- **useMockData**: Variable para alternar entre datos mock y API real

## 🚀 Cómo Usar

### 1. Activar Datos Mock
En `mockServices.js`, cambia:
```javascript
export const useMockData = true; // Para usar datos mock
```

### 2. Desactivar Datos Mock (usar API real)
En `mockServices.js`, cambia:
```javascript
export const useMockData = false; // Para usar API real
```

### 3. Usar Datos Individuales
```javascript
import { planningGoalsData, transactionsData } from '../utils/Data.js';

// Usar datos específicos
const goals = planningGoalsData;
const transactions = transactionsData;
```

### 4. Usar Servicios Mock
```javascript
import { mockApiServices } from '../utils/mockServices.js';

// Simular llamada a API
const goals = await mockApiServices.getPlanningGoals();
```

## 📋 Estructura de Datos

### Planning Goals
```javascript
{
  id: 1,
  title: "Buy a car",
  current: 25000000,
  target: 47000000,
  status: "active", // "active", "completed", "paused"
  priority: "high", // "high", "medium", "low"
  createdAt: "2024-03-10T10:00:00Z",
  updatedAt: "2024-03-10T10:00:00Z",
  dueDate: "Dec 2025",
  description: "Saving to buy a new car for personal use.",
  linkGoal: "https://www.ford.com.co/performance/mustang/",
  milestones: [
    { title: "Research car models", completed: true },
    { title: "Save 50% of target amount", completed: false }
  ]
}
```

### Transactions
```javascript
{
  id: 1,
  icon: <Music2 className="h-6 w-6 text-[#1DB954]" />,
  name: "YouTube Premium",
  date: "1 January 2025, 02:25 PM",
  amount: 796_000,
  type: "expense", // "expense", "income"
  cardId: 1
}
```

### Subscriptions
```javascript
{
  id: "1",
  name: "Spotify Premium",
  cost: 19000,
  currency: "COP",
  category: "streaming",
  paymentFrequency: "monthly", // "monthly", "yearly"
  nextPaymentDate: "2025-02-01",
  startDate: "2023-01-01",
  status: "active", // "active", "inactive"
  icon: <Music2 className="h-6 w-6 text-[#1DB954]" />,
  notificationSettings: {
    type: "email", // "email", "push", "sms"
    daysBeforePayment: 3,
    enabled: true
  }
}
```

### Cards/Wallets
```javascript
{
  id: 1,
  type: "visa", // "visa", "mastercard", "nubank"
  balance: 3_300,
  cardNumber: "5282345678901289",
  expiryDate: "09/26"
}
```

### Balance Data
```javascript
{
  uid: "dgq3aca41fdafe1",
  name: "Bariy Vollendito",
  photo: "https://randomuser.me/api/portraits/lego/3.jpg",
  balance: 3_000_000,
  income: 10_456_000,
  expense: 32_000,
  saving: 80_000
}
```

## 🔧 Personalización

### Agregar Nuevos Datos
1. Edita `Data.js` para agregar nuevos elementos a los arrays
2. Mantén la estructura de datos consistente
3. Usa valores realistas en pesos colombianos (COP)

### Modificar Delay de Red
En `mockServices.js`:
```javascript
const simulateNetworkDelay = (ms = 800); // Cambia el valor en ms
```

### Agregar Nuevos Endpoints
En `mockServices.js`, agrega nuevas funciones a `mockApiServices` y actualiza `mockFetch`.

## 💡 Consejos

1. **Desarrollo**: Usa `useMockData = true` para desarrollo sin backend
2. **Testing**: Los datos mock son ideales para pruebas unitarias
3. **Demostración**: Perfecto para mostrar la UI sin dependencias externas
4. **Debugging**: Facilita la depuración de componentes individuales

## 🎯 Datos Incluidos

- ✅ 5 Planning Goals (metas financieras)
- ✅ 26 Transacciones variadas
- ✅ 5 Suscripciones (streaming, servicios)
- ✅ 3 Tarjetas/Wallets
- ✅ 1 Perfil de usuario completo
- ✅ 8 Registros de historial de pagos
- ✅ 7 días de datos financieros para gráficos

¡Los datos están listos para usar en tu Dashboard! 🚀