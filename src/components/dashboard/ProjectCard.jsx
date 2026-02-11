import { formatDate } from "../../utility/utils";

function ProjectCard({ project }) {
  return (
    <div className="card h-100 px-3 py-2 border-0 shadow-sm bg-white">
      <div>
        <span
          className={`badge opacity-50 ${project.status === "In Progress" ? "bg-warning" : "bg-success"}`}
        >
          {project.status}
        </span>
      </div>

      <h5 className="py-1 text-truncate">{project.name}</h5>
      <p className="text-muted line-clamp-3">{project.description}</p>

      <div className="text-muted">
        <span className="fw-semibold">Created on: </span>
        <span>{formatDate(project.createdAt)}</span>
      </div>
    </div>
  );
}

export default ProjectCard;
