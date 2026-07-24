import { FaExclamationTriangle } from "react-icons/fa";

function SettingsErrorState({ message, onRetry }) {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "60vh" }}
    >
      <div
        className="card border-0 shadow-sm rounded-4 text-center p-5"
        style={{ maxWidth: "500px" }}
      >
        <div
          className="bg-danger bg-opacity-10 rounded-circle d-inline-flex justify-content-center align-items-center mx-auto mb-4"
          style={{
            width: "80px",
            height: "80px",
          }}
        >
          <FaExclamationTriangle className="text-danger" size={34} />
        </div>

        <h3 className="fw-bold mb-3">Unable to Load Settings</h3>

        <p className="text-muted mb-4">
          {message || "Something went wrong while loading your settings."}
        </p>

        <button
          className="btn btn-info text-white fw-semibold px-4"
          onClick={onRetry}
        >
          Retry
        </button>
      </div>
    </div>
  );
}

export default SettingsErrorState;
