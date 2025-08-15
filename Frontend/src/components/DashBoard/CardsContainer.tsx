import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlusCircle, ChevronLeft, ChevronRight } from "lucide-react";

//Types
import { Wallet } from "../../types/wallet";

//Utils
import { convertAndFormat } from "../../utils/formatters";

//Data
import { useCurrency } from "../../context/CurrencyContext.jsx";

type CreditCardProps = {
  card: Wallet;
};

const CreditCard = ({ card }: CreditCardProps) => {
  const [formattedBalance, setFormattedBalance] = useState("");
  const { selectedCurrency } = useCurrency(); // 👈 Usa el contexto para obtener la moneda

  useEffect(() => {
    const formatBalance = async () => {
      const formatted = await convertAndFormat(
        card.balance,
        selectedCurrency.code,
      );
      setFormattedBalance(formatted);
    };
    formatBalance();
  }, [card.balance, selectedCurrency]);

  const bankStyles = {
    Bancolombia: "from-yellow-400 via-yellow-500 to-yellow-600",
    Nequi: "from-blue-400 via-blue-500 to-blue-600",
    NuBank: "from-purple-600 via-purple-700 to-purple-800",
    LuloBank: "from-emerald-400 via-emerald-500 to-emerald-600",
  };

  const formatCardNumber = (number: string) => {
    return number.match(/.{1,4}/g)?.join(" ") || number;
  };

  return (
    <div className="w-full flex-shrink-0 px-[--spacing-medium]">
      <Link
        to={`/wallet/${card.id}`}
        className={`relative block w-ful bg-gradient-to-br ${bankStyles[card.bank]} rounded-3xl space-y-[--spacing-big] p-[--spacing-big] overflow-hidden`}
      >
        {/* Card chip and type */}
        <div className="flex items-center justify-between">
          <div className="h-12 w-12 rounded-md bg-amber-200 p-1">
            <div className="h-full w-full bg-gradient-to-br from-amber-300 to-amber-400" />
          </div>

          <div className=" flex items-center justify-start">
            <img
              src={`./cards/${card.type}-Logo.png`}
              alt={`${card.type} Logo`}
              className="h-12"
            />
          </div>
        </div>

        {/* Current balance and valid thru */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-base italic text-[--text-secondary]">
              Current Balance
            </p>
            <p className="text-4xl font-bold text-[--text-primary]">
              {formattedBalance}
            </p>
          </div>
          <div>
            <p className="text-base italic text-[--text-secondary]">
              Valid Thru
            </p>
            <p className="text-2xl text-[--text-primary]">{card.expiryDate}</p>
          </div>
        </div>

        {/* number of cards */}
        <p className=" text-2xl tracking-wider text-[--text-primary]">
          {formatCardNumber(card.cardNumber)}
        </p>

        {/* Card Bank */}
        <div className=" flex items-center justify-end">
          <img
            src={`./cards/${card.bank}-Logo.png`}
            alt={`${card.bank} Logo`}
            className="h-12"
          />
        </div>
      </Link>
    </div>
  );
};

type CardsContainerProps = {
  cardData: Wallet[];
};

export default function CardsContainer({
  cardData,
}: Readonly<CardsContainerProps>) {
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
    <section className="rounded-xl bg-[var(--section-dashboard)] p-[--spacing-big] space-y-[--spacing-medium]">
      <div className="flex items-center justify-between">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          aria-label="Previous Slide"
          className="group p-[--spacing-big] disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft className="h-8 w-8 text-[--button-primary] group-hover:scale-150 group-hover:text-[--button-primary-hover] transition-transform duration-[--duration-standard]" />
        </button>

        <h2 className="text-4xl font-bold text-[--text-title]">My Cards</h2>

        <button
          onClick={nextSlide}
          disabled={currentSlide === cardData.length}
          aria-label="Next Slide"
          className="group p-[--spacing-big] disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronRight className="h-8 w-8 text-[--button-primary] group-hover:scale-150 group-hover:text-[--button-primary-hover] transition-transform duration-[--duration-standard]" />
        </button>
      </div>

      {/* Cards indicators */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-[--duration-slow]"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {cardData.map((card) => (
            <CreditCard key={card.id} card={card} />
          ))}

          <Link
            to={`/wallets?create=1`}
            className=" 
            min-w-full group flex flex-shrink-0 items-center justify-center rounded-3xl
            border-2 border-dashed bg-[--button-secondary] border-[--button-secondary-text]
            transition-colors duration-[--duration-standard] hover:bg-[--button-secondary-hover] hover:border-[--button-secondary-text-hover]
            "
          >
            <div className="flex flex-col items-center text-[--button-secondary-text] transition-all duration-[--duration-standard] group-hover:text-[--button-secondary-text-hover] ">
              <PlusCircle className="mb-2 h-8 w-8 transition-transform duration-[--duration-standard] group-hover:scale-125" />
              <span className="text-lg font-medium">Add New Card</span>
            </div>
          </Link>
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
                : "w-2 bg-[--text-subtitle] transition-all duration-[--duration-standard] hover:bg-[--button-primary-hover]"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
        <button
          aria-label={`Slide ${cardData.length + 1}`}
          className={`h-2 rounded-full  ${
            currentSlide === cardData.length
              ? "w-4 bg-[--button-primary-active] transition-all duration-[--duration-standard] hover:bg-[--button-primary-hover]"
              : "w-2 bg-[--text-subtitle] transition-all duration-[--duration-standard] hover:bg-[--button-primary-hover]"
          }`}
          onClick={() => setCurrentSlide(cardData.length)}
        />
      </div>
    </section>
  );
}
