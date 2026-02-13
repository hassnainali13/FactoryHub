import { useState, useEffect } from "react";
import axios from "axios";

export default function useWorkspaces() {
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch workspaces from backend
  const fetchWorkspaces = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/workspaces");
      setWorkspaces(res.data.workspaces);
    } catch (err) {
      setError(err.message || "Failed to fetch workspaces");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  // Approve workspace
  const approveWorkspace = async (workspaceId) => {
    try {
      await axios.patch(`/api/workspaces/${workspaceId}/status`, {
        status: "active",
      });
      setWorkspaces((prev) =>
        prev.map((w) =>
          w._id === workspaceId ? { ...w, status: "Active" } : w
        )
      );
    } catch (err) {
      console.error("Approve failed:", err);
    }
  };

  // Reject workspace
  const rejectWorkspace = async (workspaceId) => {
    try {
      await axios.patch(`/api/workspaces/${workspaceId}/status`, {
        status: "disabled",
      });
      setWorkspaces((prev) =>
        prev.map((w) =>
          w._id === workspaceId ? { ...w, status: "Disabled" } : w
        )
      );
    } catch (err) {
      console.error("Reject failed:", err);
    }
  };

  return {
    workspaces,
    loading,
    error,
    approveWorkspace,
    rejectWorkspace,
    refetch: fetchWorkspaces,
  };
}
