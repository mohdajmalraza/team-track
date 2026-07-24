import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import useAuthContext from "./AuthContext";

const SettingsContext = createContext();

const useSettingsContext = () => useContext(SettingsContext);
export default useSettingsContext;

export function SettingsProvider({ children }) {
  const { token, isAuthenticated, setUser } = useAuthContext();

  // ACCOUNT SUMMARY STATE
  const [accountSummary, setAccountSummary] = useState(null);
  const [isFetchingSummary, setIsFetchingSummary] = useState(false);
  const [summaryError, setSummaryError] = useState(null);

  // MUTATION STATE
  const [isSettingsMutating, setIsSettingsMutating] = useState(false);

  const updateProfile = async (data) => {
    if (!token) return;

    try {
      setIsSettingsMutating(true);

      const res = await axiosInstance.patch("/api/users/profile", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data.user);

      return res.data.message;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update profile.",
      );
    } finally {
      setIsSettingsMutating(false);
    }
  };

  const changePassword = async (data) => {
    if (!token) return;

    try {
      setIsSettingsMutating(true);

      const res = await axiosInstance.patch(
        "/api/users/change-password",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return res.data.message;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to change password.",
      );
    } finally {
      setIsSettingsMutating(false);
    }
  };

  const getAccountSummary = async () => {
    if (!token) return;

    try {
      setIsFetchingSummary(true);
      setSummaryError(null);

      const res = await axiosInstance.get("/api/users/account-summary", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAccountSummary(res.data);
    } catch (error) {
      setSummaryError(
        error.response?.data?.message || "Failed to fetch account summary.",
      );
    } finally {
      setIsFetchingSummary(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setAccountSummary(null);
    }
  }, [isAuthenticated]);

  return (
    <SettingsContext.Provider
      value={{
        accountSummary,
        isFetchingSummary,
        summaryError,
        isSettingsMutating,

        updateProfile,
        changePassword,
        getAccountSummary,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
