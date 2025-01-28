import { planningGoalsData } from "../Data";

export function createGoal(newGoal) {
  planningGoalsData.push(newGoal);
}

export function getGoals() {
  return planningGoalsData;
}

export function updateGoal(id, updatedData) {
  const goalIndex = planningGoalsData.findIndex((goal) => goal.id === id);
  if (goalIndex !== -1) {
    planningGoalsData[goalIndex] = {
      ...planningGoalsData[goalIndex],
      ...updatedData,
    };
  } else {
    console.log("Goal not found");
  }
}

export function deleteGoal(id) {
  const goalIndex = planningGoalsData.findIndex((goal) => goal.id === id);
  if (goalIndex !== -1) {
    planningGoalsData.splice(goalIndex, 1);
  } else {
    console.log("Goal not found");
  }
}
