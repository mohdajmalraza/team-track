import useProjectContext from "../../context/ProjectContext";
import ProjectCardSkeleton from "./ProjectCardSkeleton";
import ProjectList from "./ProjectList";

function ProjectContent() {
  const { projects, loading, error } = useProjectContext();

  return (
    <div>
      {loading && (
        <div className="row">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="col-sm-6 col-lg-4 mb-3"
              style={{ height: "190px" }}
            >
              <ProjectCardSkeleton />
            </div>
          ))}
        </div>
      )}

      {!loading && error && (
        <div>
          <p className="text-center text-danger">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          {projects.length > 0 ? (
            <ProjectList />
          ) : (
            <div className="text-danger text-center fw-semibold">
              <p>No projects found</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProjectContent;
