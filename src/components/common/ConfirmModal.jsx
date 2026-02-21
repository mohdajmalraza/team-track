function ConfirmModal({
  show,
  title = "Confirm Action",
  message = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  isLoading = false,
}) {
  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop fade show"></div>

      <div className="modal fade show d-block">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onCancel}
              ></button>
            </div>

            <div className="modal-body">
              <p>{message}</p>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCancel}
                disabled={isLoading}
              >
                {cancelText}
              </button>

              <button
                type="button"
                className="btn btn-danger"
                onClick={onConfirm}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmModal;
