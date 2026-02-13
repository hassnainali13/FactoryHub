import { useNavigate } from "react-router-dom";

export default function SignupSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-sm p-6 text-center">
        <h1 className="text-2xl font-semibold text-slate-900">Signup Successful</h1>
        <p className="mt-2 text-lg text-slate-600">You have successfully registered!</p>

        <div className="mt-4 space-y-2">
          <button
            onClick={() => navigate("/login")}
            className="w-full rounded-xl bg-blue-600 text-white py-2.5 text-sm font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
