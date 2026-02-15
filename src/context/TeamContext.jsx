import { createContext, useContext, useEffect, useState } from "react";
import useAuthContext from "./AuthContext";
import axiosInstance from "../api/axiosInstance";

const TeamContext = createContext();

const useTeamContext = () => useContext(TeamContext);
export default useTeamContext;

export function TeamProvider({ children }) {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isAuthenticated } = useAuthContext();

  const fetchTeams = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      setTeams([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await axiosInstance.get("/api/teams", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTeams(res.data.teams);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch teams");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchTeams();
    }
  }, [isAuthenticated]);

  return (
    <TeamContext.Provider value={{ teams, loading, error }}>
      {children}
    </TeamContext.Provider>
  );
}
