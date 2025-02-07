import React, { useState } from "react";
import PropTypes from "prop-types";

// LIBRARY IMPORTS
import { PlusCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// COMPONENTS IMPORT
import TitleContainer from "../ui/TitleContainer";

const CreditCardLogo = ({ type }) => {
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

  return (
    <div className="text-white">
      {logos[type] || (
        <div className="flex items-center font-bold text-white">
          <span className="text-2xl tracking-tighter">CARD</span>
        </div>
      )}
    </div>
  );
};

CreditCardLogo.propTypes = {
  type: PropTypes.string.isRequired,
};

const CreditCard = ({
  id,
  type,
  balance,
  cardNumber,
  expiryDate,
  onSelect,
}) => {
  const cardStyles = {
    visa: "from-blue-400 via-blue-500 to-blue-600",
    mastercard: "from-zinc-600 via-zinc-700 to-zinc-800",
    nubank: "from-purple-400 via-purple-500 to-purple-600",
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

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      onSelect(id);
    }
  };

  return (
    <div className="perspective group">
      <div
        className={`w-full max-w-md bg-gradient-to-br ${
          cardStyles[type] || "bg-gray-500"
        } relative mx-auto mt-2 overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg`}
        role="button"
        tabIndex={0}
        onClick={() => onSelect(id)}
        onKeyDown={handleKeyDown}
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
            <CreditCardLogo type={type} />
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

CreditCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  type: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
  cardNumber: PropTypes.string.isRequired,
  expiryDate: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

const CardsContainer = ({ cardData }) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < cardData.length) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const handleSelect = (id) => {
    navigate(`/wallets/?view=${id}`);
  };

  const handleCreateGoal = () => {
    navigate(`/wallets?create=1`);
  };

  return (
    <div className="rounded-xl bg-white p-4 transition-colors duration-300">
      <div className="mb-2 flex items-center justify-between">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          aria-label="Previous Slide"
          className="group p-3 transition-all disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600 transition-transform group-hover:translate-x-1 group-hover:scale-150 group-hover:text-indigo-600" />
        </button>

        <TitleContainer text={"My Cards"} />

        <button
          onClick={nextSlide}
          disabled={currentSlide === cardData.length}
          aria-label="Next Slide"
          className="group p-3 transition-all disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronRight className="h-5 w-5 text-gray-600 transition-transform group-hover:translate-x-1 group-hover:scale-150 group-hover:text-indigo-600" />
        </button>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-all duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {cardData.map((card) => (
            <div
              key={card.cardNumber}
              className="w-full flex-shrink-0 px-2"
              style={{ minWidth: "100%" }}
            >
              <CreditCard {...card} onSelect={handleSelect} />
            </div>
          ))}

          <div
            className="flex w-full flex-shrink-0 items-center justify-center px-2"
            style={{ minWidth: "100%" }}
          >
            <button
              onClick={handleCreateGoal}
              className="group flex h-56 w-full items-center justify-center rounded-3xl border-2 border-dashed border-gray-300 bg-gray-100/50 p-4 transition-all hover:border-gray-400 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center text-gray-400 transition-colors group-hover:text-gray-600">
                <PlusCircle className="mb-2 h-8 w-8 transition-transform group-hover:scale-110" />
                <span className="text-sm font-medium">Add New Card</span>
              </div>
            </button>
          </div>
        </div>

        {/* Progress indicators */}
        <div className="mt-4 flex justify-center space-x-2">
          {[...Array(cardData.length + 1)].map((_, index) => (
            <button
              key={index}
              aria-label={`Slide ${index + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                currentSlide === index ? "w-4 bg-gray-800" : "w-1.5 bg-gray-300"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

CardsContainer.propTypes = {
  cardData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      type: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
      cardNumber: PropTypes.string.isRequired,
      expiryDate: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default CardsContainer;
