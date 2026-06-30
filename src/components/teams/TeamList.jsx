import TeamCard from "./TeamCard";

function TeamList({ teams }) {
  return (
    <div>
      <>
        <div className="row">
          {teams?.map((team) => (
            <div key={team.id} className="col-md-4 mb-3">
              <TeamCard team={team} />
            </div>
          ))}
        </div>
      </>
    </div>
  );
}

export default TeamList;
