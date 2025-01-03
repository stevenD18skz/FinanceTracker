import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function ProgressCircle({ value }) {
  return (
    <div style={{ width: "50px", height: "50px" }}>
      <CircularProgressbar
        value={value}
        text={`${value}%`}
        styles={buildStyles({
          textColor: "white",
          pathColor: "red",
          trailColor: "grey",
        })}
      />
    </div>
  );
}
