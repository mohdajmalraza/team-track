import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext();

const useAuthContext = () => useContext(AuthContext);
export default useAuthContext;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const res = await axiosInstance.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(res.data.user);
    } catch (error) {
      setUser(null);
      localStorage.removeItem("token");
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async ({ name, email, password }) => {
    await axiosInstance.post("/auth/signup", { name, email, password });
  };

  // auto-login after signup
  // const signup = async ({ name, email, password }) => {
  //   await axiosInstance.post("/auth/signup", { name, email, password });
  //   await login(email, password); // reuse login logic
  // };

  const login = async (email, password) => {
    const res = await axiosInstance.post("/auth/login", { email, password });

    localStorage.setItem("token", res.data.token);
    await checkAuth(); // Validate token with backend and sync authenticated user state
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setIsLoading(false);
    setUser(null);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
