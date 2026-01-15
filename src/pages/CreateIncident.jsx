import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateIncident = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("P4");
  const [assignedTo, setAssignedTo] = useState("");
  const [assignedGroup, setAssignedGroup] = useState("ITHD");
  const [createdBy, setCreatedBy] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [slaHours, setSLAHours] = useState("24");
  const slaMap = { P1: 4, P2: 8, P3: 24, P4: 48 };

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

  const createNewINC = () => {
    console.log("INC CREATED:", {
      title,
      description,
      severity,
      assignedTo,
      assignedGroup,
      createdBy,
    });
  };

  const isFormValid = Object.keys(errors).length === 0;

  return (
    <div className="">
      <h1 className="text-lg font-bold text-gray-800 mb-2">NEW INCIDENT</h1>
      <div className="bg-white rounded-xl shadow-md p-6 max-w-4xl">
        <div className="grid grid-cols-2 gap-5 mb-5">
          {/* Requestor */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">
              Requestor
            </label>
            <input
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
              name="assignedGroup"
              value={assignedGroup}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setAssignedGroup(e.target.value)}
            >
              <option value="Server">Server Team</option>
              <option value="Network">Network Team</option>
              <option value="Database">Database Team</option>
              <option value="ITHD">ITHD</option>
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
              name="assignedTo"
              value={assignedTo}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setAssignedTo(e.target.value)}
            >
              <option value="">Assignment To</option>
              <option value="EngineerA">EngineerA</option>
              <option value="EngineerB">EngineerB</option>
              <option value="Engineerc">Engineerc</option>
              <option value="EngineerD">EngineerD</option>
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

        <button
          onClick={createNewINC}
          disabled={!isFormValid}
          className={`mt-6 px-6 py-2.5 text-sm font-medium text-white rounded-lg transition-colors ${
            isFormValid
              ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateIncident;
