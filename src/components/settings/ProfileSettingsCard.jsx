import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import useSettingsContext from "../../context/SettingsContext";
import { toast } from "react-toastify";

function ProfileSettingsCard({ profile }) {
  const [name, setName] = useState("");

  const { updateProfile, isSettingsMutating } = useSettingsContext();
  const [error, setError] = useState("");

  useEffect(() => {
    if (profile) {
      setName(profile.name);
    }
  }, [profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!name.trim()) {
      setError("Name is required.");
      return;
    }

    try {
      const message = await updateProfile({ name });

      toast.success(message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update profile.");
    }
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 h-100">
      <div className="card-body p-4">
        {/* Header */}

        <div className="d-flex align-items-center mb-4">
          <div
            className="bg-primary bg-opacity-10 rounded-circle d-flex justify-content-center align-items-center me-3"
            style={{
              width: "60px",
              height: "60px",
            }}
          >
            <FaRegUser size={26} className="text-primary" />
          </div>

          <div>
            <h4 className="fw-semibold mb-1">Profile Information</h4>

            <p className="text-muted mb-0">Update your personal information.</p>
          </div>
        </div>

        {/* Alerts */}

        {error && <div className="alert alert-danger">{error}</div>}

        {/* Form */}

        <form onSubmit={handleSubmit}>
          {/* Name */}

          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}

          <div className="mb-4">
            <label className="form-label fw-semibold">Email Address</label>

            <input
              type="email"
              className="form-control"
              value={profile?.email || ""}
              disabled
            />
          </div>

          <button
            type="submit"
            className="btn btn-info text-white fw-semibold px-4"
            disabled={isSettingsMutating}
          >
            {isSettingsMutating ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileSettingsCard;
