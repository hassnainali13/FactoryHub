import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import WorkspaceChoice from "./pages/auth/WorkspaceChoice";
import CreateWorkspace from "./pages/auth/CreateWorkspace";
import JoinWorkspace from "./pages/auth/JoinWorkspace";
import PendingApproval from "./pages/auth/PendingApproval";

import SuperAdminDashboard from "./pages/superadmin/SuperAdminDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDashboard from "./pages/user/UserDashboard";

export default function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/workspace-choice" element={<WorkspaceChoice />} />
      <Route path="/create-workspace" element={<CreateWorkspace />} />
      <Route path="/join-workspace" element={<JoinWorkspace />} />
      <Route path="/pending" element={<PendingApproval />} />

      {/* Dashboards */}
      <Route path="/superadmin/dashboard" element={<SuperAdminDashboard />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/user/dashboard" element={<UserDashboard />} />
    </Routes>
  );
}
