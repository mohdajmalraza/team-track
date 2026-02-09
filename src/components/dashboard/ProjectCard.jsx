function ProjectCard({ project }) {
  return (
    <div className="card h-100 px-3 py-2 border-0 shadow-sm bg-white">
      <div className="mb-1">
        <span
          className={`badge opacity-50 ${project.status === "In Progress" ? "bg-warning" : "bg-success"}`}
        >
          {project.status}
        </span>
      </div>

      <h5 className="text-truncate">{project.name}</h5>

      <p className="text-muted line-clamp-3">{project.description}</p>
    </div>
  );
}

export default ProjectCard;
