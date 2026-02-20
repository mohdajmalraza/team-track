import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import useAuthContext from "./AuthContext";

const TaskContext = createContext();

const useTaskContext = () => useContext(TaskContext);
export default useTaskContext;

export function TaskProvider({ children }) {
  const { token, isAuthenticated } = useAuthContext();

  // LIST STATE
  const [taskList, setTaskList] = useState([]);
  const [isFetchingTasks, setIsFetchingTasks] = useState(true);
  const [taskListError, setTaskListError] = useState(null);

  // SINGLE TASK STATE
  const [currentTask, setCurrentTask] = useState(null);
  const [isFetchingTask, setIsFetchingTask] = useState(false);
  const [currentTaskError, setCurrentTaskError] = useState(null);

  // MUTATION STATE
  const [isTaskMutating, setIsTaskMutating] = useState(false);

  async function getTasks(filters) {
    if (!token) return;

    try {
      setIsFetchingTasks(true);
      setTaskListError(null);

      const res = await axiosInstance.get("/api/tasks", {
        params: filters,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTaskList(res.data?.tasks || []);
    } catch (error) {
      setTaskListError(
        error.response?.data?.message || "Failed to fetch tasks",
      );
    } finally {
      setIsFetchingTasks(false);
    }
  }

  const createTask = async (data) => {
    if (!token) return;

    try {
      setIsTaskMutating(true);

      const res = await axiosInstance.post("/api/tasks", data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTaskList((prev) => [...prev, res.data.task]);
    } catch (error) {
      throw new Error(error.response?.data?.message || "Task creation failed");
    } finally {
      setIsTaskMutating(false);
    }
  };

  const getTaskById = async (taskId) => {
    if (!token) return;

    try {
      setIsFetchingTask(true);
      setCurrentTaskError(null);

      const res = await axiosInstance.get(`/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCurrentTask(res.data?.task);
    } catch (error) {
      setCurrentTaskError(
        error.response?.data?.message || "Failed to get the task",
      );
    } finally {
      setIsFetchingTask(false);
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    if (!token) return;

    try {
      setIsTaskMutating(true);

      const res = await axiosInstance.patch(
        `/api/tasks/${taskId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setCurrentTask(res.data?.task);
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Status updation failed",
      );
    } finally {
      setIsTaskMutating(false);
    }
  };

  const updateTaskById = async (taskId) => {};

  useEffect(() => {
    if (!isAuthenticated) {
      setTaskList([]);
      setCurrentTask(null);
      return;
    }

    getTasks();
  }, [isAuthenticated]);

  return (
    <TaskContext.Provider
      value={{
        taskList,
        currentTask,
        isFetchingTasks,
        isFetchingTask,
        isTaskMutating,
        taskListError,
        currentTaskError,
        getTasks,
        createTask,
        getTaskById,
        updateTaskStatus,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
