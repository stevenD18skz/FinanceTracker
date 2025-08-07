import { cardData } from "../models/mockData.mjs";
import Wallet from "../models/Wallet.js";

export const getWallets = (req, res) => {
  res.json(cardData);
};

export const createWallet = (req, res) => {
  const newWallet = new Wallet(req.body);
  cardData.push(newWallet);
  res.status(201).json(newWallet);
};
