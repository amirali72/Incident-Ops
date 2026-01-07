import React from "react";

// Helper functions for dashboard calculations

export const calculateDashboardStats = (incidents) => {
  const totalIncidents = incidents.length;

  const openIncidents = incidents.filter(
    (item) => item.status !== "Closed" && item.status !== "Resolved"
  ).length;

  const criticalIncidents = incidents.filter(
    (item) => item.severity === "P1"
  ).length;

  const slaBreached = incidents.filter((item) => {
    if (item.status === "Closed" || item.status === "Resolved") {
      return false;
    }
    return Date.now() > item.openedAt + item.slaHours * 60 * 60 * 1000;
  }).length;

  return {
    totalIncidents,
    openIncidents,
    criticalIncidents,
    slaBreached,
  };
};

export const getSeverityChartData = (incidents) => {
  return [
    {
      name: "P1",
      value: incidents.filter((item) => item.severity === "P1").length,
      color: "#ef4444",
    },
    {
      name: "P2",
      value: incidents.filter((item) => item.severity === "P2").length,
      color: "#f97316",
    },
    {
      name: "P3",
      value: incidents.filter((item) => item.severity === "P3").length,
      color: "#eab308",
    },
    {
      name: "P4",
      value: incidents.filter((item) => item.severity === "P4").length,
      color: "#22c55e",
    },
  ];
};

export const getStatusChartData = (incidents) => {
  return [
    {
      name: "New",
      value: incidents.filter((item) => item.status === "New").length,
      color: "#3b82f6",
    },
    {
      name: "In Progress",
      value: incidents.filter((item) => item.status === "In Progress").length,
      color: "#f59e0b",
    },
    {
      name: "Resolved",
      value: incidents.filter((item) => item.status === "Resolved").length,
      color: "#10b981",
    },
    {
      name: "Closed",
      value: incidents.filter((item) => item.status === "Closed").length,
      color: "#6b7280",
    },
  ];
};

export const getTrendData = (incidents) => {
  const dateCounts = {};

  incidents.forEach((incident) => {
    const date = new Date(incident.openedAt);
    const formatted = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    if (dateCounts[formatted]) {
      dateCounts[formatted] = dateCounts[formatted] + 1;
    } else {
      dateCounts[formatted] = 1;
    }
  });

  const trendData = Object.keys(dateCounts).map((date) => {
    return {
      date: date,
      count: dateCounts[date],
    };
  });

  trendData.sort((a, b) => (a.date > b.date ? 1 : -1));
  
  return trendData.slice(-7); // Return only last 7 days
};
