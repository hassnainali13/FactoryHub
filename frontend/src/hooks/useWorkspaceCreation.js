import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useWorkspaceCreation = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    workspaceName: "",
    workspaceCode: "",
    role: "general_manager",
    logo: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({
      ...prev,
      logo: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You are not logged in. Please log in first.");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("workspaceName", form.workspaceName);
      formData.append("workspaceCode", form.workspaceCode);
      formData.append("role", form.role);

      if (form.logo) {
        formData.append("logo", form.logo);
      }

      const res = await fetch("http://localhost:5000/api/workspaces/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.status === 401) {
        setError("Session expired. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (!res.ok) {
        setError(data.message || "Workspace creation failed");
        return;
      }

      setSuccess("Workspace created successfully! Waiting for approval.");

      setTimeout(() => {
        navigate("/workspace/processing");
      }, 2000);

      setForm({
        workspaceName: "",
        workspaceCode: "",
        role: "general_manager",
        logo: null,
      });

    } catch (err) {
      console.error("Workspace creation error:", err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    error,
    success,
    handleChange,
    handleFileChange,
    handleSubmit,
  };
};

export default useWorkspaceCreation;
