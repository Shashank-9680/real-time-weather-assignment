import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border rounded shadow">
        <p className="font-bold">{`Date: ${new Date(
          label
        ).toLocaleDateString()}`}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value.toFixed(2)}°C`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const SummaryChart = ({ summaryData }) => {
  console.log("summary", summaryData);
  if (!summaryData || summaryData.length === 0) {
    return <div>No data available for the chart.</div>;
  }

  const processedData = summaryData.reduce((acc, data) => {
    acc.push({
      date: data.date,
      maxTemp: data.maxTemp,
      avgTemp: data.avgTemp,
      minTemp: data.minTemp,
    });
    return acc;
  }, []);

  console.log("process", processedData);
  return (
    <div
      className="bg-white rounded-lg shadow-lg p-6"
      style={{ height: "500px" }}
    >
      <h3 className="text-xl font-semibold mb-4">
        Temperature Trends for {summaryData[0]?.city || "Unknown City"}
      </h3>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          data={processedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(tickItem) =>
              new Date(tickItem).toLocaleDateString()
            }
          />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
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
