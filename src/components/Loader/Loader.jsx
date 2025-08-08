import React from "react";
import "./Loader.css";

function Loader({ label = "Fetching wisdom...", className = "" }) {
  return (
    <div
      className={`loader ${className}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="spinner">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
      <span className="loader-label">{label}</span>
    </div>
  );
}

export default Loader;
