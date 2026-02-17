import useAuthContext from "../../context/AuthContext";
import { NavLink } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { GoProjectSymlink } from "react-icons/go";
import { FaTasks } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi2";
import { LiaChartBarSolid } from "react-icons/lia";
import { LuSettings } from "react-icons/lu";

function MobileSidebar() {
  const { user } = useAuthContext();

  const linkClass = ({ isActive }) =>
    `nav-link text-dark d-flex align-items-center gap-2 ${isActive ? "text-white bg-info" : ""}`;

  return (
    <div
      className="offcanvas offcanvas-start w-50 fw-semibold bg-primary-subtle"
      tabIndex="-1"
      id="mobileSidebar"
    >
      <div className="offcanvas-body">
        <div className="mb-3 d-flex gap-1 align-items-center">
          <span
            className="bg-dark text-light border rounded-circle d-flex justify-content-center align-items-center"
            style={{ width: "32px", height: "32px" }}
          >
            {user.name.split(" ").map((w) => w.charAt(0))}
          </span>
          <span className="fw-semibold">{user.name.split(" ").join(" ")}</span>
        </div>

        <ul className="nav nav-pills flex-column gap-1">
          <li className="nav-item">
            <NavLink to="/dashboard" className={linkClass}>
              <MdOutlineDashboard size={20} />
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/projects" className={linkClass}>
              <GoProjectSymlink size={20} />
              <span>Projects</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/tasks" className={linkClass}>
              <FaTasks size={20} />
              <span>Tasks</span>
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
      </div>
    </div>
  );
}

export default MobileSidebar;
