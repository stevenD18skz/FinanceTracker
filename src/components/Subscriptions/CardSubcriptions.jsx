import React from "react";

const CardSubscriptions = ({ subscription }) => {
  return (
    <div className="w-full rounded-xl bg-slate-100 p-4">
      <div className="mb-2 border-b pb-2">
        <h3 className="text-lg font-semibold">{subscription.name}</h3>
      </div>
      <div>
        <p className="text-gray-700">Cost: ${subscription.cost}</p>
        <p className="text-gray-700">
          Renewal Date: {subscription.renewalDate}
        </p>
      </div>
    </div>
  );
};

export default CardSubscriptions;
