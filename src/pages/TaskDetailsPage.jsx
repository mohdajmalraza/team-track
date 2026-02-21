import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useTaskContext from "../context/TaskContext";
import { toast } from "react-toastify";
import ConfirmModal from "../components/common/ConfirmModal";
import TaskFormModal from "../components/modals/TaskFormModal";
import TaskDetailsMeta from "../components/taskDetails/TaskDetailsMeta";

function TaskDetailsPage() {
  const [showTaskFormModal, setShowTaskFormModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);

  const { id } = useParams();
  const {
    isFetchingTask,
    isTaskMutating,
    currentTaskError,
    currentTask: task,
    getTaskById,
    updateTaskStatus,
  } = useTaskContext();

  const handleBlockConfirm = async () => {
    try {
      await updateTaskStatus(task.id, "Blocked");
      toast.success(`Task blocked successfully`);
      setShowBlockModal(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (id) {
      getTaskById(id);
    }
  }, [id]);

  return (
    <>
      <main>
        {isFetchingTask && (
          <div>
            <div className="card px-3 py-3 mb-3 placeholder-glow">
              <h4 className="placeholder col-4"></h4>
              <div className="py-2">
                <span className="placeholder col-2"></span>
              </div>
            </div>

            <div className="row placeholder-glow">
              <div className="py-2 card">
                <h5 className="card-header placeholder col-2"></h5>

                <div className="card-body col-md-3">
                  <div className="placeholder col-12"></div>
                  <div className="placeholder col-12"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!isFetchingTask && currentTaskError && (
          <div className="alert alert-danger">{currentTaskError}</div>
        )}

        {!isFetchingTask && !currentTaskError && task && (
          <TaskDetailsMeta
            task={task}
            isTaskMutating={isTaskMutating}
            isFetchingTask={isFetchingTask}
            setShowTaskFormModal={setShowTaskFormModal}
            setShowBlockModal={setShowBlockModal}
          />
        )}

        <TaskFormModal
          show={showTaskFormModal}
          mode="edit"
          taskToEdit={task}
          onClose={() => setShowTaskFormModal(false)}
        />

        <ConfirmModal
          show={showBlockModal}
          title="Block Task?"
          message="This task will be marked as blocked. You can resume it later."
          confirmText="Yes, Block Task"
          cancelText="Cancel"
          onConfirm={handleBlockConfirm}
          onCancel={() => setShowBlockModal(false)}
          isLoading={isTaskMutating}
        />
      </main>
    </>
  );
}

export default TaskDetailsPage;
