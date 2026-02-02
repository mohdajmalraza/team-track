import TopNavbar from "../components/dashboard/TopNavbar";
import Sidebar from "../components/layout/Sidebar";

function DashboardPage() {
  return (
    <main className="row m-0">
      <Sidebar />

      <div className="col-md-10">
        <h2 className="text-center text-danger py-5">
          This page is under progress
        </h2>
        {/* <TopNavbar /> */}
      </div>
    </main>
  );
}

export default DashboardPage;
