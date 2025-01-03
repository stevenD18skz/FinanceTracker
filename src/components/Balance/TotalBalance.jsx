import React from "react";
import BalanceMetric from "./BalanceMetric";
import ExpensesProgress from "./ExpensesProgress";

const TotalBalance = ({ balance, income, expenses, saving }) => {
  return (
    <div className="flex justify-center rounded-xl bg-white p-6">
      <ExpensesProgress
        {...{
          expenses: income,
          budget: balance,
        }}
      />

      <div>
        <div className="mb-6">
          <h2 className="mb-2 text-sm text-gray-500">Total Balance</h2>
          <p className="text-3xl font-bold text-gray-900">
            ${balance.toLocaleString()}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-4">
          <BalanceMetric label="Income" amount={income} />
          <BalanceMetric label="Expenses" amount={expenses} />
          <BalanceMetric label="Saving" amount={saving} />
        </div>
      </div>
    </div>
  );
};

export default TotalBalance;
