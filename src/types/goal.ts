// Definición de la interfaz Goal
export interface Milestone {
  title: string;
  completed: boolean;
}

export interface Goal {
  id: number;
  title: string;
  current: number;
  target: number;
  status: string; // "active" | "inactive"; // Definiendo posibles estados
  priority: string; //"low" | "medium" | "high"; // Definiendo niveles de prioridad
  createdAt: string; // Formato ISO 8601
  updatedAt: string; // Formato ISO 8601
  dueDate: string; // Fecha límite como string, podría usarse un objeto Date si prefieres
  description: string;
  linkGoal: string;
  milestones: Milestone[];
}

// Tipos adicionales
export type ViewMode = "grid" | "list";
export type FilterType = "all" | "active" | "completed";
