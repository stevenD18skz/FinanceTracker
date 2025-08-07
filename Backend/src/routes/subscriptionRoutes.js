import express from "express";
import {
  getSubscriptions,
  createSubscription,
  paySubscription,
} from "../controllers/subscriptionController.js";

const router = express.Router();

router.get("", getSubscriptions);
router.post("", createSubscription);
router.post("/:id/pay", paySubscription);

export default router;
