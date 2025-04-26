export default function LoadingSpinner({ show }) {
    if (!show) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="spinner"></div>
                <p>Processing...</p>
            </div>
        </div>
    );
}
