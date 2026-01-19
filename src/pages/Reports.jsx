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

  useEffect(() => {
    console.log("Priority Values", statusValues);
  }, [statusValues]);

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

  return (
    <div>
      <div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h1 className="text-lg font-semibold text-gray-700 mb-6">
            SELECT FILTERS
          </h1>

          {/* INC Date Range */}
          <div className="flex items-end gap-4 flex-wrap py-4 ">
            <h1 className="text-sm font-semibold text-gray-700 self-center mt-4">
              Incident Created
            </h1>

            {/* From Date */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                From
              </label>
              <DatePicker
                selected={dateFrom}
                onChange={(date) => setDateFrom(date)}
                dateFormat="dd/MM/yyyy"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* To Date */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                To
              </label>
              <DatePicker
                selected={dateTo}
                onChange={(date) => setDateTo(date)}
                dateFormat="dd/MM/yyyy"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Assignment Group */}
          <div className="flex items-end gap-4 flex-wrap ">
            <h1 className="text-sm font-semibold text-gray-700 self-center mt-4">
              Assignment Group
            </h1>

            <div className="flex flex-col">
              <select
                name="groupOperator"
                value={groupOperator}
                onChange={(e) => setGroupOperator(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-auto"
              >
                <option value="is">is</option>
                <option value="isNot">is not</option>
                <option value="isOneOf">is one of</option>
              </select>
            </div>

            <div className="flex flex-col">
              {groupOperator === "isOneOf" ? (
                <select
                  name="groupValues"
                  value={groupValues}
                  onChange={(e) => setGroupValues(handleMultipleSelect(e))}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  multiple
                >
                  {teamNames.map((name, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              ) : (
                <select
                  name="groupValues"
                  value={groupValue}
                  onChange={(e) => setGroupValue(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All</option>
                  {teamNames.map((name, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Priority */}
          <div className="flex items-end gap-4 flex-wrap ">
            <h1 className="text-sm font-semibold text-gray-700 self-center mt-4">
              Priority
            </h1>

            <div className="flex flex-col">
              <select
                name="priorityOperator"
                value={priorityOperator}
                onChange={(e) => setPriorityOperator(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-auto"
              >
                <option value="is">is</option>
                <option value="isNot">is not</option>
                <option value="isOneOf">is one of</option>
              </select>
            </div>

            <div className="flex flex-col">
              {priorityOperator === "isOneOf" ? (
                <select
                  name="priorityValues"
                  value={priorityValues}
                  onChange={(e) => setPriorityValues(handleMultipleSelect(e))}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  multiple
                >
                  <option value="P1">P1</option>
                  <option value="P2">P2</option>
                  <option value="P3">P3</option>
                  <option value="P4">P4</option>
                </select>
              ) : (
                <select
                  name="priorityValue"
                  value={priorityValue}
                  onChange={(e) => setPriorityValue(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All</option>
                  <option value="P1">P1</option>
                  <option value="P2">P2</option>
                  <option value="P3">P3</option>
                  <option value="P4">P4</option>
                </select>
              )}
            </div>
          </div>

          {/* Status */}
          <div className="flex items-end gap-4 flex-wrap ">
            <h1 className="text-sm font-semibold text-gray-700 self-center mt-4">
              Status
            </h1>

            <div className="flex flex-col">
              <select
                name="statusOperator"
                value={statusOperator}
                onChange={(e) => setStatusOperator(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-auto"
              >
                <option value="is">is</option>
                <option value="isNot">is not</option>
                <option value="isOneOf">is one of</option>
              </select>
            </div>

            <div className="flex flex-col">
              {statusOperator === "isOneOf" ? (
                <select
                  name="statusValues"
                  value={statusValues}
                  onChange={(e) => setStatusValues(handleMultipleSelect(e))}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  multiple
                >
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              ) : (
                <select
                  name="statusValue"
                  value={statusValue}
                  onChange={(e) => setStatusValue(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All</option>
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              )}
            </div>
          </div>

          {/* Assigned To */}
          <div className="flex items-end gap-4 flex-wrap ">
            <h1 className="text-sm font-semibold text-gray-700 self-center mt-4">
              Assigned To
            </h1>

            <div className="flex flex-col">
              <select
                name="assignedToOperator"
                value={assignedToOperator}
                onChange={(e) => setAssignedToOperator(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-auto"
              >
                <option value="is">is</option>
                <option value="isNot">is not</option>
                <option value="isOneOf">is one of</option>
              </select>
            </div>

            <div className="flex flex-col">
              {assignedToOperator === "isOneOf" ? (
                <select
                  name="assignedToValues"
                  value={assignedToValues}
                  onChange={(e) => setAssignedToValues(handleMultipleSelect(e))}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  multiple
                >
                  {assignedToNames.map((name, index)=>(
                    <option key={index} value={name}>{name}</option>
                  ))}
                </select>
              ) : (
                <select
                  name="assignedToValue"
                  value={assignedToValue}
                  onChange={(e) => setAssignedToValue(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All</option>
                  {assignedToNames.map((name, index)=>(
                    <option key={index} value={name}>{name}</option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <button className="h-10 px-5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition mt-8">
            Generate Report
          </button>
        </div>
      </div>
      <div>Result Section</div>
    </div>
  );
};

export default Reports;
