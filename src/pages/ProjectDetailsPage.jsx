import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import useProjectContext from "../context/ProjectContext";
import TasksTable from "../components/projectDetailsPage/TasksTable";
import TasksFilters from "../components/projectDetailsPage/TasksFilters";
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

  const {
    tasks,
    loading: tasksLoading,
    error: tasksError,
    fetchTasks,
  } = useTaskContext();

  useEffect(() => {
    if (id) {
      fetchProjectById(id);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      const paramsObject = Object.fromEntries(searchParams.entries());

      fetchTasks({ project: id, ...paramsObject });
    }
  }, [id, searchParams]);

  return (
    <>
      <main>
        <div className="mb-4">
          {projectLoading && (
            <div className="py-5 text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
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

        <TasksTable tasks={tasks} loading={tasksLoading} error={tasksError} />
      </main>
    </>
  );
}

export default ProjectDetailsPage;
