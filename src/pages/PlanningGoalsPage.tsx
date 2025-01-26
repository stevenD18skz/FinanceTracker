import React, { useState } from 'react';
import {
  ArrowUpRight,
  TrendingUp,
  Target,
  Award,
  Trophy,
  Rocket,
  Timer,
  ChevronRight,
  Plus,
  Search,
  Filter,
  SlidersHorizontal,
  ArrowUpDown,
  Edit2,
  Trash2,
  CheckCircle,
  Eye,
  X,
} from 'lucide-react';


interface Goal {
  id: string;
  title: string;
  current: number;
  target: number;
  dueDate?: string;
  linkGoal?: string;
  category: string;
  description: string;
  status: 'active' | 'completed' | 'inactive';
  priority: 'high' | 'medium' | 'low';
  createdAt: string;
  updatedAt: string;
  milestones: Array<{
    title: string;
    completed: boolean;
  }>;
}

interface SortOption {
  label: string;
  value: string;
  options: Array<{
    label: string;
    value: string;
  }>;
}

const sortOptions: SortOption[] = [
  {
    label: 'Date',
    value: 'date',
    options: [
      { label: 'Newest First', value: 'date-desc' },
      { label: 'Oldest First', value: 'date-asc' },
    ],
  },
  {
    label: 'Alphabetical',
    value: 'alpha',
    options: [
      { label: 'A to Z', value: 'alpha-asc' },
      { label: 'Z to A', value: 'alpha-desc' },
    ],
  },
  {
    label: 'Status',
    value: 'status',
    options: [
      { label: 'Active First', value: 'status-active' },
      { label: 'Completed First', value: 'status-completed' },
      { label: 'Inactive First', value: 'status-inactive' },
    ],
  },
  {
    label: 'Priority',
    value: 'priority',
    options: [
      { label: 'High First', value: 'priority-high' },
      { label: 'Medium First', value: 'priority-medium' },
      { label: 'Low First', value: 'priority-low' },
    ],
  },
];

