import { useNavigate } from "react-router-dom";
import { getPriorityBadge, getStatusBadge } from "../../utility/uiUtils";
import { formatDate } from "../../utility/dateUtils";
import TaskTableSkeleton from "../common/TaskTableSkeleton";
import { FaLongArrowAltRight } from "react-icons/fa";

function TasksTable({ tasks, loading, error }) {
  const navigate = useNavigate();

  return (
    <div className="card shadow-sm border-0">
      {error && (
        <div className="alert alert-danger m-3">
          <strong>Something went wrong!</strong>
          <div className="small">{error}</div>
        </div>
      )}

      {!error && (
        <div className="table-responsive">
          <table className="table table-sm align-middle mb-0">
            <thead className="table-info">
              <tr>
                <th className="text-muted small py-2">TASK</th>
                <th className="text-muted small">PROJECT</th>
                <th className="text-muted small">TEAM</th>
                <th className="text-muted small">ASSIGNEES</th>
                <th className="text-muted small">PRIORITY</th>
                <th className="text-muted small text-nowrap">DUE DATE</th>
                <th className="text-muted small">STATUS</th>
                <th className="text-muted small">VIEW</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <>
                  {Array.from({ length: 10 }).map((_, index) => (
                    <TaskTableSkeleton key={index} />
                  ))}
                </>
              )}

              {!loading &&
                !error &&
                tasks?.map((task) => (
                  <tr key={task.id} className="align-middle">
                    <td className="fw-semibold">{task.name}</td>
                    <td className="text-muted">{task.project.name}</td>
                    <td className="text-muted">{task.team.name}</td>

                    <td>
                      {task.owners &&
                        task.owners.map((owner) => (
                          <span
                            key={owner.id}
                            className="badge bg-secondary-subtle text-dark me-1"
                          >
                            {owner.name}
                          </span>
                        ))}
                    </td>

                    <td>
                      <span
                        className={`w-100 badge me-1 ${getPriorityBadge(task?.priority)}`}
                      >
                        {task?.priority}
                      </span>
                    </td>

                    <td className="fw-semibold small text-nowrap">
                      {formatDate(task.dueDate)}
                    </td>

                    <td>
                      <span
                        className={`w-100 badge rounded-pill ${getStatusBadge(task.status)}`}
                      >
                        {task.status}
                      </span>
                    </td>

                    <td>
                      <div className="d-flex justify-content-center align-items-center">
                        <button
                          className="p-1 btn btn-sm btn-outline-info d-flex justify-content-center align-items-center"
                          onClick={() => navigate(`/tasks/${task.id}`)}
                        >
                          <FaLongArrowAltRight />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

              {!loading && !error && tasks?.length === 0 && (
                <tr>
                  <td colSpan="8" className="pt-4">
                    <div className="w-100 alert alert-warning text-center fw-semibold">
                      No tasks found for this project.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TasksTable;
