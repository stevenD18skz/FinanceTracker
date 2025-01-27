import React, { useState } from "react";
import CreditCard from "./CreditCard";
import { PlusCircle, ChevronLeft, ChevronRight, Sun, Moon } from "lucide-react";

const ContendCards = ({ cardData }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`rounded-xl ${isDarkMode ? "bg-slate-800" : "bg-white"} p-6 transition-colors duration-300`}
    >
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`group rounded-full ${isDarkMode ? "bg-slate-700/50 hover:bg-slate-600" : "bg-gray-200 hover:bg-gray-300"} p-3 transition-all disabled:cursor-not-allowed disabled:opacity-30`}
        >
          <ChevronLeft
            className={`h-5 w-5 ${isDarkMode ? "text-white" : "text-gray-600"} transition-transform group-hover:-translate-x-0.5`}
          />
        </button>

        <div className="flex items-center gap-4">
          <h3
            className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}
          >
            My Cards
          </h3>
          {/*  
          <button
            onClick={toggleTheme}
            className={`rounded-full ${isDarkMode ? "bg-slate-700/50 hover:bg-slate-600" : "bg-gray-200 hover:bg-gray-300"} p-2 transition-all`}
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-white" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </button>
          */}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === cardData.length}
          className={`group rounded-full ${isDarkMode ? "bg-slate-700/50 hover:bg-slate-600" : "bg-gray-200 hover:bg-gray-300"} p-3 transition-all disabled:cursor-not-allowed disabled:opacity-30`}
        >
          <ChevronRight
            className={`h-5 w-5 ${isDarkMode ? "text-white" : "text-gray-600"} transition-transform group-hover:translate-x-0.5`}
          />
        </button>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-all duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {cardData.map((card, index) => (
            <div
              key={card.cardNumber}
              className="w-full flex-shrink-0 px-2"
              style={{ minWidth: "100%" }}
            >
              <CreditCard {...card} isDarkMode={isDarkMode} />
            </div>
          ))}

          <div
            className="flex w-full flex-shrink-0 items-center justify-center px-2"
            style={{ minWidth: "100%" }}
          >
            <button
              className={`group flex h-64 w-full items-center justify-center rounded-3xl border-2 border-dashed ${
                isDarkMode
                  ? "border-slate-600 bg-slate-700/20 hover:border-slate-500 hover:bg-slate-700/30"
                  : "border-gray-300 bg-gray-100/50 hover:border-gray-400 hover:bg-gray-100"
              } p-4 transition-all`}
            >
              <div
                className={`flex flex-col items-center ${
                  isDarkMode
                    ? "text-slate-400 group-hover:text-slate-300"
                    : "text-gray-400 group-hover:text-gray-600"
                } transition-colors`}
              >
                <PlusCircle className="mb-2 h-8 w-8 transition-transform group-hover:scale-110" />
                <span className="text-sm font-medium">Add New Card</span>
              </div>
            </button>
          </div>
        </div>

        {/* Progress indicators */}
        <div className="mt-6 flex justify-center space-x-2">
          {[...Array(cardData.length + 1)].map((_, index) => (
            <button
              key={index}
              className={`h-1.5 rounded-full transition-all ${
                currentSlide === index
                  ? `w-4 ${isDarkMode ? "bg-white" : "bg-gray-800"}`
                  : `w-1.5 ${isDarkMode ? "bg-slate-600" : "bg-gray-300"}`
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContendCards;
