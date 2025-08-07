import { subscriptionsData, cardData } from "../models/mockData.mjs";

import Subscription from "../models/Subscription.js";

export const getSubscriptions = (req, res) => {
  res.json(subscriptionsData);
};

export const createSubscription = (req, res) => {
  const newSubscription = new Subscription(req.body);
  subscriptionsData.push(newSubscription);
  res.status(201).json(newSubscription);
};

export const paySubscription = (req, res) => {
  const { id } = req.params;

  const subscription = subscriptionsData.find((sub) => sub.id === id);

  if (!subscription) {
    return res.status(404).json({ message: "Subscription not found" });
  }

  if (subscription.status === "paid") {
    return res.status(400).json({ message: "Subscription is already paid" });
  }

  const card = subscriptionsData.find((sub) => sub.id === subscription.cardId);

  card.balance -= subscription.cost;

  subscription.status = "paid";
  return res
    .status(200)
    .json({ message: "Subscription paid successfully", subscription });
};
