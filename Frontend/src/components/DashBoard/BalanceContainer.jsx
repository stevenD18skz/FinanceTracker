import { ArrowUpRight, Wallet, Receipt, PiggyBank } from "lucide-react";
import { convertAndFormat } from "../../utils/formatters";
import PropTypes from "prop-types";
import { useCurrency } from "../../context/CurrencyContext";
import { useState, useEffect } from "react";

const BalanceItem = ({ dataItem }) => {
  return (
    <div className="p-[--spacing-big] space-y-[--spacing-medium]">
      <div className="flex items-start justify-between">
        <div>
          <h3
            style={{
              fontSize: "1.5rem",
              color: "var(--text-secondary)",
            }}
          >
            {dataItem.title}
          </h3>
          <h4
            style={{
              fontSize: "2.5rem",
              fontWeight: "600",
              color: "var(--text-primary)",
            }}
          >
            {dataItem.amount}
          </h4>
        </div>

        <div
          className="rounded-xl p-3 "
          style={{
            backgroundColor: dataItem.bgColor,
            transition: `background-color var(--duration-standard) ease-in-out`,
          }}
        >
          {dataItem.icon}
        </div>
      </div>

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
            backgroundColor: dataItem.color,
            width: `${dataItem.percentageGoal.toFixed(2)}%`,
          }}
        ></div>
      </div>

      <div className="flex items-center justify-between text-md">
        <div className="flex items-center gap-1">
          <ArrowUpRight
            className="h-6 w-6"
            style={{
              color: dataItem.color,
            }}
          />
          <span className="font-bold">{dataItem.change}</span>
          <span
            style={{
              color: "var(--text-secondary)",
            }}
          >
            {dataItem.changeText}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <span
            style={{
              color: "var(--text-secondary)",
            }}
          >
            goal:
          </span>
          <span className="font-bold">{dataItem.goal}</span>
        </div>
      </div>
    </div>
  );
};

BalanceItem.propTypes = {
  dataItem: PropTypes.shape({
    title: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    percentage: PropTypes.number.isRequired,
    percentageGoal: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    bgColor: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    change: PropTypes.string.isRequired,
    changeText: PropTypes.string.isRequired,
    goal: PropTypes.string.isRequired,
  }).isRequired,
};

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
            percentageGoal: item.goal ? (item.rawAmount * 100) / item.goal : 0,
            color: item.color,
            bgColor: "var(--background-card-hover)",
            icon: item.icon,
            change: formattedChange,
            changeText:
              item.key === "expense"
                ? "remaining budget"
                : "to complete the objective",
            goal: formattedGoal,
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
      <section className="rounded-xl h-[28.3rem] bg-[--section-dashboard] p-[--spacing-big] space-y-[--spacing-medium] animate-pulse">
        {/* Título principal */}
        <div className="h-9 w-1/3 rounded-lg bg-[--background-card]" />

        <div className="grid grid-cols-2 gap-[--spacing-big]">
          {/* Columna izquierda: 3 BalanceItems */}

          {Array.from({ length: 3 }).map((_, i) => (
            <div key={`balance-skeleton-${i}`} className="h-[11rem] w-full">
              <div className="h-9 w-[30%] mb-1 rounded-lg bg-[--background-card]"></div>
              <div className="h-9 w-[50%] mb-3 rounded-lg bg-[--background-card]"></div>
              <div className="h-12 w-full mb-3 rounded-lg bg-[--background-card]"></div>
              <div className="flex justify-between">
                <div className="h-4 w-[20%] mb-3 rounded-lg bg-[--background-card]"></div>
                <div className="h-4 w-[20%] mb-3 rounded-lg bg-[--background-card]"></div>
              </div>
            </div>
          ))}

          {/* Columna derecha: Expenses Analytics */}
          <div className="space-y-[--spacing-big]">
            {/* Header: title + número */}
            <div className="flex justify-between items-center">
              <div className="h-8 w-28 rounded bg-[--background-card]" />
              <div className="h-9 w-20 rounded bg-[--background-card]" />
            </div>

            {/* Barra de progreso */}
            <div className="h-3 w-full rounded-full bg-[--background-card]" />

            {/* Leyenda con 3 ítems */}
            <div className="flex justify-between">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-[--background-card]" />
                    <div className="h-4 w-14 rounded bg-[--background-card]" />
                  </div>
                  <div className="h-5 w-12 rounded bg-[--background-card]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-xl bg-[var(--section-dashboard)] p-[--spacing-big] space-y-[--spacing-medium]">
      <h2 className="text-4xl font-bold text-[--text-title]">
        Summary Balance
      </h2>

      <div className="grid grid-cols-2">
        {summaryData.slice(0, 3).map((item) => (
          <BalanceItem key={item.title} dataItem={item} />
        ))}

        {/* Expenses Analytics */}
        <div className="p-[--spacing-big] space-y-[--spacing-big]">
          <div className="flex justify-between">
            <h3
              style={{
                fontSize: "1.5rem",
                color: "var(--text-secondary)",
              }}
            >
              Expenses Analytics
            </h3>
            <h4
              style={{
                fontSize: "2.5rem",
                fontWeight: "600",
                color: "var(--text-primary)",
              }}
            >
              {totalFormatted}
            </h4>
          </div>

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

          <div className="flex items-center justify-between text-md">
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
                      color: "var(--text-secondary)",
                    }}
                  >
                    {item.title}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: "1.2rem",
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
