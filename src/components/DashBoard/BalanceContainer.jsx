import React from "react";
import { ArrowUpRight, Wallet, Receipt, PiggyBank } from "lucide-react";
import TitleContainer from "../ui/TitleContainer";
import { formatCurrency } from "../../utils/formatters";

const BalanceContainer = ({ balanceData }) => {
  // Suma total para el cálculo de porcentajes
  const total = balanceData.income + balanceData.expense + balanceData.saving;

  // Datos para las tarjetas y analytics
  const summaryData = [
    {
      title: "Total Income",
      amount: balanceData.income,
      percentage: total ? (balanceData.income * 100) / total : 0,
      color: "#10B981", // emerald-500
      bgColor: "bg-emerald-100",
      icon: <Wallet className="h-6 w-6 text-emerald-600" />,
      change: "+12.1 %",
      changeText: "from last week",
      extraInfo: "used from $10,000.00",
    },
    {
      title: "Total Expenses",
      amount: balanceData.expense,
      percentage: total ? (balanceData.expense * 100) / total : 0,
      color: "#EF4444", // red-500
      bgColor: "bg-red-100",
      icon: <Receipt className="h-6 w-6 text-red-600" />,
      change: "+8.5 %",
      changeText: "from last week",
      extraInfo: "used from $8,000.00",
    },
    {
      title: "Total Savings",
      amount: balanceData.saving,
      percentage: total ? (balanceData.saving * 100) / total : 0,
      color: "#3B82F6", // blue-500
      bgColor: "bg-blue-100",
      icon: <PiggyBank className="h-6 w-6 text-blue-600" />,
      change: "+5.2 %",
      changeText: "from last week",
      extraInfo: "used from $5,000.00",
    },
  ];

  return (
    <div className="rounded-xl bg-white p-6 shadow-lg">
      <TitleContainer text={"Summary Balance"} />
      {/* Opcional: podrías mostrar el total general */}
      {/* <div className="mb-4 text-xl font-bold">{formatCurrency(total)}</div> */}

      <div className="grid grid-cols-2">
        {/* Primer row: Income y Expenses */}
        {summaryData.slice(0, 2).map((item, index) => (
          <div key={index} className="border-b-2 border-r-2 p-6">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <p className="mb-1 text-gray-500">{item.title}</p>
                <h2 className="text-5xl font-semibold tracking-tighter">
                  {formatCurrency(item.amount)}
                </h2>
              </div>
              <div className={`rounded-xl ${item.bgColor} p-3`}>
                {item.icon}
              </div>
            </div>

            <div>
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full"
                  style={{
                    backgroundColor: item.color,
                    width: `${item.percentage.toFixed(2)}%`,
                  }}
                ></div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center text-gray-700">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  <span className="font-medium">{item.change}</span>
                  <span className="ml-1 text-sm text-gray-500">
                    {item.changeText}
                  </span>
                </div>
                <span className="text-gray-500">{item.extraInfo}</span>
              </div>
            </div>
          </div>
        ))}

        {/* Segunda row, primera columna: Savings */}
        <div className="border-r-2 p-6">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <p className="mb-1 text-gray-500">{summaryData[2].title}</p>
              <h2 className="text-5xl font-semibold tracking-tighter">
                {formatCurrency(summaryData[2].amount)}
              </h2>
            </div>
            <div className={`rounded-xl ${summaryData[2].bgColor} p-3`}>
              {summaryData[2].icon}
            </div>
          </div>

          <div>
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full"
                style={{
                  backgroundColor: summaryData[2].color,
                  width: `${summaryData[2].percentage.toFixed(2)}%`,
                }}
              ></div>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center text-gray-700">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                <span className="font-medium">{summaryData[2].change}</span>
                <span className="ml-1 text-sm text-gray-500">
                  {summaryData[2].changeText}
                </span>
              </div>
              <span className="text-gray-500">{summaryData[2].extraInfo}</span>
            </div>
          </div>
        </div>

        {/* Expenses Analytics Card: ocupa las dos columnas de la segunda row */}
        <div className="bg-white p-6">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-500">Expenses Analytics</p>
          </div>

          <div className="mb-4">
            <div className="relative h-2 w-full rounded-full bg-gray-200">
              {summaryData.map((item, index) => (
                <div
                  key={index}
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
            {summaryData.map((item, index) => (
              <div key={index}>
                <div className="flex items-center">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="ml-2 text-sm text-gray-600">
                    {item.title}
                  </span>
                </div>
                <span className="text-sm font-semibold text-gray-800">
                  {formatCurrency(item.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceContainer;
