import React from "react";
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
  const incomeData = Object.values(data).map((day) => day.income);
  const expenseData = Object.values(data).map((day) => day.expense);
  const savingData = Object.values(data).map((day) => day.saving);

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
        position: "top" as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: "circle",
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          color: "#fff",
        },
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.8)",
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
          color: "rgba(255, 255, 255, 0.1)",
          drawBorder: false,
        },
        ticks: {
          color: "#9ca3af",
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          padding: 8,
        },
        title: {
          display: true,
          text: "Days",
          color: "#fff",
          font: {
            size: 14,
            family: "'Inter', sans-serif",
          },
          padding: { top: 20 },
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
          drawBorder: false,
        },
        ticks: {
          color: "#9ca3af",
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
          color: "#fff",
          font: {
            size: 14,
            family: "'Inter', sans-serif",
          },
          padding: { bottom: 20 },
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
    <div className="rounded-xl bg-[#262b38] p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Financial Overview
      </h2>
      <div className="h-[400px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default FinancialChart;
