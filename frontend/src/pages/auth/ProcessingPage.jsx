// frontend/pages/auth/ProcessingPage.jsx
import React from "react";

export default function ProcessingPage() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-50">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-center text-slate-900 mb-6">
          Workspace Creation in Progress
        </h1>
        <p className="text-center text-sm text-slate-600">Your workspace is pending approval from the Super Admin.</p>
        <button
          onClick={() => window.location.href = '/login'}
          className="w-full mt-4 rounded-lg bg-blue-600 text-white py-2.5 text-sm font-semibold hover:bg-blue-700 transition"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}
