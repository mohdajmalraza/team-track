import { useState } from "react";
import useTeamContext from "../context/TeamContext";
import TeamList from "../components/teams/TeamList";
import TeamsHeader from "../components/teams/TeamsHeader";
import TeamFormModal from "../components/modals/TeamFormModal";
import TeamsEmptyState from "../components/teams/TeamsEmptyState";
import TeamsErrorState from "../components/teams/TeamsErrorState";

function TeamsPage() {
  const [showTeamFormModal, setShowTeamFormModal] = useState(false);
  const { teams, loading, error, getTeams } = useTeamContext();

  return (
    <>
      <main>
        <TeamsHeader onCreateTeam={() => setShowTeamFormModal(true)} />

        {loading && <p className="text-center mt-5">Loading teams...</p>}

        {!loading && error && (
          <TeamsErrorState message={error} onRetry={getTeams} />
        )}

        {!loading && !error && teams.length === 0 && (
          <TeamsEmptyState onCreateTeam={() => setShowTeamFormModal(true)} />
        )}

        {!loading && !error && teams.length > 0 && <TeamList teams={teams} />}

        <TeamFormModal
          show={showTeamFormModal}
          onClose={() => setShowTeamFormModal(false)}
        />
      </main>
    </>
  );
}

export default TeamsPage;
