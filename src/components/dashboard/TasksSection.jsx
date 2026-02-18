import { useEffect, useState } from "react";
import useTaskContext from "../../context/TaskContext";
import TaskCard from "./TaskCard";
import CardSkeleton from "../projects/CardSkeleton";
import { Link } from "react-router-dom";

function TasksSection() {
  const [selectedStatus, setSelectedStatus] = useState("");
  const { taskList, isFetchingTasks, taskListError, getTasks } =
    useTaskContext();

  useEffect(() => {
    getTasks({ status: selectedStatus || undefined });
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
        {isFetchingTasks && (
          <div className="row">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="col-sm-6 col-lg-4 mb-3">
                <CardSkeleton key={i} />
              </div>
            ))}
          </div>
        )}

        {!isFetchingTasks && taskListError && (
          <div className="text-center text-danger">
            <p className="fw-semibold">Something went wrong!</p>
          </div>
        )}

        {!isFetchingTasks && !taskListError && (
          <>
            {taskList.length > 0 ? (
              <div className="row">
                {taskList.map((task) => (
                  <Link
                    to={`/tasks/${task.id}`}
                    key={task.id}
                    className="col-sm-6 col-lg-4 project-link text-decoration-none mb-3"
                  >
                    <TaskCard task={task} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="alert alert-danger">
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
