import React from "react";

// Import the logo images
import visaLogo from "../../../assets/visa.png";
import mastercardLogo from "../../../assets/mastercard.png";
import nubankLogo from "../../../assets/nubank.png";

const CreditCardLogo = ({ type }) => {
  const logos = {
    visa: <img src={visaLogo} alt="Visa" className="h-12 w-20" />,
    mastercard: (
      <img src={mastercardLogo} alt="Mastercard" className="h-12 w-20" />
    ),
    nubank: <img src={nubankLogo} alt="Visa" className="h-12 w-20" />,
  };

  return <div className="text-white">{logos[type]}</div>;
};

const CreditCard = ({ type, balance, cardNumber, expiryDate }) => {
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
      className={`w-full max-w-md bg-gradient-to-br ${cardStyles[type]} relative overflow-hidden rounded-2xl p-6 shadow-xl`}
    >
      {/* Líneas curvas de fondo */}
      <div className="absolute inset-0">
        <svg
          className="absolute h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 400 200"
        >
          <path
            d="M-100 150 C100 100, 300 200, 400 150"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="relative z-10">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <p className="mb-1 text-sm text-gray-200">Current Balance</p>
            <h2 className="text-2xl font-bold text-white">
              {formatBalance(balance)}
            </h2>
          </div>
          <CreditCardLogo type={type} />
        </div>

        <div className="mt-auto">
          <p className="mb-4 font-mono text-lg text-gray-200">
            {formatCardNumber(cardNumber)}
          </p>
          <p className="text-sm text-gray-200">Valid Thru: {expiryDate}</p>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
