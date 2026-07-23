import {
  WeeklyBarChart,
  DoughnutReport,
  PieReport,
  PendingBarChart,
} from "../components/Reports/Charts";
import ReportSkeleton from "../components/Reports/ReportSkeleton";
import useReportContext from "../context/ReportContext";

const getLastSevenDays = () => {
  const days = [];

  for (let index = 6; index >= 0; index -= 1) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - index);
    days.push(date);
  }
  return days;
};

function ReportsPage() {
  const {
    lastWeekReport,
    pendingReport,
    closedTasksReport,
    loading,
    error,
    getReports,
  } = useReportContext();

  if (loading) {
    return <ReportSkeleton />;
  }

  if (error) {
    return (
      <main>
        <div className="alert alert-danger d-flex justify-content-between align-items-center gap-3">
          <span>{error}</span>
          <button className="btn btn-outline-danger" onClick={getReports}>
            Retry
          </button>
        </div>
      </main>
    );
  }

  const completedTasks = lastWeekReport?.tasks || [];
  const closedByTeam = closedTasksReport?.report?.closedTasksByTeam || [];
  const closedByOwner = closedTasksReport?.report?.closedTasksByOwner || [];
  const closedByProject = closedTasksReport?.report?.closedTasksByProject || [];
  const totalCompleted = lastWeekReport?.totalCompletedTasks || 0;
  const totalPendingDays = pendingReport?.totalPendingDays || 0;
  const pendingByProject = pendingReport?.pendingByProject || [];
  const totalClosed = closedTasksReport?.report?.totalClosedTasks || 0;
  const days = getLastSevenDays();
  const completedByDay = days.map(
    (day) =>
      completedTasks.filter((task) => {
        const updatedAt = new Date(task.updatedAt);
        return updatedAt.toDateString() === day.toDateString();
      }).length,
  );
  const dateLabels = days.map((day) =>
    day.toLocaleDateString(undefined, { weekday: "short" }),
  );

  return (
    <main>
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-3">
        <div>
          <h2 className="fw-bold mb-1">Reports</h2>
          <p className="text-muted mb-0">
            Track progress across your workspace.
          </p>
        </div>
        <span className="badge text-bg-light border text-secondary px-3 py-2">
          Last 7 days
        </span>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted fw-semibold mb-2">Completed last week</p>
              <h3 className="fw-bold mb-0">{totalCompleted}</h3>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted fw-semibold mb-2">Pending work</p>
              <h3 className="fw-bold mb-0">{totalPendingDays} days</h3>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted fw-semibold mb-2">Total closed tasks</p>
              <h3 className="fw-bold mb-0">{totalClosed}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-xl-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="fw-bold mb-1">Total work completed last week</h5>
              <p className="text-muted small mb-3">Completed tasks by day</p>
              <div style={{ height: "270px" }}>
                <WeeklyBarChart labels={dateLabels} values={completedByDay} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="fw-bold mb-1">Tasks closed by each team</h5>
              <p className="text-muted small mb-3">
                Distribution of completed tasks
              </p>
              <div
                className="d-flex justify-content-center"
                style={{ height: "270px" }}
              >
                <DoughnutReport items={closedByTeam} labelKey="team" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="fw-bold mb-1">Tasks closed by each owner</h5>
              <p className="text-muted small mb-3">
                Distribution of completed tasks
              </p>
              <div
                className="d-flex justify-content-center"
                style={{ height: "280px" }}
              >
                <PieReport items={closedByOwner} labelKey="owner" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="fw-bold mb-1">Tasks closed by each project</h5>
              <p className="text-muted small mb-3">
                Distribution of completed tasks
              </p>
              <div
                className="d-flex justify-content-center"
                style={{ height: "280px" }}
              >
                <PieReport items={closedByProject} labelKey="project" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="fw-bold mb-1">Pending work across projects</h5>
              <p className="text-muted small mb-3">
                Total estimated work remaining: {totalPendingDays} days
              </p>
              <div style={{ height: "280px" }}>
                <PendingBarChart
                  labels={
                    pendingByProject.length
                      ? pendingByProject.map((item) => item.project)
                      : ["All Projects"]
                  }
                  values={
                    pendingByProject.length
                      ? pendingByProject.map((item) => item.pendingDays)
                      : [totalPendingDays]
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ReportsPage;
