import {
  Music2,
  ArrowRightLeft,
  ShoppingBag,
  Apple,
  Coffee,
  Croissant,
  Projector,
  Gamepad,
} from "lucide-react";

const balanceData = {
  uid: "dgq3aca41fdafe1",
  name: "Bariy Vollendito",
  photo: "https://randomuser.me/api/portraits/lego/3.jpg",
  balance: 3_000_000,
  income: 10_456_000,
  expense: 32_000,
  saving: 80_000,
};

const cardData = [
  {
    id: 1,
    type: "visa",
    balance: 3_300,
    cardNumber: "5282345678901289",
    expiryDate: "09/26",
  },
  {
    id: 2,
    type: "mastercard",
    balance: 2_000,
    cardNumber: "5282345678901289",
    expiryDate: "09/28",
  },
  {
    id: 3,
    type: "nubank",
    balance: 200_000,
    cardNumber: "5282345678901289",
    expiryDate: "09/28",
  },
];

const transactionsData = [
  {
    id: 1,
    icon: <Music2 className="h-6 w-6 text-[#1DB954]" />,
    name: "YouTube Premium",
    date: "1 January 2025, 02:25 PM",
    amount: 796_000, // 199 USD to COP
    type: "expense",
    cardId: 1,
  },
  {
    id: 2,
    icon: <Music2 className="h-6 w-6 text-[#1DB954]" />,
    name: "Spotify Premium",
    date: "19 January 2025, 02:25 PM",
    amount: 796_000, // 199 USD to COP
    type: "expense",
    cardId: 2,
  },
  {
    id: 3,
    icon: <ArrowRightLeft className="h-6 w-6 text-[#00B9FF]" />,
    name: "Transferwise - Received",
    date: "19 January 2025, 10:15 AM",
    amount: 4800_000, // 1200 USD to COP
    type: "income",
    cardId: 3,
  },
  {
    id: 4,
    icon: <ShoppingBag className="h-6 w-6 text-[#FF0000]" />,
    name: "H&M Payment",
    date: "15 January 2025, 06:30 PM",
    amount: 8800_000, // 2200 USD to COP
    type: "expense",
    cardId: 1,
  },
  {
    id: 5,
    icon: <Apple className="h-6 w-6 text-[#424147]" />,
    name: "iPhone 12 Pro Max",
    date: "24 January 2025, 01:30 PM",
    amount: 8800_000, // 2200 USD to COP
    type: "expense",
    cardId: 2,
  },
  {
    id: 6,
    icon: <Music2 className="h-6 w-6 text-[#1DB954]" />,
    name: "Spotify Family",
    date: "25 January 2025, 02:25 PM",
    amount: 996_000, // 249 USD to COP (variedad)
    type: "expense",
    cardId: 3,
  },
  {
    id: 7,
    icon: <ArrowRightLeft className="h-6 w-6 text-[#00B9FF]" />,
    name: "Transferwise - Sent",
    date: "26 January 2025, 10:15 AM",
    amount: 4800_000, // 1200 USD to COP
    type: "expense",
    cardId: 1,
  },
  {
    id: 8,
    icon: <ShoppingBag className="h-6 w-6 text-[#FF0000]" />,
    name: "Amazon Purchase",
    date: "28 January 2025, 06:30 PM",
    amount: 2000_000, // 500 USD to COP
    type: "expense",
    cardId: 2,
  },
  {
    id: 9,
    icon: <Apple className="h-6 w-6 text-[#424147]" />,
    name: "MacBook Pro",
    date: "28 January 2025, 01:30 PM",
    amount: 10000_000, // 2500 USD to COP
    type: "expense",
    cardId: 3,
  },
  {
    id: 10,
    icon: <Music2 className="h-6 w-6 text-[#1DB954]" />,
    name: "Spotify Annual",
    date: "1 January 2025, 02:25 PM",
    amount: 3980_000, // 995 USD to COP (variedad)
    type: "expense",
    cardId: 1,
  },
  {
    id: 11,
    icon: <Coffee className="h-6 w-6 text-[#654321]" />,
    name: "Starbucks",
    date: "2 January 2025, 09:15 AM",
    amount: 20_000, // 5 USD to COP
    type: "expense",
    cardId: 2,
  },
  {
    id: 12,
    icon: <ShoppingBag className="h-6 w-6 text-[#FF0000]" />,
    name: "Zara Payment",
    date: "3 January 2025, 03:45 PM",
    amount: 350_000, // 87.5 USD to COP
    type: "expense",
    cardId: 3,
  },
  {
    id: 13,
    icon: <ArrowRightLeft className="h-6 w-6 text-[#00B9FF]" />,
    name: "PayPal - Received",
    date: "4 January 2025, 11:20 AM",
    amount: 2400_000, // 600 USD to COP
    type: "income",
    cardId: 1,
  },
  {
    id: 14,
    icon: <Gamepad className="h-6 w-6 text-[#FF4500]" />,
    name: "Steam Purchase",
    date: "5 January 2025, 05:35 PM",
    amount: 160_000, // 40 USD to COP
    type: "expense",
    cardId: 2,
  },
  {
    id: 15,
    icon: <Music2 className="h-6 w-6 text-[#1DB954]" />,
    name: "Amazon Music",
    date: "6 January 2025, 02:25 PM",
    amount: 996_000, // 249 USD to COP (variedad)
    type: "expense",
    cardId: 3,
  },
  {
    id: 16,
    icon: <ArrowRightLeft className="h-6 w-6 text-[#00B9FF]" />,
    name: "Venmo - Sent",
    date: "7 January 2025, 10:15 AM",
    amount: 1200_000, // 300 USD to COP
    type: "expense",
    cardId: 1,
  },
  {
    id: 17,
    icon: <Croissant className="h-6 w-6 text-[#FFA500]" />,
    name: "Dinner at Croissant",
    date: "8 January 2025, 08:00 PM",
    amount: 100_000, // 25 USD to COP
    type: "expense",
    cardId: 2,
  },
  {
    id: 18,
    icon: <ArrowRightLeft className="h-6 w-6 text-[#00B9FF]" />,
    name: "Bank Transfer - Received",
    date: "9 January 2025, 09:00 AM",
    amount: 4000_000, // 1000 USD to COP
    type: "income",
    cardId: 3,
  },
  {
    id: 19,
    icon: <ShoppingBag className="h-6 w-6 text-[#FF0000]" />,
    name: "Nike Purchase",
    date: "10 January 2025, 04:30 PM",
    amount: 800_000, // 200 USD to COP
    type: "expense",
    cardId: 1,
  },
  {
    id: 20,
    icon: <Projector className="h-6 w-6 text-[#FFD700]" />,
    name: "Cinema Tickets",
    date: "11 January 2025, 07:45 PM",
    amount: 50_000, // 12.5 USD to COP
    type: "expense",
    cardId: 2,
  },
  {
    id: 21,
    icon: <ArrowRightLeft className="h-6 w-6 text-[#00B9FF]" />,
    name: "Freelance Payment - Received",
    date: "12 January 2025, 11:30 AM",
    amount: 16000_000, // 4000 USD to COP
    type: "income",
    cardId: 3,
  },
  {
    id: 22,
    icon: <ShoppingBag className="h-6 w-6 text-[#FF0000]" />,
    name: "Walmart Purchase",
    date: "13 January 2025, 03:00 PM",
    amount: 400_000, // 100 USD to COP
    type: "expense",
    cardId: 1,
  },
  {
    id: 23,
    icon: <ShoppingBag className="h-6 w-6 text-[#008000]" />,
    name: "Netflix Subscription",
    date: "14 January 2025, 02:25 PM",
    amount: 64_000, // 16 USD to COP
    type: "expense",
    cardId: 2,
  },

  {
    id: 24,
    icon: <ArrowRightLeft className="h-6 w-6 text-[#00B9FF]" />,
    name: "Bank Transfer - Sent",
    date: "15 January 2025, 09:00 AM",
    amount: 2000_000, // 500 USD to COP
    type: "expense",
    cardId: 2,
  },
  {
    id: 25,
    icon: <Music2 className="h-6 w-6 text-[#1DB954]" />,
    name: "Apple Music",
    date: "16 January 2025, 02:25 PM",
    amount: 996_000, // 249 USD to COP (variedad)
    type: "expense",
    cardId: 2,
  },
  {
    id: 26,
    icon: <ArrowRightLeft className="h-6 w-6 text-[#00B9FF]" />,
    name: "Stripe Payment - Received",
    date: "17 January 2025, 09:30 AM",
    amount: 9600_000, // 2400 USD to COP
    type: "expense",
    cardId: 2,
  },
];

