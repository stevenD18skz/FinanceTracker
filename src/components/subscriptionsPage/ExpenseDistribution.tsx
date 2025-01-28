import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { Subscription } from "../../types/subscription";
import { formatCurrency } from "../../utils/formatters";

interface ExpenseDistributionProps {
  subscriptions: Subscription[];
}

const ExpenseDistribution: React.FC<ExpenseDistributionProps> = ({
  subscriptions,
}) => {
  const categoryExpenses = subscriptions.reduce(
    (acc, sub) => {
      if (sub.status === "active") {
        const monthlyCost =
          sub.paymentFrequency === "yearly"
            ? sub.cost / 12
            : sub.paymentFrequency === "quarterly"
              ? sub.cost / 3
              : sub.cost;

        acc[sub.category] = (acc[sub.category] || 0) + monthlyCost;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  const data = Object.entries(categoryExpenses).map(([category, value]) => ({
    id: category,
    label: category.charAt(0).toUpperCase() + category.slice(1),
    value,
  }));

  const colors = {
    streaming: "#FF6B6B",
    software: "#4ECDC4",
    gym: "#45B7D1",
    utilities: "#96CEB4",
    entertainment: "#FFEEAD",
    education: "#D4A5A5",
    other: "#9FA8DA",
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-lg">
      <h3 className="mb-6 text-lg font-semibold text-gray-900">
        Expense Distribution
      </h3>
      <div className="h-[400px]">
        <ResponsivePie
          data={data}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          colors={({ id }) => colors[id as keyof typeof colors]}
          borderWidth={1}
          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: "#999",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: "circle",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ExpenseDistribution;
