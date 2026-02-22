import { useEffect, useState } from "react";
import useProjectContext from "../../context/ProjectContext";
import ProjectCard from "../common/ProjectCard";
import CardSkeleton from "../projects/CardSkeleton";
import ProjectFormModal from "../modals/ProjectFormModal";

function ProjectsSection() {
  const [showProjectFormModal, setShowProjectFormModal] = useState(false);
  const { getProjects, projects, loading, error } = useProjectContext();

  useEffect(() => {
    getProjects({ sortBy: "createdAt", order: "desc", limit: 3 });
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
            onClick={() => setShowProjectFormModal(true)}
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
                  <div key={project.id} className="col-sm-6 col-lg-4 mb-2">
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="alert alert-danger">
                <p className="fw-semibold">No projects found.</p>
              </div>
            )}
          </>
        )}
      </div>

      <ProjectFormModal
        show={showProjectFormModal}
        onClose={() => setShowProjectFormModal(false)}
      />
    </div>
  );
}

export default ProjectsSection;
