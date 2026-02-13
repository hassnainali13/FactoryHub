//frontend\src\components\KpiCard.jsx
import React from 'react';

// KpiCard component mein props define karte hain
function KpiCard({ title, value, delta, icon: Icon, accent, bg, border = "border-slate-200" }) {
  return (
    <div
      className={
        "rounded-2xl " + 
        border +  // Border ko optional banane ke liye default value set ki
        " bg-white p-5 shadow-sm "
      }
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-600">{title}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            {value}
          </p>
          <p className="mt-2 text-xs text-emerald-600">↗ {delta}</p>
        </div>

        <div className={"rounded-2xl p-3 " + (bg || "bg-slate-100")}>
          <Icon className={"h-5 w-5 " + (accent || "text-slate-700")} />
        </div>
      </div>
    </div>
  );
}

export default KpiCard;
