import React from "react";
import CardLogo from "./CardLogo";

const Card = ({ type, balance, cardNumber, expiryDate }) => {
  const cardStyles = {
    visa: "from-blue-600 to-blue-900",
    mastercard: "from-slate-600 to-slate-950",
    nubank: "from-purple-600 to-purple-900",
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
    <div
      className={`w-full max-w-md bg-gradient-to-br ${cardStyles[type]} rounded-2xl p-6 shadow-xl`}
    >
      <div className="mb-8 flex items-start justify-between">
        <div>
          <p className="mb-1 text-sm text-gray-200">Current Balance</p>
          <h2 className="text-2xl font-bold text-white">
            {formatBalance(balance)}
          </h2>
        </div>
        <CardLogo type={type} />
      </div>

      <div className="mt-auto">
        <p className="mb-4 font-mono text-lg text-gray-200">
          {formatCardNumber(cardNumber)}
        </p>
        <p className="text-sm text-gray-200">Valid Thru: {expiryDate}</p>
      </div>
    </div>
  );
};

export default Card;
