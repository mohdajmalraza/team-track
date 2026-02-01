import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaUnlockAlt } from "react-icons/fa";
import backgroungImage from "../assets/background-image.png";
import appLogo from "../assets/logo.png";
import axiosInstance from "../api/axiosInstance";
import useAuthContext from "../context/AuthContext";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signup } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevVal) => ({ ...prevVal, [name]: value }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      return setError("All fields are required");
    }

    if (password !== confirmPassword) {
      return setError("Password do not match");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters long");
    }

    try {
      setLoading(true);

      await signup({ name, email, password });
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed");
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
        {/* Logo */}
        <div className="text-center mb-2">
          <img
            src={appLogo}
            alt="TeamTrack"
            className="img-fluid"
            style={{ height: "70px" }}
          />
        </div>

        <h4 className="fw-bold text-center mb-1">Create Account</h4>
        <p className="text-center small mb-4">Sign up to get started</p>

        {/* Error */}
        {error && (
          <div className="alert alert-light py-0 small text-danger">
            {error}
          </div>
        )}

        <form onSubmit={handleFormSubmit}>
          <div className="input-group mb-3 border rounded-3 overflow-hidden">
            <span className="input-group-text bg-transparent border-0 text-white">
              <FaUser />
            </span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control bg-transparent border-0 text-white"
              placeholder="Full Name"
              required
            />
          </div>

          <div className="input-group mb-3 border rounded-3 overflow-hidden">
            <span className="input-group-text bg-transparent border-0 text-white">
              <FaEnvelope />
            </span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control bg-transparent border-0 text-white"
              placeholder="Email Address"
              required
            />
          </div>

          <div className="input-group mb-3 border rounded-3 overflow-hidden">
            <span className="input-group-text bg-transparent border-0 text-white">
              <FaUnlockAlt />
            </span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control bg-transparent border-0 text-white"
              placeholder="Password"
              required
            />
          </div>

          <div className="input-group mb-4 border rounded-3 overflow-hidden">
            <span className="input-group-text bg-transparent border-0 text-white">
              <FaUnlockAlt />
            </span>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-control bg-transparent border-0 text-white"
              placeholder="Confirm Password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-light w-100 fw-semibold mb-4"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center small mb-0">
          Already have an account?{" "}
          <Link to="/" className="fw-bold text-white text-decoration-none">
            Log In
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Signup;
