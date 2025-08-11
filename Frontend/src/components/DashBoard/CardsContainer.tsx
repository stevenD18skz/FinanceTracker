import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, ChevronLeft, ChevronRight } from "lucide-react";

import { userData } from "../../utils/Data";
import { convertAndFormat } from "../../utils/formatters";

//Types
import { Wallet } from "../../types/wallet";

type CreditCardLogoProps = {
  typeCard: string;
};

const CreditCardLogo = ({ typeCard }: CreditCardLogoProps) => {
  const logos = {
    bancoColombia: (
      <div className="flex items-center font-bold text-white">
        <span className="text-2xl tracking-tighter">BANCO</span>
      </div>
    ),
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
      {logos[typeCard] || (
        <div className="flex items-center font-bold text-white">
          <span className="text-2xl tracking-tighter">CARD</span>
        </div>
      )}
    </div>
  );
};

type CreditCardProps = {
  card: Wallet;
  onSelect: (id: number) => void;
};

const CreditCard = ({ card, onSelect }: CreditCardProps) => {
  const [formattedBalance, setFormattedBalance] = useState("");

  const cardStyles = {
    bancoColombia: "from-yellow-400 via-yellow-500 to-yellow-600",
    visa: "from-blue-400 via-blue-500 to-blue-600",
    mastercard: "from-zinc-600 via-zinc-700 to-zinc-800",
    nubank: "from-purple-400 via-purple-500 to-purple-600",
  };

  const formatCardNumber = (number: string) => {
    return number.match(/.{1,4}/g)?.join(" ") || number;
  };

  useEffect(() => {
    const formatBalance = async () => {
      const formatted = await convertAndFormat(
        card.balance,
        userData.currency.code,
      );

      console.log(formatted);
      setFormattedBalance(formatted);
    };
    formatBalance();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      onSelect(card.id);
    }
  };

  return (
    <div className=" ">
      <div
        className={`w-full max-w-md bg-gradient-to-br ${
          cardStyles[card.type] || "bg-gray-500"
        } relative mx-auto mt-2 overflow-hidden rounded-3xl p-6  duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg`}
        role="button"
        tabIndex={0}
        onClick={() => onSelect(card.id)}
        onKeyDown={(e) => handleKeyDown(e)}
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
            <CreditCardLogo typeCard={card.type} />
          </div>

          <div className="mt-auto space-y-6">
            <p className="font-mono text-xl tracking-wider text-white/90">
              {formatCardNumber(card.cardNumber)}
            </p>

            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-white/60">Current Balance</p>
                <p className="text-2xl font-bold text-white">
                  {formattedBalance}
                </p>
              </div>
              <div>
                <p className="text-xs text-white/60">Valid Thru</p>
                <p className="font-mono text-white">{card.expiryDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type CardsContainerProps = {
  cardData: Wallet[];
};

export default function CardsContainer({
  cardData,
}: Readonly<CardsContainerProps>) {
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

  const handleSelect = (id: number) => {
    navigate(`/wallets/?view=${id}`);
  };

  const handleCreateGoal = () => {
    navigate(`/wallets?create=1`);
  };

  return (
    <section className="rounded-xl bg-[var(--section-dashboard)] p-[--spacing-big] space-y-[--spacing-medium]">
      <div className="flex items-center justify-between">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          aria-label="Previous Slide"
          className="group p-[--spacing-big] disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft className="h-5 w-5 text-[--button-primary] group-hover:scale-150 group-hover:text-[--button-primary-hover] transition-transform duration-[--duration-standard]" />
        </button>

        <h2 className="text-2xl font-bold text-[--text-title]">My Cards</h2>

        <button
          onClick={nextSlide}
          disabled={currentSlide === cardData.length}
          aria-label="Next Slide"
          className="group p-[--spacing-big] disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronRight className="h-5 w-5 text-[--button-primary] group-hover:scale-150 group-hover:text-[--button-primary-hover] transition-transform duration-[--duration-standard]" />
        </button>
      </div>

      {/* Cards indicators */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-[--duration-slow]"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {cardData.map((card) => (
            <div
              key={card.cardNumber}
              className="w-full flex-shrink-0 px-2"
              style={{ minWidth: "100%" }}
            >
              <CreditCard card={card} onSelect={handleSelect} />
            </div>
          ))}

          <div
            className="flex w-full flex-shrink-0 items-center justify-center px-2"
            style={{ minWidth: "100%" }}
          >
            <button
              onClick={handleCreateGoal}
              className="group flex h-56 w-full items-center justify-center rounded-3xl border-2 border-dashed border-gray-300 bg-gray-100/50 p-4  hover:border-gray-400 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center text-gray-400 transition-colors group-hover:text-gray-600">
                <PlusCircle className="mb-2 h-8 w-8 transition-transform group-hover:scale-110" />
                <span className="text-sm font-medium">Add New Card</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Progress indicators */}
      <div className=" flex justify-center items-center gap-[--spacing-medium]">
        {cardData.map((card, index) => (
          <button
            key={card.id}
            aria-label={`Slide ${index + 1}`}
            className={`h-2 rounded-full  ${
              currentSlide === index
                ? "w-4 bg-[--button-primary-active] transition-all duration-[--duration-standard] hover:bg-[--button-primary-hover]"
                : "w-2 bg-[--button-primary] transition-all duration-[--duration-standard] hover:bg-[--button-primary-hover]"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
        <button
          aria-label={`Slide ${cardData.length + 1}`}
          className={`h-2 rounded-full  ${
            currentSlide === cardData.length
              ? "w-4 bg-[--button-primary-active] transition-all duration-[--duration-standard] hover:bg-[--button-primary-hover]"
              : "w-2 bg-[--button-primary] transition-all duration-[--duration-standard] hover:bg-[--button-primary-hover]"
          }`}
          onClick={() => setCurrentSlide(cardData.length)}
        />
      </div>
    </section>
  );
}
