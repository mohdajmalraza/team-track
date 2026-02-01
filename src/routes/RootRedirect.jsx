import { Navigate } from "react-router-dom";
import useAuthContext from "../context/AuthContext";

function RootRedirect() {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    return <div>Checking session...</div>;
  }

  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default RootRedirect;
