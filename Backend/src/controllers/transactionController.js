import { transactionsData } from "../models/mockData.mjs";
import Transaction from "../models/Transaction.js";

export const getTransactions = (req, res) => {
  res.json(transactionsData);
};

export const createTransaction = (req, res) => {
  const newTransaction = new Transaction(req.body);
  transactionsData.push(newTransaction);
  res.status(201).json(newTransaction);
};
