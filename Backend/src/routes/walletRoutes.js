import express from "express";
import { getWallets, createWallet } from "../controllers/walletController.js";

const router = express.Router();

router.get("", getWallets);
router.post("", createWallet);

export default router;
