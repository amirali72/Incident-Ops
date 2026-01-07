import React from "react";
import { mockIncidents } from "../data/mockIncidents";
import {
  calculateDashboardStats,
  getSeverityChartData,
  getStatusChartData,
  getTrendData,
} from "../utils/dashboardHelpers";
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

const Dashboard = () => {
  const {
    totalIncidents,
    openIncidents,
    criticalIncidents,
    slaBreached,
  } = calculateDashboardStats(mockIncidents);

  const chartData = getSeverityChartData(mockIncidents);
  const statusChartData = getStatusChartData(mockIncidents);
  const trendData = getTrendData(mockIncidents);

  return (
    <div>
      <div className="p-6">
        {/* Page Title */}
        {/* <h1 className="font-semibold text-xl mb-6">Dashboard</h1> */}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Incidents */}
          <div className="bg-white shadow-md rounded-xl p-5">
            <h2 className="text-sm text-gray-500 font-semibold text-center">
              TOTAL INCIDENTS
            </h2>
            <p className="text-5xl font-bold text-center mt-3">
              {totalIncidents}
            </p>
          </div>

          {/* Open Incidents */}
          <div className="bg-white shadow-md rounded-xl p-5">
            <h2 className="text-sm text-gray-500 font-semibold text-center">
              OPEN INCIDENTS
            </h2>
            <p className="text-5xl font-bold text-blue-600 text-center mt-3">
              {openIncidents}
            </p>
          </div>

          {/* Critical P1 */}
          <div className="bg-white shadow-md rounded-xl p-5">
            <h2 className="text-sm text-red-500 font-semibold text-center">
              CRITICAL (P1)
            </h2>
            <p className="text-5xl font-bold text-red-600 text-center mt-3">
              {criticalIncidents}
            </p>
          </div>

          {/* SLA Breached */}
          <div className="bg-white shadow-md rounded-xl p-5">
            <h2 className="text-sm text-red-500 font-semibold text-center">
              SLA Breached
            </h2>
            <p className="text-5xl font-bold text-red-600 text-center mt-3">
              {slaBreached}
            </p>
          </div>
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
      {/* Trend Chart - Full Width */}
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
    </div>
  );
};

export default Dashboard;
