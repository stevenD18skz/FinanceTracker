import React, { useState } from "react";
import CreditCard from "./CreditCard";
import { PlusCircle } from "lucide-react";

const ContendCards = ({ cardData }) => {
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

  return (
    <div className="rounded-xl bg-slate-500 shadow-md">
      {/* 
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="rounded-full bg-gray-200 p-2 text-gray-600 hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          &#8592;
        </button>

        <h3 className="mb-4 text-xl font-semibold text-gray-800">Cards</h3>

        <button
          onClick={nextSlide}
          disabled={currentSlide === cardData.length}
          className="rounded-full bg-gray-200 p-2 text-gray-600 hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          &#8594;
        </button>
      </div>*/}

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {cardData.map((card) => (
            <div
              key={card.cardNumber}
              className="w-full flex-shrink-0"
              style={{ minWidth: "100%" }}
            >
              <CreditCard {...card} />
            </div>
          ))}

          <div
            className="flex w-full flex-shrink-0 items-center justify-center px-2"
            style={{ minWidth: "100%" }}
          >
            <button className="flex w-full items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
              <div className="flex flex-col items-center text-gray-400 hover:text-gray-600">
                <PlusCircle className="mb-1 h-6 w-6" />
                <span className="text-sm">Add</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContendCards;
