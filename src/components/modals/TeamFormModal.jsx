import { useState } from "react";
import { toast } from "react-toastify";
import useAuthContext from "../../context/AuthContext";
import useUserContext from "../../context/UserContext";
import useTeamContext from "../../context/TeamContext";

function TeamFormModal({ show, onClose }) {
  const { users } = useUserContext();
  const { createTeam } = useTeamContext();

  const [formData, setFormData] = useState({
    name: "",
    members: [],
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOnChange = (e) => {
    const { name, value, options } = e.target;

    if (name === "members") {
      const selectedMembers = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);

      setFormData((prev) => ({ ...prev, members: selectedMembers }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleButtonClick = async () => {
    const { name, members, description } = formData;

    if (!name.trim()) {
      return toast.error("Team name is required");
    }

    try {
      setError("");
      setLoading(true);

      await createTeam({ name, members, description });

      toast.success("Task created successfully");

      onClose();

      setFormData({
        name: "",
        members: [],
        description: "",
      });
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Failed to create team");
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop fade show"></div>

      <div className="modal fade show d-block">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Create New Team</h1>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Team Name
                </label>
                <span className="text-danger">*</span>

                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Enter Team Name"
                  value={formData.name}
                  onChange={handleOnChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Select Members
                </label>

                <select
                  className="form-select"
                  name="members"
                  multiple
                  value={formData.members}
                  onChange={handleOnChange}
                >
                  {users.length &&
                    users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Description
                </label>

                <textarea
                  rows="3"
                  name="description"
                  className="form-control"
                  value={formData.description}
                  onChange={handleOnChange}
                ></textarea>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-info text-white"
                disabled={loading}
                onClick={handleButtonClick}
              >
                {loading ? "Creating" : "Create"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TeamFormModal;
