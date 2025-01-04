import React from "react";
import CardSubscriptions from "./CardSubcriptions";
import { Plus } from "lucide-react";
import "./ContendSubscription.css";

const ContendSubscription = ({ subscriptionData }) => {
  return (
    <div className="h-full rounded-xl bg-white p-6 shadow-md">
      <header className="mb-4 flex items-center justify-between">
        <h3 className="text-3xl font-semibold">Monthly Payment</h3>
        <button className="rounded-3xl border-2 border-solid px-6 py-2">
          <p className="flex items-center text-xl font-semibold">
            Add <Plus></Plus>
          </p>
        </button>
      </header>

      <div className="subscription-list custom-scrollbar-x">
        {subscriptionData.map((card) => (
          <CardSubscriptions subscription={card} />
        ))}
      </div>
    </div>
  );
};

export default ContendSubscription;
