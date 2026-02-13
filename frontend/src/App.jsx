import { Routes, Route, Navigate } from "react-router-dom";
import SuperAdminDashboard from "./pages/superadmin/SuperAdminDashboard";
import WorkspaceManagerDashboard from "./pages/workspace/WorkspaceManagerDashboard";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import WorkspaceOptions from "./pages/auth/WorkspaceOptions";
import CreateWorkspace from "./pages/auth/CreateWorkspace";
import ProcessingPage from "./pages/auth/ProcessingPage";
import SignupSuccess from "./pages/auth/SignupSuccess";


export default function App() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/workspace-options" element={<WorkspaceOptions />} />
      <Route path="/workspace/create" element={<CreateWorkspace />} />
      <Route path="/workspace/processing" element={<ProcessingPage />} />
      <Route path="/signup-success" element={<SignupSuccess />} />

      {/* Dashboards */}
      <Route path="/superadmin/dashboard" element={<SuperAdminDashboard />} />
      <Route path="/workspace/dashboard" element={<WorkspaceManagerDashboard />} />
      {/* Default route */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<div>404 | Page Not Found</div>} />
    </Routes>
  );
}
