import { NavLink } from "react-router-dom";
import logoImage from "../../assets/logo.png";
import { MdOutlineDashboard } from "react-icons/md";
import { GoProjectSymlink } from "react-icons/go";
import { HiOutlineUsers } from "react-icons/hi2";
import { LiaChartBarSolid } from "react-icons/lia";
import { LuSettings } from "react-icons/lu";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `nav-link text-dark d-flex align-items-center gap-2 ${isActive ? "text-white bg-info" : ""}`;

  return (
    <aside className="col-md-2 d-flex flex-column vh-100 p-3 border-end fw-semibold bg-primary-subtle">
      {/* Logo */}
      <div className="d-flex align-items-center mb-4">
        <img src={logoImage} alt="Team-Track-logo" className="img-fluid" />
      </div>

      {/* Navigation */}
      <ul className="nav nav-pills flex-column gap-1">
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
