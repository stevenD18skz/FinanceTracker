import { balanceData } from "../models/mockData.mjs";

export const getUser = (req, res) => {
  res.json(balanceData);
};
