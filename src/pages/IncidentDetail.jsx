import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { mockIncidents } from "../data/mockIncidents";
import { useNavigate } from "react-router-dom";

const IncidentDetail = () => {
  const { id } = useParams();

  const Incident = mockIncidents.find((inc) => inc.id === id);

  const navigate = useNavigate();

  const [number, setNumber] = useState(Incident?.id || "");
  const [status, setStatus] = useState(Incident?.status || "");
  const [title, setTitle] = useState(Incident?.title || "");
  const [description, setDescription] = useState(Incident?.description || "");
  const [severity, setSeverity] = useState(Incident?.severity || "");
  const [assignedTo, setAssignedTo] = useState(Incident?.assignedTo || "");
  const [assignedGroup, setAssignedGroup] = useState(
    Incident?.assignedGroup || ""
  );
  const [createdBy, setCreatedBy] = useState(Incident?.createdBy || "");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [slaHours, setSLAHours] = useState(Incident?.slaHours || "");
  const [successMsg, setSuccessMsg] = useState("");
  const slaMap = { P1: 4, P2: 8, P3: 24, P4: 48 };

  const isFormValid = Object.keys(errors).length === 0;

  const validate = () => {
    const newErrors = {};

    // Only validate if field was touched
    if (touched.title && !title.trim()) {
      newErrors.title = "Title is required";
    } else if (touched.title && title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (touched.description && !description.trim()) {
      newErrors.description = "Description is required";
    } else if (touched.description && description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    if (touched.createdBy && !createdBy.trim()) {
      newErrors.createdBy = "Requestor is required";
    }

    if (touched.assignedGroup && !assignedGroup) {
      newErrors.assignedGroup = "Please select assignment group";
    }

    return newErrors;
  };

  useEffect(() => {
    setErrors(validate());
  }, [title, description, createdBy, touched]);

  useEffect(() => {
    setSLAHours(slaMap[severity] || 48);
  }, [severity]);

  const isStatusLocked = status === "Closed";

  const saveINC = () => {
    const index = mockIncidents.findIndex((inc) => inc.id === id);
    mockIncidents[index] = {
      ...mockIncidents[index],
      title: title,
      description: description,
      severity: severity,
      status: status,
      assignedGroup: assignedGroup,
      assignedTo: assignedTo,
      createdBy: createdBy,
    };
    console.log(mockIncidents[index]);
    navigate("/incidents");
  };

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

  return (
    <div className="">
      <div className="text-sm text-gray-600 mb-2">
        <span
          onClick={() => navigate("/incidents")}
          className="cursor-pointer hover:text-blue-600"
        >
          Incidents
        </span>
        <span className="mx-2">&gt;</span>
        <span className="text-gray-900">{id}</span>
      </div>
      <div className="bg-white rounded-xl shadow-md p-6 max-w-4xl">
        <div className="grid grid-cols-2 gap-5 mb-5">
          {/* INC NUMBER */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">
              Incident Number
            </label>
            <input
              type="text"
              placeholder="Enter your name or email"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              value={number}
              disabled
            />
          </div>

          {/* STATUS */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">
              Status
            </label>
            <select
              disabled={isStatusLocked}
              name="Status"
              value={status}
              className={`w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                isStatusLocked ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {/* Requestor */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">
              Requestor
            </label>
            <input
              disabled
              type="text"
              placeholder="Enter your name or email"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              onBlur={() => setTouched({ ...touched, createdBy: true })}
            />
            {errors.createdBy && (
              <p className="text-red-500 text-xs mt-1">{errors.createdBy}</p>
            )}
          </div>

          {/* Severity */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">
              Severity
            </label>
            <select
              disabled={isStatusLocked}
              name="Severity"
              value={severity}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setSeverity(e.target.value)}
            >
              <option value="P1">P1</option>
              <option value="P2">P2</option>
              <option value="P3">P3</option>
              <option value="P4">P4</option>
            </select>
            <p className="text-black text-xs mt-1">SLA : {slaHours} Hours</p>
          </div>

          {/* Assignment Group */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">
              Assignment Group
            </label>
            <select
              disabled={isStatusLocked}
              name="assignedGroup"
              value={assignedGroup}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setAssignedGroup(e.target.value)}
            >
              {teamNames.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </select>
            {errors.assignedGroup && (
              <p className="text-red-500 text-xs mt-1">
                {errors.assignedGroup}
              </p>
            )}
          </div>

          {/* Assigned To */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">
              Assigned To
            </label>
            <select
              disabled={isStatusLocked}
              name="assignedTo"
              value={assignedTo}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setAssignedTo(e.target.value)}
            >
              {assignedToNames.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </select>
            {errors.assignedTo && (
              <p className="text-red-500 text-xs mt-1">{errors.assignedTo}</p>
            )}
          </div>
        </div>

        <div className="space-y-5">
          {/* Title */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Title</label>
            <input
              disabled={isStatusLocked}
              type="text"
              placeholder="Enter your title"
              maxLength="100"
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setTouched({ ...touched, title: true })}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">
              Description
            </label>
            <textarea
              disabled={isStatusLocked}
              placeholder="Enter your description"
              rows="5"
              maxLength="1000"
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm resize-none ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={() => setTouched({ ...touched, description: true })}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={saveINC}
            disabled={!isFormValid}
            className={`mt-6 px-6 py-2.5 text-sm font-medium text-white rounded-lg transition-colors ${
              isFormValid
                ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Save Changes
          </button>

          <button
            onClick={() => navigate("/incidents")}
            className={`mt-6 px-6 py-2.5 text-sm font-medium text-white rounded-lg transition-colors bg-gray-400 cursor-pointer`}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetail;
