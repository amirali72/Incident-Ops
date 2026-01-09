import React from "react";
import { mockIncidents } from "../data/mockIncidents";

const Incidents = () => {
  return (
    <div className="p-6">
      <h1>Incidents</h1>

      <div className="bg-white rounded-xl shadow-md p-6 mt-6">
        <table className="w-full">
          <thead>
            <tr>
              <th>Incident ID</th>
              <th>Title</th>
              <th>Severity</th>
              <th>Status</th>
              <th>Assigned to</th>
              <th>SLA Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockIncidents.map((item) => {
              const sev =
                item.severity === "P1"
                  ? "Critical"
                  : item.severity === "P2"
                  ? "High"
                  : item.severity === "P3"
                  ? "Moderate"
                  : "Low";
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td className={sev==="Critical"? "text-red-500": sev==="High"? "text-orange-500": sev==="Moderate"? "text-yellow-500" : "text-green-500"}>{sev}</td>
                  <td>{item.status}</td>
                  <td>{item.assignedTo}</td>
                  <td></td>
                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Incidents;
