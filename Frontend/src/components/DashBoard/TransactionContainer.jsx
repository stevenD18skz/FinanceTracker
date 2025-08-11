import PropTypes from "prop-types";
import "./TransactionContainer.css";
import { Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

// LIBRARY IMPORTS

// COMPONENTS IMPORT
import TitleContainer from "../ui/TitleContainer";

// UTILS IMPORT
import { formatCurrency } from "../../utils/formatters";

const TransactionItem = ({ transaction }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/transactions/?view=${transaction.id}`);
  };

  return (
    <div className="flex items-center justify-between rounded-xl p-3 transition-all duration-300 hover:bg-slate-200">
      <div className="flex items-center space-x-4">
        <div
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-gray-100 transition-all duration-300 hover:bg-gray-300"
          aria-hidden="true"
          onClick={handleNavigation}
        >
          <Zap className="text-blue-600" />
        </div>
        <div
          className="flex cursor-pointer flex-col"
          onClick={handleNavigation}
        >
          <span className="text-base font-medium text-gray-800 transition-all duration-300 hover:text-indigo-600 hover:underline">
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

TransactionItem.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["income", "expense"]).isRequired,
    amount: PropTypes.number.isRequired,
  }).isRequired,
};

const TransactionContainer = ({ transactionData }) => {

  const filteredTransactions = transactionData.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    const currentDate = new Date();
    const timeDifference = currentDate - transactionDate;
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    return daysDifference <= 30000;
  });

  return (
    <div className="rounded-xl bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <TitleContainer text={"Recent Transactions"} />
      </div>

      <div
        className={`transaction-list ${
          filteredTransactions.length > 4 ? "custom-scrollbar" : ""
        }`}
      >
        {filteredTransactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
};

TransactionContainer.propTypes = {
  transactionData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["income", "expense"]).isRequired,
      amount: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default TransactionContainer;
