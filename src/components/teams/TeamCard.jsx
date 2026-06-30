import { Link } from "react-router-dom";

function TeamCard({ team }) {
  return (
    <Link
      to={`/teams/${team.id}`}
      className="project-link text-decoration-none"
    >
      <div className="card project-link h-100 border-0 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{team.name}</h5>

          <div className="card-text ">{team?.members?.length} Member</div>

          <div className="card-text">
            <span className="fw-semibold text-muted">Created By: </span>
            <span className="text-dark fw-semibold">{team?.createdBy}</span>
          </div>

          <div className="line-clamp-2">{team.description}</div>
        </div>
      </div>
    </Link>
  );
}

export default TeamCard;
