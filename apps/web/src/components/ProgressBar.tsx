import React from "react";
/**
 * Created by Dylan Huynh
 * @param props a value that represents how much of the progress bar is completed
 * @returns React component that represents a progress bar
 */
export default function ProgressBar(props: { completed: number }) {
  const completed = props;
  let color = "#3b82f6";
  if (completed.completed < 25) {
    color = "#22c55e";
  } else if (completed.completed > 85) {
    color = "#ef4444";
  }
  // container styles sheet
  const container = {
    height: 25,
    width: "90%",
    backgroundColor: "black",
    borderRadius: 50,
    margin: 50,
    border: "black 2px solid",
  };
  // percentage style sheet
  const percentFilled: any = {
    height: "100%",
    width: `${completed.completed}%`,
    backgroundColor: `${color}`,
    borderRadius: "inherit",
    textAlign: "center",
  };
  // percentage lable style sheet
  const label = {
    padding: 5,
    marginLeft: completed.completed === 0 ? "35px" : undefined,
    color: "white",
    fontWeight: "bold",
  };
  return (
    <div style={container} className="flex">
      <div style={percentFilled} className="inline-flex items-center justify-center">
        <span style={label}>{`${completed.completed}%`}</span>
      </div>
    </div>
  );
}
