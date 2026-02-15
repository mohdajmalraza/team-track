import ProjectsFilters from "../components/projectsPage/ProjectsFilters";
import ProjectContent from "../components/projectsPage/ProjectContent";

function ProjectsPage() {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Projects</h3>

        <button
          className="btn btn-info fw-semibold text-white"
          data-bs-toggle="modal"
          data-bs-target="#newProjectModal"
        >
          + New Project
        </button>
      </div>

      <ProjectsFilters />
      <ProjectContent />
    </>
  );
}

export default ProjectsPage;
