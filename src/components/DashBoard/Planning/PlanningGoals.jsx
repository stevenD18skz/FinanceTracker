import React, { useState } from "react";
import "./ContainerPlanning.css";
import { useNavigate } from "react-router-dom";

// LIBRARY IMPORTS
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
} from "lucide-react";

//COMPONENT IMPORT
import TitleContainer from "../../ui/TitleContainer";

const GoalItem = ({
  id,
  title,
  current,
  target,
  dueDate,
  linkGoal,
  onView,
  onEdit,
  onAddAmount,
  isMenuOpen,
  toggleMenu,
}) => {
  const progress = (current / target) * 100;
  const remaining = target - current;
  const isCompleted = progress >= 100;

  const getProgressColor = (progress) => {
    if (progress >= 100) return "bg-green-500";
    if (progress >= 75) return "bg-blue-500";
    if (progress >= 50) return "bg-yellow-500";
    return "bg-indigo-500";
  };

  const getMotivationalIcon = (progress) => {
    if (progress >= 100) return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (progress >= 75) return <Award className="h-5 w-5 text-blue-500" />;
    if (progress >= 50) return <Rocket className="h-5 w-5 text-purple-500" />;
    if (progress >= 25) return <Target className="h-5 w-5 text-indigo-500" />;
    return <Timer className="h-5 w-5 text-gray-500" />;
  };

  const getMotivationalMessage = (progress) => {
    if (progress >= 100) return "Amazing achievement! 🎉";
    if (progress >= 75) return "Almost there! 🚀";
    if (progress >= 50) return "Halfway there! 💪";
    if (progress >= 25) return "Great start! 👏";
    return "Let's get started! 🎯";
  };

  return (
    <div className="group relative rounded-xl p-5 transition-all duration-300 hover:bg-gray-50 hover:shadow-lg">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
            🚗
          </div>

          <div>
            <h3
              className="cursor-pointer text-lg font-medium text-gray-800 hover:text-indigo-600 hover:underline"
              onClick={onView}
            >
              {title}
            </h3>

            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-gray-400" />
              <p className="text-sm text-gray-500">
                <span className="font-medium text-gray-700">
                  ${current.toLocaleString()}
                </span>
                {" / "}
                <span className="text-gray-500">
                  ${target.toLocaleString()}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Menu de puntos suspensivos */}
        <div className="relative">
          <button
            className="rounded-lg p-2 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={toggleMenu}
            aria-label="Open menu"
            title="Open menu"
          >
            <MoreHorizontal className="h-5 w-5 text-gray-400" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <ul className="py-1">
                <li>
                  <a
                    href={linkGoal}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full justify-between px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Check Online{" "}
                    <ArrowUpRight className="h-4 w-4 text-gray-400" />
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => onEdit(id.toLocaleString())}
                    className="flex w-full justify-between px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Edit Item <Pencil className="h-4 w-4 text-gray-400" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onAddAmount(id.toLocaleString())}
                    className="flex w-full justify-between px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Add Amount <PlusIcon className="h-4 w-4 text-gray-400" />
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
          {dueDate && <span className="text-gray-500">Due {dueDate}</span>}
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

const PlanningGoals = ({ goals }) => {
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState(null);

  const handleOnView = (goalId) => {
    navigate(`/planning-goals?view=${goalId}`);
  };

  const handleEditGoal = (goalId) => {
    navigate(`/planning-goals?edit=${goalId}`);
  };

  const handleAddAmountGoal = (goalId) => {
    navigate(`/planning-goals?addAmount=${goalId}`);
  };

  const toggleMenu = (goalId, event) => {
    setOpenMenuId(openMenuId === goalId ? null : goalId);
  };
  return (
    <div className="rounded-xl bg-white p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <TitleContainer text={"Planning"} />
        <button
          className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline"
          onClick={() => navigate("/planning-goals")}
          title="Go to planning page"
        >
          View All
        </button>
      </div>

      <div className="planning-list custom-scrollbar px-2">
        {goals.map((goal) => (
          <GoalItem
            key={goal.id}
            id={goal.id}
            title={goal.title}
            current={goal.current}
            target={goal.target}
            linkGoal={goal.linkGoal}
            onView={() => handleOnView(goal.id)}
            dueDate={goal.dueDate}
            onEdit={handleEditGoal}
            onAddAmount={handleAddAmountGoal}
            isMenuOpen={openMenuId === goal.id}
            toggleMenu={() => toggleMenu(goal.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default PlanningGoals;
