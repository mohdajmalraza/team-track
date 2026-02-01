import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaUnlockAlt } from "react-icons/fa";
import backgroungImage from "../assets/background-image.png";
import appLogo from "../assets/logo.png";
import useAuthContext from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      return setError("All fields are required");
    }

    try {
      setLoading(true);

      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        backgroundImage: `url(${backgroungImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="col-md-6 col-lg-4 col-sm-8 px-4 py-3 bg-primary bg-opacity-75 text-white shadow-lg rounded-4">
        <div className="text-center mb-2">
          <img
            src={appLogo}
            alt="TeamTrack"
            className="img-fluid"
            style={{ height: "70px" }}
          />
        </div>

        <h4 className="fw-bold text-center mb-1">Welcome Back!</h4>
        <p className="text-center small mb-4">Log in to your account</p>

        {error && (
          <div>
            <p className="alert alert-light py-0 text-danger">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3 border rounded-3 overflow-hidden">
            <span className="input-group-text bg-transparent border-0 text-white">
              <FaUser />
            </span>
            <input
              type="email"
              name="email"
              className="form-control bg-transparent border-0 text-white"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group mb-3 border rounded-3 overflow-hidden">
            <span className="input-group-text bg-transparent border-0 text-white">
              <FaUnlockAlt />
            </span>
            <input
              type="password"
              name="password"
              className="form-control bg-transparent border-0 text-white"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-light w-100 fw-semibold mb-5"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-center small mb-0">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="fw-bold text-white text-decoration-none"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
