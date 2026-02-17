import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import useProjectContext from "../context/ProjectContext";
import TasksTable from "../components/projectDetails/TasksTable";
import TasksFilters from "../components/projectDetails/TasksFilters";
import useTaskContext from "../context/TaskContext";

function ProjectDetailsPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const {
    project,
    loading: projectLoading,
    error: projectError,
    fetchProjectById,
  } = useProjectContext();

  const { taskList, isFetchingTasks, taskListError, getTasks } =
    useTaskContext();

  useEffect(() => {
    if (id) {
      fetchProjectById(id);
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
            <>
              <h3 className="fw-bold">{project.name}</h3>
              <p className="col-md-8 text-muted">{project.description}</p>
            </>
          )}
        </div>

        <TasksFilters />

        <TasksTable
          tasks={taskList}
          loading={isFetchingTasks}
          error={taskListError}
        />
      </main>
    </>
  );
}

export default ProjectDetailsPage;
