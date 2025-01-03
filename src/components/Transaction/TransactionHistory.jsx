import React, { useState } from "react";
import "./TransactionHistory.css"; // Import the CSS file for custom styles
import { FaCalendarAlt } from "react-icons/fa"; // Importa el icono de calendario desde react-icons

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
    <div className="h-full rounded-xl bg-white p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Recent Transactions
        </h2>
        <div className="flex items-center space-x-2">
          <FaCalendarAlt className="h-6 w-6 text-gray-400" />
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
          <div
            key={transaction.id}
            className="flex items-center justify-between rounded-lg p-3 transition-colors duration-150 hover:bg-gray-50"
          >
            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                {transaction.icon}
              </div>
              <div>
                <p className="font-medium text-gray-800">{transaction.name}</p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
            </div>
            <span
              className={`font-semibold ${
                transaction.type === "income"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {transaction.type === "income" ? "+" : "-"}
              {new Intl.NumberFormat("es-CO", {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0,
              })
                .format(transaction.amount)
                .replace("COP", "")
                .trim()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
