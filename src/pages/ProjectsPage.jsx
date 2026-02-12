import { useEffect, useState } from "react";
import useProjectContext from "../context/ProjectContext";
import { useSearchParams } from "react-router-dom";
import ProjectList from "../components/projectsPage/ProjectList";
import ProjectCardSkeleton from "../components/projectsPage/ProjectCardSkeleton";

function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { projects, loading, error, fetchProjects } = useProjectContext();

  const status = searchParams.get("status") || "";
  const sort = searchParams.get("sort") || "";

  const statuses = ["", "In Progress", "Completed"];

  const sortMap = {
    latest: { sortBy: "createdAt", order: "desc" },
    oldest: { sortBy: "createdAt", order: "asc" },
    name: { sortBy: "name", order: "asc" },
  };

  const handleSortChange = (e) => {
    const value = e.target.value;

    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);

      if (value) {
        newParams.set("sort", value);
      } else {
        newParams.delete("sort");
      }

      return newParams;
    });
  };

  const handleStatusChange = (item) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);

      if (item) {
        newParams.set("status", item);
      } else {
        newParams.delete("status");
      }

      return newParams;
    });
  };

  useEffect(() => {
    const params = {};

    if (status) {
      params.status = status;
    }

    if (sort && sortMap[sort]) {
      const config = sortMap[sort];
      params.sortBy = config.sortBy;
      params.order = config.order;
    }

    fetchProjects(params);
  }, [searchParams]);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Projects</h4>

        <button
          className="btn btn-info fw-semibold text-white"
          data-bs-toggle="modal"
          data-bs-target="#newProjectModal"
        >
          + New Project
        </button>
      </div>

      <div className="row mb-3 d-flex justify-content-end align-items-center">
        <div className="col-12 col-sm-3">
          <select
            className="form-select"
            value={sort}
            onChange={handleSortChange}
          >
            <option value="">Sort by</option>
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="name">Name (A–Z)</option>
          </select>
        </div>
      </div>

      <div className="mb-3 fw-semibold border-bottom d-flex gap-4">
        {statuses.map((item) => (
          <div
            key={item}
            className={`pb-2 ${status === item ? "text-info border-3 border-info border-bottom" : ""}`}
            style={{ cursor: "pointer" }}
            onClick={() => handleStatusChange(item)}
          >
            {item === "" ? "All" : item}
          </div>
        ))}
      </div>

      <div>
        {/* {loading && (
          <div className="py-4 text-center">
            <div className="spinner-border text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )} */}

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
    </>
  );
}

export default ProjectsPage;
