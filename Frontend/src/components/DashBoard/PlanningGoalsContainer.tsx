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
} from "lucide-react";

// Types
import { Goal } from "../../types/goal";

// Styles
import "./PlanningGoalsContainer.css";

type GoalItemProps = {
  goal: Goal;
  isMenuOpen: boolean;
  toggleMenu: (id: number) => void;
};

const GoalItem = ({ goal, isMenuOpen, toggleMenu }: GoalItemProps) => {
  const [showMenu, setShowMenu] = useState(isMenuOpen);

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

  const progress = (goal.current / goal.target) * 100;
  const remaining = goal.target - goal.current;
  const isCompleted = progress >= 100;

  const getProgressColor = (progressValue: number) => {
    if (progressValue >= 100) return "bg-green-500";
    if (progressValue >= 75) return "bg-blue-500";
    if (progressValue >= 50) return "bg-yellow-500";
    return "bg-indigo-500";
  };

  const getMotivationalIcon = (progressValue: number) => {
    if (progressValue >= 100)
      return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (progressValue >= 75) return <Award className="h-5 w-5 text-blue-500" />;
    if (progressValue >= 50)
      return <Rocket className="h-5 w-5 text-purple-500" />;
    if (progressValue >= 25)
      return <Target className="h-5 w-5 text-indigo-500" />;
    return <Timer className="h-5 w-5 text-gray-500" />;
  };

  const getMotivationalMessage = (progressValue: number) => {
    if (progressValue >= 100) return "Amazing achievement! 🎉";
    if (progressValue >= 75) return "Almost there! 🚀";
    if (progressValue >= 50) return "Halfway there! 💪";
    if (progressValue >= 25) return "Great start! 👏";
    return "Let's get started! 🎯";
  };

  return (
    <div className="group relative rounded-2xl p-[--spacing-medium] shadow-md transition-all duration-[--duration-standard] hover:bg-gray-200 hover:shadow-lg  ">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100"
            aria-hidden="true"
          >
            🚗
          </div>

          <div>
            <div className="mb-1 flex items-center gap-2">
              <Link
                to={`/goals/${goal.id}`}
                className="cursor-pointer text-lg font-semibold text-gray-800 transition-all duration-300 hover:text-indigo-600 hover:underline"
              >
                {goal.title}
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-gray-400" />
              <p className="text-sm text-gray-500">
                <span className="font-medium text-gray-700">
                  ${goal.current.toLocaleString()}
                </span>
                {" / "}
                <span className="text-gray-500">
                  ${goal.target.toLocaleString()}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Menú de puntos suspensivos */}
        <div className="relative">
          <button
            className="rounded-lg p-2 transition-colors hover:bg-gray-100 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => toggleMenu(goal.id)}
            aria-label="Open menu"
          >
            <MoreHorizontal className="h-5 w-5 text-gray-400 transition-all duration-300 hover:text-indigo-600" />
          </button>

          {showMenu && (
            <div
              className={`absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 ${
                isMenuOpen ? "animate-fadeInScale" : "animate-fadeOutScale"
              }`}
            >
              <ul className="py-1">
                <li>
                  <a
                    href={goal.linkGoal}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Check Online
                    <ArrowUpRight className="h-4 w-4 text-gray-400" />
                  </a>
                </li>
                <li>
                  <Link
                    to={`/goals/${goal.id}/edit`}
                    className="flex w-full items-center justify-between px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Edit Item
                    <Pencil className="h-4 w-4 text-gray-400" />
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/goals/${goal.id}/add-amount`}
                    className="flex w-full items-center justify-between px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Add Amount
                    <PlusIcon className="h-4 w-4 text-gray-400" />
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="mb-2">
        <div className="mb-1 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            {getMotivationalIcon(progress)}
            <span className="font-medium text-gray-700">
              {progress.toFixed(1)}% Complete
            </span>
          </div>
          {goal.dueDate && (
            <span className="text-gray-500">Due {goal.dueDate}</span>
          )}
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${getProgressColor(
              progress,
            )}`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">
          {isCompleted ? (
            <span className="text-green-600">Goal Completed! 🎉</span>
          ) : (
            <>${remaining.toLocaleString()} to go</>
          )}
        </span>
        <span
          className={`font-medium ${
            isCompleted ? "text-green-600" : "text-gray-600"
          }`}
        >
          {getMotivationalMessage(progress)}
        </span>
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
          <div className="flex flex-col items-center justify-center my-auto text-[--text-primary]">
            <PackageOpen className="h-24 w-24" />
            <p className="text-[--text-primary] text-lg font-semibold">
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
