import PropTypes from "prop-types";
import {
  // Iconos de acciones
  CheckCircle,
  Edit2,
  Eye,
  PlusCircle,
  Trash2,
  // Iconos de progreso o metas
  ArrowUpRight,
  TrendingUp,
  Target,
  Award,
  Trophy,
  Rocket,
  Timer,
} from "lucide-react";

const GoalItem = ({
  title,
  current,
  target,
  dueDate,
  linkGoal,
  onView,
  onUpdate,
  onAddAmount,
  onComplete,
  onDelete,
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
    <div className="group relative rounded-xl bg-white p-5 transition-all hover:shadow-lg">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              🚗
            </div>
            <h3 className="font-medium text-gray-800">{title}</h3>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-gray-400" />
            <p className="text-sm text-gray-500">
              <span className="font-medium text-gray-700">
                ${current.toLocaleString()}
              </span>
              {" / "}
              <span className="text-gray-500">${target.toLocaleString()}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (linkGoal) {
                window.open(linkGoal, "_blank"); // Abre el enlace en una nueva pestaña
              } else {
                console.log("El enlace no está definido.");
              }
            }}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-red-600"
            title="Delete"
          >
            <ArrowUpRight className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onView();
            }}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
            title="View Details"
          >
            <Eye className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUpdate();
            }}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
            title="Edit"
          >
            <Edit2 className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddAmount();
            }}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
            title="View Details"
          >
            <PlusCircle className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onComplete();
            }}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-green-600"
            title="Mark as Complete"
          >
            <CheckCircle className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-red-600"
            title="Delete"
          >
            <Trash2 className="h-5 w-5" />
          </button>
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
        <div className="h-3 overflow-hidden rounded-full bg-gray-100">
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

GoalItem.propTypes = {
  title: PropTypes.string.isRequired,
  current: PropTypes.number.isRequired,
  target: PropTypes.number.isRequired,
  dueDate: PropTypes.string,
  linkGoal: PropTypes.string,
  onView: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onAddAmount: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default GoalItem;
