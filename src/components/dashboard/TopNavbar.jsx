import { IoIosSearch } from "react-icons/io";
import { GiHamburgerMenu, GiPowerButton } from "react-icons/gi";
import mobileLogo from "../../assets/mobile-logo.png";
import useAuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function TopNavbar() {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="mb-4">
      {/* Mobile View */}
      <div className="d-md-none d-flex justify-content-between align-items-center gap-2">
        <div className="d-flex align-items-center">
          <div>
            <button
              className="btn btn-sm btn-outline-info "
              data-bs-toggle="offcanvas"
              data-bs-target="#mobileSidebar"
            >
              <GiHamburgerMenu size={20} />
            </button>
          </div>

          <div
            className="px-1 d-flex justify-content-center align-items-center"
            style={{ width: "50px" }}
          >
            <img src={mobileLogo} alt="Team-Track-logo" className="img-fluid" />
          </div>
        </div>

        <div className="w-100">
          <div className="input-group input-group-sm">
            <span className="input-group-text bg-white">
              <IoIosSearch />
            </span>
            <input type="text" className="form-control" placeholder="Search" />
          </div>
        </div>

        <div>
          <button
            className="btn btn-sm btn-outline-danger px-1 d-flex gap-1 align-items-center"
            onClick={handleLogout}
          >
            <GiPowerButton size={20} />
          </button>
        </div>
      </div>

      {/* Desktop View */}
      <div className="w-100 d-none d-md-flex justify-content-between align-items-center">
        <div className="col-sm-8">
          <div className="input-group">
            <span className="input-group-text bg-white">
              <IoIosSearch />
            </span>
            <input type="text" className="form-control" placeholder="Search" />
          </div>
        </div>

        <div>
          <button
            className="btn btn-outline-danger d-flex gap-1 align-items-center"
            onClick={handleLogout}
          >
            <GiPowerButton size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default TopNavbar;
