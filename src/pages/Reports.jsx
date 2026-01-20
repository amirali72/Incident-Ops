import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { mockIncidents } from "../data/mockIncidents";

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
      if (groupValue !== "All") {
        results = results.filter(inc => groupValues.includes(inc.assignedGroup));
      }
    }

    console.log(results);
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
      </div>

      <div>
        {!showResults ? <h1>No Reports to show</h1> : <h1>Reports Page</h1>}
      </div>
    </div>
  );
};

export default Reports;
