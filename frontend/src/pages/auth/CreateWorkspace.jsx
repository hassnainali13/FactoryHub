import useWorkspaceCreation from "../../hooks/useWorkspaceCreation";

export default function CreateWorkspace() {
  const {
    form,
    loading,
    error,
    success,
    handleChange,
    handleFileChange,
    handleSubmit,
  } = useWorkspaceCreation();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-center text-slate-900 mb-6">
          Create New Workspace
        </h1>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 px-4 py-2 text-sm">
            {error}
          </div>
        )}

        {/* Success Alert */}
        {success && (
          <div className="mb-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Workspace Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Workspace Name
            </label>
            <input
              name="workspaceName"
              value={form.workspaceName}
              onChange={handleChange}
              type="text"
              placeholder="Enter workspace name"
              required
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Workspace Code */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Workspace Code
            </label>
            <input
              name="workspaceCode"
              value={form.workspaceCode}
              onChange={handleChange}
              type="text"
              placeholder="Enter workspace code"
              required
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Role
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="general_manager">General Manager</option>
              <option value="industry_head">Industry Head</option>
            </select>
          </div>

          {/* Logo Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Workspace Logo (optional)
            </label>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleFileChange}
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 rounded-lg bg-blue-600 text-white py-2.5 text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-60 flex items-center justify-center"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Creating...
              </span>
            ) : (
              "Create Workspace"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
