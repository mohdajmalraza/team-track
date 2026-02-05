import { createContext, useContext, useEffect, useState } from "react";
import useAuthContext from "./AuthContext";
import axiosInstance from "../api/axiosInstance";

const TaskContext = createContext();

const useTaskContext = () => useContext(TaskContext);
export default useTaskContext;

export function TaskProvider({ children }) {
  const { isAuthenticated } = useAuthContext();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchTasks(filters) {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      setTasks([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await axiosInstance.get("/tasks", {
        params: filters,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data.tasks);
    } catch (error) {
      setError(error.response?.data?.message || "Falied to fetch tasks");
    } finally {
      setLoading(false);
    }
  }

  const createTask = async (data) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    try {
      const res = await axiosInstance.post("/tasks", data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks((prev) => [...prev, res.data.task]);
    } catch (error) {
      throw new Error(error.response?.data?.message || "Task creation failed");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [isAuthenticated]);

  return (
    <TaskContext.Provider
      value={{ tasks, loading, error, fetchTasks, createTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}
