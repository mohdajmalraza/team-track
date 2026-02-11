import { formatDate } from "../../utility/utils";

function TaskCard({ task }) {
  const COLORS = [
    "bg-success",
    "bg-info",
    "bg-secondary",
    "bg-primary",
    "bg-warning",
    "bg-danger",
    "bg-dark",
  ];

  return (
    <div className="card h-100 px-3 py-2 border-0 shadow-sm bg-white">
      <div className="mb-1">
        <span
          className={`badge opacity-75 ${task.status === "Completed" ? "bg-success" : task.status === "Blocked" ? "bg-danger" : "bg-warning"}`}
        >
          {task.status}
        </span>
      </div>

      <h5 className="text-truncate">{task.name}</h5>

      <div className="mb-2 text-muted">
        <span>Duo on: </span>
        <span>{formatDate(task.dueDate)}</span>
      </div>

      {task.owners.length > 0 ? (
        <div className="d-flex align-items-center overflow-hidden">
          {task.owners.map((owner, index) => (
            <div key={index} className="d-flex align-items-center">
              <span
                className={`text-white border rounded-circle d-inline-flex align-items-center justify-content-center fw-semibold ${COLORS[index % COLORS.length]}`}
                style={{ width: "32px", height: "32px" }}
              >
                {owner.name.split(" ").map((w) => w.charAt(0))}
              </span>
              <span className="pe-1">{`${owner.name} `}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default TaskCard;
