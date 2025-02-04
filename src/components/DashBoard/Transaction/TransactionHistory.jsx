import React, { useState } from "react";
import "./TransactionHistory.css";

// LIBRARY IMPORTS
import { FaCalendarAlt } from "react-icons/fa";

//COMPONETS IMPORT
import TitleContainer from "../../ui/TitleContainer";

//UTILS IMPORT
import { formatCurrency } from "../../../utils/formatters";

const TransactionItem = ({ transaction }) => {
  return (
    <div
      key={transaction.id}
      className="flex items-center justify-between rounded-xl p-3 hover:bg-slate-200"
    >
      <div className="flex items-center space-x-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
          {transaction.icon}
        </div>
        <div className="flex flex-col">
          <span className="text-base font-medium text-gray-800">
            {transaction.name}
          </span>
          <span className="text-sm text-gray-500">{transaction.date}</span>
        </div>
      </div>

      <span
        className={`text-xl font-medium ${
          transaction.type === "income" ? "text-green-600" : "text-red-600"
        }`}
      >
        {transaction.type === "income" ? "+" : "-"}
        {formatCurrency(transaction.amount)}
      </span>
    </div>
  );
};

const TransactionHistory = ({ dataTransaction }) => {
  const [filter, setFilter] = useState("7");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredTransactions = dataTransaction
    .filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      const today = new Date();
      const daysDifference = (today - transactionDate) / (1000 * 60 * 60 * 24);

      switch (filter) {
        case "today":
          return (
            transactionDate.getDate() === today.getDate() &&
            transactionDate.getMonth() === today.getMonth() &&
            transactionDate.getFullYear() === today.getFullYear()
          );
        case "7":
          return daysDifference <= 7;
        case "31":
          return daysDifference <= 31;
        case "all":
        default:
          return true;
      }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="rounded-xl bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <TitleContainer text={"Recent Transactions"} />

        <div className="flex items-center space-x-2">
          <FaCalendarAlt className="h-6 w-6 text-gray-500" />
          <select
            className="text-sm text-gray-500"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="today">Today</option>
            <option value="7">Last 7 Days</option>
            <option value="31">Last 31 Days</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>

      <div
        className={`transaction-list ${filteredTransactions.length > 4 ? "custom-scrollbar" : ""}`}
      >
        {filteredTransactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
