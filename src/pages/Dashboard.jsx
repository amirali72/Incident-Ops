import React from "react";
import { mockIncidents } from "../data/mockIncidents";
import {
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
} from "recharts";

const Dashboard = () => {
  const totalIncidents = mockIncidents.length;

  const chartData = [
    {
      name: "P1",
      value: mockIncidents.filter((item) => item.severity === "P1").length,
      color: "#ef4444",
    },
    {
      name: "P2",
      value: mockIncidents.filter((item) => item.severity === "P2").length,
      color: "#f97316",
    },
    {
      name: "P3",
      value: mockIncidents.filter((item) => item.severity === "P3").length,
      color: "#eab308",
    },
    {
      name: "P4",
      value: mockIncidents.filter((item) => item.severity === "P4").length,
      color: "#22c55e",
    },
  ];

  const statusChartData = [
    {
      name: "New",
      value: mockIncidents.filter((item) => item.status === "New").length,
      color: "#3b82f6",
    },
    {
      name: "In Progress",
      value: mockIncidents.filter((item) => item.status === "In Progress")
        .length,
      color: "#f59e0b",
    },
    {
      name: "Resolved",
      value: mockIncidents.filter((item) => item.status === "Resolved").length,
      color: "#10b981",
    },
    {
      name: "Closed",
      value: mockIncidents.filter((item) => item.status === "Closed").length,
      color: "#6b7280",
    },
  ];

  const openIncidents = mockIncidents.filter(
    (item) => item.status !== "Closed" && item.status !== "Resolved"
  ).length;

  const criticalIncidents = mockIncidents.filter(
    (item) => item.severity === "P1"
  ).length;

  const slaBreached = mockIncidents.filter((item) => {
    if (item.status === "Closed" || item.status === "Resolved") {
      return false;
    }

    return Date.now() > item.openedAt + item.slaHours * 60 * 60 * 1000;
  }).length;

  //Data for Line Chart 
  const dateCounts = {};

  mockIncidents.forEach((incident) => {
    const date = new Date(incident.openedAt);
    const formatted = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    if (dateCounts[formatted]) {
      dateCounts[formatted] = dateCounts[formatted] + 1;
    } else {
      dateCounts[formatted] = 1;
    }
  });

  const trendData = Object.keys(dateCounts).map((date) => {
    return {
      date: date,
      count: dateCounts[date],
    };
  });

  console.log(trendData);

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
    </div>
  );
};

export default Dashboard;
