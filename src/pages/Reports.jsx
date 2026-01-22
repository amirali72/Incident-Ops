import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { mockIncidents } from "../data/mockIncidents";
import SLATimer from "../components/SLATimer";
import { useNavigate } from "react-router-dom";
import { FaFileDownload } from "react-icons/fa";
import { exportTable } from "../utils/exportTable";

const Reports = () => {
  const date = new Date();
  date.setDate(date.getDate() - 30);
  const [dateFrom, setDateFrom] = useState(date);
  const [dateTo, setDateTo] = useState(new Date());
  const [groupOperator, setGroupOperator] = useState("is");
  const [groupValues, setGroupValues] = useState([]);
  const [groupValue, setGroupValue] = useState();
  const [priorityOperator, setPriorityOperator] = useState("is");
  const [priorityValues, setPriorityValues] = useState([]);
  const [priorityValue, setPriorityValue] = useState();
  const [statusOperator, setStatusOperator] = useState("is");
  const [statusValues, setStatusValues] = useState([]);
  const [statusValue, setStatusValue] = useState();
  const [assignedToOperator, setAssignedToOperator] = useState("is");
  const [assignedToValues, setAssignedToValues] = useState([]);
  const [assignedToValue, setAssignedToValue] = useState();
  const [showResults, setShowResults] = useState(false);
  const [filteredINC, setFilteredINC] = useState([]);
  const navigate = useNavigate();

  const assignedToNames = mockIncidents.reduce((acc, curr) => {
    if (!acc.includes(curr.assignedTo)) {
      acc.push(curr.assignedTo);
    }
    return acc;
  }, []);

  const teamNames = mockIncidents.reduce((acc, curr) => {
    if (!acc.includes(curr.assignedGroup)) {
      acc.push(curr.assignedGroup);
    }
    return acc;
  }, []);

  const handleMultipleSelect = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    return value;
  };

  const generateReport = () => {
    let results = mockIncidents;

    // Filter by Date
    results = results.filter(
      (inc) => inc.openedAt >= dateFrom && inc.openedAt <= dateTo
    );

    // Filter Assignment Group
    if (groupOperator === "is" && groupValue) {
      if (groupValue !== "All") {
        results = results.filter((inc) => inc.assignedGroup === groupValue);
      }
    } else if (groupOperator === "isNot" && groupValue) {
      if (groupValue !== "All") {
        results = results.filter((inc) => inc.assignedGroup !== groupValue);
      }
    } else if (groupOperator === "isOneOf" && groupValues.length > 0) {
      if (!groupValues.includes("All")) {
        results = results.filter((inc) =>
          groupValues.includes(inc.assignedGroup)
        );
      }
    }

    // Filter Priority
    if (priorityOperator === "is" && priorityValue) {
      if (priorityValue !== "All") {
        results = results.filter((inc) => inc.severity === priorityValue);
      }
    } else if (priorityOperator === "isNot" && priorityValue) {
      if (priorityValue !== "All") {
        results = results.filter((inc) => inc.severity !== priorityValue);
      }
    } else if (priorityOperator === "isOneOf" && priorityValues.length > 0) {
      if (!priorityValues.includes("All")) {
        results = results.filter((inc) =>
          priorityValues.includes(inc.severity)
        );
      }
    }

    // Filter by Status
    if (statusOperator === "is" && statusValue) {
      if (statusValue !== "All") {
        results = results.filter((inc) => inc.status === statusValue);
      }
    } else if (statusOperator === "isNot" && statusValue) {
      if (statusValue !== "All") {
        results = results.filter((inc) => inc.status !== statusValue);
      }
    } else if (statusOperator === "isOneOf" && statusValues.length > 0) {
      if (!statusValues.includes("All")) {
        results = results.filter((inc) => statusValues.includes(inc.status));
      }
    }

    // Filter by Assigned To
    if (assignedToOperator === "is" && assignedToValue) {
      if (assignedToValue !== "All") {
        results = results.filter((inc) => inc.assignedTo === assignedToValue);
      }
    } else if (assignedToOperator === "isNot" && assignedToValue) {
      if (assignedToValue !== "All") {
        results = results.filter((inc) => inc.assignedTo !== assignedToValue);
      }
    } else if (
      assignedToOperator === "isOneOf" &&
      assignedToValues.length > 0
    ) {
      if (!assignedToValues.includes("All")) {
        results = results.filter((inc) =>
          assignedToValues.includes(inc.assignedTo)
        );
      }
    }

    setShowResults(true);
    setFilteredINC(results);
  };

  return (
    <div>
      <div className="max-w-6xl mx-auto p-3">
        <div className="bg-white p-3 pl-6 rounded-md shadow-sm border border-gray-200">
          <h1 className="text-sm font-semibold text-gray-800 mb-3">
            SELECT FILTERS
          </h1>

          {/* INC Date Range */}
          <div className="flex items-center gap-3 flex-wrap py-2">
            <h1 className="text-xs font-semibold text-gray-700 w-40">
              Incident Created
            </h1>

            <div className="flex flex-col">
              <label className="text-[11px] text-gray-500 mb-0.5">From</label>
              <DatePicker
                selected={dateFrom}
                onChange={(date) => setDateFrom(date)}
                dateFormat="dd/MM/yyyy"
                className="w-36 h-8 border border-gray-300 rounded px-2 text-xs focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[11px] text-gray-500 mb-0.5">To</label>
              <DatePicker
                selected={dateTo}
                onChange={(date) => setDateTo(date)}
                dateFormat="dd/MM/yyyy"
                className="w-36 h-8 border border-gray-300 rounded px-2 text-xs focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Assignment Group */}
          <div className="flex items-center gap-3 flex-wrap py-2">
            <h1 className="text-xs font-semibold text-gray-700 w-40">
              Assignment Group
            </h1>

            <select
              name="groupOperator"
              value={groupOperator}
              onChange={(e) => setGroupOperator(e.target.value)}
              className="w-28 h-8 border border-gray-300 rounded px-2 text-xs focus:ring-1 focus:ring-blue-500"
            >
              <option value="is">is</option>
              <option value="isNot">is not</option>
              <option value="isOneOf">is one of</option>
            </select>

            <select
              name="groupValues"
              value={groupOperator === "isOneOf" ? groupValues : groupValue}
              onChange={(e) =>
                groupOperator === "isOneOf"
                  ? setGroupValues(handleMultipleSelect(e))
                  : setGroupValue(e.target.value)
              }
              multiple={groupOperator === "isOneOf"}
              className={`w-48 border border-gray-300 rounded px-2 text-xs focus:ring-1 focus:ring-blue-500 ${
                groupOperator === "isOneOf" ? "h-24" : "h-8"
              }`}
            >
              <option value="All">All</option>
              {teamNames.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div className="flex items-center gap-3 flex-wrap py-2">
            <h1 className="text-xs font-semibold text-gray-700 w-40">
              Priority
            </h1>

            <select
              name="priorityOperator"
              value={priorityOperator}
              onChange={(e) => setPriorityOperator(e.target.value)}
              className="w-28 h-8 border border-gray-300 rounded px-2 text-xs focus:ring-1 focus:ring-blue-500"
            >
              <option value="is">is</option>
              <option value="isNot">is not</option>
              <option value="isOneOf">is one of</option>
            </select>

            <select
              name="priorityValue"
              value={
                priorityOperator === "isOneOf" ? priorityValues : priorityValue
              }
              onChange={(e) =>
                priorityOperator === "isOneOf"
                  ? setPriorityValues(handleMultipleSelect(e))
                  : setPriorityValue(e.target.value)
              }
              multiple={priorityOperator === "isOneOf"}
              className={`w-48 border border-gray-300 rounded px-2 text-xs focus:ring-1 focus:ring-blue-500 ${
                priorityOperator === "isOneOf" ? "h-24" : "h-8"
              }`}
            >
              <option value="All">All</option>
              <option value="P1">P1</option>
              <option value="P2">P2</option>
              <option value="P3">P3</option>
              <option value="P4">P4</option>
            </select>
          </div>

          {/* Status */}
          <div className="flex items-center gap-3 flex-wrap py-2">
            <h1 className="text-xs font-semibold text-gray-700 w-40">Status</h1>

            <select
              name="statusOperator"
              value={statusOperator}
              onChange={(e) => setStatusOperator(e.target.value)}
              className="w-28 h-8 border border-gray-300 rounded px-2 text-xs focus:ring-1 focus:ring-blue-500"
            >
              <option value="is">is</option>
              <option value="isNot">is not</option>
              <option value="isOneOf">is one of</option>
            </select>

            <select
              name="statusValue"
              value={statusOperator === "isOneOf" ? statusValues : statusValue}
              onChange={(e) =>
                statusOperator === "isOneOf"
                  ? setStatusValues(handleMultipleSelect(e))
                  : setStatusValue(e.target.value)
              }
              multiple={statusOperator === "isOneOf"}
              className={`w-48 border border-gray-300 rounded px-2 text-xs focus:ring-1 focus:ring-blue-500 ${
                statusOperator === "isOneOf" ? "h-24" : "h-8"
              }`}
            >
              <option value="All">All</option>
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {/* Assigned To */}
          <div className="flex items-center gap-3 flex-wrap py-2">
            <h1 className="text-xs font-semibold text-gray-700 w-40">
              Assigned To
            </h1>

            <select
              name="assignedToOperator"
              value={assignedToOperator}
              onChange={(e) => setAssignedToOperator(e.target.value)}
              className="w-28 h-8 border border-gray-300 rounded px-2 text-xs focus:ring-1 focus:ring-blue-500"
            >
              <option value="is">is</option>
              <option value="isNot">is not</option>
              <option value="isOneOf">is one of</option>
            </select>

            <select
              name="assignedToValue"
              value={
                assignedToOperator === "isOneOf"
                  ? assignedToValues
                  : assignedToValue
              }
              onChange={(e) =>
                assignedToOperator === "isOneOf"
                  ? setAssignedToValues(handleMultipleSelect(e))
                  : setAssignedToValue(e.target.value)
              }
              multiple={assignedToOperator === "isOneOf"}
              className={`w-48 border border-gray-300 rounded px-2 text-xs focus:ring-1 focus:ring-blue-500 ${
                assignedToOperator === "isOneOf" ? "h-24" : "h-8"
              }`}
            >
              <option value="All">All</option>
              {assignedToNames.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          {/* Button */}
          <div className="flex mt-4">
            <button
              className="h-8 px-4 bg-blue-600 text-white text-xs font-semibold rounded hover:bg-blue-700 transition"
              onClick={generateReport}
            >
              Generate Report
            </button>
          </div>
        </div>
        <div className="bg-white p-3 pl-6 mt-6 rounded-md shadow-sm border border-gray-200">
          {!showResults ? (
            <h1>No Reports to show</h1>
          ) : (
            <div>
              <div className="flex items-center justify-between">
                
                <div class="grow flex justify-center">
                  <h1 className="font-medium mt-2 mb-4">INCIDENTS TABLE</h1>
                </div>

                <button
                  onClick={() => exportTable(filteredINC)}
                  className=" border border-gray-300 px-4 rounded-md text-sm font-medium  ml-2 flex items-center gap-1 h-10"
                  title="Export filtered data to CSV"
                >
                  <FaFileDownload />
                  Export ({filteredINC.length})
                </button>
              </div>
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider flex space-x-1">
                      <h2>Incident</h2>
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
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredINC.map((item) => {
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

                    // const deadline =
                    //   item.openedAt + item.slaHours * 60 * 60 * 1000;
                    // const remaining = deadline - Date.now();

                    // const hours = Math.floor(
                    //   Math.abs(remaining) / (1000 * 60 * 60)
                    // );
                    // const minutes = Math.floor(
                    //   (Math.abs(remaining) % (1000 * 60 * 60)) / (1000 * 60)
                    // );

                    // const slaStatus =
                    //   item.status === "Closed" || item.status === "Resolved" ? (
                    //     <span className="text-green-600 flex space-x-1.5">
                    //       <FaCircle className="self-center" />
                    //       <h1>Completed</h1>
                    //     </span>
                    //   ) : remaining > 0 ? (
                    //     <span className="text-orange-500 flex space-x-1.5">
                    //       <FaCircle className="self-center" />
                    //       <h1>{`${hours}h ${minutes}m left`}</h1>
                    //     </span>
                    //   ) : (
                    //     <span className="text-red-600 flex space-x-1.5">
                    //       <FaCircle className="self-center" />
                    //       <h1>{`-${hours}h ${minutes}m`}</h1>
                    //     </span>
                    //   );

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
                          <SLATimer
                            openedAt={item.openedAt}
                            slaHours={item.slaHours}
                            status={item.status}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            className="text-blue-600 hover:text-blue-800 font-medium transition duration-150"
                            onClick={() => navigate(`/incidents/${item.id}`)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
