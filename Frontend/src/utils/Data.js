import { currencies } from "../types/currency";

const userData = {
  uid: "dgq3aca41fdafe1",
  name: "Bariy Vollendito",
  photo: "https://randomuser.me/api/portraits/lego/3.jpg",
  currency: currencies[0],
};

const balanceData = {
  balance: 3000000,
  income: 10456000,
  expense: 32000,
  saving: 80000,
  goalMonthlyIncome: 12000000,
  goalMonthlyExpense: 50000,
  goalMonthlySaving: 100000,
};

const transactionsData = [
  {
    id: 1,
    icon: "music",
    name: "YouTube Premium",
    date: "1 January 2025, 02:25 PM",
    amount: 796000,
    type: "expense",
    cardId: 1,
  },
  {
    id: 2,
    icon: "music",
    name: "Spotify Premium",
    date: "19 January 2025, 02:25 PM",
    amount: 796000,
    type: "expense",
    cardId: 2,
  },
  {
    id: 3,
    icon: "Transfer",
    name: "Transferwise - Received",
    date: "19 January 2025, 10:15 AM",
    amount: 4800000,
    type: "income",
    cardId: 3,
  },
  {
    id: 4,
    icon: "Shopp",
    name: "H&M Payment",
    date: "15 January 2025, 06:30 PM",
    amount: 8800000,
    type: "expense",
    cardId: 1,
  },
  {
    id: 5,
    icon: "Shopp",
    name: "iPhone 12 Pro Max",
    date: "24 January 2025, 01:30 PM",
    amount: 8800000,
    type: "expense",
    cardId: 2,
  },
  {
    id: 6,
    icon: "Music", //Music2
    name: "Spotify Family",
    date: "25 January 2025, 02:25 PM",
    amount: 996_000, // 249 USD to COP (variedad)
    type: "expense",
    cardId: 3,
  },
  {
    id: 7,
    icon: "Transfer",
    name: "Transferwise - Sent",
    date: "26 January 2025, 10:15 AM",
    amount: 4800_000, // 1200 USD to COP
    type: "expense",
    cardId: 1,
  },
  {
    id: 8,
    icon: "Shopp",
    name: "Amazon Purchase",
    date: "28 January 2025, 06:30 PM",
    amount: 2000_000, // 500 USD to COP
    type: "expense",
    cardId: 2,
  },
  {
    id: 9,
    icon: " Shopp",
    name: "MacBook Pro",
    date: "28 January 2025, 01:30 PM",
    amount: 10000_000, // 2500 USD to COP
    type: "expense",
    cardId: 3,
  },
  {
    id: 10,
    icon: "Music", //Music2
    name: "Spotify Annual",
    date: "1 January 2025, 02:25 PM",
    amount: 3980_000, // 995 USD to COP (variedad)
    type: "expense",
    cardId: 1,
  },
  {
    id: 11,
    icon: "Shopp",
    name: "Starbucks",
    date: "2 January 2025, 09:15 AM",
    amount: 20_000, // 5 USD to COP
    type: "expense",
    cardId: 2,
  },
  {
    id: 12,
    icon: "Shopp",
    name: "Zara Payment",
    date: "3 January 2025, 03:45 PM",
    amount: 350_000, // 87.5 USD to COP
    type: "expense",
    cardId: 3,
  },
  {
    id: 13,
    icon: "Transfer",
    name: "PayPal - Received",
    date: "4 January 2025, 11:20 AM",
    amount: 2400_000, // 600 USD to COP
    type: "income",
    cardId: 1,
  },
  {
    id: 14,
    icon: "Shopp",
    name: "Steam Purchase",
    date: "5 January 2025, 05:35 PM",
    amount: 160_000, // 40 USD to COP
    type: "expense",
    cardId: 2,
  },
  {
    id: 15,
    icon: "Music", //Music2
    name: "Amazon Music",
    date: "6 January 2025, 02:25 PM",
    amount: 996_000, // 249 USD to COP (variedad)
    type: "expense",
    cardId: 3,
  },
  {
    id: 16,
    icon: "Transfer",
    name: "Venmo - Sent",
    date: "7 January 2025, 10:15 AM",
    amount: 1200_000, // 300 USD to COP
    type: "expense",
    cardId: 1,
  },
  {
    id: 17,
    icon: "Shopp",
    name: "Dinner at Croissant",
    date: "8 January 2025, 08:00 PM",
    amount: 100_000, // 25 USD to COP
    type: "expense",
    cardId: 2,
  },
  {
    id: 18,
    icon: "Transfer",
    name: "Bank Transfer - Received",
    date: "9 January 2025, 09:00 AM",
    amount: 4000_000, // 1000 USD to COP
    type: "income",
    cardId: 3,
  },
  {
    id: 19,
    icon: "Shopp",
    name: "Nike Purchase",
    date: "10 January 2025, 04:30 PM",
    amount: 800_000, // 200 USD to COP
    type: "expense",
    cardId: 1,
  },
  {
    id: 20,
    icon: "Shopp",
    name: "Cinema Tickets",
    date: "11 January 2025, 07:45 PM",
    amount: 50_000, // 12.5 USD to COP
    type: "expense",
    cardId: 2,
  },
  {
    id: 21,
    icon: "Transfer",
    name: "Freelance Payment - Received",
    date: "12 January 2025, 11:30 AM",
    amount: 16000_000, // 4000 USD to COP
    type: "income",
    cardId: 3,
  },
  {
    id: 22,
    icon: "Shopp",
    name: "Walmart Purchase",
    date: "13 January 2025, 03:00 PM",
    amount: 400_000, // 100 USD to COP
    type: "expense",
    cardId: 1,
  },
  {
    id: 23,
    icon: "Shopp",
    name: "Netflix Subscription",
    date: "14 January 2025, 02:25 PM",
    amount: 64_000, // 16 USD to COP
    type: "expense",
    cardId: 2,
  },

  {
    id: 24,
    icon: "Transfer",
    name: "Bank Transfer - Sent",
    date: "15 January 2025, 09:00 AM",
    amount: 2000_000, // 500 USD to COP
    type: "expense",
    cardId: 2,
  },
  {
    id: 25,
    icon: "Music", //Music2
    name: "Apple Music",
    date: "16 January 2025, 02:25 PM",
    amount: 996_000, // 249 USD to COP (variedad)
    type: "expense",
    cardId: 2,
  },
  {
    id: 26,
    icon: "Transfer",
    name: "Stripe Payment - Received",
    date: "17 January 2025, 09:30 AM",
    amount: 9600_000, // 2400 USD to COP
    type: "expense",
    cardId: 2,
  },
];

