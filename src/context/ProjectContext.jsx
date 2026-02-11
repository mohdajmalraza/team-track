import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const ProjectContext = createContext();

const useProjectContext = () => useContext(ProjectContext);
export default useProjectContext;

export function ProjectProvider({ children }) {
  // const { isAuthenticated } = useAuthContext();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

      const res = await axiosInstance.get("/projects", {
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
      const res = await axiosInstance.post("/projects", data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProjects((prev) => [...prev, res.data.project]);
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Project creation failed",
      );
    }
  };

  // const searchProjects = async (searchQuery) => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     setProjects([]);
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     const res = await axiosInstance.get(`/projects/search`, {
  //       params: { query: searchQuery },
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     setProjects(res.data.projects);
  //   } catch (error) {
  //     setError(error.reponse?.data?.message || "Failed to search projects");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     fetchProjects({ sortBy: "createdAt", order: "desc", limit: 3 });
  //   }
  // }, [isAuthenticated]);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading,
        error,
        fetchProjects,
        createProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
