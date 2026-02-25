import { useSearchParams } from "react-router-dom";

function TasksFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentStatus = searchParams.get("status") || "all";
  const currentSort = searchParams.get("sort") || "dueDate_asc";

  const updateParam = (key, value) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      if (key === "status" && value === "all") {
        params.delete(key);
        return params;
      }

      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      return params;
    });
  };

  return (
    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mb-3">
      <div className="col-12 col-sm-8 py-1 d-flex flex-wrap align-items-center gap-4">
        {["all", "To Do", "In Progress", "Completed", "Blocked"].map(
          (status) => (
            <button
              key={status}
              className={`btn btn-sm p-0 text-nowrap border-0 bg-transparent fw-semibold rounded-0 ${
                currentStatus === status
                  ? "text-info border-bottom border-2 border-info"
                  : "text-muted"
              }`}
              onClick={() => updateParam("status", status)}
            >
              {status === "all" ? "All" : status}
            </button>
          ),
        )}
      </div>

      <div className="col-12 col-sm-4 py-1 d-flex align-items-center gap-2">
        <label className="text-muted text-nowrap fw-semibold mb-0">
          Sort by:
        </label>
        <select
          className="form-select form-select-sm"
          value={currentSort}
          onChange={(e) => updateParam("sort", e.target.value)}
        >
          <option value="dueDate_asc">Due Soon</option>
          <option value="dueDate_desc">Due Later</option>
          <option value="priority_desc">Priority (High → Low)</option>
          <option value="priority_asc">Priority (Low → High)</option>
        </select>
      </div>
    </div>
  );
}

export default TasksFilters;