const subscriptionsData = [
  {
    id: "1",
    name: "Spotify Premium",
    cost: 19000,
    currency: "COP",
    category: "streaming",
    paymentFrequency: "monthly",
    nextPaymentDate: "2025-02-01",
    startDate: "2023-01-01",
    status: "pay",
    icon: "music",
    notificationSettings: {
      type: "email",
      daysBeforePayment: 3,
      enabled: true,
    },
  },
  {
    id: "2",
    name: "YouTube Premium",
    cost: 12000,
    currency: "COP",
    category: "streaming",
    paymentFrequency: "monthly",
    nextPaymentDate: "2025-02-05",
    startDate: "2023-05-01",
    status: "paid",
    icon: "music",
    notificationSettings: {
      type: "push",
      daysBeforePayment: 5,
      enabled: false,
    },
  },

  {
    id: "3",
    name: "Netflix",
    cost: 15000,
    currency: "COP",
    category: "streaming",
    paymentFrequency: "yearly",
    nextPaymentDate: "2025-02-10",
    startDate: "2023-03-01",
    status: "pay",
    icon: "music",
    notificationSettings: {
      type: "email",
      daysBeforePayment: 7,
      enabled: true,
    },
  },
  {
    id: "4",
    name: "Amazon Prime",
    cost: 12000,
    currency: "COP",
    category: "streaming",
    paymentFrequency: "monthly",
    nextPaymentDate: "2025-02-15",
    startDate: "2023-06-15",
    status: "paid",
    icon: "music",
    notificationSettings: {
      type: "sms",
      daysBeforePayment: 2,
      enabled: true,
    },
  },
  {
    id: "5",
    name: "Hulu",
    cost: 7000,
    currency: "COP",
    category: "streaming",
    paymentFrequency: "monthly",
    nextPaymentDate: "2025-02-20",
    startDate: "2023-04-01",
    status: "pay",
    icon: "music",
    notificationSettings: {
      type: "email",
      daysBeforePayment: 1,
      enabled: true,
    },
  },
];

const paymentHistoryData = [
  {
    id: "1",
    subscriptionId: "1",
    amount: 19000,
    currency: currencies[2],
    date: "2024-02-25",
    status: "completed",
  },
  {
    id: "2",
    subscriptionId: "2",
    amount: 45000,
    currency: currencies[2],
    date: "2024-02-28",
    status: "completed",
  },
  {
    id: "3",
    subscriptionId: "4",
    amount: 120000,
    currency: currencies[2],
    date: "2024-02-01",
    status: "completed",
  },
  {
    id: "4",
    subscriptionId: "5",
    amount: 150000,
    currency: currencies[2],
    date: "2024-02-28",
    status: "completed",
  },
  // Previous months
  {
    id: "5",
    subscriptionId: "1",
    amount: 19000,
    currency: currencies[2],
    date: "2024-01-25",
    status: "completed",
  },
  {
    id: "6",
    subscriptionId: "2",
    amount: 45000,
    currency: currencies[2],
    date: "2024-01-28",
    status: "completed",
  },
  {
    id: "7",
    subscriptionId: "4",
    amount: 120000,
    currency: currencies[2],
    date: "2024-01-01",
    status: "completed",
  },
  {
    id: "8",
    subscriptionId: "5",
    amount: 150000,
    currency: currencies[2],
    date: "2024-01-28",
    status: "completed",
  },
];

