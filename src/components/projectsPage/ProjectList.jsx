import useProjectContext from "../../context/ProjectContext";
import ProjectCard from "../common/ProjectCard";

function ProjectList() {
  const { projects } = useProjectContext();

  return (
    <div className="row">
      {projects.map((project) => (
        <div
          key={project.id}
          className="col-sm-6 col-lg-4 mb-3"
          style={{ height: "190px" }}
        >
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
}

export default ProjectList;
