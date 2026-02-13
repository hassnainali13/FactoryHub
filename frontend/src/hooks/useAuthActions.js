import useAuth from "../hooks/useAuth"; // your auth hook

export default function useAuthActions() {
  const { handleLogout, loading } = useAuth();

  const logout = () => {
    try {
      handleLogout();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return { logout, loading };
}
