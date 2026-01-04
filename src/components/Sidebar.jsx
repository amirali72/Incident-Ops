import { MdOutlineDashboard } from "react-icons/md";
import {
  IoAlertCircleOutline,
  IoStatsChartOutline,
  IoDocumentTextOutline,
} from "react-icons/io5";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-[calc(100vh-3rem)] bg-gray-200 w-64 border-r">
      <div className="py-8 px-4 space-y-2">
        
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 rounded-lg transition ${
              isActive
                ? "bg-blue-200 text-blue-700 font-semibold"
                : "text-gray-700 hover:bg-gray-300"
            }`
          }
        >
          <MdOutlineDashboard className="text-xl" />
          <h3 className="ml-3">Dashboard</h3>
        </NavLink>

        <NavLink
          to="/incidents"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 rounded-lg transition ${
              isActive
                ? "bg-blue-200 text-blue-700 font-semibold"
                : "text-gray-700 hover:bg-gray-300"
            }`
          }
        >
          <IoAlertCircleOutline className="text-xl" />
          <h3 className="ml-3">Incidents</h3>
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 rounded-lg transition ${
              isActive
                ? "bg-blue-200 text-blue-700 font-semibold"
                : "text-gray-700 hover:bg-gray-300"
            }`
          }
        >
          <IoStatsChartOutline className="text-xl" />
          <h3 className="ml-3">Analytics</h3>
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 rounded-lg transition ${
              isActive
                ? "bg-blue-200 text-blue-700 font-semibold"
                : "text-gray-700 hover:bg-gray-300"
            }`
          }
        >
          <IoDocumentTextOutline className="text-xl" />
          <h3 className="ml-3">Reports</h3>
        </NavLink>

      </div>
    </div>
  );
};

export default Sidebar;
