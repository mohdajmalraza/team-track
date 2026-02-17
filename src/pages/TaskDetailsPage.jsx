import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useTaskContext from "../context/TaskContext";
import { formatDate, getPriorityBadge, getStatusBadge } from "../utility/utils";
import { toast } from "react-toastify";

const STATUS_FLOW = {
  "To Do": "In Progress",
  "In Progress": "Completed",
  Blocked: "In Progress",
  Completed: "In Progress",
};

function TaskDetailsPage() {
  const { id } = useParams();
  const {
    isFetchingTask,
    isTaskMutating,
    currentTaskError,
    currentTask: task,
    getTaskById,
    updateTaskStatus,
  } = useTaskContext();

  const getActionButtonText = (status) => {
    if (!status) return;

    switch (status) {
      case "To Do":
        return "Start Task";
      case "In Progress":
        return "Mark as Complete";
      case "Blocked":
        return "Resume Task";
      default:
        return "Restart Task";
    }
  };

  const handleUpdateStatusClick = async (id, currentStatus) => {
    try {
      const nextStatus = STATUS_FLOW[currentStatus];

      if (!nextStatus) return;

      await updateTaskStatus(id, nextStatus);

      toast.success(`Task moved to ${nextStatus}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleBlockClick = async (id) => {
    try {
      await updateTaskStatus(id, "Blocked");

      toast.success(`Task blocked successfully`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (id) {
      getTaskById(id);
    }
  }, [id]);

  return (
    <>
      <main>
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="m-0">Task Details</h4>
          <button
            className="btn btn-info fw-semibold text-white"
            data-bs-toggle="modal"
            data-bs-target="#newTaskModal"
          >
            Edit Details
          </button>
        </div>

        <hr className="text-secondary" />

        {isFetchingTask && (
          <div>
            <div className="card px-3 py-3 mb-3 placeholder-glow">
              <h4 className="placeholder col-4"></h4>
              <div className="py-2">
                <span className="placeholder col-2"></span>
              </div>
            </div>

            <div className="row placeholder-glow">
              <div className="py-2 card">
                <h5 className="card-header placeholder col-2"></h5>

                <div className="card-body col-md-3">
                  <div className="placeholder col-12"></div>
                  <div className="placeholder col-12"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!isFetchingTask && currentTaskError && (
          <div className="alert alert-danger">{currentTaskError}</div>
        )}

        {!isFetchingTask && task && (
          <div>
            <div className="card px-3 py-3 border-0 shadow bg-white mb-3">
              <div className="d-flex justify-content-between align-items-center">
                <h4>{task?.name}</h4>
                {task?.status !== "Completed" && task?.status !== "Blocked" && (
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleBlockClick(task?.id)}
                  >
                    Block Task
                  </button>
                )}
              </div>

              <div className="py-2">
                <span
                  className={`px-3 py-2 badge rounded-pill ${getStatusBadge(task?.status)}`}
                >
                  {task?.status}
                </span>
              </div>
            </div>

            <div className="card border-0 shadow bg-white mb-3">
              <h5 className="card-header">Details</h5>
              <div className="card-body row">
                <div className="col-md-2">
                  <div className="py-1 fw-semibold text-muted">Priority:</div>
                  <div className="py-1 fw-semibold text-muted">Due Date:</div>
                  <div className="py-1 fw-semibold text-muted">
                    Assigned Team:
                  </div>
                  <div className="py-1 fw-semibold text-muted">
                    Assigned To:
                  </div>
                  <div className="py-1 fw-semibold text-muted">Tags:</div>
                </div>

                <div className="col-md-10">
                  <div className="py-1 fw-semibold">
                    <span
                      className={`badge me-1 ${getPriorityBadge(task?.priority)}`}
                    >
                      {task?.priority}
                    </span>
                  </div>

                  <div className="py-1 fw-semibold">
                    {formatDate(task?.dueDate)}
                  </div>

                  <div className="py-1 fw-semibold">
                    <span className="text-dark">{task?.team?.name}</span>
                  </div>

                  <div className="py-1 fw-semibold">
                    {task?.owners.map((owner) => (
                      <span
                        key={owner.id}
                        className="badge bg-secondary-subtle text-dark me-1"
                      >
                        {owner.name}
                      </span>
                    ))}
                  </div>

                  <div className="py-1 fw-semibold">
                    {task?.tags.map((tag) => (
                      <span
                        key={tag}
                        className="badge text-primary bg-primary-subtle me-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="py-3 text-center">
              <button
                className="col-4 fw-semibold text-white btn btn-info"
                onClick={() => handleUpdateStatusClick(task.id, task.status)}
                disabled={isTaskMutating}
              >
                {isTaskMutating
                  ? "Updating Status..."
                  : getActionButtonText(task?.status)}
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default TaskDetailsPage;
