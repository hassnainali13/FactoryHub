//src\hooks\useWorkspaceAdmin.js
import { useState, useEffect } from "react";
import axios from "axios";

export default function useWorkspaceAdmin(workspace) {
  const [adminName, setAdminName] = useState("N/A");
  const [adminEmail, setAdminEmail] = useState("N/A");
  const [adminRole, setAdminRole] = useState("N/A");

  useEffect(() => {
    if (!workspace) return;

    const fetchAdmin = async () => {
      const admin = workspace?.createdBy || {};

      // Name & Role
      setAdminName(admin.name || "N/A");
      setAdminRole(admin.role || workspace.role || "N/A");

      // Email: fetch if admin is just ID
      if (admin.email) {
        setAdminEmail(admin.email);
      } else if (admin && typeof admin === "string") {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/users/${admin}`
          );
          setAdminEmail(res.data.user?.email || "N/A");
        } catch {
          setAdminEmail("N/A");
        }
      }
    };

    fetchAdmin();
  }, [workspace]);

  return { adminName, adminEmail, adminRole };
}
