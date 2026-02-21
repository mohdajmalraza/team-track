import { toast } from "react-toastify";
import {
  formatDate,
  getPriorityBadge,
  getStatusBadge,
} from "../../utility/utils";
import useTaskContext from "../../context/TaskContext";

const STATUS_FLOW = {
  "To Do": "In Progress",
  "In Progress": "Completed",
  Blocked: "In Progress",
  Completed: "In Progress",
};

function TaskDetailsMeta({
  task,
  isTaskMutating,
  isFetchingTask,
  setShowTaskFormModal,
  setShowBlockModal,
}) {
  const { updateTaskStatus } = useTaskContext();

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

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="m-0">Task Name</h4>

        <div>
          <button
            className="btn btn-sm btn-info fw-semibold text-white me-2"
            onClick={() => setShowTaskFormModal(true)}
          >
            Edit Details
          </button>

          {task?.status !== "Completed" && task?.status !== "Blocked" && (
            <button
              className="btn btn-sm btn-danger"
              onClick={() => setShowBlockModal(true)}
            >
              Block Task
            </button>
          )}
        </div>
      </div>

      <hr className="text-secondary" />

      <div className="card px-3 py-3 border-0 shadow bg-white mb-3">
        <div className="d-flex justify-content-between align-items-center">
          <h4>{task?.name}</h4>
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
            <div className="py-1 fw-semibold text-muted">Assigned Team:</div>
            <div className="py-1 fw-semibold text-muted">Assigned To:</div>
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

            <div className="py-1 fw-semibold">{formatDate(task?.dueDate)}</div>

            <div className="py-1 fw-semibold">
              <span className="text-dark">{task?.team?.name}</span>
            </div>

            <div className="py-1 fw-semibold">
              {task?.owners?.map((owner) => (
                <span
                  key={owner.id}
                  className="badge bg-secondary-subtle text-dark me-1"
                >
                  {owner.name}
                </span>
              ))}
            </div>

            <div className="py-1 fw-semibold">
              {task?.tags?.map((tag) => (
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
          disabled={isTaskMutating || isFetchingTask}
        >
          {isTaskMutating
            ? "Updating Status..."
            : getActionButtonText(task?.status)}
        </button>
      </div>
    </div>
  );
}

export default TaskDetailsMeta;
