import PropTypes from "prop-types";
import { Zap, PackageOpen, ChevronRight } from "lucide-react";
import "./List-scrollbar.css";

// UTILS IMPORT

import { useCurrency } from "../../context/CurrencyContext";
import { useState, useEffect } from "react";
import { convertAndFormat } from "../../utils/formatters";
import { Link } from "react-router-dom";

const SubscriptionsItem = ({ subscription }) => {
  const { selectedCurrency } = useCurrency();
  const [formattedAmount, setFormattedAmount] = useState("");

  useEffect(() => {
    const format = async () => {
      const formattedAmount = await convertAndFormat(
        {
          amount: subscription.cost,
          currency: "COP",
        },

        selectedCurrency.code,
      );

      setFormattedAmount(formattedAmount);
    };
    format();
  }, [selectedCurrency, subscription.cost]);

  return (
    <div
      className={`flex items-center justify-between rounded-xl p-3 ${
        subscription.status === "pay" ? "" : "bg-gray-200"
      }`}
    >
      {/* Sección Izquierda */}
      <div className="flex items-center space-x-4">
        <Link
          to={`/transaction/?view=${subscription.id}`}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-gray-100 transition-all duration-[--duration-standard] hover:bg-gray-300"
          aria-hidden="true"
        >
          <Zap className="text-amber-400" />
        </Link>
        <Link
          to={`/subscription/?view=${subscription.id}`}
          className="flex cursor-pointer flex-col"
        >
          <span className="text-base font-medium text-[--text-primary] transition-all duration-300 hover:text-[--button-primary] hover:underline">
            {subscription.name}
          </span>
          <span className="text-sm text-[--text-secondary]">
            {subscription.status === "pay"
              ? "Paid the 11th"
              : "Pay before the 11th"}
          </span>
        </Link>
      </div>

      {/* Sección Derecha */}
      <div className="flex items-center gap-4">
        <span
          className={`text-xl font-medium ${
            subscription.status === "pay"
              ? "text-[--green]"
              : "text-[--button-disabled-text]"
          }`}
        >
          {formattedAmount}
        </span>

        <button
          className={`text-md w-28 rounded-full px-6 py-2 font-medium transition-all duration-300 ${
            subscription.status === "pay"
              ? "bg-[--button-primary] text-[--button-primary-text] hover:bg-[--button-primary-hover]"
              : "bg-[--button-disabled] text-[--button-disabled-text]"
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
    <section className="rounded-xl bg-[var(--section-dashboard)] p-[--spacing-big] space-y-[--spacing-medium]">
      <h2 className="text-4xl font-bold text-[--text-title]">
        My Subscriptions
      </h2>

      <div className="item-list custom-scrollbar">
        {subscriptionData.length > 0 ? (
          subscriptionData.map((subscription) => (
            <SubscriptionsItem
              key={subscription.id}
              subscription={subscription}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center   text-[--text-secondary]   h-[70rem] ">
            <PackageOpen className="h-24 w-24" />
            <p className="text-[--text-secondary] text-lg font-semibold">
              No subscriptions yet
            </p>
            <Link
              to="/subscriptions?create=1"
              className="flex items-center text-base font-medium text-[--button-primary]
              transition-all duration-[--duration-standard] hover:underline"
            >
              Add your first subscription
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
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
