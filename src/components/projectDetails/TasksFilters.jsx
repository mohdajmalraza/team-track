import { useSearchParams } from "react-router-dom";

const TASK_STATUSES = ["To Do", "In Progress", "Completed", "Blocked"];

function TasksFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const status = searchParams.get("status") || "";
  const sort = searchParams.get("sort") || "";

  const updateParam = (key, value) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      return params;
    });
  };

  return (
    <div className="row m-0 p-0 justify-content-between align-items-center flex-column-reverse flex-lg-row mb-3">
      <div className="p-0 py-1 col-12 col-lg-8 d-flex align-items-center gap-lg-2 gap-1 flex-wrap">
        <span className="text-nowrap fw-semibold">Sort by:</span>

        <button
          className={`btn btn-sm rounded-4 text-nowrap ${sort === "latest" ? "btn-dark" : "btn-outline-secondary"}`}
          onClick={() => updateParam("sort", "latest")}
        >
          Newest First
        </button>

        <button
          className={`btn btn-sm rounded-4 text-nowrap ${sort === "oldest" ? "btn-dark" : "btn-outline-secondary"}`}
          onClick={() => updateParam("sort", "oldest")}
        >
          Oldest First
        </button>

        <button
          className={`btn btn-sm rounded-4 text-nowrap ${
            sort === "dueSoon" ? "btn-dark" : "btn-outline-secondary"
          }`}
          onClick={() => updateParam("sort", "dueSoon")}
        >
          Due Soon
        </button>

        <button
          className={`btn btn-sm rounded-4 text-nowrap ${
            sort === "dueLate" ? "btn-dark" : "btn-outline-secondary"
          }`}
          onClick={() => updateParam("sort", "dueLate")}
        >
          Due Late
        </button>

        {/* <button
          className={`btn btn-sm rounded-4 text-nowrap ${
            sort === "dueLate" ? "btn-dark" : "btn-outline-secondary"
          }`}
          onClick={() => updateParam("sort", "priority_LowToHigh")}
        >
          Priority Low-High
        </button> */}

        {/* <button
          className={`btn btn-sm rounded-4 text-nowrap ${
            sort === "dueLate" ? "btn-dark" : "btn-outline-secondary"
          }`}
          onClick={() => updateParam("sort", "priority_HighToLow")}
        >
          Priority High-Low
        </button> */}
      </div>

      <div className="p-0 py-1 col-12 col-lg-4 d-flex justify-content-end align-items-center gap-3">
        <div className="w-100">
          <select
            className="form-select form-select-sm"
            value={status}
            onChange={(e) => updateParam("status", e.target.value)}
          >
            <option value="">All Status</option>
            {TASK_STATUSES.map((s, i) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="">
          <button
            className="btn btn-sm btn-info text-nowrap text-white fw-semibold"
            data-bs-toggle="modal"
            data-bs-target="#newTaskModal"
          >
            + New Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default TasksFilters;
