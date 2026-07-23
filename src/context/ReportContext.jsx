import { createContext, useContext, useEffect, useState } from "react";
import useAuthContext from "./AuthContext";
import axiosInstance from "../api/axiosInstance";

const ReportContext = createContext();

const useReportContext = () => useContext(ReportContext);
export default useReportContext;

export function ReportProvider({ children }) {
  const { token, isAuthenticated } = useAuthContext();

  const [lastWeekReport, setLastWeekReport] = useState(null);
  const [pendingReport, setPendingReport] = useState(null);
  const [closedTasksReport, setClosedTasksReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getReports = async () => {
    if (!token) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const requestConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const [lastWeekRes, pendingRes, closedTasksRes] = await Promise.all([
        axiosInstance.get("/api/report/last-week", requestConfig),
        axiosInstance.get("/api/report/pending", requestConfig),
        axiosInstance.get("/api/report/closed-tasks", requestConfig),
      ]);

      setLastWeekReport(lastWeekRes.data);
      setPendingReport(pendingRes.data);
      setClosedTasksReport(closedTasksRes.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setLastWeekReport(null);
      setPendingReport(null);
      setClosedTasksReport(null);
      setLoading(false);
      setError(null);
      return;
    }

    getReports();
  }, [isAuthenticated]);

  return (
    <ReportContext.Provider
      value={{
        lastWeekReport,
        pendingReport,
        closedTasksReport,
        loading,
        error,
        getReports,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
}