const planningGoalsData = [
  {
    id: 1,
    title: "Buy a car",
    current: 25000000,
    target: 47000000,
    status: "active",
    priority: "high",
    createdAt: "2024-03-10T10:00:00Z",
    updatedAt: "2024-03-10T10:00:00Z",
    dueDate: "Dec 2025",
    description: "Saving to buy a new car for personal use.",
    linkGoal: "https://www.ford.com.co/performance/mustang/",
    milestones: [
      { title: "Research car models", completed: true },
      { title: "Save 50% of target amount", completed: false },
      { title: "Get insurance quotes", completed: false },
    ],
  },
  {
    id: 2,
    title: "Motorola Edge 50 Fusion",
    current: 15000000,
    target: 50000000,
    status: "active",
    priority: "medium",
    createdAt: "2024-03-10T10:00:00Z",
    updatedAt: "2024-03-10T10:00:00Z",
    dueDate: "Dec 2025",
    description: "Saving to purchase the latest Motorola smartphone.",
    linkGoal:
      "https://www.ktronix.com/celular-motorola-edge-50-fusion-256gb-verde/p/840023261879",
    milestones: [
      { title: "Research phone models", completed: true },
      { title: "Save 30% of target amount", completed: false },
      { title: "Compare prices from different stores", completed: false },
    ],
  },
  {
    id: 3,
    title: "Buy LED lights",
    current: 1500000,
    target: 1500000,
    status: "completed",
    priority: "medium",
    createdAt: "2025-01-27T10:00:00Z",
    updatedAt: "2025-01-27T10:00:00Z",
    dueDate: "Jun 2025",
    description: "Saving to purchase LED lights for home decoration.",
    linkGoal: "https://www.philips.com/c-m-li/led-lights",
    milestones: [
      { title: "Measure the areas for installation", completed: true },
      { title: "Save 100% of target amount", completed: true },
      { title: "Research color and style options", completed: true },
    ],
  },
  {
    id: 4,
    title: "MousePad Logitech G240",
    current: 0,
    target: 56000,
    status: "active",
    priority: "low",
    createdAt: "2025-01-27T10:00:00Z",
    updatedAt: "2025-01-27T10:00:00Z",
    dueDate: "Jun 2025",
    description: "Saving to purchase a gaming mousepad for better performance.",
    linkGoal:
      "https://www.apcomputadores.com/producto/pad-mouse-logitech-g240/",
    milestones: [
      { title: "Research gaming mousepads", completed: true },
      { title: "Save 50% of target amount", completed: false },
      { title: "Compare prices from different stores", completed: false },
    ],
  },
  {
    id: 5,
    title: "Vacation to Europe",
    current: 8500000,
    target: 15000000,
    status: "active",
    priority: "high",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    dueDate: "Jul 2025",
    description: "Saving for a 2-week vacation trip to Europe.",
    linkGoal: "https://www.booking.com/",
    milestones: [
      { title: "Research destinations", completed: true },
      { title: "Save 50% of target amount", completed: true },
      { title: "Book flights", completed: false },
      { title: "Book accommodations", completed: false },
    ],
  },
];

const cardData = [
  {
    id: 1,
    type: "bancoColombia",
    balance: { amount: 1000000, currency: "COP" },
    cardNumber: "5282345678901289",
    expiryDate: "09/26",
  },
  {
    id: 2,
    type: "visa",
    balance: { amount: 300_000, currency: "COP" },
    cardNumber: "5282345678901289",
    expiryDate: "09/26",
  },
  {
    id: 3,
    type: "mastercard",
    balance: { amount: 200_000, currency: "COP" },
    cardNumber: "5282345678901286",
    expiryDate: "09/28",
  },
  {
    id: 4,
    type: "nubank",
    balance: { amount: 280_000, currency: "COP" },
    cardNumber: "5282345678901282",
    expiryDate: "09/28",
  },
];

// Datos mock completos para el Dashboard
const mockDashboardData = {
  cards: cardData,
  balance: balanceData,
  planning: planningGoalsData,
  transactions: transactionsData,
  subscriptions: subscriptionsData,
  paymentHistory: paymentHistoryData,
};

export {
  userData,
  balanceData,
  cardData,
  transactionsData,
  subscriptionsData,
  paymentHistoryData,
  planningGoalsData,
  mockDashboardData,
};
