import { PiMicrosoftTeamsLogoBold } from "react-icons/pi";

function TeamsEmptyState({ onCreateTeam }) {
  return (
    <div className="py-5 d-flex justify-content-center align-items-center">
      <div className="col-8 col-md-6 p-5 text-center bg-white shadow-sm rounded-4">
        <div className="mb-4 text-info">
          <PiMicrosoftTeamsLogoBold size={45} />
        </div>

        <h4 className="fw-bold">No Teams Yet</h4>

        <p className="text-muted mb-4">
          Teams help you organize members and collaborate efficiently. Create
          your first team to get started.
        </p>

        <button
          className="btn btn-info text-white fw-semibold"
          onClick={onCreateTeam}
        >
          + Create Team
        </button>
      </div>
    </div>
  );
}

export default TeamsEmptyState;
