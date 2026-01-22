import Papa from "papaparse";

export const exportTable = (filteredINC) => {
    console.log(filteredINC);
    
  const csvData = filteredINC.map((item) => ({
    ID: item.id,
    Title: item.title,
    Severity: item.severity,
    Status: item.status,
    "Assigned To": item.assignedTo,
    "SLA Hours": item.slaHours,
    "Opened At": new Date(item.openedAt).toLocaleString(),
  }));

  const csv = Papa.unparse(csvData);

  //download logic
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `incidents_${new Date().toISOString().slice(0, 10)}.csv`
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
