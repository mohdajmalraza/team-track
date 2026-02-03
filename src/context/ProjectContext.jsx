import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const ProjectContext = createContext();

const useProjectContext = () => useContext(ProjectContext);
export default useProjectContext;

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axiosInstance.get("/projects");
      setProjects(res.data.projects);
    } catch (error) {
      setError(error.response?.data?.message || "Project fetching failed");
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (data) => {
    try {
      const res = await axiosInstance.post("/projects", data);

      setProjects((prev) => [...prev, res.data.project]);
      return res.data.project;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Project creation failed",
      );
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectContext.Provider
      value={{ projects, loading, error, createProject }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