const TableOfContents = ({ categories, activeCategory, onSelectCategory }) => (
  <div className="w-64 shrink-0 rounded-xl bg-white p-5 shadow-lg">
    <h3 className="mb-4 font-semibold text-gray-800">Categories</h3>
    <nav className="space-y-1">
      <button
        onClick={() => onSelectCategory('all')}
        className={`w-full rounded-lg px-4 py-2 text-left text-sm transition-colors ${
          activeCategory === 'all'
            ? 'bg-indigo-50 text-indigo-700'
            : 'text-gray-600 hover:bg-gray-50'
        }`}
      >
        All Goals
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`w-full rounded-lg px-4 py-2 text-left text-sm transition-colors ${
            activeCategory === category
              ? 'bg-indigo-50 text-indigo-700'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          {category}
        </button>
      ))}
    </nav>
  </div>
);

const GoalDetails = ({ goal, onClose }) => {
  const progress = (goal.current / goal.target) * 100;

  const getProgressColor = (progress) => {
    if (progress >= 100) return 'bg-green-500';
    if (progress >= 75) return 'bg-blue-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-indigo-500';
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
            🎯
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{goal.title}</h2>
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
              progress
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
                      ? 'text-gray-400 line-through'
                      : 'text-gray-700'
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

const GoalItem = ({
  title,
  current,
  target,
  dueDate,
  linkGoal,
  onEdit,
  onDelete,
  onComplete,
  onView,
}) => {
  const progress = (current / target) * 100;
  const remaining = target - current;
  const isCompleted = progress >= 100;

  const getProgressColor = (progress) => {
    if (progress >= 100) return 'bg-green-500';
    if (progress >= 75) return 'bg-blue-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-indigo-500';
  };

  const getMotivationalIcon = (progress) => {
    if (progress >= 100) return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (progress >= 75) return <Award className="h-5 w-5 text-blue-500" />;
    if (progress >= 50) return <Rocket className="h-5 w-5 text-purple-500" />;
    if (progress >= 25) return <Target className="h-5 w-5 text-indigo-500" />;
    return <Timer className="h-5 w-5 text-gray-500" />;
  };

  const getMotivationalMessage = (progress) => {
    if (progress >= 100) return 'Amazing achievement! 🎉';
    if (progress >= 75) return 'Almost there! 🚀';
    if (progress >= 50) return 'Halfway there! 💪';
    if (progress >= 25) return 'Great start! 👏';
    return "Let's get started! 🎯";
  };

  return (
    <div className="group relative rounded-xl bg-white p-5 transition-all hover:shadow-lg">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              🎯
            </div>
            <h3 className="font-medium text-gray-800">{title}</h3>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-gray-400" />
            <p className="text-sm text-gray-500">
              <span className="font-medium text-gray-700">
                ${current.toLocaleString()}
              </span>
              {' / '}
              <span className="text-gray-500">${target.toLocaleString()}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
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
              onEdit();
            }}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
            title="Edit"
          >
            <Edit2 className="h-5 w-5" />
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
        <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${getProgressColor(
              progress
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
            isCompleted ? 'text-green-600' : 'text-gray-600'
          }`}
        >
          {getMotivationalMessage(progress)}
        </span>
      </div>
    </div>
  );
};

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const PlanningGoalsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [sortBy, setSortBy] = useState('date-desc');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState<Goal | null>(null);

  // Example data - replace with your actual data
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'New Car',
      current: 15000,
      target: 30000,
      category: 'Vehicle',
      status: 'active',
      priority: 'high',
      createdAt: '2024-03-10T10:00:00Z',
      updatedAt: '2024-03-10T10:00:00Z',
      dueDate: 'Dec 2024',
      description:
        'Saving for a new electric vehicle to reduce carbon footprint and lower long-term transportation costs.',
      milestones: [
        { title: 'Research car models', completed: true },
        { title: 'Save 50% of target amount', completed: false },
        { title: 'Get insurance quotes', completed: false },
      ],
    },
    {
      id: '2',
      title: 'Emergency Fund',
      current: 5000,
      target: 10000,
      category: 'Savings',
      status: 'active',
      priority: 'high',
      createdAt: '2024-03-09T10:00:00Z',
      updatedAt: '2024-03-09T10:00:00Z',
      dueDate: 'Jun 2024',
      description: 'Building an emergency fund for unexpected expenses.',
      milestones: [
        { title: 'Save first $1000', completed: true },
        { title: 'Reach 50% of goal', completed: true },
        { title: 'Complete emergency fund', completed: false },
      ],
    },
  ]);

  const categories = [...new Set(goals.map((goal) => goal.category))];

  const handleSort = (value: string) => {
    setSortBy(value);
    let sortedGoals = [...goals];

    switch (value) {
      case 'date-desc':
        sortedGoals.sort(
          (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
        break;
      case 'date-asc':
        sortedGoals.sort(
          (a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        );
        break;
      case 'alpha-asc':
        sortedGoals.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'alpha-desc':
        sortedGoals.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'status-active':
        sortedGoals.sort((a, b) => (a.status === 'active' ? -1 : 1));
        break;
      case 'status-completed':
        sortedGoals.sort((a, b) => (a.status === 'completed' ? -1 : 1));
        break;
      case 'priority-high':
        sortedGoals.sort((a, b) => (a.priority === 'high' ? -1 : 1));
        break;
      case 'priority-medium':
        sortedGoals.sort((a, b) => (a.priority === 'medium' ? -1 : 1));
        break;
      case 'priority-low':
        sortedGoals.sort((a, b) => (a.priority === 'low' ? -1 : 1));
        break;
    }

    setGoals(sortedGoals);
  };

  const handleDelete = (goal: Goal) => {
    setGoalToDelete(goal);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (goalToDelete) {
      const updatedGoals = goals.filter((g) => g.id !== goalToDelete.id);
      setGoals(updatedGoals);
      setShowDeleteModal(false);
      setGoalToDelete(null);
    }
  };

  const filteredGoals = goals.filter(
    (goal) =>
      (activeCategory === 'all' || goal.category === activeCategory) &&
      goal.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Planning Goals</h1>
        <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
          <Plus className="h-4 w-4" />
          New Goal
        </button>
      </div>

      <div className="mb-6 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search goals..."
            className="w-full rounded-lg border-gray-200 pl-10 focus:border-indigo-500 focus:ring-indigo-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
            className="rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            {sortOptions.map((group) => (
              <optgroup key={group.value} label={group.label}>
                {group.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <ArrowUpDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="flex gap-6">
        <TableOfContents
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        <div className="flex-1 space-y-4">
          {filteredGoals.map((goal) => (
            <GoalItem
              key={goal.id}
              title={goal.title}
              current={goal.current}
              target={goal.target}
              dueDate={goal.dueDate}
              linkGoal={goal.linkGoal}
              onEdit={() => {}}
              onDelete={() => handleDelete(goal)}
              onComplete={() => {}}
              onView={() => setSelectedGoal(goal)}
            />
          ))}
        </div>

        {selectedGoal && (
          <div className="w-96 shrink-0">
            <GoalDetails
              goal={selectedGoal}
              onClose={() => setSelectedGoal(null)}
            />
          </div>
        )}
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Goal"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Are you sure you want to delete this goal? This action cannot be
            undone.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PlanningGoalsPage;