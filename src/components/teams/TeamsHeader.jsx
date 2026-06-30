function TeamsHeader({ onCreateTeam }) {
  return (
    <div className="d-flex justify-content-between mb-3">
      <h3>Teams</h3>

      <div>
        <button
          className="btn btn-info text-nowrap text-white fw-semibold"
          onClick={onCreateTeam}
        >
          + New Team
        </button>
      </div>
    </div>
  );
}

export default TeamsHeader;
