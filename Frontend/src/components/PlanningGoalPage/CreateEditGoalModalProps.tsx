import React, { useState, useEffect } from "react";
import {
  Plus,
  X,
  Link as LinkIcon,
  Calendar,
  Target,
  AlertCircle,
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ModalGeneric from "../ui/ModalGeneric";
import { Goal, Milestone } from "../../types/goal";

interface CreateEditGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    goal: Omit<Goal, "id" | "createdAt" | "updatedAt" | "current">,
  ) => void;
  initialData?: Goal | null;
}

const CreateEditGoalModal: React.FC<CreateEditGoalModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [description, setDescription] = useState("");
  const [linkGoal, setLinkGoal] = useState("");
  const [priority, setPriority] = useState<Goal["priority"]>("medium");
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [newMilestone, setNewMilestone] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setTarget(initialData.target.toString());
      setDueDate(new Date(initialData.dueDate));
      setDescription(initialData.description);
      setLinkGoal(initialData.linkGoal || "");
      setPriority(initialData.priority);
      setMilestones(initialData.milestones || []);
    } else {
      handleReset();
    }
  }, [initialData]);

  const formatCurrency = (value: string) => {
    const digits = value.replace(/\D/g, "");
    const number = parseInt(digits, 10);
    if (isNaN(number)) return "";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    setTarget(rawValue);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!target) {
      newErrors.target = "Target amount is required";
    }
    if (!dueDate) {
      newErrors.dueDate = "Due date is required";
    }
    if (linkGoal && !isValidUrl(linkGoal)) {
      newErrors.linkGoal = "Please enter a valid URL";
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
      id: initialData?.id,
      title,
      target: Number(target),
      dueDate: dueDate?.toISOString() || "",
      description,
      linkGoal,
      priority,
      status: initialData ? initialData.status : "active",
      milestones,
    };

    onSubmit(newGoal);
    handleReset();
  };

  const handleReset = () => {
    setTitle("");
    setTarget("");
    setDueDate(null);
    setDescription("");
    setLinkGoal("");
    setPriority("medium");
    setMilestones([]);
    setNewMilestone("");
    setErrors({});
    onClose();
  };

  const addMilestone = () => {
    if (newMilestone.trim()) {
      setMilestones([
        ...milestones,
        { title: newMilestone.trim(), completed: false },
      ]);
      setNewMilestone("");
    }
  };

  const removeMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  return (
    <ModalGeneric
      isOpen={isOpen}
      onClose={handleReset}
      title={initialData ? "Edit Goal" : "Create New Goal"}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Input */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Goal Title
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`block w-full rounded-md border ${
                errors.title ? "border-red-300" : "border-gray-300"
              } px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
              placeholder="Enter your goal title"
            />
            {errors.title && (
              <p className="mt-1 flex items-center gap-1 text-sm text-red-600">
                <AlertCircle className="h-4 w-4" />
                {errors.title}
              </p>
            )}
          </div>
        </div>

        {/* Target Amount and Due Date */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="target"
              className="block text-sm font-medium text-gray-700"
            >
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
                  errors.target ? "border-red-300" : "border-gray-300"
                } py-2 pl-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                placeholder="$0"
              />
            </div>
            {errors.target && (
              <p className="mt-1 flex items-center gap-1 text-sm text-red-600">
                <AlertCircle className="h-4 w-4" />
                {errors.target}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-700"
            >
              Due Date
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3">
                <Calendar className="h-4 w-4 text-gray-400" />
              </div>
              <DatePicker
                selected={dueDate}
                onChange={(date: Date) => setDueDate(date)}
                dateFormat="MMM yyyy"
                showMonthYearPicker
                placeholderText="Select date"
                className={`block w-full rounded-md border ${
                  errors.dueDate ? "border-red-300" : "border-gray-300"
                } py-2 pl-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
              />
            </div>
            {errors.dueDate && (
              <p className="mt-1 flex items-center gap-1 text-sm text-red-600">
                <AlertCircle className="h-4 w-4" />
                {errors.dueDate}
              </p>
            )}
          </div>
        </div>

        {/* Priority Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Priority
          </label>
          <div className="mt-1 flex gap-3">
            {(["low", "medium", "high"] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPriority(p)}
                className={`flex-1 rounded-md px-3 py-2 text-sm font-medium capitalize transition-all ${
                  priority === p
                    ? "bg-indigo-100 text-indigo-700 ring-1 ring-indigo-500"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
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
          <label
            htmlFor="linkGoal"
            className="block text-sm font-medium text-gray-700"
          >
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
                errors.linkGoal ? "border-red-300" : "border-gray-300"
              } py-2 pl-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
              placeholder="https://example.com"
            />
            {errors.linkGoal && (
              <p className="mt-1 flex items-center gap-1 text-sm text-red-600">
                <AlertCircle className="h-4 w-4" />
                {errors.linkGoal}
              </p>
            )}
          </div>
        </div>

        {/* Milestones */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Milestones
          </label>
          <div className="mt-2 space-y-3">
            {milestones.map((milestone, index) => (
              <div key={index} className="group flex items-center gap-2">
                <span className="flex-1 rounded-md bg-gray-50 px-3 py-2 text-sm transition-colors group-hover:bg-gray-100">
                  {milestone.title}
                </span>
                <button
                  type="button"
                  onClick={() => removeMilestone(index)}
                  className="rounded-md p-2 text-gray-400 opacity-0 transition-all hover:bg-gray-100 hover:text-gray-600 group-hover:opacity-100"
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
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addMilestone())
                }
              />
              <button
                type="button"
                onClick={addMilestone}
                className="rounded-md bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200"
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
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {initialData ? "Save Changes" : "Create Goal"}
          </button>
        </div>
      </form>
    </ModalGeneric>
  );
};

export default CreateEditGoalModal;
