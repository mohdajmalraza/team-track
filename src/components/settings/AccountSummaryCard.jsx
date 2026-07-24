import {
  FaFolder,
  FaUsers,
  FaTasks,
  FaCheckCircle,
  FaCalendarAlt,
} from "react-icons/fa";

function AccountSummaryCard({ summary }) {
  const stats = [
    {
      title: "Projects",
      value: summary?.projectsCreated,
      icon: <FaFolder />,
      bg: "bg-primary",
    },
    {
      title: "Teams",
      value: summary?.teamsCreated,
      icon: <FaUsers />,
      bg: "bg-success",
    },
    {
      title: "Assigned Tasks",
      value: summary?.tasksAssigned,
      icon: <FaTasks />,
      bg: "bg-warning",
    },
    {
      title: "Completed Tasks",
      value: summary?.tasksCompleted,
      icon: <FaCheckCircle />,
      bg: "bg-info",
    },
    {
      title: "Member Since",
      value: new Date(summary?.memberSince).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      icon: <FaCalendarAlt />,
      bg: "bg-secondary",
    },
  ];

  return (
    <div className="card border-0 shadow-sm rounded-4">
      <div className="card-body p-4">
        <h4 className="fw-semibold mb-1">Account Summary</h4>

        <p className="text-muted mb-4">Overview of your TeamTrack activity.</p>

        <div className="row g-4">
          {stats.map((item) => (
            <div className="col-md-6 col-lg" key={item.title}>
              <div className="border rounded-4 p-3 text-center h-100">
                <div
                  className={`${item.bg} text-white rounded-circle d-inline-flex justify-content-center align-items-center mb-3`}
                  style={{
                    width: 55,
                    height: 55,
                  }}
                >
                  {item.icon}
                </div>

                <h4 className="fw-bold">{item.value}</h4>

                <small className="text-muted">{item.title}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AccountSummaryCard;
