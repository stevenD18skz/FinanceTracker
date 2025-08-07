// src/routes/financeRoutes.js
import express from "express";
import {
  getPlanningGoals,
  getByIdPlanningGoal,
  addPlanningGoal,
  updatePlanningGoal,
  deletePlanningGoal,
  addAmountToGoal,
} from "../controllers/PlanningGoalController.mjs"; // Updated import path

const router = express.Router();

router.get("", getPlanningGoals);
router.get("/:id", getByIdPlanningGoal);
router.post("", addPlanningGoal);
router.patch("/:id", updatePlanningGoal);
router.patch("/:id/addAmount", addAmountToGoal);
router.delete("/:id", deletePlanningGoal);

export default router;
