import Sidebar from "../components/layout/Sidebar";
import MobileSidebar from "../components/layout/MobileSidebar";
import TopNavbar from "../components/dashboard/TopNavbar";
import ProjectsSection from "../components/dashboard/ProjectsSection";
import TasksSection from "../components/dashboard/TasksSection";
import NewProjectModal from "../components/dashboard/NewProjectModal";
import NewTaskModal from "../components/dashboard/NewTaskModal";

function DashboardPage() {
  return (
    <>
      <MobileSidebar />

      <main className="row m-0">
        <Sidebar />

        <div className="col-md-9 col-lg-10 px-4 py-3 min-vh-100 bg-light">
          <TopNavbar />
          <ProjectsSection />
          <TasksSection />
        </div>
      </main>

      <NewProjectModal />
      <NewTaskModal />
    </>
  );
}

export default DashboardPage;
