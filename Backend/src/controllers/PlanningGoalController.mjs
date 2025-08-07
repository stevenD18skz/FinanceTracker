import { planningGoals } from "../models/mockData.mjs";
import PlanningGoal from "../models/PlanningGoal.mjs";

export const getPlanningGoals = (req, res) => {
  res.json(planningGoals);
};

export const getByIdPlanningGoal = (req, res) => {
  const { id } = req.params;
  const goal = planningGoals.find((goal) => goal.id === Number(id));

  if (!goal) {
    res.status(404).json({ message: "Goal not found" });
  } else {
    res.json(goal);
  }
};

export const addPlanningGoal = (req, res) => {
  const {
    title,
    current,
    target,
    status,
    priority,
    createdAt,
    updatedAt,
    dueDate,
    description,
    linkGoal,
    milestones,
  } = req.body;

  const newPlanningGoal = new PlanningGoal(
    planningGoals.length + 1,
    title,
    current,
    target,
    status,
    priority,
    createdAt,
    updatedAt,
    dueDate,
    description,
    linkGoal,
    milestones
  );

  planningGoals.push(newPlanningGoal);
  res.status(201).json(newPlanningGoal);
};

export const updatePlanningGoal = (req, res) => {
  const { id } = req.params;
  const {
    title,
    current,
    target,
    status,
    priority,
    createdAt,
    updatedAt,
    dueDate,
    description,
    linkGoal,
    milestones,
  } = req.body;

  const index = planningGoals.findIndex((goal) => goal.id === Number(id));

  if (index === -1) {
    res.status(404).json({ message: "Goal not found" });
  } else {
    planningGoals[index] = {
      id: Number(id),
      title,
      current,
      target,
      status,
      priority,
      createdAt,
      updatedAt,
      dueDate,
      description,
      linkGoal,
      milestones,
    };
    res.json(planningGoals[index]);
  }
};

export const deletePlanningGoal = (req, res) => {
  const { id } = req.params;
  const index = planningGoals.findIndex((goal) => goal.id === Number(id));

  if (index === -1) {
    res.status(404).json({ message: "Goal not found" });
  } else {
    planningGoals.splice(index, 1);
    res.json({ message: "Goal deleted" });
  }
};

export const addAmountToGoal = (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;

  const goal = planningGoals.find((goal) => goal.id === parseInt(id));

  if (!goal) {
    return res.status(404).json({ message: "Goal not found" });
  }

  goal.current += amount;
  goal.updatedAt = new Date().toISOString();

  res.status(200).json(goal);
};
