import { useEffect } from "react";
import TasksFiltersSection from "../components/common/TasksFilters";
import TasksHeader from "../components/tasks/TasksHeader";
import TasksTable from "../components/tasks/TasksTable";
import useTaskContext from "../context/TaskContext";
import { useSearchParams } from "react-router-dom";

function TasksPage() {
  const { taskList, isFetchingTasks, taskListError, getTasks } =
    useTaskContext();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getTasks(searchParams);
  }, [searchParams]);

  return (
    <>
      <main>
        <TasksHeader />
        <TasksFiltersSection />
        <TasksTable
          tasks={taskList}
          loading={isFetchingTasks}
          error={taskListError}
        />
      </main>
    </>
  );
}

export default TasksPage;
