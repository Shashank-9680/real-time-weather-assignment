import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const LegendItem = ({ color, text }) => (
  <div className="flex items-center mr-4">
    <div className={`w-4 h-0.5 ${color} mr-1`}></div>
    <span>{text}</span>
  </div>
);

const SummaryChart = ({ summaryData }) => {
  console.log("SummaryChart rendered");
  console.log("summaryData:", summaryData);

  if (!summaryData || summaryData.length === 0) {
    return <div>No data available for the chart.</div>;
  }

  return (
    <div
      className="bg-white rounded-lg shadow-lg p-6"
      style={{ height: "400px" }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Temperature Trends</h3>
        <div className="flex items-center">
          <LegendItem color="bg-red-500" text="Max Temp" />
          <LegendItem color="bg-blue-500" text="Avg Temp" />
          <LegendItem color="bg-green-500" text="Min Temp" />
        </div>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={summaryData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => new Date(date).toLocaleDateString()}
          />
          <YAxis />
          <Tooltip
            labelFormatter={(date) => new Date(date).toLocaleDateString()}
            formatter={(value) => [`${value.toFixed(2)}°C`]}
          />
          <Line
            type="monotone"
            dataKey="maxTemp"
            stroke="#ef4444"
            name="Max Temp"
          />
          <Line
            type="monotone"
            dataKey="avgTemp"
            stroke="#3b82f6"
            name="Avg Temp"
          />
          <Line
            type="monotone"
            dataKey="minTemp"
            stroke="#22c55e"
            name="Min Temp"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SummaryChart;
