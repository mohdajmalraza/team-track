import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaCalendarAlt, FaPencilAlt, FaPlus } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi2";
import useTeamContext from "../context/TeamContext";
import { formatDate } from "../utility/dateUtils";
import TeamSkeleton from "../components/teams/TeamSkeleton";

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

function TeamDetailsPage() {
  const { id } = useParams();
  const {
    team,
    loading: teamLoading,
    error: teamError,
    getTeamById,
  } = useTeamContext();

  const members = team?.members || [];
  const createdBy =
    typeof team?.createdBy === "object"
      ? team?.createdBy
      : { name: team?.createdBy };
  const createdByName = createdBy?.name || "Unknown";
  const createdAt = team?.createdAt || team?.createdOn;

  useEffect(() => {
    if (id) {
      getTeamById(id);
    }
  }, [id]);

  if (teamLoading) {
    return <TeamSkeleton />;
  }

  if (teamError) {
    return (
      <main>
        <div className="alert alert-danger">
          <strong>Something went wrong!</strong>
          <div className="small">{teamError}</div>
        </div>
      </main>
    );
  }

  if (!team) {
    return (
      <main>
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center py-5 px-3">
            <h5 className="fw-bold">Team not found</h5>
            <p className="text-muted mb-3">
              This team may have been removed or is not available anymore.
            </p>
            <Link to="/teams" className="btn btn-info text-white fw-semibold">
              Back to Teams
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <section className="card border-0 shadow-sm mb-4 overflow-hidden">
        <div className="card-body p-3 p-md-4 d-flex flex-column flex-md-row justify-content-between gap-3 border-bottom">
          <div className="d-flex align-items-center gap-3 min-w-0">
            <h4 className="fw-bold mb-0 text-break">{team.name}</h4>
          </div>

          {/* <div className="d-flex flex-column flex-sm-row flex-md-nowrap gap-2">
            <button className="btn btn-outline-secondary fw-semibold px-3 text-nowrap">
              <FaPencilAlt className="me-2" />
              Edit Team
            </button>
            <button className="btn btn-info text-white fw-semibold px-3 text-nowrap">
              <FaPlus className="me-2" />
              Add Member
            </button>
          </div> */}
        </div>

        <div className="card-body p-3 p-md-4">
          <div className="row align-items-stretch g-4">
            <div className="col-lg-8">
              <h6 className="text-muted fw-bold mb-2">Description</h6>
              <p
                className="text-dark mb-4 mb-md-5"
                style={{ maxWidth: "620px" }}
              >
                {team.description || "No description added for this team."}
              </p>

              <div className="d-flex flex-column flex-sm-row gap-4 gap-sm-5">
                <div className="d-flex align-items-center gap-3 min-w-0">
                  <span
                    className="bg-info-subtle text-info rounded-circle d-inline-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                    style={{ width: "48px", height: "48px" }}
                  >
                    {getInitials(createdByName) || "?"}
                  </span>
                  <div className="min-w-0">
                    <p className="text-muted small fw-semibold mb-1">
                      Created By
                    </p>
                    <p className="fw-bold mb-0 text-break">{createdByName}</p>
                  </div>
                </div>

                <div className="vr d-none d-sm-block"></div>

                <div className="d-flex align-items-center gap-3 min-w-0">
                  <span
                    className="bg-secondary-subtle text-secondary rounded d-inline-flex align-items-center justify-content-center flex-shrink-0"
                    style={{ width: "34px", height: "34px" }}
                  >
                    <FaCalendarAlt />
                  </span>
                  <div className="min-w-0">
                    <p className="text-muted small fw-semibold mb-1">
                      Created At
                    </p>
                    <p className="fw-bold mb-0 text-nowrap">
                      {createdAt ? formatDate(createdAt) : "Not available"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="border rounded-3 p-3 p-sm-4 bg-light-subtle h-100 d-flex align-items-center justify-content-center justify-content-lg-start gap-3 gap-sm-4 text-center text-sm-start">
                <span
                  className="bg-info-subtle text-info rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0"
                  style={{ width: "76px", height: "76px" }}
                >
                  <HiOutlineUsers size={34} />
                </span>
                <div>
                  <p className="text-muted fw-semibold mb-2">Total Members</p>
                  <h3 className="fw-bold mb-0">{members.length}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default TeamDetailsPage;
