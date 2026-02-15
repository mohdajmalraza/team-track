import { useSearchParams } from "react-router-dom";
import useProjectContext from "../../context/ProjectContext";
import { useEffect } from "react";

const SORT_MAP = {
  latest: { sortBy: "createdAt", order: "desc" },
  oldest: { sortBy: "createdAt", order: "asc" },
  name: { sortBy: "name", order: "asc" },
};
const STATUSES = ["", "In Progress", "Completed"];

function ProjectsFilters() {
  const { fetchProjects } = useProjectContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const status = searchParams.get("status") || "";
  const sort = searchParams.get("sort") || "";

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

  useEffect(() => {
    const params = {};

    if (status) {
      params.status = status;
    }

    if (sort && SORT_MAP[sort]) {
      const config = SORT_MAP[sort];
      params.sortBy = config.sortBy;
      params.order = config.order;
    }

    fetchProjects(params);
  }, [status, sort]);

  return (
    <div className="row mb-3">
      <div className="col-12 col-sm-8 col-md-9 fw-semibold d-flex gap-4 mb-3">
        {STATUSES.map((item) => (
          <div
            key={item}
            className={`${status === item ? "text-nowrap text-info border-3 border-bottom border-info" : ""}`}
            style={{ cursor: "pointer" }}
            onClick={() => handleStatusChange(item)}
          >
            {item === "" ? "All" : item}
          </div>
        ))}
      </div>

      <div className="col-12 col-sm-4 col-md-3">
        <select
          className="form-select"
          value={sort}
          onChange={handleSortChange}
        >
          <option value="">Sort by</option>
          <option value="latest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="name">Name (A–Z)</option>
        </select>
      </div>
    </div>
  );
}

export default ProjectsFilters;
