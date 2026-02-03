import { useRef, useState } from "react";
import useProjectContext from "../../context/ProjectContext";
import { toast } from "react-toastify";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";

function NewProjectModal() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const modalRef = useRef(null);
  const { createProject } = useProjectContext();

  const handleCreateButton = async () => {
    if (!name.trim()) {
      return setError("Project name is required");
    }

    try {
      setError("");
      setLoading(true);

      await createProject({ name, description });
      toast.success("Project created successfully 🎉");

      // Close modal after success
      const modal = Modal.getInstance(modalRef.current);
      modal?.hide();

      setName("");
      setDescription("");
    } catch (err) {
      toast.error(err.message || "Failed to create project ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={modalRef}
      className="modal fade"
      id="newProjectModal"
      tabIndex="-1"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow">
          <div className="modal-header">
            <h5 className="modal-title">Create New Project</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            />
          </div>

          <div className="modal-body">
            {error && (
              <div className="text-danger">
                <p>{error}</p>
              </div>
            )}

            <form>
              <div className="mb-3">
                <label className="form-label">Project Name</label>
                <span className="text-danger">*</span>
                <input
                  type="text"
                  placeholder="Enter Project Name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Enter Project Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </form>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-info text-dark"
              onClick={handleCreateButton}
              disabled={loading}
            >
              {loading ? "Creating" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewProjectModal;
