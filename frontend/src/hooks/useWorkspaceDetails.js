//src\hooks\useWorkspaceDetails.js

export default function useWorkspaceDetails(user) {
  const BASE_URL = "http://localhost:5000";

  const rawLogo = user?.workspaceId?.logo || "";
  const logo =
    rawLogo && rawLogo.startsWith("http")
      ? rawLogo
      : rawLogo
        ? `${BASE_URL}/${rawLogo.replace(/\\/g, "/")}`
        : "";

  const workspaceName = user?.workspaceId?.name || "Workspace Name";
  const status = user?.workspaceId?.status || "Unknown";

  return { workspaceName, logo, status };
}
