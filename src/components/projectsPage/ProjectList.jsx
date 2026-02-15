import { Link } from "react-router-dom";
import useProjectContext from "../../context/ProjectContext";
import ProjectCard from "../common/ProjectCard";

function ProjectList() {
  const { projects } = useProjectContext();

  return (
    <div className="row">
      {projects.map((project) => (
        <Link
          key={project.id}
          to={`/projects/${project.id}`}
          className="col-sm-6 col-lg-4 text-decoration-none mb-3 project-link"
        >
          <ProjectCard project={project} />
        </Link>
      ))}
    </div>
  );
}

export default ProjectList;
