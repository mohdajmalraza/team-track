import { Outlet } from "react-router-dom";
import TopNavbar from "./TopNavbar";
import MobileSidebar from "./MobileSidebar";
import Sidebar from "./Sidebar";
import NewProjectModal from "../modals/NewProjectModal";

function DashboardLayout() {
  return (
    <>
      <MobileSidebar />

      <main className="row m-0">
        <Sidebar />

        <div className="col-md-9 col-lg-10 px-4 py-3 min-vh-100 bg-light">
          <TopNavbar />
          <Outlet />
        </div>
      </main>

      <NewProjectModal />
    </>
  );
}

export default DashboardLayout;
