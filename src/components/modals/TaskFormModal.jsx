import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useProjectContext from "../../context/ProjectContext";
import useTeamContext from "../../context/TeamContext";
import useUserContext from "../../context/UserContext";
import useTaskContext from "../../context/TaskContext";

function TaskFormModal({ show, mode = "create", taskToEdit = null, onClose }) {
  const { projects } = useProjectContext();
  const { teams } = useTeamContext();
  const { users } = useUserContext();
  const { createTask, updateTask } = useTaskContext();

  const [formData, setFormData] = useState({
    name: "",
    project: "",
    team: "",
    owners: [],
    tags: "",
    status: "To Do",
    priority: "Low",
    timeToComplete: "",
    dueDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, options } = e.target;

    if (name === "owners") {
      const selectedOwners = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);

      setFormData((prev) => ({ ...prev, owners: selectedOwners }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleButtonClick = async () => {
    const {
      name,
      project,
      team,
      owners,
      timeToComplete,
      status,
      priority,
      tags,
      dueDate,
    } = formData;

    if (!name.trim()) {
      return setError("Task name is required");
    }

    if (!project) {
      return setError("Please select a project");
    }

    if (!team) {
      return setError("Please select a team");
    }

    if (!owners.length) {
      return setError("Please select owners");
    }

    if (!timeToComplete) {
      return setError("Estimated time is required");
    }

    if (!dueDate) {
      return setError("Due date is required");
    }

    try {
      setError("");
      setLoading(true);

      if (mode === "edit") {
        await updateTask(taskToEdit.id, {
          name,
          project,
          team,
          owners,
          timeToComplete: Number(timeToComplete),
          tags: tags.split(",").map((t) => t.trim()),
          priority,
          dueDate,
        });

        toast.success("Task updated successfully");
      } else {
        await createTask({
          name,
          project,
          team,
          owners,
          status,
          priority,
          timeToComplete: Number(timeToComplete),
          tags: tags.split(",").map((t) => t.trim()) || [],
          dueDate,
        });
        toast.success("Task created successfully");
      }

      onClose();

      setFormData({
        name: "",
        project: "",
        team: "",
        owners: [],
        tags: "",
        status: "To Do",
        priority: "Low",
        timeToComplete: "",
        dueDate: "",
      });
    } catch (err) {
      console.log(err);

      toast.error(
        err.message ||
          (mode === "edit" ? "Failed to update task" : "Failed to create task"),
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mode === "edit" && taskToEdit) {
      setFormData({
        name: taskToEdit.name || "",
        project: taskToEdit.project?.id || "",
        team: taskToEdit.team?.id || "",
        owners: taskToEdit.owners?.map((o) => o.id) || [],
        tags: taskToEdit.tags?.join(", ") || "",
        status: taskToEdit.status || "To Do",
        priority: taskToEdit.priority || "Low",
        timeToComplete: taskToEdit.timeToComplete || "",
        dueDate: taskToEdit.dueDate?.split("T")[0] || "",
      });
    }
  }, [mode, taskToEdit]);

  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop fade show"></div>

      <div className="modal fade show d-block">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content border-0">
            <div className="modal-header">
              <h1 className="modal-title fs-5">
                {mode === "edit"
                  ? "Edit Task"
                  : "Create New Task | Create Moodboard"}
              </h1>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body">
              <form>
                <div className="mb-2">
                  <label htmlFor="projectName" className="form-label">
                    Select Project
                  </label>
                  <span className="text-danger fw-semibold">*</span>
                  <select
                    name="project"
                    id="project"
                    className="form-control"
                    value={formData.project}
                    onChange={handleChange}
                  >
                    <option value="">--select project--</option>
                    {projects.length > 0 &&
                      projects.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="mb-2">
                  <label htmlFor="task" className="form-label">
                    Task Name
                  </label>
                  <span className="text-danger fw-semibold">*</span>
                  <input
                    type="text"
                    id="task"
                    name="name"
                    placeholder="Enter Task Name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-2">
                  <label htmlFor="teamName" className="form-label">
                    Select Team
                  </label>
                  <span className="text-danger fw-semibold">*</span>
                  <select
                    name="team"
                    id="teamName"
                    className="form-control"
                    value={formData.team}
                    onChange={handleChange}
                  >
                    <option value="">--select team--</option>
                    {teams.length > 0 &&
                      teams.map((team) => (
                        <option key={team.id} value={team.id}>
                          {team.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="mb-2">
                  <label htmlFor="owners" className="form-label">
                    Select Owners
                  </label>
                  <span className="text-danger fw-semibold">*</span>
                  <select
                    name="owners"
                    id="owners"
                    className="form-control"
                    multiple
                    value={formData.owners}
                    onChange={handleChange}
                  >
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-2">
                  <label htmlFor="" className="form-label">
                    Tags
                  </label>
                  <input
                    type="text"
                    name="tags"
                    placeholder="Enter comma seperated tags"
                    className="form-control"
                    value={formData.tags}
                    onChange={handleChange}
                  />
                </div>

                <div className="row mb-2">
                  <div className="col-6">
                    <label htmlFor="" className="form-label">
                      Select Status
                    </label>
                    <select
                      name="status"
                      className="form-select"
                      value={formData.status}
                      onChange={handleChange}
                      disabled={mode === "edit"}
                    >
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Blocked">Blocked</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label htmlFor="" className="form-label">
                      Estimated Time
                    </label>
                    <span className="text-danger fw-semibold">*</span>
                    <input
                      type="number"
                      name="timeToComplete"
                      min="1"
                      placeholder="Enter Time in Days"
                      className="form-control"
                      value={formData.timeToComplete}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-6">
                    <label htmlFor="" className="form-label">
                      Select Priority
                    </label>
                    <select
                      name="priority"
                      className="form-select"
                      value={formData.priority}
                      onChange={handleChange}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>

                  <div className="col-6">
                    <label htmlFor="dueDate" className="form-label">
                      Select Due date
                    </label>
                    <span className="text-danger fw-semibold">*</span>
                    <input
                      type="date"
                      id="dueDate"
                      name="dueDate"
                      className="form-control"
                      value={formData.dueDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </form>

              {error && (
                <div className="text-danger mt-3">
                  <p>{error}</p>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onClose}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-info text-dark"
                disabled={loading}
                onClick={handleButtonClick}
              >
                {mode === "edit"
                  ? loading
                    ? "Updating..."
                    : "Update Task"
                  : loading
                    ? "Creating"
                    : "Create"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskFormModal;
