// LoadingSpinnerModal.js
import React from "react";
import "./Loadingspinner.css"; // Import CSS for styling

const LoadingSpinner = ({ show }) => {
    return (
        <div className="modal" style={{ display: show ? "block" : "none" }}>
            <div className="modal-content">
                <div className="spinner"></div>
                <p>Processing...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;
