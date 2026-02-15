import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import useAuthContext from "./AuthContext";

const ProjectContext = createContext();

const useProjectContext = () => useContext(ProjectContext);
export default useProjectContext;

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isAuthenticated } = useAuthContext();

  const fetchProjects = async (queryParams) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      setProjects([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await axiosInstance.get("/api/projects", {
        params: queryParams,
        headers: { Authorization: `Bearer ${token}` },
      });

      setProjects(res.data.projects);
    } catch (error) {
      setError(error.response?.data?.message || "Project fetching failed");
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (data) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    try {
      const res = await axiosInstance.post("/api/projects", data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProjects((prev) => [...prev, res.data.project]);
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Project creation failed",
      );
    }
  };

  const fetchProjectById = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      setProject(null);
    }

    try {
      setLoading(true);
      setError(null);

      const res = await axiosInstance.get(`/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProject(res.data.project);
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch the project",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProjects();
    }
  }, [isAuthenticated]);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        project,
        loading,
        error,
        fetchProjects,
        createProject,
        fetchProjectById,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
