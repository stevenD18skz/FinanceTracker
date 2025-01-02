import React from "react";

const CardSubscriptions = ({ subscription }) => {
  return (
    <div className="rounded-lg w-52 bg-white p-4 shadow-md">
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
