import React from "react";
import BalanceMetric from "./BalanceMetric";

const TotalBalance = ({ balance, income, expense, saving }) => {
  return (
    <div className="rounded-xl bg-white p-6">
      <div className="mx-auto grid grid-cols-12 gap-6">
        <div className="col-span-4 mb-6 flex items-center border-r-2 pr-6">
          <div className="mx-auto text-center">
            <h2 className="mb-2 text-lg text-gray-500">Total Balance</h2>
            <p className="text-5xl font-bold text-gray-900">
              ${balance.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="col-span-8 ml-4 grid grid-cols-3 gap-4 border-gray-100 pt-4">
          <BalanceMetric label="Total Income" amount={income} />
          <BalanceMetric label="Total Expenses" amount={expense} />
          <BalanceMetric label="Total Saving" amount={saving} />
        </div>
      </div>
    </div>
  );
};

export default TotalBalance;
