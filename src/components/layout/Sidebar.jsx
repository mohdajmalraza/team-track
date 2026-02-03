import { NavLink } from "react-router-dom";
import logoImage from "../../assets/logo.png";
import { MdOutlineDashboard } from "react-icons/md";
import { GoProjectSymlink } from "react-icons/go";
import { HiOutlineUsers } from "react-icons/hi2";
import { LiaChartBarSolid } from "react-icons/lia";
import { LuSettings } from "react-icons/lu";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `nav-link d-flex align-items-center gap-2 text-dark rounded px-3 ${isActive ? "text-white bg-info" : ""}`;

  return (
    <aside className="col-md-3 col-lg-2 d-none d-md-flex flex-column align-items-center min-vh-100 py-3 border-end fw-semibold">
      {/* Logo */}
      <div className="mb-3 w-75">
        <img src={logoImage} alt="Team-Track-logo" className="img-fluid" />
      </div>

      {/* Navigation */}
      <ul className="nav nav-pills flex-column gap-1 w-100">
        <li className="nav-item">
          <NavLink to="/dashboard" className={linkClass}>
            <MdOutlineDashboard size={20} />
            <span className="text-truncate">Dashboard</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/projects" className={linkClass}>
            <GoProjectSymlink size={20} />
            <span>Projects</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/teams" className={linkClass}>
            <HiOutlineUsers size={20} />
            <span>Teams</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/reports" className={linkClass}>
            <LiaChartBarSolid size={20} />
            <span>Reports</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/settings" className={linkClass}>
            <LuSettings size={20} />
            <span>Settings</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
