import React from "react";
import { mockIncidents } from "../data/mockIncidents";

const Dashboard = () => {
  const totalIncidents = mockIncidents.length;

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

  return (
    <div className="p-6">
      {/* Page Title */}
      <h1 className="font-semibold text-xl mb-6">Dashboard</h1>

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
  );
};

export default Dashboard;
