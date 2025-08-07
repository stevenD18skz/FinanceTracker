import PropTypes from "prop-types";
import { Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./SubscriptionContainer.css";

// UTILS IMPORT
import { formatCurrency } from "../../utils/formatters";

// COMPONENTS IMPORT
import TitleContainer from "../ui/TitleContainer";

const SubscriptionsItem = ({ subscription }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/subscriptions/?view=${subscription.id}`);
  };

  return (
    <div
      className={`flex items-center justify-between rounded-xl p-4 ${
        subscription.status === "pay" ? "bg-white" : "bg-gray-200"
      }`}
    >
      {/* Sección Izquierda */}
      <div className="flex items-center space-x-4">
        <div
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-gray-100 transition-all duration-300 hover:bg-gray-300"
          aria-hidden="true"
          onClick={handleNavigation}
        >
          <Zap className="text-blue-400" />
        </div>
        <div
          className="flex cursor-pointer flex-col"
          onClick={handleNavigation}
        >
          <span className="text-base font-medium text-gray-800 transition-all duration-300 hover:text-indigo-600 hover:underline">
            {subscription.name}
          </span>
          <span className="text-sm text-gray-500">
            {subscription.status === "pay"
              ? "Paid the 11th"
              : "Pay before the 11th"}
          </span>
        </div>
      </div>

      {/* Sección Derecha */}
      <div className="flex items-center gap-4">
        <span
          className={`text-xl font-medium ${
            subscription.status === "pay" ? "text-green-500" : "text-gray-500"
          }`}
        >
          {formatCurrency(subscription.cost)}
        </span>

        <button
          className={`text-md w-28 rounded-full px-6 py-2 font-medium transition-all duration-300 ${
            subscription.status === "pay"
              ? "bg-emerald-600 text-white hover:bg-emerald-700"
              : "bg-gray-400 text-gray-600"
          }`}
          disabled={subscription.status !== "pay"}
          aria-label={
            subscription.status === "pay" ? "Make payment" : "Payment completed"
          }
        >
          {subscription.status === "pay" ? "Pay" : "Paid"}
        </button>
      </div>
    </div>
  );
};

SubscriptionsItem.propTypes = {
  subscription: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    status: PropTypes.oneOf(["pay", "paid"]).isRequired,
  }).isRequired,
};

const SubscriptionContainer = ({ subscriptionData }) => {
  return (
    <div className="h-full rounded-xl bg-white p-6">
      <header className="mb-4 flex items-center justify-between">
        <TitleContainer text={"Monthly Payment"} />
      </header>

      <div className="subscription-list custom-scrollbar">
        {subscriptionData.map((subscription) => (
          <SubscriptionsItem
            key={subscription.id}
            subscription={subscription}
          />
        ))}
      </div>
    </div>
  );
};

SubscriptionContainer.propTypes = {
  subscriptionData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string.isRequired,
      cost: PropTypes.number.isRequired,
      status: PropTypes.oneOf(["pay", "paid"]).isRequired,
    }),
  ).isRequired,
};

export default SubscriptionContainer;
