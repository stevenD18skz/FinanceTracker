import React from "react";
import { Zap } from "lucide-react";
import "./SubscriptionContainer.css";

//UTILS IMPORT
import { formatCurrency } from "../../utils/formatters";

//COMPONENTS IMPORT
import TitleContainer from "../ui/TitleContainer";

const SubscriptionsItem = ({ subscription }) => {
  return (
    <div
      className={`flex items-center justify-between rounded-xl p-3 ${
        subscription.status === "pay" ? "" : "bg-gray-200"
      }`}
    >
      {/* Sección Izquierda */}
      <div className="flex items-center space-x-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
          <Zap className="text-blue-400" />
        </div>
        <div className="flex flex-col">
          <span className="text-base font-medium text-gray-800">
            {subscription.name}
          </span>
          <span className="text-sm text-gray-500">
            {subscription.status === "pay"
              ? "Paid the 11th"
              : `Pay before the 11th`}
          </span>
        </div>
      </div>

      {/* Sección Derecha */}
      <div className="flex items-center gap-4">
        <span
          className={`text-xl font-medium ${
            subscription.status === "pay" ? "text-green-400" : "text-gray-500"
          }`}
        >
          {formatCurrency(subscription.cost)}
        </span>

        <button
          className={`text-md w-28 rounded-full px-6 py-2 font-medium transition-all duration-300 ${
            subscription.status === "pay"
              ? "bg-emerald-600 text-white hover:bg-emerald-700"
              : "bg-gray-400 text-gray-600 hover:bg-gray-300"
          }`}
          disabled={subscription.status}
        >
          {subscription.status === "pay" ? ";Pay" : "Paid"}
        </button>
      </div>
    </div>
  );
};

const SubscriptionContainer = ({ subscriptionData }) => {
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

export default SubscriptionContainer;
