//frontend\src\pages\superadmin\WorkspacesOverviewTable.jsx
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import StatusPill from "../../components/StatusPill";

const WorkspacesOverviewTable = ({
  title = "Workspaces Overview",
  workspaces = [],
  onViewAll,
  approveWorkspace,
  rejectWorkspace,
  setOpenWorkspace,
  openWorkspace,
  onCloseModal,
  WorkspaceDetailModal,
  apiBaseUrl = "http://localhost:5000",
  initialLimit = 5,
}) => {
  const [showAll, setShowAll] = useState(false);

  const displayedWorkspaces = showAll ? workspaces : workspaces.slice(0, initialLimit);

  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View all
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-fixed border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-slate-200 text-left">
              <th className="w-1/5 pb-3 text-xs font-semibold uppercase text-slate-400">Workspace</th>
              <th className="w-1/5 pb-3 text-xs font-semibold uppercase text-slate-400">Admin</th>
              <th className="w-1/5 pb-3 text-xs font-semibold uppercase text-slate-400">Employees</th>
              <th className="w-1/5 pb-3 text-xs font-semibold uppercase text-slate-400">Status</th>
              <th className="w-1/5 pb-3 text-xs font-semibold uppercase text-slate-400 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {displayedWorkspaces.map((w) => {
              const status = w?.status?.toLowerCase();
              return (
                <tr key={w._id} className="group">
                  <td className="py-4 text-sm font-medium text-slate-900">{w.name}</td>
                  <td className="py-4 text-sm text-slate-600">{w.createdBy?.name || "N/A"}</td>
                  <td className="py-4 text-sm text-slate-600">{w.employees || 0}</td>
                  <td className="py-4"><StatusPill status={w.status} /></td>
                  <td className="py-4 text-center">
                    {status === "pending" && (
                      <div className="inline-flex gap-2 justify-center">
                        <button
                          onClick={() => approveWorkspace?.(w._id)}
                          className="px-3 py-1 text-sm font-medium bg-emerald-100 text-emerald-800 rounded-lg hover:bg-emerald-200 transition"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => rejectWorkspace?.(w._id)}
                          className="px-3 py-1 text-sm font-medium bg-rose-100 text-rose-800 rounded-lg hover:bg-rose-200 transition"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                    {status === "active" && (
                      <button
                        onClick={() => {
                          if (!setOpenWorkspace) return;
                          const workspaceLogo = w?.logo
                            ? w.logo.startsWith("http")
                              ? w.logo
                              : `${apiBaseUrl}/${w.logo.replace(/\\/g, "/")}`
                            : "/placeholder-logo.png";
                          const admin = w?.createdBy || {};
                          setOpenWorkspace({
                            logo: workspaceLogo,
                            workspaceName: w?.name || "Unnamed Workspace",
                            userName: admin?.name || "N/A",
                            userEmail: admin?.email || "N/A",
                            role: admin?.role || w?.role || "N/A",
                            code: w?.code || "N/A",
                          });
                        }}
                        className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition inline-flex items-center justify-center"
                      >
                        <FaEye className="h-4 w-4" />
                      </button>
                    )}
                    {status === "rejected" && (
                      <button
                        className="p-2 rounded-lg text-slate-300 cursor-not-allowed inline-flex items-center justify-center"
                        disabled
                      >
                        <FaEyeSlash className="h-4 w-4" />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Show More / Show Less */}
      {workspaces.length > initialLimit && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}

      {openWorkspace && WorkspaceDetailModal && (
        <WorkspaceDetailModal workspace={openWorkspace} onClose={() => onCloseModal?.()} />
      )}
    </section>
  );
};

export default WorkspacesOverviewTable;
