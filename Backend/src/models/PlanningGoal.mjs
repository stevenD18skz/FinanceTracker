// src/models/PlanningGoal.js
export default class PlanningGoal {
  constructor(
    id,
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
  ) {
    this.id = id;
    this.title = title;
    this.current = current;
    this.target = target;
    this.status = status;
    this.priority = priority;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.dueDate = dueDate;
    this.description = description;
    this.linkGoal = linkGoal;
    this.milestones = milestones;
  }
}
