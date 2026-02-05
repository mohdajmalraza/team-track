import { useEffect, useState } from "react";
import useTaskContext from "../../context/TaskContext";

function TasksSection() {
  const [selectedStatus, setSelectedStatus] = useState("");

  const { tasks, loading, error, fetchTasks } = useTaskContext();

  const getOrdinal = (n) => {
    if (n > 3 && n < 21) return "th";

    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const calculateDuoDate = (days) => {
    const date = new Date(Date.now() + days * 24 * 60 * 60 * 1000);

    const day = date.getDate();
    const month = date.toLocaleDateString("en-GB", { month: "short" });
    const year = date.getFullYear();

    return `${day}${getOrdinal(day)} ${month} ${year}`;
  };

  useEffect(() => {
    fetchTasks({ status: selectedStatus || undefined });
  }, [selectedStatus]);

  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="col-6 col-sm-6 col-md-5 col-lg-4 d-flex flex-column flex-sm-row">
          <h4 className="me-2 text-nowrap">My Tasks</h4>

          <select
            className="w-100 form-select form-select-sm"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">All Tasks</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>

        <div>
          <button
            className="btn btn-info fw-semibold text-white"
            data-bs-toggle="modal"
            data-bs-target="#newTaskModal"
          >
            + New Task
          </button>
        </div>
      </div>

      <div>
        {loading && (
          <div className="text-center">
            <div className="spinner-grow text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {!loading && error && (
          <div className="text-center text-danger">
            <p className="fw-semibold">Something went wrong!</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {tasks.length > 0 ? (
              <div className="row">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="col-sm-6 col-lg-4 mb-2"
                    style={{ height: "170px" }}
                  >
                    <div className="card h-100 px-3 py-2 border-0 shadow-sm bg-white">
                      <div className="mb-1">
                        <span
                          className={`badge opacity-75 ${task.status === "Completed" ? "bg-success" : task.status === "Blocked" ? "bg-danger" : "bg-warning"}`}
                        >
                          {task.status}
                        </span>
                      </div>

                      <h5 className="text-truncate">{task.name}</h5>

                      <p className="text-muted line-clamp-3">
                        <span>Duo on: </span>
                        <span>{calculateDuoDate(task.timeToComplete)}</span>
                      </p>

                      {task.owners.length > 0 ? (
                        <div className="d-flex align-items-center">
                          {task.owners.map((owner, index) => (
                            <div
                              key={index}
                              className="d-flex align-items-center me-2"
                            >
                              <span
                                className={`border rounded-circle d-inline-flex align-items-center justify-content-center fw-semibold ${index === 0 ? "bg-danger text-white" : "bg-warning"}`}
                                style={{ width: "32px", height: "32px" }}
                              >
                                {owner.name.split(" ").map((w) => w.charAt(0))}
                              </span>
                              <span className="px-1">{`${owner.name} `}</span>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-danger">
                <p className="fw-semibold">No tasks found.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default TasksSection;
