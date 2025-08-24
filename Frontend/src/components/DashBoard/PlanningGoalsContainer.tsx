import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  TrendingUp,
  Target,
  Award,
  Trophy,
  Rocket,
  Timer,
  MoreHorizontal,
  Pencil,
  PlusIcon,
  PackageOpen,
  ChevronRight,
  Eye,
  Car,
} from "lucide-react";

// Types
import { Goal } from "../../types/goal";

// Datos y utils
import { userData } from "../../utils/Data";
import { convertAndFormat } from "../../utils/formatters";

// Styles
import "./PlanningGoalsContainer.css";
import { useCurrency } from "../../context/CurrencyContext.jsx"; // 👈 Importa el hook

type GoalItemProps = {
  goal: Goal;
  isMenuOpen: boolean;
  toggleMenu: (id: number) => void;
};

const GoalItem = ({ goal, isMenuOpen, toggleMenu }: GoalItemProps) => {
  const [showMenu, setShowMenu] = useState(isMenuOpen);
  const [formattedBalance, setFormattedBalance] = useState("");
  const [formattedTarget, setFormattedTarget] = useState("");
  const [formattedRemaining, setFormattedRemaining] = useState("");

  const { selectedCurrency } = useCurrency();

  useEffect(() => {
    const formatBalance = async () => {
      const formatted = await convertAndFormat(
        goal.current,
        selectedCurrency.code,
      );
      const formattedTarget = await convertAndFormat(
        goal.target,
        selectedCurrency.code,
      );
      const formattedRemaining = await convertAndFormat(
        {
          amount: goal.target.amount - goal.current.amount,
          currency: goal.target.currency,
        },
        selectedCurrency.code,
      );
      setFormattedTarget(formattedTarget);
      setFormattedBalance(formatted);
      setFormattedRemaining(formattedRemaining);
    };
    formatBalance();
  }, [selectedCurrency]);

  // Cuando la prop isMenuOpen cambie, gestionamos el estado local para el renderizado del menú.
  useEffect(() => {
    if (isMenuOpen) {
      setShowMenu(true);
    } else {
      // Esperamos 300ms (duración de la animación) antes de ocultar el menú
      const timeout = setTimeout(() => setShowMenu(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isMenuOpen]);

  const progress = (goal.current.amount / goal.target.amount) * 100;

  const isCompleted = progress >= 100;

  const getProgressColor = (progressValue: number) => {
    if (progressValue >= 100) return "bg-[--green-strong]";
    if (progressValue >= 75) return "bg-[--green]";
    if (progressValue >= 50) return "bg-[--yellow]";
    if (progressValue >= 25) return "bg-[--orange]";
    return "bg-[--red]";
  };

  const getMotivationalIcon = (progressValue: number) => {
    if (progressValue >= 100)
      return <Trophy className="h-5 w-5 text-[--green-strong]" />;
    if (progressValue >= 75)
      return <Award className="h-5 w-5 text-[--green]" />;
    if (progressValue >= 50)
      return <Rocket className="h-5 w-5 text-[--yellow]" />;
    if (progressValue >= 25)
      return <Target className="h-5 w-5 text-[--orange]" />;
    return <Timer className="h-5 w-5 text-[--red]" />;
  };

  const getMotivationalMessage = (progressValue: number) => {
    if (progressValue >= 100) return "Amazing achievement! 🎉";
    if (progressValue >= 75) return "Almost there! 🚀";
    if (progressValue >= 50) return "Halfway there! 💪";
    if (progressValue >= 25) return "Great start! 👏";
    return "Let's get started! 🎯";
  };

  return (
    <div className="group relative rounded-xl p-[--spacing-medium] space-y-[--spacing-medium] shadow-md transition-all duration-[--duration-standard]  hover:shadow-xl hover:scale-105">
      <div className="flex items-center justify-between">
        {/* Top Rigth */}
        <div className="flex items-center gap-[--spacing-small]">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl ${getProgressColor(progress)}`}
            aria-hidden="true"
          >
            <Car className="h-6 w-6 text-[--text-primary]" />
          </div>

          <div>
            <div className="flex items-center gap-[--spacing-small]">
              <Link
                to={`/goals/${goal.id}`}
                className="cursor-pointer flex items-center justify-center  text-xl font-semibold text-[--text-primary] transition-all duration-[--duration-standard] hover:text-[--button-primary] hover:underline"
              >
                {goal.title}
              </Link>
            </div>

            <div className="flex items-center gap-[--spacing-small]">
              <TrendingUp className="h-4 w-4 text-[--text-primary]" />

              <p className="text-[--text-primary]">
                <span className="text-base font-medium text-[--text-primary]">
                  {formattedBalance}
                </span>
                {" / "}
                <span className="text-sm text-[--text-secondary]">
                  {formattedTarget}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Menú de puntos suspensivos */}
        <div className="relative">
          <button
            className="rounded-lg p-2 ext-[--text-primary] transition-all duration-[--duration-standard]
            hover:text-[--button-primary] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[--button-primary-active] focus:ring-offset-2 focus:text-[--button-primary-active]"
            onClick={() => toggleMenu(goal.id)}
            aria-label="Open menu"
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>

          {showMenu && (
            <div
              className={`absolute right-0 mt-2 w-48 rounded-xl p-1 bg-[--background-card] shadow-lg ring-1 ring-black ring-opacity-5 text-[--text-primary ${
                isMenuOpen ? "animate-fadeInScale" : "animate-fadeOutScale"
              }`}
            >
              <ul className="py-1">
                <li>
                  <Link
                    to={goal.linkGoal}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-lg px-4 py-2 text-sm text-[--text-primary] transition-all duration-[--duration-slow] hover:bg-[--background-card-hover] hover:text-[--button-primary-hover] hover:underline"
                  >
                    Check Online
                    <ArrowUpRight className="h-5 w-5  " />
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/goals/${goal.id}/edit`}
                    className="group flex items-center justify-between rounded-lg px-4 py-2 text-sm text-[--text-primary] transition-all duration-[--duration-slow] hover:bg-[--background-card-hover] hover:text-[--button-primary-hover]  hover:underline"
                  >
                    Edit Item
                    <Pencil className="h-4 w-4" />
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/goals/${goal.id}/add-amount`}
                    className="group flex items-center justify-between rounded-lg px-4 py-2 text-sm text-[--text-primary] transition-all duration-[--duration-slow] hover:bg-[--background-card-hover] hover:text-[--button-primary-hover]  hover:underline"
                  >
                    Add Amount
                    <PlusIcon className="h-4 w-4" />
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-[--spacing-small]">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-[--spacing-small]">
            {getMotivationalIcon(progress)}
            <span className="font-medium text-[--text-primary]">
              {progress.toFixed(1)}% Complete
            </span>
          </div>

          {goal.dueDate && (
            <span className="text-gray-500">Due {goal.dueDate}</span>
          )}
        </div>

        <div className="h-2.5 overflow-hidden rounded-full bg-[--background-card]">
          <div
            className={`h-full rounded-full transition-all duration-[--duration-standard] ease-out ${getProgressColor(
              progress,
            )}`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>

      <div
        className={`flex items-center justify-between text-base ${
          isCompleted ? "text-[--green-strong]" : "text-[--text-primary]"
        }`}
      >
        <span className="">
          {isCompleted
            ? "Goal Completed! 🎉"
            : `${formattedRemaining.toLocaleString()} to go`}
        </span>

        <span className="font-medium">{getMotivationalMessage(progress)}</span>
      </div>
    </div>
  );
};

type PlanningGoalsContainerProps = {
  planningGoalsData: Goal[];
};

const PlanningGoalsContainer = ({
  planningGoalsData,
}: PlanningGoalsContainerProps) => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const toggleMenu = (goalId: number) => {
    if (openMenuId === goalId) {
      setOpenMenuId(null);
    } else {
      setOpenMenuId(goalId);
    }
  };

  return (
    <section className="rounded-xl bg-[var(--section-dashboard)] p-[--spacing-big] space-y-[--spacing-medium]">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold text-[--text-title]">My Goals</h2>
        <Link
          to="/planning-goals"
          className="text-base font-semibold text-[--button-primary] transition-all duration-[--duration-standard] hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="planning-list custom-scrollbar">
        {planningGoalsData && planningGoalsData.length > 0 ? (
          planningGoalsData.map((goal) => (
            <GoalItem
              key={goal.id}
              goal={goal}
              isMenuOpen={openMenuId === goal.id}
              toggleMenu={toggleMenu}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center my-auto text-[--text-secondary]">
            <PackageOpen className="h-24 w-24" />
            <p className="text-[--text-secondary] text-lg font-semibold">
              No goals found for the selected filter.
            </p>
            <Link
              to="/planning-goals?create=1"
              className="flex items-center text-base font-medium text-[--button-primary]
              transition-all duration-[--duration-standard] hover:underline"
            >
              Create your first goal
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default PlanningGoalsContainer;
