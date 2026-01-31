import React from "react";
import "./SkeletonLoader.css";

function SkeletonLoader() {
  return (
    <div className="skeleton-container">
      <div className="skeleton-header">
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-toggle"></div>
      </div>

      <div className="skeleton-search">
        <div className="skeleton skeleton-input"></div>
        <div className="skeleton skeleton-button"></div>
      </div>

      <div className="skeleton-main">
        <div className="skeleton skeleton-city"></div>
        <div className="skeleton skeleton-date"></div>

        <div className="skeleton-temp-section">
          <div className="skeleton skeleton-icon"></div>
          <div className="skeleton skeleton-temp"></div>
        </div>

        <div className="skeleton-grid">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton skeleton-card"></div>
          ))}
        </div>

        <div className="skeleton-sun">
          {[1, 2].map((i) => (
            <div key={i} className="skeleton skeleton-sun-card"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SkeletonLoader;
