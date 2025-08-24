import PropTypes from "prop-types";
import "./List-scrollbar.css";
import { Zap, PackageOpen, ChevronRight } from "lucide-react";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// UTILS IMPORT
import { convertAndFormat } from "../../utils/formatters";
import { useCurrency } from "../../context/CurrencyContext";

const TransactionItem = ({ transaction }) => {
  const { selectedCurrency } = useCurrency();
  const [formattedAmount, setFormattedAmount] = useState("");

  useEffect(() => {
    const format = async () => {
      const formattedAmount = await convertAndFormat(
        {
          amount: transaction.amount,
          currency: "COP",
        },

        selectedCurrency.code,
      );

      setFormattedAmount(formattedAmount);
    };
    format();
  }, [selectedCurrency, transaction.amount]);

  return (
    <div className="flex items-center justify-between rounded-xl p-3 transition-all duration-[--duration-standard] hover:bg-slate-200">
      <div className="flex items-center space-x-4">
        <Link
          to={`/transaction/?view=${transaction.id}`}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-gray-100 transition-all duration-[--duration-standard] hover:bg-gray-300"
          aria-hidden="true"
        >
          <Zap className="text-blue-600" />
        </Link>
        <Link
          to={`/transaction/?view=${transaction.id}`}
          className="flex cursor-pointer flex-col"
        >
          <span className="text-base font-medium text-[--text-primary] transition-all duration-[--duration-standard] hover:text-[--button-primary] hover:underline">
            {transaction.name}
          </span>
          <span className="text-sm text-[--text-secondary]">
            {transaction.date}
          </span>
        </Link>
      </div>

      <div className="flex items-center space-x-2">
        <span
          className={`text-xl font-medium ${
            transaction.type === "income" ? "text-[--green]" : "text-[--red]"
          }`}
        >
          {transaction.type === "income" ? "+" : "-"}
          {formattedAmount}
        </span>
      </div>
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
  /** (Reusa la función de parseo que ya tenías) */
  function parseTransactionDate(dateStr) {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) return d;

    const re =
      /^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4}),\s*(\d{1,2}):(\d{2})\s*(AM|PM)?$/i;
    const m = dateStr.trim().match(re);
    if (!m) return null;

    const day = parseInt(m[1], 10);
    const monthName = m[2].toLowerCase();
    const year = parseInt(m[3], 10);
    let hour = parseInt(m[4], 10);
    const minute = parseInt(m[5], 10);
    const ampm = m[6];

    const months = {
      january: 0,
      february: 1,
      march: 2,
      april: 3,
      may: 4,
      june: 5,
      july: 6,
      august: 7,
      september: 8,
      october: 9,
      november: 10,
      december: 11,
    };

    const month = months[monthName];
    if (month === undefined) return null;

    if (ampm) {
      const isPM = ampm.toUpperCase() === "PM";
      if (hour === 12 && !isPM)
        hour = 0; // 12 AM -> 0
      else if (isPM && hour < 12) hour += 12;
    }

    const parsed = new Date(year, month, day, hour, minute, 0, 0);
    return isNaN(parsed.getTime()) ? null : parsed;
  }

  /** Devuelve el inicio de la semana según weekStart (0=Domingo, 1=Lunes, etc.) */
  function getStartOfWeek(date, weekStart = 1) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const day = d.getDay(); // 0..6 (0 = domingo)
    const diff = (day - weekStart + 7) % 7;
    d.setDate(d.getDate() - diff);
    return d;
  }

  /** Filtra desde el lunes (inclusive) de la semana actual y ordena por fecha descendente */
  function filterFromThisWeekMondaySorted(transactions) {
    const now = new Date();
    const monday = getStartOfWeek(now, 1); // lunes 00:00 local

    return transactions
      .map((tx) => ({ tx, parsed: parseTransactionDate(tx.date) }))
      .filter(
        ({ parsed }) => parsed !== null && parsed.getTime() >= monday.getTime(),
      )
      .sort((a, b) => b.parsed.getTime() - a.parsed.getTime())
      .map(({ tx }) => tx);
  }

  const filteredSorted = filterFromThisWeekMondaySorted(transactionData);

  return (
    <section className="rounded-xl bg-[var(--section-dashboard)] p-[--spacing-big] space-y-[--spacing-medium]">
      <h2 className="text-4xl font-bold text-[--text-title]">
        Weekly Transactions
      </h2>

      <div className="item-list custom-scrollbar">
        {filteredSorted.length > 0 ? (
          filteredSorted.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center   text-[--text-secondary]   h-[70rem] ">
            <PackageOpen className="h-24 w-24" />
            <p className="text-[--text-secondary] text-lg font-semibold">
              No transactions this week
            </p>
            <Link
              to="/planning-goals?create=1"
              className="flex items-center text-base font-medium text-[--button-primary]
              transition-all duration-[--duration-standard] hover:underline"
            >
              Add your first transaction
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
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
