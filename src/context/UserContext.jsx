import { createContext, useContext, useEffect, useState } from "react";
import useAuthContext from "./AuthContext";
import axiosInstance from "../api/axiosInstance";

const UserContext = createContext();

const useUserContext = () => useContext(UserContext);
export default useUserContext;

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isAuthenticated } = useAuthContext();

  const getUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      setUsers([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await axiosInstance.get("/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data.users);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getUser();
    }
  }, [isAuthenticated]);

  return (
    <UserContext.Provider value={{ users, loading, error }}>
      {children}
    </UserContext.Provider>
  );
}
