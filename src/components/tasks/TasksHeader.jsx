import { useState } from "react";
import TaskFormModal from "../modals/TaskFormModal";

function TasksHeader() {
  const [showTaskFromModal, setShowTaskFormModal] = useState(false);

  return (
    <div className="d-flex justify-content-between mb-3">
      <h3>Tasks</h3>

      <div>
        <button
          className="btn btn-info text-nowrap text-white fw-semibold"
          onClick={() => setShowTaskFormModal(true)}
        >
          + New Task
        </button>
      </div>

      <TaskFormModal
        show={showTaskFromModal}
        onClose={() => setShowTaskFormModal(false)}
      />
    </div>
  );
}

export default TasksHeader;
