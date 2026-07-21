import { createContext, useContext, useEffect, useState } from "react";
import useAuthContext from "./AuthContext";
import axiosInstance from "../api/axiosInstance";

const TeamContext = createContext();

const useTeamContext = () => useContext(TeamContext);
export default useTeamContext;

export function TeamProvider({ children }) {
  const { token, isAuthenticated } = useAuthContext();

  const [teams, setTeams] = useState([]);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getTeams = async () => {
    if (!token) {
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

  const getTeamById = async (teamId) => {
    if (!token) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await axiosInstance.get(`/api/teams/${teamId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTeam(res.data.team);
    } catch (error) {
      setTeam(null);
      setError(error.response?.data?.message || "Failed to fetch team");
    } finally {
      setLoading(false);
    }
  };

  const createTeam = async (data) => {
    if (!token) return;

    try {
      const res = await axiosInstance.post("/api/teams", data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTeams((prev) => [...prev, res.data.team]);
    } catch (error) {
      throw new Error(error.response?.data?.message || "Team creation failed");
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setTeams([]);
      setTeam(null);
      return;
    }

    getTeams();
  }, [isAuthenticated]);

  return (
    <TeamContext.Provider
      value={{ teams, team, loading, error, getTeams, getTeamById, createTeam }}
    >
      {children}
    </TeamContext.Provider>
  );
}
