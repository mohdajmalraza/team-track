function TasksSection() {
  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-4">
          <h4 className="text-nowrap">My Tasks</h4>
          <select name="" id="" className="col-4 form-select form-select-sm">
            <option value="">Filter</option>
          </select>
        </div>

        <div>
          <button className="btn btn-info fw-semibold text-white">
            + New Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default TasksSection;
