import { useState } from "react";
import ProjectsFilters from "../components/projects/ProjectsFilters";
import ProjectContent from "../components/projects/ProjectContent";
import ProjectFormModal from "../components/modals/ProjectFormModal";

function ProjectsPage() {
  const [showProjectFormModal, setShowProjectFormModal] = useState(false);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Projects</h3>

        <button
          className="btn btn-info fw-semibold text-white"
          onClick={() => setShowProjectFormModal(true)}
        >
          + New Project
        </button>
      </div>

      <ProjectsFilters />
      <ProjectContent />

      <ProjectFormModal
        show={showProjectFormModal}
        onClose={() => setShowProjectFormModal(false)}
      />
    </>
  );
}

export default ProjectsPage;
