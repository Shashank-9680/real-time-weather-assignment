import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SummaryChart = ({ summaryData }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-96">
      <h3 className="text-xl font-semibold mb-4">Temperature Trends</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={summaryData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => new Date(date).toLocaleDateString()}
          />
          <YAxis />
          <Tooltip
            labelFormatter={(date) => new Date(date).toLocaleDateString()}
            formatter={(value) => [`${value}°C`]}
          />
          <Legend />
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
