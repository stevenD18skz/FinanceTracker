// Definición de la interfaz Goal
export interface Goal {
  id: string;
  title: string;
  current: number;
  target: number;
  dueDate?: string;
  linkGoal?: string;
  category: string;
  description: string;
  status: "active" | "completed" | "inactive";
  priority: "high" | "medium" | "low";
  createdAt: string;
  updatedAt: string;
  milestones: Array<{
    title: string;
    completed: boolean;
  }>;
}

// Tipos adicionales
export type ViewMode = "grid" | "list";
export type FilterType = "all" | "active" | "completed";
