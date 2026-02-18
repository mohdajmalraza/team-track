import useAuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import logo from "../assets/mobile-logo.png";

function RootRedirect() {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
        <div className="py-2 d-flex justify-content-center align-items-center">
          <div className="px-1" style={{ width: "39px" }}>
            <img src={logo} alt="Team-Track-logo" className="img-fluid" />
          </div>
          <h5 className="fw-semibold fs-4">TeamTrack</h5>
        </div>

        <p className="text-muted small">Restoring your workspace...</p>
        <div className="spinner-border text-info mb-3" role="status" />
      </div>
    );
  }

  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default RootRedirect;
