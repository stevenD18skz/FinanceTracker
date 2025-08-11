import { subscriptionsData } from "../utils/Data";

export function createSubscription(newSubscription) {
  subscriptionsData.push(newSubscription);
}

export function getSubscriptions() {
  return subscriptionsData;
}

export function updateSubscription(id, updatedData) {
  console.log(id, updatedData);
  const subscriptionIndex = subscriptionsData.findIndex(
    (subscription) => subscription.id === id,
  );
  if (subscriptionIndex !== -1) {
    subscriptionsData[subscriptionIndex] = {
      ...subscriptionsData[subscriptionIndex],
      ...updatedData,
    };
  } else {
    console.log("Subscription not found");
  }
}

export function deleteSubscription(id) {
  const subscriptionIndex = subscriptionsData.findIndex(
    (subscription) => subscription.id === id,
  );
  if (subscriptionIndex !== -1) {
    subscriptionsData.splice(subscriptionIndex, 1);
  } else {
    console.log("Subscription not found");
  }
}
