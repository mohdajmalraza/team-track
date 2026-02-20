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

      <div class="modal fade show d-block">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{title}</h5>
              <button
                type="button"
                class="btn-close"
                onClick={onCancel}
              ></button>
            </div>

            <div class="modal-body">
              <p>{message}</p>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                onClick={onCancel}
                disabled={isLoading}
              >
                {cancelText}
              </button>

              <button
                type="button"
                class="btn btn-danger"
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
