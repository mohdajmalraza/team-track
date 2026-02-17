import { useEffect } from "react";
import { Link } from "react-router-dom";
import useProjectContext from "../../context/ProjectContext";
import ProjectCard from "../common/ProjectCard";
import CardSkeleton from "../projects/CardSkeleton";

function ProjectsSection() {
  const { fetchProjects, projects, loading, error } = useProjectContext();

  useEffect(() => {
    fetchProjects({ sortBy: "createdAt", order: "desc", limit: 3 });
  }, []);

  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex gap-4 align-items-center">
          <h4 className="text-nowrap">Recent Projects</h4>
        </div>

        <div>
          <button
            className="btn btn-info fw-semibold text-white"
            data-bs-toggle="modal"
            data-bs-target="#newProjectModal"
          >
            + New Project
          </button>
        </div>
      </div>

      <div>
        {loading && (
          <div className="row">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="col-sm-6 col-lg-4 mb-3">
                <CardSkeleton key={i} />
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="text-center text-danger">
            <p className="fw-semibold">Something went wrong!</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {projects.length > 0 ? (
              <div className="row">
                {projects.map((project) => (
                  <Link
                    key={project.id}
                    className="col-sm-6 col-lg-4 project-link text-decoration-none mb-2"
                    to={`/projects/${project.id}`}
                  >
                    <ProjectCard project={project} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center text-danger">
                <p className="fw-semibold">No project found.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ProjectsSection;
