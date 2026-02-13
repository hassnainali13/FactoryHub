import useAuth from "../hooks/useAuth"; // your auth hook

export default function useUserProfile() {
  const { user } = useAuth();

  const userName = user?.name || "Manager";
  const userEmail = user?.email || "email@example.com";
  const role = user?.role || "User Role";
  const userInitial = userName?.trim()?.charAt(0).toUpperCase() || "M";

  return { user, userName, userEmail, role, userInitial };
}
