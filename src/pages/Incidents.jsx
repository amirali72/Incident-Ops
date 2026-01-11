import React, { useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { mockIncidents } from "../data/mockIncidents";
import {
  FaSortAlphaDownAlt,
  FaSortAlphaUp,
  FaSortNumericDownAlt,
  FaSortNumericDown,
  FaSearch,
  FaFileDownload,
} from "react-icons/fa";
import Papa from "papaparse";

const Incidents = () => {
  const [searchVal, setSearchVal] = useState("");
  const [filteredINC, setFilteredINC] = useState(mockIncidents);
  const [sevFilter, setSevFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortINC, setSortINC] = useState("new");
  const [sortSLA, setSortSLA] = useState("");

  const searchIncidents = () => {
    const filteredData = mockIncidents.filter(
      (item) =>
        item.id.toLowerCase().includes(searchVal.toLowerCase()) ||
        item.title.toLowerCase().includes(searchVal.toLowerCase())
    );
    setFilteredINC(filteredData);
  };

  // papaparse export to csv and download func
  const exportToCSV = () => {
    const csvData = filteredINC.map((item) => ({
      ID: item.id,
      Title: item.title,
      Severity: item.severity,
      Status: item.status,
      "Assigned To": item.assignedTo,
      "SLA Hours": item.slaHours,
      "Opened At": new Date(item.openedAt).toLocaleString(),
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `incidents_${new Date().toISOString().slice(0, 10)}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Incidents</h1>

      <div className="bg-white rounded-xl shadow-md overflow-hidden ">
        <div className="overflow-x-auto ">
          <div className="flex items-center justify-between gap-3 p-3">
            <div className="flex">
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && searchIncidents()}
                className="border-2 border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white mx-2 px-4 py-2 rounded-md text-sm font-medium transition duration-200 shadow-sm"
                onClick={searchIncidents}
              >
                Search
              </button>

              <div className="flex space-x-4 ml-4 pl-4 border-l-2 border-gray-100">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  Severity :
                  <select
                    name="Severity"
                    value={sevFilter}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => {
                      const newSev = e.target.value;
                      setSevFilter(newSev);
                      const filteredData = mockIncidents.filter(
                        (item) =>
                          (item.id
                            .toLowerCase()
                            .includes(searchVal.toLowerCase()) ||
                            item.title
                              .toLowerCase()
                              .includes(searchVal.toLowerCase())) &&
                          (newSev === "all" || item.severity === newSev) &&
                          (statusFilter === "all" ||
                            item.status === statusFilter)
                      );
                      setFilteredINC(filteredData);
                    }}
                  >
                    <option value="all">All</option>
                    <option value="P1">P1</option>
                    <option value="P2">P2</option>
                    <option value="P3">P3</option>
                    <option value="P4">P4</option>
                  </select>
                </label>

                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  Status :
                  <select
                    name="Status"
                    value={statusFilter}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setStatusFilter(newValue);
                      const filteredData = mockIncidents.filter(
                        (item) =>
                          (item.id
                            .toLowerCase()
                            .includes(searchVal.toLowerCase()) ||
                            item.title
                              .toLowerCase()
                              .includes(searchVal.toLowerCase())) &&
                          (newValue === "all" || item.status === newValue) &&
                          (sevFilter === "all" || item.severity === sevFilter)
                      );
                      setFilteredINC(filteredData);
                    }}
                  >
                    <option value="all">All</option>
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                </label>
              </div>
            </div>
            <div>
              <button
                onClick={exportToCSV}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm ml-2 flex items-center gap-1"
                title="Export filtered data to CSV"
              >
                <FaFileDownload />
                Export ({filteredINC.length})
              </button>
            </div>
          </div>

          <table className="w-full">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider flex space-x-1">
                  <h2>Incident</h2>
                  <div
                    className="self-center border cursor-pointer"
                    onClick={() =>
                      sortINC === "new"
                        ? (setSortINC("old"), setSortSLA(""))
                        : (setSortINC("new"), setSortSLA(""))
                    }
                  >
                    {sortINC === "new" ? (
                      <FaSortAlphaDownAlt />
                    ) : (
                      <FaSortAlphaUp />
                    )}
                  </div>
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

                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider flex space-x-1">
                  <h2>SLA Status</h2>
                  <div
                    className="self-center border cursor-pointer"
                    onClick={() =>
                      sortSLA === "high"
                        ? setSortSLA("low")
                        : setSortSLA("high")
                    }
                  >
                    {sortSLA === "high" ? (
                      <FaSortNumericDown />
                    ) : (
                      <FaSortNumericDownAlt />
                    )}
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredINC
                .sort((a, b) => {
                  if (sortINC === "new") {
                    return a.id.localeCompare(b.id); // Newest first
                  } else {
                    return b.id.localeCompare(a.id); // Oldest first
                  }
                })
                .sort((a, b) => {
                  const aDeadline = a.openedAt + a.slaHours * 60 * 60 * 1000;
                  const bDeadline = b.openedAt + b.slaHours * 60 * 60 * 1000;
                  const aRemaining = aDeadline - Date.now();
                  const bRemaining = bDeadline - Date.now();

                  if (sortSLA === "high") {
                    return bRemaining - aRemaining; // Most time first
                  } else if (sortSLA === "low") {
                    return aRemaining - bRemaining; // Urgent first
                  }
                })
                .map((item) => {
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

                  const deadline =
                    item.openedAt + item.slaHours * 60 * 60 * 1000;
                  const remaining = deadline - Date.now();

                  const hours = Math.floor(
                    Math.abs(remaining) / (1000 * 60 * 60)
                  );
                  const minutes = Math.floor(
                    (Math.abs(remaining) % (1000 * 60 * 60)) / (1000 * 60)
                  );

                  const slaStatus =
                    item.status === "Closed" || item.status === "Resolved" ? (
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
