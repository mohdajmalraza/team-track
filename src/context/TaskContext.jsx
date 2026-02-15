import { createContext, useContext, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const TaskContext = createContext();

const useTaskContext = () => useContext(TaskContext);
export default useTaskContext;

export function TaskProvider({ children }) {
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

      const res = await axiosInstance.get("/api/tasks", {
        params: filters,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data.tasks);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch tasks");
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
      const res = await axiosInstance.post("/api/tasks", data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks((prev) => [...prev, res.data.task]);
    } catch (error) {
      throw new Error(error.response?.data?.message || "Task creation failed");
    }
  };

  return (
    <TaskContext.Provider
      value={{ tasks, loading, error, fetchTasks, createTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}
