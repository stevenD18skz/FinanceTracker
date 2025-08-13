import { ArrowUpRight, Wallet, Receipt, PiggyBank } from "lucide-react";
import { convertAndFormat } from "../../utils/formatters";
import PropTypes from "prop-types";
import { useCurrency } from "../../context/CurrencyContext";
import { useState, useEffect } from "react";

const BalanceContainer = ({ balanceData }) => {
  const { selectedCurrency } = useCurrency(); // 👈 Usa el contexto para obtener la moneda
  const [summaryData, setSummaryData] = useState(null);

  const [totalFormatted, setTotalFormatted] = useState(null);

  useEffect(() => {
    const formatData = async () => {
      const total =
        balanceData.income + balanceData.expense + balanceData.saving;

      const iconMap = {
        income: <Wallet className="h-6 w-6 text-[--green]" />,
        expense: <Receipt className="h-6 w-6 text-[--red]" />,
        saving: <PiggyBank className="h-6 w-6 text-[--blue]" />,
      };

      const newSummaryData = await Promise.all(
        [
          {
            key: "income",
            title: "Total Income",
            rawAmount: balanceData.income,
            goal: balanceData.goalMonthlyIncome,
            color: "var(--green)",
            icon: iconMap["income"],
          },
          {
            key: "expense",
            title: "Total Expenses",
            rawAmount: balanceData.expense,
            goal: balanceData.goalMonthlyExpense,
            color: "var(--red)",
            icon: iconMap["expense"],
          },
          {
            key: "saving",
            title: "Total Savings",
            rawAmount: balanceData.saving,
            goal: balanceData.goalMonthlySaving,
            color: "var(--blue)",
            icon: iconMap["saving"],
          },
        ].map(async (item) => {
          const formattedAmount = await convertAndFormat(
            { amount: item.rawAmount, currency: "COP" },
            selectedCurrency.code,
          );
          const formattedChange = await convertAndFormat(
            {
              amount: item.goal - item.rawAmount,
              currency: "COP",
            },
            selectedCurrency.code,
          );
          const formattedGoal = await convertAndFormat(
            { amount: item.goal, currency: "COP" },
            selectedCurrency.code,
          );

          return {
            title: item.title,
            amount: formattedAmount,
            percentage: total ? (item.rawAmount * 100) / total : 0,
            color: item.color,
            bgColor: "var(--background-card-hover)",
            icon: item.icon,
            change: formattedChange,
            changeText: "to complete the objective",
            extraInfo: `goal: ${formattedGoal}`,
          };
        }),
      );

      setSummaryData(newSummaryData);

      const calculatedTotal = {
        amount: balanceData.income + balanceData.expense + balanceData.saving,
        currency: "COP",
      };

      const totalFormatted = await convertAndFormat(
        calculatedTotal,
        selectedCurrency.code,
      );
      setTotalFormatted(totalFormatted);
    };

    formatData();
  }, [balanceData, selectedCurrency]);

  if (!summaryData || !totalFormatted) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <svg
          className="animate-spin h-8 w-8 text-[--blue] mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          ></path>
        </svg>
        <span className="text-[--text-subtitle] text-lg font-medium">
          Cargando balance...
        </span>
      </div>
    );
  }

  return (
    <section className="rounded-xl bg-[var(--section-dashboard)] p-[--spacing-big] space-y-[--spacing-medium]">
      <h2 className="text-4xl font-bold text-[--text-title]">
        Summary Balance
      </h2>

      <div className="grid grid-cols-2">
        {summaryData.slice(0, 2).map((item) => (
          <div key={item.title} className="p-[--spacing-big]">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <p style={{ color: "var(--text-secondary)" }}>{item.title}</p>
                <h2
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "600",
                    color: "var(--text-primary)",
                  }}
                >
                  {item.amount}
                </h2>
              </div>
              <div
                className="rounded-xl p-3"
                style={{
                  backgroundColor: item.bgColor,
                  transition: `background-color var(--duration-standard) ease-in-out`,
                }}
              >
                {item.icon}
              </div>
            </div>

            <div>
              <div
                className="w-full rounded-full"
                style={{
                  backgroundColor: "var(--background-card)",
                  height: "0.5rem",
                }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: item.color,
                    width: `${item.percentage.toFixed(2)}%`,
                  }}
                ></div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div
                  className="flex items-center"
                  style={{ color: "var(--text-primary)" }}
                >
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  <span className="font-medium">{item.change}</span>
                  <span
                    style={{
                      marginLeft: "0.25rem",
                      fontSize: "0.875rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {item.changeText}
                  </span>
                </div>
                <span style={{ color: "var(--text-secondary)" }}>
                  {item.extraInfo}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Tercer item */}
        <div className="p-[--spacing-big]">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <p style={{ color: "var(--text-secondary)" }}>
                {summaryData[2].title}
              </p>
              <h2
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "600",
                  color: "var(--text-primary)",
                }}
              >
                {summaryData[2].amount}
              </h2>
            </div>
            <div
              className="rounded-xl p-3"
              style={{
                backgroundColor: summaryData[2].bgColor,
                transition: `background-color var(--duration-standard) ease-in-out`,
              }}
            >
              {summaryData[2].icon}
            </div>
          </div>

          <div>
            <div
              className="w-full rounded-full"
              style={{
                backgroundColor: "var(--background-card)",
                height: "0.5rem",
              }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  backgroundColor: summaryData[2].color,
                  width: `${summaryData[2].percentage.toFixed(2)}%`,
                }}
              ></div>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div
                className="flex items-center"
                style={{ color: "var(--text-primary)" }}
              >
                <ArrowUpRight className="mr-1 h-4 w-4" />
                <span className="font-medium">{summaryData[2].change}</span>
                <span
                  style={{
                    marginLeft: "0.25rem",
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  {summaryData[2].changeText}
                </span>
              </div>
              <span style={{ color: "var(--text-secondary)" }}>
                {summaryData[2].extraInfo}
              </span>
            </div>
          </div>
        </div>

        {/* Expenses Analytics */}
        <div
          style={{
            backgroundColor: "var(--section-dashboard)",
            padding: "var(--spacing-big)",
          }}
        >
          <div className="mb-6 flex items-center justify-between">
            <p style={{ color: "var(--text-secondary)" }}>Expenses Analytics</p>
            <div
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                color: "var(--text-primary)",
              }}
            >
              {totalFormatted}
            </div>
          </div>

          <div className="mb-4">
            <div
              className="relative w-full rounded-full"
              style={{
                backgroundColor: "var(--background-card)",
                height: "0.5rem",
              }}
            >
              {summaryData.map((item, index) => (
                <div
                  key={item.title}
                  className="absolute top-0 h-full rounded-full"
                  style={{
                    backgroundColor: item.color,
                    width: `${item.percentage.toFixed(2)}%`,
                    left: `${summaryData
                      .slice(0, index)
                      .reduce((acc, curr) => acc + curr.percentage, 0)}%`,
                  }}
                ></div>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            {summaryData.map((item) => (
              <div key={item.title}>
                <div className="flex items-center">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span
                    style={{
                      marginLeft: "0.5rem",
                      fontSize: "0.875rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {item.title}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    color: "var(--text-primary)",
                  }}
                >
                  {item.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

BalanceContainer.propTypes = {
  balanceData: PropTypes.shape({
    income: PropTypes.number.isRequired,
    expense: PropTypes.number.isRequired,
    saving: PropTypes.number.isRequired,
    goalMonthlyIncome: PropTypes.number.isRequired,
    goalMonthlyExpense: PropTypes.number.isRequired,
    goalMonthlySaving: PropTypes.number.isRequired,
  }).isRequired,
};

export default BalanceContainer;
