import React from "react";
import { FaCircle } from "react-icons/fa";
import { mockIncidents } from "../data/mockIncidents";

const Incidents = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Incidents</h1>

      <div className="bg-white rounded-xl shadow-md overflow-hidden ">
        <div className="overflow-x-auto ">
          <table className="w-full">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Incident
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Assigned to
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  SLA Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockIncidents.map((item) => {
                const sev =
                  item.severity === "P1"
                    ? "Critical"
                    : item.severity === "P2"
                    ? "High"
                    : item.severity === "P3"
                    ? "Moderate"
                    : "Low";

                const severityColor =
                  sev === "Critical"
                    ? "text-red-600 bg-red-50"
                    : sev === "High"
                    ? "text-orange-600 bg-orange-50"
                    : sev === "Moderate"
                    ? "text-yellow-600 bg-yellow-50"
                    : "text-green-600 bg-green-50";

                const statusColor =
                  item.status === "New"
                    ? "bg-blue-100 text-blue-700"
                    : item.status === "In Progress"
                    ? "bg-orange-100 text-orange-700"
                    : item.status === "Resolved"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700";

                const deadline = item.openedAt + item.slaHours * 60 * 60 * 1000;
                const remaining = deadline - Date.now();

                const hours = Math.floor(
                  Math.abs(remaining) / (1000 * 60 * 60)
                ); 
                const minutes = Math.floor(
                  (Math.abs(remaining) % (1000 * 60 * 60)) / (1000 * 60)
                );

                const slaStatus =
                  item.status === "Closed" ? (
                    <span className="text-green-600 flex space-x-1.5">
                      <FaCircle className="self-center" />
                      <h1>Completed</h1>
                    </span>
                  ) : remaining > 0 ? (
                    <span className="text-orange-500 flex space-x-1.5">
                      <FaCircle className="self-center" />
                      <h1>{`${hours}h ${minutes}m left`}</h1>
                    </span>
                  ) : (
                    <span className="text-red-600 flex space-x-1.5">
                      <FaCircle className="self-center" />
                      <h1>{`-${hours}h ${minutes}m`}</h1>
                    </span>
                  );

                return (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {item.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${severityColor}`}
                      >
                        {sev}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${statusColor}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {item.assignedTo}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {slaStatus}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-blue-600 hover:text-blue-800 font-medium transition duration-150">
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Incidents;
