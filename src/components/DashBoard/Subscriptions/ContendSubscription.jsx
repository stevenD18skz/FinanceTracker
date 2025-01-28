import React from "react";
import { Zap, Plus } from "lucide-react";
import "./ContendSubscription.css";

//UTILS IMPORT
import { formatCurrency } from "../../../utils/formatters";

//COMPONENTS IMPORT
import TitleContainer from "../../ui/TitleContainer";

const SubscriptionsItem = ({ subscription }) => {
  return (
    <div
      className={`flex items-center justify-between rounded-xl p-3 ${
        subscription.status ? "bg-gray-300" : ""
      }`}
    >
      {/* Sección Izquierda */}
      <div className="flex items-center space-x-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
          {subscription.icon}
        </div>
        <div className="flex flex-col">
          <span className="text-base font-medium text-gray-800">
            {subscription.name}
          </span>
          <span className="text-sm text-gray-500">
            {subscription.status ? "Paid the 11th" : `Pay before the 11th`}
          </span>
        </div>
      </div>

      {/* Sección Derecha */}
      <div className="flex items-center gap-4">
        <span
          className={`text-xl font-medium ${
            subscription.status ? "text-green-400" : "text-red-400"
          }`}
        >
          {formatCurrency(subscription.cost)}
        </span>

        <button
          className={`text-md w-28 rounded-full px-6 py-2 font-medium transition-all duration-300 ${
            subscription.status
              ? "bg-gray-200 text-gray-600 hover:bg-gray-300"
              : "bg-emerald-600 text-white hover:bg-emerald-700"
          }`}
          disabled={subscription.status}
        >
          {subscription.status ? "Paid" : "Pay"}
        </button>
      </div>
    </div>
  );
};

const ContendSubscription = ({ subscriptionData }) => {
  return (
    <div className="h-full rounded-xl bg-white p-6">
      <header className="mb-4 flex items-center justify-between">
        <TitleContainer text={"Monthly Payment"}></TitleContainer>
      </header>

      <div className="subscription-list custom-scrollbar">
        {subscriptionData.map((card, index) => (
          <SubscriptionsItem key={index} subscription={card} />
        ))}
      </div>
    </div>
  );
};

export default ContendSubscription;
