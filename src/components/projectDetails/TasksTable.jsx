import { useNavigate } from "react-router-dom";
import {
  formatDate,
  getPriorityBadge,
  getStatusBadge,
} from "../../utility/utils";
import TaskTableSkeleton from "./TaskTableSkeleton";
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
          <table className="table align-middle mb-0">
            <thead className="table-info">
              <tr>
                <th className="text-muted small">TASKS</th>
                <th className="text-muted small">OWNER</th>
                <th className="text-muted small">PRIORITY</th>
                <th className="text-muted small">DUE ON</th>
                <th className="text-muted small">STATUS</th>
                <th className="text-muted small">VIEW</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <TaskTableSkeleton key={index} />
                  ))}
                </>
              )}

              {!loading &&
                !error &&
                tasks?.map((task) => (
                  <tr key={task.id} className="align-middle">
                    <td className="fw-semibold">{task.name}</td>

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

                    {/* <td>
                      {task.tags?.map((tag, i) => (
                        <span
                          key={i}
                          className="badge bg-primary-subtle text-primary me-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </td> */}

                    <td>
                      <span
                        className={`w-100 badge me-1 ${getPriorityBadge(task?.priority)}`}
                      >
                        {task?.priority}
                      </span>
                    </td>

                    <td className="fw-semibold small">
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
                      <button
                        className="btn btn-sm btn-outline-info"
                        onClick={() => navigate(`/tasks/${task.id}`)}
                      >
                        <FaLongArrowAltRight />
                      </button>
                    </td>
                  </tr>
                ))}

              {!loading && !error && tasks?.length === 0 && (
                <tr colSpan="5" className="text-center py-4 text-muted">
                  <td>No tasks found.</td>
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
