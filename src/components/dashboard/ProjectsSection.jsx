import { useEffect } from "react";
import useProjectContext from "../../context/ProjectContext";
import ProjectCard from "../common/ProjectCard";

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
          <div className="text-center">
            <div className="spinner-grow text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
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
                {projects.slice(0, 3).map((project) => (
                  <div key={project.id} className="col-sm-6 col-lg-4 mb-2">
                    <ProjectCard project={project} />
                  </div>
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
