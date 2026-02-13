import React from "react";

function StatusPill({ status }) {
  const normalized = status.toLowerCase();

  let bgColor = "bg-slate-100 text-slate-700"; // default gray
  if (normalized === "pending") bgColor = "bg-amber-100 text-amber-800"; // soft yellow
  if (normalized === "active") bgColor = "bg-emerald-100 text-emerald-800"; // soft green
  if (normalized === "rejected") bgColor = "bg-rose-100 text-rose-800"; // soft red

  const displayStatus = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${bgColor}`}
    >
      {displayStatus}
    </span>
  );
}

export default StatusPill;
