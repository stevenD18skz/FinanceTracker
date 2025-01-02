import React from "react";
import Card from "./Card";

import { PlusCircle } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const ContendCards = ({ cardData }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className=" ">
      <h3 className="mb-2 text-xl font-semibold text-gray-800">Cards</h3>

      <Slider {...settings} className="flex w-full space-x-6">
        {cardData.map((card) => (
          <Card key={card.cardNumber} {...card} />
        ))}

        <div>
          <button className="flex w-full items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
            <div className="flex flex-col items-center text-gray-400 hover:text-gray-600">
              <PlusCircle className="mb-1 h-6 w-6" />
              <span className="text-sm">Add</span>
            </div>
          </button>
        </div>
      </Slider>
    </div>
  );
};

export default ContendCards;
