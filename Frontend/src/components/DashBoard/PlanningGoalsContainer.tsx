import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
} from "lucide-react";

// Types
import { Goal } from "../../types/goal";

// COMPONENT IMPORT
import TitleContainer from "../ui/TitleContainer";

import "./PlanningGoalsContainer.css";

type GoalItemProps = {
  goal: Goal;
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onAddAmount: (id: number) => void;
  isMenuOpen: boolean;
  toggleMenu: (id: number) => void;
};

const GoalItem = ({
  goal,
  onView,
  onEdit,
  onAddAmount,
  isMenuOpen,
  toggleMenu,
}: GoalItemProps) => {
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

  const getProgressColor = (progressValue) => {
    if (progressValue >= 100) return "bg-green-500";
    if (progressValue >= 75) return "bg-blue-500";
    if (progressValue >= 50) return "bg-yellow-500";
    return "bg-indigo-500";
  };

  const getMotivationalIcon = (progressValue) => {
    if (progressValue >= 100)
      return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (progressValue >= 75) return <Award className="h-5 w-5 text-blue-500" />;
    if (progressValue >= 50)
      return <Rocket className="h-5 w-5 text-purple-500" />;
    if (progressValue >= 25)
      return <Target className="h-5 w-5 text-indigo-500" />;
    return <Timer className="h-5 w-5 text-gray-500" />;
  };

  const getMotivationalMessage = (progressValue) => {
    if (progressValue >= 100) return "Amazing achievement! 🎉";
    if (progressValue >= 75) return "Almost there! 🚀";
    if (progressValue >= 50) return "Halfway there! 💪";
    if (progressValue >= 25) return "Great start! 👏";
    return "Let's get started! 🎯";
  };

  const handleKeyDownView = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      onView(goal.id);
    }
  };

  return (
    <div className="group relative rounded-xl p-5 shadow-md hover:bg-gray-50 hover:shadow-lg">
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
              <button
                role="button"
                tabIndex={0}
                className="cursor-pointer text-lg font-semibold text-gray-800 transition-all duration-300 hover:text-indigo-600 hover:underline"
                onClick={() => onView(goal.id)}
                onKeyDown={handleKeyDownView}
              >
                {goal.title}
              </button>
              <button title="View Details">
                <Eye
                  tabIndex={0}
                  className="h-5 w-5 cursor-pointer text-gray-400 transition-all duration-300 hover:text-indigo-600"
                  onClick={() => onView(goal.id)}
                  onKeyDown={handleKeyDownView}
                />
              </button>
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
                  <button
                    onClick={() => onEdit(goal.id)}
                    className="flex w-full items-center justify-between px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Edit Item
                    <Pencil className="h-4 w-4 text-gray-400" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onAddAmount(goal.id)}
                    className="flex w-full items-center justify-between px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Add Amount
                    <PlusIcon className="h-4 w-4 text-gray-400" />
                  </button>
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
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState(null);

  const handleOnView = (goalId: number) => {
    navigate(`/planning-goals?view=${goalId}`);
  };

  const handleCreateGoal = () => {
    navigate(`/planning-goals?create=1`);
  };

  const handleEditGoal = (goalId: number) => {
    navigate(`/planning-goals?edit=${goalId}`);
  };

  const handleAddAmountGoal = (goalId: number) => {
    navigate(`/planning-goals?addAmount=${goalId}`);
  };

  const toggleMenu = (goalId: number) => {
    setOpenMenuId((prevId) => (prevId === goalId ? goalId : null));
  };

  return (
    <section className="rounded-xl bg-[var(--section-dashboard)] p-4">
      <div className="mb-6 flex items-center justify-between">
        <TitleContainer text={"Planning"} />
        <button
          className="text-sm font-semibold text-indigo-600 transition-all duration-300 hover:text-indigo-700 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => navigate("/planning-goals")}
          title="Go to planning page"
        >
          View All
        </button>
      </div>

      <div className="planning-list custom-scrollbar max-h-[600px] overflow-y-auto px-6">
        {planningGoalsData && planningGoalsData.length > 0 ? (
          planningGoalsData.map((goal) => (
            <GoalItem
              key={goal.id}
              goal={goal}
              onView={() => handleOnView(goal.id)}
              onEdit={handleEditGoal}
              onAddAmount={handleAddAmountGoal}
              isMenuOpen={openMenuId === goal.id}
              toggleMenu={() => toggleMenu(goal.id)}
            />
          ))
        ) : (
          <div className="my-auto flex flex-col items-center justify-center rounded-2xl py-12">
            <PackageOpen className="h-24 w-24 text-gray-500" />
            <p className="text-gray-500">
              No goals found for the selected filter.
            </p>
            <button
              className="mt-4 flex items-center gap-2 text-sm font-medium text-indigo-600 transition-all duration-300 hover:text-indigo-700"
              onClick={handleCreateGoal}
            >
              Create your first goal
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PlanningGoalsContainer;
