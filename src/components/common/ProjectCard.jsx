import { Link } from "react-router-dom";
import { formatDate } from "../../utility/dateUtils";

function ProjectCard({ project }) {
  return (
    <Link
      to={`/projects/${project.id}`}
      className=" project-link text-decoration-none"
    >
      <div className="card h-100 px-3 py-2 border-0 bg-white d-flex flex-column shadow-sm">
        <div>
          <span
            className={`badge opacity-50 ${project.status === "In Progress" ? "bg-warning" : "bg-success"}`}
          >
            {project.status}
          </span>
        </div>

        <div>
          <h5 className="py-1 text-truncate">{project.name}</h5>
          <p className="m-0 mb-2 text-muted line-clamp-3">
            {project.description}
          </p>
        </div>

        <div className="text-muted mt-auto">
          <span className="fw-semibold">Created on: </span>
          <span>{formatDate(project.createdAt)}</span>
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;
