import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ChevronDown } from "lucide-react";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
);

const ActivityChart = ({ dataTransaction }) => {
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchLabels = () => {
      const filterCriterion = "This week";
      switch (filterCriterion) {
        case "This week":
          return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        case "Last week":
          return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        case "This month":
          return ["1", "2", "3", "4"];
      }
    };

    setLabels(fetchLabels());
  }, []);

  useEffect(() => {
    const fetchData = () => {
      const filteredTransactions = dataTransaction.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        const today = new Date();
        const daysDifference =
          (today - transactionDate) / (1000 * 60 * 60 * 24);

        const filterCriterion = "This week";

        switch (filterCriterion) {
          case "today":
            return (
              transactionDate.getDate() === today.getDate() &&
              transactionDate.getMonth() === today.getMonth() &&
              transactionDate.getFullYear() === today.getFullYear()
            );
          case "This week":
            return daysDifference <= 7;
          case "31":
            return daysDifference <= 31;
          case "all":
          default:
            return true;
        }
      });

      const dataMap = filteredTransactions.reduce((acc, transaction) => {
        const transactionDate = new Date(transaction.date);
        const dayLabel = transactionDate.toLocaleString("en-US", {
          weekday: "short",
        });

        if (!acc[dayLabel]) {
          acc[dayLabel] = 0;
        }
        acc[dayLabel] += parseInt(transaction.amount);
        return acc;
      }, {});

      const data = labels.map((label) => dataMap[label] || 0);

      return data;
    };

    if (labels.length > 0) {
      setData(fetchData());
    }
  }, [labels]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "#f0f0f0",
          drawBorder: false,
        },
        border: {
          display: false,
        },
        ticks: {
          callback: (value) => `$${value}k`,
          stepSize: 100000,
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            return `$${context.raw}k`;
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 0,
      },
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        fill: true,
        data,
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="h-full rounded-xl bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Activity</h3>
        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800">
          This week
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      <div className="relative h-64">
        {/* Current value indicator */}

        <Line options={options} data={chartData} />
      </div>
    </div>
  );
};

export default ActivityChart;
