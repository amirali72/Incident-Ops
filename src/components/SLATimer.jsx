import React from "react";
import { FaCircle } from "react-icons/fa";

const SLATimer = ({ openedAt, slaHours, status }) => {
  const deadline = openedAt + slaHours * 60 * 60 * 1000;
  const remaining = deadline - Date.now();
  const hours = Math.floor(Math.abs(remaining) / (1000 * 60 * 60));
  const minutes = Math.floor(
    (Math.abs(remaining) % (1000 * 60 * 60)) / (1000 * 60)
  );
  return status === "Closed" || status === "Resolved" ? (
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
};

export default SLATimer;
