import React from "react";
import { FaCircle } from "react-icons/fa";

const SLATimer = ({item, deadline,hours, minutes, remaining}) => {
  return item.status === "Closed" || item.status === "Resolved" ? (
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
