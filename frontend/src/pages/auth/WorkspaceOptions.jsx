import { useNavigate } from "react-router-dom";

export default function WorkspaceOptions() {
  const navigate = useNavigate();

  const handleJoinWorkspace = () => {
    // Redirect to a page where they can join an existing workspace
    navigate("/join-workspace");
  };

  const handleCreateWorkspace = () => {
    // Redirect to a page where they can create a new workspace
    navigate("/workspace/create");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
        <h1 className="text-2xl font-semibold text-slate-900">Welcome to FactoryHub</h1>
        <p className="text-sm text-slate-500 mt-1">Choose your next step:</p>

        <div className="mt-6 space-y-4">
          <button
            onClick={handleJoinWorkspace}
            className="w-full rounded-xl bg-green-600 text-white py-2.5 text-sm font-semibold hover:bg-green-700 transition"
          >
            Join Existing Workspace
          </button>

          <button
            onClick={handleCreateWorkspace}
            className="w-full rounded-xl bg-blue-600 text-white py-2.5 text-sm font-semibold hover:bg-blue-700 transition"
          >
            Create New Workspace
          </button>
        </div>
      </div>
    </div>
  );
}
