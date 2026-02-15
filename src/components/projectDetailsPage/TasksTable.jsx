import { formatDate } from "../../utility/utils";

function TasksTable({ tasks, loading, error }) {
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "text-success bg-success-subtle";
      case "in progress":
        return "text-warning bg-warning-subtle";
      case "blocked":
        return "text-danger bg-danger-subtle";
      default:
        return "text-dark bg-dark-subtle";
    }
  };

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
                <th className="text-muted small">TAGS</th>
                <th className="text-muted small">DUE ON</th>
                <th className="text-muted small">STATUS</th>
              </tr>
            </thead>

            <tbody>
              {loading &&
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index}>
                    <td colSpan="5">
                      <div className="placeholder-glow">
                        <span className="placeholder col-12"></span>
                      </div>
                    </td>
                  </tr>
                ))}

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

                    <td>
                      {task.tags?.map((tag, i) => (
                        <span
                          key={i}
                          className="badge bg-primary-subtle text-primary me-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </td>

                    <td className="fw-semibold small">
                      {formatDate(task.dueDate)}
                    </td>

                    <td>
                      <span
                        className={`badge rounded-pill ${getStatusBadge(task.status)}`}
                      >
                        {task.status}
                      </span>
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
