import React, { useState } from 'react';
import { Plus, X, Link as LinkIcon, Calendar, Target, AlertCircle } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ModalGeneric from '../ui/ModalGeneric';
import { Goal, Milestone } from '../../types/goal';

interface CreateGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt' | 'current'>) => void;
}

const CreateGoalModal: React.FC<CreateGoalModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [target, setTarget] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [description, setDescription] = useState('');
  const [linkGoal, setLinkGoal] = useState('');
  const [priority, setPriority] = useState<Goal['priority']>('medium');
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [newMilestone, setNewMilestone] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const formatCurrency = (value: string) => {
    // Remove any non-digit characters
    const digits = value.replace(/\D/g, '');
    // Convert to number and format
    const number = parseInt(digits, 10);
    if (isNaN(number)) return '';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    setTarget(rawValue);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!target) {
      newErrors.target = 'Target amount is required';
    }
    if (!dueDate) {
      newErrors.dueDate = 'Due date is required';
    }
    if (linkGoal && !isValidUrl(linkGoal)) {
      newErrors.linkGoal = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const newGoal = {
      title,
      target: Number(target),
      dueDate: dueDate?.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) || '',
      description,
      linkGoal,
      priority,
      status: 'active' as const,
      milestones,
    };

    onSubmit(newGoal);
    handleReset();
  };

  const handleReset = () => {
    setTitle('');
    setTarget('');
    setDueDate(null);
    setDescription('');
    setLinkGoal('');
    setPriority('medium');
    setMilestones([]);
    setNewMilestone('');
    setErrors({});
    onClose();
  };

  const addMilestone = () => {
    if (newMilestone.trim()) {
      setMilestones([...milestones, { title: newMilestone.trim(), completed: false }]);
      setNewMilestone('');
    }
  };

  const removeMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  return (
    <ModalGeneric isOpen={isOpen} onClose={handleReset} title="Create New Goal">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Goal Title
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`block w-full rounded-md border ${
                errors.title ? 'border-red-300' : 'border-gray-300'
              } px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
              placeholder="Enter your goal title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.title}
              </p>
            )}
          </div>
        </div>

        {/* Target Amount and Due Date */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="target" className="block text-sm font-medium text-gray-700">
              Target Amount
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Target className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                id="target"
                value={formatCurrency(target)}
                onChange={handleTargetChange}
                className={`block w-full rounded-md border ${
                  errors.target ? 'border-red-300' : 'border-gray-300'
                } pl-10 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                placeholder="$0"
              />
            </div>
            {errors.target && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.target}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
              Due Date
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 z-10">
                <Calendar className="h-4 w-4 text-gray-400" />
              </div>
              <DatePicker
                selected={dueDate}
                onChange={(date: Date) => setDueDate(date)}
                dateFormat="MMM yyyy"
                showMonthYearPicker
                placeholderText="Select date"
                className={`block w-full rounded-md border ${
                  errors.dueDate ? 'border-red-300' : 'border-gray-300'
                } pl-10 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
              />
            </div>
            {errors.dueDate && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.dueDate}
              </p>
            )}
          </div>
        </div>

        {/* Priority Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Priority</label>
          <div className="mt-1 flex gap-3">
            {(['low', 'medium', 'high'] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPriority(p)}
                className={`flex-1 rounded-md px-3 py-2 text-sm font-medium capitalize transition-all ${
                  priority === p
                    ? 'bg-indigo-100 text-indigo-700 ring-1 ring-indigo-500'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="Describe your goal..."
          />
        </div>

        {/* Link */}
        <div>
          <label htmlFor="linkGoal" className="block text-sm font-medium text-gray-700">
            Reference Link
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <LinkIcon className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="url"
              id="linkGoal"
              value={linkGoal}
              onChange={(e) => setLinkGoal(e.target.value)}
              className={`block w-full rounded-md border ${
                errors.linkGoal ? 'border-red-300' : 'border-gray-300'
              } pl-10 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
              placeholder="https://example.com"
            />
            {errors.linkGoal && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.linkGoal}
              </p>
            )}
          </div>
        </div>

        {/* Milestones */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Milestones</label>
          <div className="mt-2 space-y-3">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-center gap-2 group">
                <span className="flex-1 rounded-md bg-gray-50 px-3 py-2 text-sm group-hover:bg-gray-100 transition-colors">
                  {milestone.title}
                </span>
                <button
                  type="button"
                  onClick={() => removeMilestone(index)}
                  className="rounded-md p-2 text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-gray-100 hover:text-gray-600 transition-all"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            <div className="flex gap-2">
              <input
                type="text"
                value={newMilestone}
                onChange={(e) => setNewMilestone(e.target.value)}
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Add a milestone"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMilestone())}
              />
              <button
                type="button"
                onClick={addMilestone}
                className="rounded-md bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={handleReset}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
          >
            Create Goal
          </button>
        </div>
      </form>
    </ModalGeneric>
  );
};

export default CreateGoalModal;