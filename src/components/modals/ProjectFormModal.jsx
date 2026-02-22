import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useProjectContext from "../../context/ProjectContext";
import { getModifiedFields } from "../../utility/formUtils.js";

function ProjectFormModal({
  show,
  mode = "create",
  projectToEdit = null,
  onClose,
}) {
  const { createProject, updateProject, isProjectMutating } =
    useProjectContext();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!name.trim()) {
      return setError("Project name is required");
    }

    setError("");

    try {
      if (mode === "edit") {
        const updatedFields = getModifiedFields(projectToEdit, {
          name: name.trim(),
          description: description?.trim() || "",
        });

        if (Object.keys(updatedFields).length === 0) {
          toast.info("No changes detected");
          return;
        }

        await updateProject(projectToEdit.id, updatedFields);
        toast.success("Project updated successfully");
      } else {
        await createProject({
          name: name.trim(),
          description: description?.trim() || "",
        });

        toast.success("Project created successfully");
      }

      setName("");
      setDescription("");
      onClose();
    } catch (err) {
      toast.error(err?.message || "Semething went wrong");
    }
  };

  useEffect(() => {
    if (mode === "edit" && projectToEdit) {
      setName(projectToEdit.name || "");
      setDescription(projectToEdit.description || "");
    }
  }, [mode, projectToEdit]);

  if (!show) {
    return null;
  }

  return (
    <>
      <div className="modal-backdrop fade show"></div>

      <div className="modal fade show d-block">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-header">
              <h5 className="modal-title">
                {mode === "edit"
                  ? "Edit Project Details"
                  : "Create New Project"}
              </h5>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>

            <div className="modal-body">
              {error && (
                <div className="p-0 m-0 mb-1 alert alert-danger">
                  <p className="mb-0 p-1">{error}</p>
                </div>
              )}

              <form>
                <div className="mb-3">
                  <label className="form-label">Project Name</label>
                  <span className="text-danger fw-semibold">*</span>
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
                onClick={onClose}
                disabled={isProjectMutating}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-info text-dark"
                onClick={handleSubmit}
                disabled={isProjectMutating}
              >
                {isProjectMutating
                  ? mode === "edit"
                    ? "Updating..."
                    : "Creating..."
                  : mode === "edit"
                    ? "Update"
                    : "Create"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectFormModal;
