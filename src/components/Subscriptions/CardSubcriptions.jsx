import React from "react";
import { Zap } from "lucide-react";

const CardSubscriptions = ({ subscription }) => {
  return (
    <div
      className={`flex items-center justify-between rounded-2xl p-4 shadow-sm ${
        subscription.status ? "bg-slate-100" : ""
      }`}
    >
      {/* Sección Izquierda */}

      <div className="flex items-center gap-3">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl`}
          style={{ backgroundColor: subscription.color }}
        >
          {React.isValidElement(subscription.icon) ? (
            subscription.icon
          ) : (
            <Zap />
          )}
        </div>
        <div className="flex flex-col">
          <h3 className="text-base font-medium text-gray-900">
            {subscription.name}
          </h3>
          <h4 className="text-sm text-gray-500">
            {subscription.status ? "Paid the 11th" : `Pay before the 11th`}
          </h4>
        </div>
      </div>

      {/* Sección Derecha */}
      <div className="flex items-center gap-4">
        <span
          className={`text-xl font-medium ${
            subscription.status ? "text-green-400" : "text-red-400"
          }`}
        >
          ${subscription.cost}
        </span>
        <button
          className={`text-md w-28 rounded-full px-6 py-2 font-medium transition-all duration-300 ${
            subscription.status
              ? "bg-gray-200 text-gray-600 hover:bg-gray-300"
              : "bg-violet-600 text-white hover:bg-violet-700"
          }`}
          disabled={subscription.status}
        >
          {subscription.status ? "Paid" : "Pay now"}
        </button>
      </div>
    </div>
  );
};

export default CardSubscriptions;
