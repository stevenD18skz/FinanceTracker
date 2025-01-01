import React from "react";
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

const ActivityChart = ({ data, labels, currentValue, currentDay }) => {
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
          stepSize: 1,
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: false,
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
        <div className="absolute left-1/2 top-8 z-10 -translate-x-1/2 transform rounded-lg bg-gray-900 px-3 py-1 text-sm text-white">
          <div className="text-center">
            <div>{currentDay}</div>
            <div className="font-semibold">${currentValue}</div>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full transform">
            <div className="border-8 border-transparent border-t-gray-900" />
          </div>
        </div>

        <Line options={options} data={chartData} />
      </div>
    </div>
  );
};

export default ActivityChart;
