function TeamsErrorState({ message, onRetry }) {
  return (
    <div className="py-5 d-flex justify-content-center align-items-center">
      <div className="col-8 col-md-6 p-5 text-center bg-white shadow-sm rounded-4 border border-danger-subtle">
        <div className="mb-3 text-danger fs-1">⚠️</div>

        <h5 className="fw-bold text-danger">Something went wrong</h5>

        <p className="text-muted mb-4">
          {message || "We couldn't load your teams. Please try again."}
        </p>

        <button
          className="btn btn-outline-danger fw-semibold"
          onClick={onRetry}
        >
          Retry
        </button>
      </div>
    </div>
  );
}

export default TeamsErrorState;
