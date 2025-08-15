import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { ChartOptions } from "chart.js";

import { useCurrency } from "../../context/CurrencyContext";
import { convertAndFormat } from "../../utils/formatters";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

interface FinanceData {
  income: number;
  expense: number;
  saving: number;
}

interface WeekFinances {
  [key: string]: FinanceData;
}

interface FinancialChartProps {
  data: WeekFinances;
}

const FinancialChart: React.FC<FinancialChartProps> = ({ data }) => {
  // Transform data for Chart.js
  const labels = Object.keys(data);
  const { selectedCurrency } = useCurrency();
  const [incomeData, setIncomeData] = useState<number[]>([]);
  const [expenseData, setExpenseData] = useState<number[]>([]);
  const [savingData, setSavingData] = useState<number[]>([]);

  useEffect(() => {
    let mounted = true;

    const allFormated = async () => {
      if (!data) {
        setIncomeData([]);
        return;
      }

      // Mantener orden usando Object.keys ordenados (day-1 .. day-7 deberían mantener orden de inserción)
      const keys = Object.keys(data);

      // crear promesas (una por día)
      const promises = keys.map((k) =>
        convertAndFormat(
          { amount: data[k].income, currency: "COP" }, // tus datos están en COP
          selectedCurrency.code,
          true,
          true, // onlyNumber: queremos número sin símbolo
        ).catch((e) => {
          console.error("convert error for", k, e);
          return "0"; // fallback por día
        }),
      );

      // esperar todas
      const results = await Promise.all(promises); // results es string[] (por el onlyNumber)
      // convertir a numbers (si prefieres strings, omite esta línea)
      const numbers = results.map((s) => {
        // manejar coma decimal u otros formatos: parseFloat es suficiente si onlyNumber devuelve "1234.56"
        const n = parseFloat(String(s).replace(/,/g, ""));
        return Number.isFinite(n) ? n : 0;
      });

      if (mounted) setIncomeData(numbers);
    };

    allFormated();

    return () => {
      mounted = false;
    };
  }, [selectedCurrency, data]);

  useEffect(() => {
    let mounted = true;

    const allFormated = async () => {
      if (!data) {
        setExpenseData([]);
        return;
      }

      // Mantener orden usando Object.keys ordenados (day-1 .. day-7 deberían mantener orden de inserción)
      const keys = Object.keys(data);

      // crear promesas (una por día)
      const promises = keys.map((k) =>
        convertAndFormat(
          { amount: data[k].expense, currency: "COP" }, // tus datos están en COP
          selectedCurrency.code,
          true,
          true, // onlyNumber: queremos número sin símbolo
        ).catch((e) => {
          console.error("convert error for", k, e);
          return "0"; // fallback por día
        }),
      );

      // esperar todas
      const results = await Promise.all(promises); // results es string[] (por el onlyNumber)
      // convertir a numbers (si prefieres strings, omite esta línea)
      const numbers = results.map((s) => {
        // manejar coma decimal u otros formatos: parseFloat es suficiente si onlyNumber devuelve "1234.56"
        const n = parseFloat(String(s).replace(/,/g, ""));
        return Number.isFinite(n) ? n : 0;
      });

      if (mounted) setExpenseData(numbers);
    };

    allFormated();

    return () => {
      mounted = false;
    };
  }, [selectedCurrency, data]);

  useEffect(() => {
    let mounted = true;

    const allFormated = async () => {
      if (!data) {
        setSavingData([]);
        return;
      }

      // Mantener orden usando Object.keys ordenados (day-1 .. day-7 deberían mantener orden de inserción)
      const keys = Object.keys(data);

      // crear promesas (una por día)
      const promises = keys.map((k) =>
        convertAndFormat(
          { amount: data[k].saving, currency: "COP" }, // tus datos están en COP
          selectedCurrency.code,
          true,
          true, // onlyNumber: queremos número sin símbolo
        ).catch((e) => {
          console.error("convert error for", k, e);
          return "0"; // fallback por día
        }),
      );

      // esperar todas
      const results = await Promise.all(promises); // results es string[] (por el onlyNumber)
      // convertir a numbers (si prefieres strings, omite esta línea)
      const numbers = results.map((s) => {
        // manejar coma decimal u otros formatos: parseFloat es suficiente si onlyNumber devuelve "1234.56"
        const n = parseFloat(String(s).replace(/,/g, ""));
        return Number.isFinite(n) ? n : 0;
      });

      if (mounted) setSavingData(numbers);
    };

    allFormated();

    return () => {
      mounted = false;
    };
  }, [selectedCurrency, data]);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        borderColor: "rgb(34, 197, 94)", // green-500
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "rgb(34, 197, 94)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(34, 197, 94)",
        borderWidth: 2,
      },
      {
        label: "Expenses",
        data: expenseData,
        borderColor: "rgb(239, 68, 68)", // red-500
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "rgb(239, 68, 68)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(239, 68, 68)",
        borderWidth: 2,
      },
      {
        label: "Savings",
        data: savingData,
        borderColor: "rgb(59, 130, 246)", // blue-500
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "rgb(59, 130, 246)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(59, 130, 246)",
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          padding: 15,
          usePointStyle: true,
          pointStyle: "circle",
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          color: "#4B5563", // text-gray-700
        },
      },
      tooltip: {
        backgroundColor: "rgba(31, 41, 55, 0.9)", // dark gray
        titleFont: {
          size: 13,
          family: "'Inter', sans-serif",
        },
        bodyFont: {
          size: 12,
          family: "'Inter', sans-serif",
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        usePointStyle: true,
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            const value = context.parsed.y;
            return `${label}: $${value.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(229, 231, 235, 0.5)", // light gray with transparency e,
        },
        ticks: {
          color: "#6B7280", // text-gray-500
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          padding: 8,
        },
        title: {
          display: true,
          text: "Days",
          color: "#4B5563", // text-gray-700
          font: {
            size: 14,
            family: "'Inter', sans-serif",
          },
          padding: { top: 15 },
        },
      },
      y: {
        grid: {
          color: "rgba(229, 231, 235, 0.5)",
        },
        ticks: {
          color: "#6B7280",
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          padding: 8,
          callback: function (value) {
            return "$" + value;
          },
        },
        title: {
          display: true,
          text: "Amount ($)",
          color: "#4B5563",
          font: {
            size: 14,
            family: "'Inter', sans-serif",
          },
          padding: { bottom: 15 },
        },
        beginAtZero: true,
      },
    },
    animations: {
      tension: {
        duration: 1000,
        easing: "easeInOutQuart",
        from: 0.4,
        to: 0.4,
      },
    },
  };

  return (
    <section className="rounded-xl bg-[var(--section-dashboard)] p-[--spacing-big] space-y-[--spacing-medium]">
      <h2 className="text-4xl font-bold text-[--text-title]">
        Financial Overview
      </h2>
      <div className="h-[600px]">
        <Line data={chartData} options={options} />
      </div>
    </section>
  );
};

export default FinancialChart;
