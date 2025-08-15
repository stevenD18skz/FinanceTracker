import { useState } from "react";

// Importacion utils
import { cardData, transactionsData } from "../../utils/Data.js";

// Importacion de Iconos
import {
  Plus,
  ChevronDown,
  ChevronUp,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const WalletPage = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [showCardNumber, setShowCardNumber] = useState<{
    [key: number]: boolean;
  }>({});
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatCardNumber = (number: string) => {
    return number.match(/.{1,4}/g)?.join(" ") || number;
  };

  const toggleCardNumber = (cardId: number) => {
    setShowCardNumber((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  const toggleCardExpand = (cardId: number) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
    setSelectedCard(cardId);
  };

  const getCardTransactions = (cardId: number) => {
    return transactionsData.filter(
      (transaction) => transaction.cardId === cardId,
    );
  };

  const getCardLogo = (type: string) => {
    switch (type.toLowerCase()) {
      case "visa":
        return "💳 Visa";
      case "mastercard":
        return "💳 Mastercard";
      case "nubank":
        return "💜 Nubank";
      default:
        return "💳";
    }
  };

  const getCardColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "visa":
        return "from-blue-500 to-blue-600";
      case "mastercard":
        return "from-orange-500 to-red-500";
      case "nubank":
        return "from-purple-500 to-purple-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  return (
    <div className="min-h-screen   p-8 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Wallets</h1>
          <button className="flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm transition-colors hover:bg-indigo-600">
            <Plus className="h-4 w-4" />
            Add New Card
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cardData.map((card) => (
            <div key={card.id} className="space-y-4">
              <div
                className={`relative rounded-xl bg-gradient-to-r p-6 ${getCardColor(card.type)} transform cursor-pointer transition-all duration-300 hover:scale-105`}
                onClick={() => toggleCardExpand(card.id)}
              >
                <div className="mb-4 flex items-start justify-between">
                  <span className="text-lg font-semibold">
                    {getCardLogo(card.type)}
                  </span>
                  {expandedCard === card.id ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </div>
                <div className="mb-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm opacity-80">Card Number</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCardNumber(card.id);
                      }}
                      className="rounded-full p-1 transition-colors hover:bg-white/10"
                    >
                      {showCardNumber[card.id] ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <span className="font-mono text-lg">
                    {showCardNumber[card.id]
                      ? formatCardNumber(card.cardNumber)
                      : "•••• •••• •••• " + card.cardNumber.slice(-4)}
                  </span>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-sm opacity-80">Balance</span>
                    <p className="text-xl font-bold">
                      {formatCurrency(card.balance.amount)}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm opacity-80">Expires</span>
                    <p className="font-mono">{card.expiryDate}</p>
                  </div>
                </div>
                <div className="absolute right-4 top-4 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <button className="rounded-full p-1 transition-colors hover:bg-white/10">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="rounded-full p-1 transition-colors hover:bg-white/10">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {expandedCard === card.id && (
                <div className="animate-fadeIn rounded-xl bg-[#262b38] p-6">
                  <h3 className="mb-4 text-lg font-semibold">
                    Recent Transactions
                  </h3>
                  <div className="space-y-4">
                    {getCardTransactions(card.id)
                      .slice(0, 5)
                      .map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-[#1a1f2e]"
                        >
                          <div className="flex items-center gap-3">
                            <div className="rounded-full bg-[#1a1f2e] p-2">
                              {transaction.icon}
                            </div>
                            <div>
                              <p className="font-medium">{transaction.name}</p>
                              <p className="text-sm text-gray-400">
                                {transaction.date}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-sm font-medium ${
                                transaction.type === "income"
                                  ? "text-green-400"
                                  : "text-red-400"
                              }`}
                            >
                              {transaction.type === "income" ? "+" : "-"}
                              {formatCurrency(transaction.amount)}
                            </span>
                            {transaction.type === "income" ? (
                              <ArrowUpRight className="h-4 w-4 text-green-400" />
                            ) : (
                              <ArrowDownRight className="h-4 w-4 text-red-400" />
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                  <button className="mt-4 w-full text-center text-sm text-indigo-400 transition-colors hover:text-indigo-300">
                    View All Transactions
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
