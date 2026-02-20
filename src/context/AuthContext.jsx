import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext();

const useAuthContext = () => useContext(AuthContext);
export default useAuthContext;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Validate token & fetch current user
  const checkAuth = async (existingToken) => {
    const authToken = existingToken || localStorage.getItem("token");

    if (!authToken) {
      setUser(null);
      setToken(null);
      setIsLoading(false);
      return;
    }

    try {
      const res = await axiosInstance.get("/api/auth/me", {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setUser(res.data.user);
      setToken(authToken);
    } catch (error) {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async ({ name, email, password }) => {
    await axiosInstance.post("/api/auth/signup", { name, email, password });
  };

  // auto-login after signup
  // const signup = async ({ name, email, password }) => {
  //   await axiosInstance.post("/auth/signup", { name, email, password });
  //   await login(email, password); // reuse login logic
  // };

  const login = async (email, password) => {
    setIsLoading(true);

    const res = await axiosInstance.post("/api/auth/login", {
      email,
      password,
    });

    const receivedToken = res.data.token;
    localStorage.setItem("token", receivedToken);

    await checkAuth(receivedToken); // Validate token with backend and sync authenticated user state
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    // setIsLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
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
