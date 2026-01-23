import React from "react";
import { mockIncidents } from "../data/mockIncidents";
import {
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  LineChart,
  Line,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  calculateDashboardStats,
  getSeverityChartData,
  getStatusChartData,
  getTrendData,
} from "../utils/dashboardHelpers";

const Analytics = () => {
  const chartData = getSeverityChartData(mockIncidents);
  const statusChartData = getStatusChartData(mockIncidents);
  const trendData = getTrendData(mockIncidents);
  return (
    <div>
      <div className="p-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">
            Incident Trend (Last 7 Days)
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData.slice(0, 7)}>
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="date" />
              {/* <YAxis /> */}
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
        <div className=" bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Incidents by Severity</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <Tooltip />
              <Bar dataKey="value">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className=" bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Incidents by Status</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={statusChartData}>
              <XAxis dataKey="name" />
              <Tooltip />
              <Bar dataKey="value">
                {statusChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
