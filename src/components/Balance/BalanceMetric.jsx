import React from "react";

const BalanceMetric = ({ label, amount, className = "" }) => {
  return (
    <div className={className}>
      <p className="mb-1 text-sm text-gray-500">{label}</p>
      <p className="text-md font-medium text-gray-700">
        ${amount}
      </p>
    </div>
  );
};

export default BalanceMetric;
