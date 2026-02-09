import { useEffect, useState } from "react";
import useTaskContext from "../../context/TaskContext";
import TaskCard from "./TaskCard";

function TasksSection() {
  const [selectedStatus, setSelectedStatus] = useState("");
  const { tasks, loading, error, fetchTasks } = useTaskContext();

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
                    <TaskCard task={task} />
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
