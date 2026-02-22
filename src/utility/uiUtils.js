export const getStatusBadge = (status) => {
  switch (status?.toLowerCase()) {
    case "in progress":
      return "text-dark bg-warning";
    case "blocked":
      return "text-white bg-danger";
    default:
      return "text-white bg-success";
  }
};

export const getPriorityBadge = (priority) => {
  switch (priority) {
    case "High":
      return "text-white bg-danger";
    case "Medium":
      return "text-dark bg-warning";
    default:
      return "text-white bg-success";
  }
};
