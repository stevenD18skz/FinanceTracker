import PropTypes from "prop-types";
import { X, TrendingUp, Trophy } from "lucide-react";

const GoalDetails = ({ goal, onClose }) => {
  const progress = (goal.current / goal.target) * 100;

  const getProgressColor = (progress) => {
    if (progress >= 100) return "bg-green-500";
    if (progress >= 75) return "bg-blue-500";
    if (progress >= 50) return "bg-yellow-500";
    return "bg-indigo-500";
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
            🎯
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {goal.title}
            </h2>
            <p className="text-sm text-gray-500">{goal.category}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-gray-400" />
            <span className="text-lg font-medium text-gray-700">
              ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
            </span>
          </div>
          {goal.dueDate && (
            <span className="text-sm text-gray-500">Due {goal.dueDate}</span>
          )}
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

      <div className="mb-8">
        <h3 className="mb-4 text-lg font-medium text-gray-800">Description</h3>
        <p className="text-gray-600">{goal.description}</p>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-medium text-gray-800">Milestones</h3>
        <div className="space-y-3">
          {goal.milestones.map((milestone, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={milestone.completed}
                  className="h-5 w-5 rounded border-gray-300 text-indigo-600"
                  readOnly
                />
                <span
                  className={`${
                    milestone.completed
                      ? "text-gray-400 line-through"
                      : "text-gray-700"
                  }`}
                >
                  {milestone.title}
                </span>
              </div>
              {milestone.completed && (
                <Trophy className="h-5 w-5 text-yellow-500" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

GoalDetails.propTypes = {
  goal: PropTypes.shape({
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    current: PropTypes.number.isRequired,
    target: PropTypes.number.isRequired,
    dueDate: PropTypes.string,
    description: PropTypes.string.isRequired,
    milestones: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default GoalDetails;