const subscriptionsData = [
  {
    id: 1,
    name: "Spotify Premium",
    cost: 19_000,
    renewalDate: "2023-11-01",
    status: true,
    icon: <Music2 className="h-6 w-6 text-[#1DB954]" />,
  },
  {
    id: 2,
    name: "YouTube Premium",
    cost: 12_000,
    renewalDate: "2023-11-05",
    status: false,
    icon: <Projector className="h-6 w-6 text-[#FF0000]" />,
  },
  {
    id: 3,
    name: "Netflix",
    cost: 15_000,
    renewalDate: "2023-11-10",
    status: false,
    icon: <Projector className="h-6 w-6 text-[#E50914]" />,
  },
  {
    id: 4,
    name: "Amazon Prime",
    cost: 12_000,
    renewalDate: "2023-11-15",
    status: true,
    icon: <ShoppingBag className="h-6 w-6 text-[#FF9900]" />,
  },
  {
    id: 5,
    name: "Hulu",
    cost: 7_000,
    renewalDate: "2023-11-20",
    status: true,
    icon: <Projector className="h-6 w-6 text-[#3DBB3D]" />,
  },
];

const planningGoalsData = [
  {
    id: 1,
    title: "Buy a car",
    current: 25000,
    target: 47000,
    status: "active", // Agregado
    priority: "high", // Agregado
    createdAt: "2024-03-10T10:00:00Z", // Agregado
    updatedAt: "2024-03-10T10:00:00Z", // Agregado
    dueDate: "Dec 2025",
    description: "Saving to buy a new car for personal use.", // Agregado
    linkGoal: "https://www.ford.com.co/performance/mustang/",
    milestones: [
      // Agregado
      { title: "Research car models", completed: true },
      { title: "Save 50% of target amount", completed: false },
      { title: "Get insurance quotes", completed: false },
    ],
  },
  {
    id: 2,
    title: "Motorola Edge 50 Fusion",
    current: 15000,
    target: 50000,
    status: "active", // Agregado
    priority: "medium", // Agregado
    createdAt: "2024-03-10T10:00:00Z", // Agregado
    updatedAt: "2024-03-10T10:00:00Z", // Agregado
    dueDate: "Dec 2025",
    description: "Saving to purchase the latest Motorola smartphone.", // Agregado
    linkGoal:
      "https://www.ktronix.com/celular-motorola-edge-50-fusion-256gb-verde/p/840023261879?fuente=google&medio=cpc&campaign=KT_COL_MAX_PEF_CPC_AON_CEL_TLP_Celulares_PAC&keyword=&gad_source=1&gclid=Cj0KCQiAst67BhCEARIsAKKdWOl_tbaoz1uxTmnCwQOqRzED3OVtfCmI-j-uPaY7mTysDpspkrGVEh8aAvr7EALw_wcB",
    milestones: [
      // Agregado
      { title: "Research phone models", completed: true },
      { title: "Save 30% of target amount", completed: false },
      { title: "Compare prices from different stores", completed: false },
    ],
  },
  {
    id: 3,
    title: "Trip to Japan",
    current: 10000,
    target: 20000,
    status: "active", // Agregado
    priority: "medium", // Agregado
    createdAt: "2024-03-10T10:00:00Z", // Agregado
    updatedAt: "2024-03-10T10:00:00Z", // Agregado
    dueDate: "Jun 2026",
    description:
      "Saving for a dream trip to Japan to explore its culture and landmarks.", // Agregado
    linkGoal: "https://www.japan.travel/en/",
    milestones: [
      // Agregado
      { title: "Research travel destinations", completed: true },
      { title: "Save 50% of target amount", completed: false },
      { title: "Book flights and accommodations", completed: false },
    ],
  },
  {
    id: 4,
    title: "MacBook Pro M2",
    current: 20000,
    target: 60000,
    status: "active", // Agregado
    priority: "high", // Agregado
    createdAt: "2024-03-10T10:00:00Z", // Agregado
    updatedAt: "2024-03-10T10:00:00Z", // Agregado
    dueDate: "Dec 2026",
    description:
      "Saving to buy a new MacBook Pro for work and personal projects.", // Agregado
    linkGoal: "https://www.apple.com/macbook-pro-14-and-16/",
    milestones: [
      // Agregado
      { title: "Research MacBook models", completed: true },
      { title: "Save 30% of target amount", completed: false },
      { title: "Compare prices and configurations", completed: false },
    ],
  },
  {
    id: 5,
    title: "Home Gym Setup",
    current: 8000,
    target: 30000,
    status: "active", // Agregado
    priority: "medium", // Agregado
    createdAt: "2024-03-10T10:00:00Z", // Agregado
    updatedAt: "2024-03-10T10:00:00Z", // Agregado
    dueDate: "Sep 2025",
    description: "Saving to build a home gym for fitness and health.", // Agregado
    linkGoal: "https://www.roguefitness.com/garage-gym-builder",
    milestones: [
      // Agregado
      { title: "Research gym equipment", completed: true },
      { title: "Save 25% of target amount", completed: false },
      { title: "Purchase essential equipment", completed: false },
    ],
  },
  {
    id: 6,
    title: "Charity Fundraiser",
    current: 5000,
    target: 10000,
    status: "active", // Agregado
    priority: "high", // Agregado
    createdAt: "2024-03-10T10:00:00Z", // Agregado
    updatedAt: "2024-03-10T10:00:00Z", // Agregado
    dueDate: "Nov 2025",
    description: "Saving to organize a charity fundraiser for a good cause.", // Agregado
    linkGoal: "https://www.globalgiving.org/",
    milestones: [
      // Agregado
      { title: "Identify charity organization", completed: true },
      { title: "Reach 50% of fundraising goal", completed: false },
      { title: "Organize fundraising event", completed: false },
    ],
  },
];

export {
  balanceData,
  cardData,
  transactionsData,
  subscriptionsData,
  planningGoalsData,
};
