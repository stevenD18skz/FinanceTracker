import { Goal } from "../../types/goal";

export async function createGoal(newGoal) {
  try {
    const response = await fetch("http://localhost:3000/api/planningGoal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGoal),
    });

    if (!response.ok) {
      throw new Error("Error al crear la meta");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en createGoal:", error);
    return null;
  }
}

export const getGoals = async (): Promise<Goal[]> => {
  try {
    const response = await fetch("http://localhost:3000/api/planning-goals");

    console.log(response);

    if (!response.ok) {
      throw new Error("Error al obtener las metas");
    }

    const data: Goal[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getGoals:", error);
    return []; // Retorna un array vacío en caso de error para evitar que falle el código que usa esta función.
  }
};

export async function updateGoal(id, updatedData) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/planningGoal/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      },
    );

    if (!response.ok) {
      throw new Error("Error al actualizar la meta");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en updateGoal:", error);
    return null;
  }
}

export async function deleteGoal(id) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/planningGoal/${id}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      throw new Error("Error al eliminar la meta");
    }

    return true;
  } catch (error) {
    console.error("Error en deleteGoal:", error);
    return false;
  }
}
