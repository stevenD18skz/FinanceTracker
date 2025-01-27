import React from "react";
import { CreditCard as CreditCardIcon } from "lucide-react";

const CreditCardLogo = ({ type, isDarkMode }) => {
  const logos = {
    visa: (
      <div className="flex items-center font-bold text-white">
        <span className="text-2xl tracking-tighter">VISA</span>
      </div>
    ),
    mastercard: (
      <div className="flex items-center space-x-1">
        <div className="h-8 w-8 rounded-full bg-red-500 opacity-90"></div>
        <div className="-ml-4 h-8 w-8 rounded-full bg-yellow-500 opacity-90"></div>
      </div>
    ),
    nubank: (
      <div className="flex items-center font-bold text-white">
        <span className="text-2xl tracking-tighter">NU</span>
      </div>
    ),
  };

  return <div className="text-white">{logos[type]}</div>;
};

const CreditCard = ({
  type,
  balance,
  cardNumber,
  expiryDate,
  isDarkMode = true,
}) => {
  const cardStyles = {
    visa: isDarkMode
      ? "from-blue-500 via-blue-600 to-blue-700"
      : "from-blue-400 via-blue-500 to-blue-600",
    mastercard: isDarkMode
      ? "from-zinc-700 via-zinc-800 to-zinc-900"
      : "from-zinc-600 via-zinc-700 to-zinc-800",
    nubank: isDarkMode
      ? "from-purple-500 via-purple-600 to-purple-700"
      : "from-purple-400 via-purple-500 to-purple-600",
  };

  const formatCardNumber = (number) => {
    return number.match(/.{1,4}/g)?.join(" ") || number;
  };

  const formatBalance = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="perspective group">
      <div
        className={`w-full max-w-md bg-gradient-to-br ${cardStyles[type]} relative mx-auto mt-2 overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl`}
      >
        {/* Animated background patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="animate-spin-slow absolute h-[200%] w-[200%] rounded-full border-[80px] border-white/10"></div>
          <div className="absolute right-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-white/5 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/5 blur-3xl"></div>
        </div>

        {/* Card chip */}
        <div className="absolute left-6 top-6 h-10 w-12 rounded-md bg-yellow-200/90 p-1">
          <div className="h-full w-full bg-gradient-to-br from-yellow-300 to-yellow-400"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="mb-12 flex items-start justify-end">
            <CreditCardLogo type={type} isDarkMode={isDarkMode} />
          </div>

          <div className="mt-auto space-y-6">
            <p className="font-mono text-xl tracking-wider text-white/90">
              {formatCardNumber(cardNumber)}
            </p>

            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-white/60">Current Balance</p>
                <p className="text-2xl font-bold text-white">
                  {formatBalance(balance)}
                </p>
              </div>
              <div>
                <p className="text-xs text-white/60">Valid Thru</p>
                <p className="font-mono text-white">{expiryDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
