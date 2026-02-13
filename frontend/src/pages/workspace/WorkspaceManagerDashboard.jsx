import React from "react";
import useUserProfile from "../../hooks/useUserProfile";
import useWorkspaceDetails from "../../hooks/useWorkspaceDetails";
import useAuthActions from "../../hooks/useAuthActions";
import useDropdown from "../../hooks/useDropdown";
import SidebarItem from "../../components/SidebarItem";
import KpiCard from "../../components/KpiCard";
import StatusPill from "../../components/StatusPill";

import {
  Bell,
  Search,
  LayoutDashboard,
  Boxes,
  CheckSquare,
  Shield,
  Users,
  FileBarChart2,
  Building2,
  ClipboardList,
  TrendingUp,
  Settings,
  Eye,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  Legend,
} from "recharts";

// Sample static data
const kpiCards = [
  { title: "Total Departments", value: 8, delta: "+2 this month", icon: Building2, accent: "text-blue-600", bg: "bg-blue-50" },
  { title: "Department Heads", value: 24, delta: "+3 this month", icon: Users, accent: "text-violet-600", bg: "bg-violet-50" },
  { title: "Total Employees", value: 476, delta: "+42 this month", icon: TrendingUp, accent: "text-emerald-600", bg: "bg-emerald-50" },
  { title: "Pending Approvals", value: 11, delta: "Requires attention", icon: CheckSquare, accent: "text-orange-700", bg: "bg-orange-50", border: "border-orange-200" },
];

const departmentsData = [
  { name: "Production", employees: 45 },
  { name: "Quality Control", employees: 12 },
  { name: "Maintenance", employees: 18 },
  { name: "Logistics", employees: 15 },
  { name: "Administration", employees: 8 },
];

const monthlyGrowthData = [
  { month: "Jan", users: 82, approvals: 12 },
  { month: "Feb", users: 88, approvals: 15 },
  { month: "Mar", users: 92, approvals: 10 },
  { month: "Apr", users: 98, approvals: 14 },
  { month: "May", users: 105, approvals: 11 },
  { month: "Jun", users: 112, approvals: 16 },
];

const usersTableData = [
  { id: 1, department: "Production", role: "Production Supervisor", employees: 45, status: "Active", pending: 2 },
  { id: 2, department: "Quality Control", role: "QC Manager", employees: 12, status: "Active", pending: 0 },
  { id: 3, department: "Maintenance", role: "Maintenance Lead", employees: 18, status: "Active", pending: 1 },
  { id: 4, department: "Logistics", role: "Logistics Coordinator", employees: 15, status: "Disabled", pending: 0 },
  { id: 5, department: "Administration", role: "Admin Officer", employees: 8, status: "Active", pending: 3 },
];

export default function WorkspaceManagerDashboard() {
  const { user, userName, userEmail, role, userInitial } = useUserProfile();
  const { workspaceName, logo, status } = useWorkspaceDetails(user);
  const { logout, loading } = useAuthActions();
  const { open, toggle, ref: dropdownRef } = useDropdown();
  

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-50">
        <div className="text-sm text-slate-500">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex max-w-[1440px] gap-6 p-4 md:p-6">
        {/* Sidebar */}
        <aside className="hidden w-[260px] shrink-0 md:block">
          <div className="sticky top-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3 px-2">
                {/* Workspace Logo */}
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
                  {logo ? (
                    <img
                      src={logo}
                      alt="Workspace Logo"
                      className="h-full w-full object-cover"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  ) : (
                    <LayoutDashboard className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{workspaceName}</p>
                  <p className="text-xs text-slate-500">{role}</p>
                </div>
              </div>

              <div className="mt-5 space-y-1">
                <SidebarItem icon={LayoutDashboard} label="Dashboard" active />
                <SidebarItem icon={Boxes} label="Department" />
                <SidebarItem icon={CheckSquare} label="Approvals" />
                <SidebarItem icon={Shield} label="Department Management" />
                <SidebarItem icon={Users} label="Employees" />
                <SidebarItem icon={FileBarChart2} label="Reports" />
                <SidebarItem icon={ClipboardList} label="Logs / Audit" />
                <SidebarItem icon={Settings} label="System Settings" />
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Topbar */}
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                {workspaceName}, Dashboard
              </h1>
              <p className="mt-1 text-sm text-slate-500">Welcome, {userName} — General Manager</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:min-w-[300px]">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Search..."
                />
              </div>

              <button className="grid h-10 w-10 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors">
                <Bell className="h-4 w-4" />
              </button>

              {/* Profile Dropdown */}
              <div ref={dropdownRef} className="relative inline-block text-left">
                <button
                  onClick={toggle}
                  className="flex items-center gap-2 rounded-2xl border border-gray-300 bg-white px-3 py-1.5 hover:bg-gray-100 transition-colors"
                >
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-violet-600 text-xs font-semibold text-white">{userInitial}</div>
                  <div className="hidden text-left sm:block">
                    <p className="text-sm font-medium text-slate-900">{userName}</p>
                    <p className="text-[10px] text-slate-500">{userEmail}</p>
                  </div>
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-lg z-10">
                    <button className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-100">Profile View</button>
                    <button
                      onClick={logout}
                      className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {kpiCards.map((c) => (
              <KpiCard key={c.title} {...c} />
            ))}
          </section>

          {/* Charts */}
          <section className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-base font-semibold text-slate-900">Employees per Workspace</h2>
              <div className="h-[260px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentsData} barSize={38}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                    <Tooltip cursor={{ fill: "#f8fafc" }} contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }} />
                    <Bar dataKey="employees" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-base font-semibold text-slate-900">Monthly Growth</h2>
              <div className="h-[260px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }} />
                    <Legend iconType="circle" />
                    <Line type="monotone" dataKey="users" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, fill: "#6366f1" }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="approvals" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, fill: "#f59e0b" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          {/* Table */}
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">Workspaces Overview</h2>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View all</button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-slate-100 text-left">
                    <th className="pb-3 text-xs font-semibold uppercase text-slate-400">Workspace</th>
                    <th className="pb-3 text-xs font-semibold uppercase text-slate-400">Admin</th>
                    <th className="pb-3 text-xs font-semibold uppercase text-slate-400">Employees</th>
                    <th className="pb-3 text-xs font-semibold uppercase text-slate-400">Status</th>
                    <th className="pb-3 text-xs font-semibold uppercase text-slate-400">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {usersTableData.map((w) => (
                    <tr key={w.id} className="group">
                      <td className="py-4 text-sm font-medium text-slate-900">{w.department}</td>
                      <td className="py-4 text-sm text-slate-600">{w.role}</td>
                      <td className="py-4 text-sm text-slate-600">{w.employees}</td>
                      <td className="py-4"><StatusPill status={w.status} /></td>
                      <td className="py-4">
                        <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
