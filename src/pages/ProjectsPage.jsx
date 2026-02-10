import { useEffect, useState } from "react";
import ProjectCard from "../components/dashboard/ProjectCard";
import useProjectContext from "../context/ProjectContext";

function ProjectsPage() {
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState("");
  const { projects, loading, error, fetchProjects } = useProjectContext();
  const statuses = ["In Progress", "Completed"];

  const handleSort = (e) => {
    const [sort, order] = e.target.value.split("-");

    setSortBy(e.target.value);
    fetchProjects({ sortBy: sort, order });
  };

  useEffect(() => {
    fetchProjects({ status });
  }, [status]);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="text-nowrap">Projects</h4>

        <button
          className="btn btn-info fw-semibold text-white"
          data-bs-toggle="modal"
          data-bs-target="#newProjectModal"
        >
          + New Project
        </button>
      </div>

      <div className="mb-3 d-flex justify-content-between align-items-center">
        <form action="" className="col-md-5">
          <input
            type="text"
            placeholder="Search projects..."
            className="w-100 form-control"
          />
        </form>
        <div className="col-md-3">
          <select
            name=""
            className="form-select"
            value={sortBy}
            onChange={handleSort}
          >
            <option value="">Sort by</option>
            <option value="createdAt-desc">Latest</option>
            <option value="createdAt-asc">Oldest</option>
            <option value="name-asc">Name (A–Z)</option>
          </select>
        </div>
      </div>

      <div className="mb-3 fw-semibold border-bottom d-flex gap-4">
        <div
          className={`pb-2 ${status === "" ? "text-info border-3 border-info border-bottom" : ""}`}
          style={{ cursor: "pointer" }}
          onClick={() => setStatus("")}
        >
          All
        </div>
        {statuses.map((item) => (
          <div
            key={item}
            className={`pb-2 ${status === item ? "text-info border-3 border-info border-bottom" : ""}`}
            style={{ cursor: "pointer" }}
            onClick={() => setStatus(item)}
          >
            {item}
          </div>
        ))}
      </div>

      <div>
        {loading && (
          <div className="py-4 text-center">
            <div className="spinner-border text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
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
              <div className="row">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="col-sm-6 col-lg-4 mb-3"
                    style={{ height: "170px" }}
                  >
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-danger text-center fw-semibold">
                <p>No projects found</p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default ProjectsPage;
