import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ExpensesProgress = ({ expenses, budget }) => {
  const percentage = Math.min((expenses / budget) * 100, 100);

  return (
    <div className="rounded-xl bg-white p-6">
      <div className="relative mx-auto h-32 w-32">
        <CircularProgressbar
          value={percentage}
          text={`$${expenses.toFixed(2)}`}
          styles={buildStyles({
            pathColor: percentage > 100 ? "#EF4444" : "#51b837",
            textColor: "#000",
            trailColor: "#d6d6d6",
          })}
        />
      </div>
    </div>
  );
};

export default ExpensesProgress;
