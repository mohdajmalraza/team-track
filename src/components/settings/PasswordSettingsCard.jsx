import { useState } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import useSettingsContext from "../../context/SettingsContext.jsx";
import { toast } from "react-toastify";

function PasswordSettingsCard() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const { changePassword, isSettingsMutating } = useSettingsContext();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const togglePassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const { currentPassword, newPassword, confirmPassword } = formData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return setError("All fields are required.");
    }

    if (newPassword.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      const message = await changePassword({
        currentPassword,
        newPassword,
      });

      toast.success(message);

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to update password.",
      );
      setError(error.response?.data?.message || "Unable to update password.");
    }
  };

  const renderPasswordInput = (label, name, visibleKey) => (
    <div className="mb-3">
      <label className="form-label fw-semibold">{label}</label>

      <div className="input-group">
        <input
          type={showPassword[visibleKey] ? "text" : "password"}
          className="form-control"
          name={name}
          value={formData[name]}
          onChange={handleChange}
        />

        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => togglePassword(visibleKey)}
        >
          {showPassword[visibleKey] ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>
  );

  return (
    <div className="card border-0 shadow-sm rounded-4 h-100">
      <div className="card-body p-4">
        <div className="d-flex align-items-center mb-4">
          <div
            className="bg-warning bg-opacity-10 rounded-circle d-flex justify-content-center align-items-center me-3"
            style={{ width: 60, height: 60 }}
          >
            <FaLock className="text-warning" size={24} />
          </div>

          <div>
            <h4 className="fw-semibold mb-1">Change Password</h4>

            <p className="text-muted mb-0">Keep your account secure.</p>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          {renderPasswordInput(
            "Current Password",
            "currentPassword",
            "current",
          )}

          {renderPasswordInput("New Password", "newPassword", "new")}

          {renderPasswordInput(
            "Confirm Password",
            "confirmPassword",
            "confirm",
          )}

          <button
            className="btn btn-warning text-white fw-semibold"
            disabled={isSettingsMutating}
          >
            {isSettingsMutating ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PasswordSettingsCard;
