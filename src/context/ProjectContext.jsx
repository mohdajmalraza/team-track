import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import useAuthContext from "./AuthContext";

const ProjectContext = createContext();

const useProjectContext = () => useContext(ProjectContext);
export default useProjectContext;

export function ProjectProvider({ children }) {
  const { token, isAuthenticated } = useAuthContext();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [project, setProject] = useState(null);

  const [isProjectMutating, setIsProjectMutating] = useState(false);

  const getProjects = async (queryParams) => {
    if (!token) {
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
    if (!token) {
      return;
    }

    try {
      setIsProjectMutating(true);

      const res = await axiosInstance.post("/api/projects", data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProjects((prev) => [...prev, res.data.project]);
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Unable to create project",
      );
    } finally {
      setIsProjectMutating(false);
    }
  };

  const getProjectById = async (id) => {
    if (!token) {
      return;
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

  const updateProject = async (id, data) => {
    if (!token) {
      return;
    }

    try {
      setIsProjectMutating(true);

      const res = await axiosInstance.patch(`/api/projects/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProjects((prev) =>
        prev.map((proj) => (proj.id === id ? res.data.project : proj)),
      );

      setProject(res.data?.project);

      return res.data.project;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Unable to update project",
      );
    } finally {
      setIsProjectMutating(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setProjects([]);
      setProject(null);
      return;
    }

    // getProjects();
    getProjects({ sortBy: "createdAt", order: "desc", limit: 3 });
  }, [isAuthenticated]);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        project,
        loading,
        isProjectMutating,
        error,
        getProjects,
        createProject,
        getProjectById,
        updateProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
