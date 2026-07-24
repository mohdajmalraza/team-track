import { useEffect } from "react";

import useSettingsContext from "../context/SettingsContext.jsx";
import useAuthContext from "../context/AuthContext";

import SettingsHeader from "../components/settings/SettingsHeader";
import ProfileSettingsCard from "../components/settings/ProfileSettingsCard";
import PasswordSettingsCard from "../components/settings/PasswordSettingsCard";
import AccountSummaryCard from "../components/settings/AccountSummaryCard.jsx";
import SettingsSkeleton from "../components/settings/SettingsSkeleton";
import SettingsErrorState from "../components/settings/SettingsErrorState";

function SettingsPage() {
  const { accountSummary, isFetchingSummary, summaryError, getAccountSummary } =
    useSettingsContext();

  const { user } = useAuthContext();

  useEffect(() => {
    getAccountSummary();
  }, []);

  if (isFetchingSummary) {
    return (
      <main className="container-fluid">
        <SettingsHeader />
        <SettingsSkeleton />
      </main>
    );
  }

  if (summaryError) {
    return (
      <main className="container-fluid">
        <SettingsHeader />
        <SettingsErrorState
          message={summaryError}
          onRetry={getAccountSummary}
        />
      </main>
    );
  }

  return (
    <main className="container-fluid">
      <SettingsHeader />

      <div className="row g-4">
        <div className="col-lg-6">
          <ProfileSettingsCard profile={user} />
        </div>

        <div className="col-lg-6">
          <PasswordSettingsCard />
        </div>

        <div className="col-12">
          <AccountSummaryCard summary={accountSummary} />
        </div>
      </div>
    </main>
  );
}

export default SettingsPage;
