import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
import useProjectContext from "../../context/ProjectContext";
import useTeamContext from "../../context/TeamContext";
import useUserContext from "../../context/UserContext";
import useTaskContext from "../../context/TaskContext";

function NewTaskModal() {
  const { projects } = useProjectContext();
  const { teams } = useTeamContext();
  const { users } = useUserContext();
  const { createTask } = useTaskContext();
  const modalRef = useRef();

  const [formData, setFormData] = useState({
    name: "",
    project: "",
    team: "",
    owners: [],
    tags: "",
    status: "To Do",
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

      await createTask({
        name,
        project,
        team,
        owners,
        status,
        timeToComplete: Number(timeToComplete),
        tags: tags.split(",").map((t) => t.trim()) || [],
        dueDate,
      });
      toast.success("Task created successfully");

      // Close modal after success
      const modal = Modal.getInstance(modalRef.current);
      modal?.hide();

      setFormData({
        name: "",
        project: "",
        team: "",
        owners: [],
        tags: "",
        status: "To Do",
        timeToComplete: "",
        dueDate: "",
      });
    } catch (err) {
      console.log(err);
      toast.error(error.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={modalRef}
      className="modal fade"
      id="newTaskModal"
      tabIndex="-1"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content border-0">
          <div className="modal-header">
            <h1 className="modal-title fs-5">
              Create New Task | Create Moodborad
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <form action="">
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
                    id=""
                    className="form-select"
                    value={formData.status}
                    onChange={handleChange}
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

              <div>
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
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-info text-dark"
              disabled={loading}
              onClick={handleButtonClick}
            >
              {loading ? "Creating" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewTaskModal;
