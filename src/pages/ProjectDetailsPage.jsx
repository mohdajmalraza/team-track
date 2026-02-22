import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import useProjectContext from "../context/ProjectContext";
import TasksTable from "../components/projectDetails/TasksTable";
import TasksFilters from "../components/projectDetails/TasksFilters";
import useTaskContext from "../context/TaskContext";
import ProjectFormModal from "../components/modals/ProjectFormModal";

function ProjectDetailsPage() {
  const [showProjectFormModal, setShowProjectFormModal] = useState(false);
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const {
    project,
    loading: projectLoading,
    error: projectError,
    getProjectById,
  } = useProjectContext();

  const { taskList, isFetchingTasks, taskListError, getTasks } =
    useTaskContext();

  useEffect(() => {
    if (id) {
      getProjectById(id);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      const paramsObject = Object.fromEntries(searchParams.entries());

      getTasks({ project: id, ...paramsObject });
    }
  }, [id, searchParams]);

  return (
    <>
      <main>
        <div className="mb-4">
          {projectLoading && (
            <div className="placeholder-glow">
              <div className="placeholder col-6"></div>
              <div className="placeholder col-8"></div>
              <div className="placeholder col-5"></div>
            </div>
          )}

          {!projectLoading && projectError && (
            <div className="alert alert-danger">{projectError}</div>
          )}

          {!projectLoading && !projectError && project && (
            <div className="d-flex justify-content-between">
              <div>
                <h3 className="fw-bold">{project.name}</h3>
                <p className="col-md-8 text-muted">{project.description}</p>
              </div>
              <div>
                <button
                  className="btn btn-sm btn-info fw-semibold text-white me-2"
                  onClick={() => setShowProjectFormModal(true)}
                >
                  Edit Details
                </button>
              </div>
            </div>
          )}
        </div>

        <TasksFilters />

        <TasksTable
          tasks={taskList}
          loading={isFetchingTasks}
          error={taskListError}
        />

        <ProjectFormModal
          show={showProjectFormModal}
          mode="edit"
          projectToEdit={project}
          onClose={() => setShowProjectFormModal(false)}
        />
      </main>
    </>
  );
}

export default ProjectDetailsPage;
