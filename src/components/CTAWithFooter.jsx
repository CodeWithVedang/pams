
import React from "react";
import { useNavigate } from "react-router-dom";
import "./CTAWithFooter.css";

const CTAWithFooter = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* ===== CTA SECTION ===== */}
      <section className="cta-section">
        <div className="cta-content">
          <h1>Ready to Start Your Health Journey?</h1>
          <p>
            Take control of your wellness with our Personal Health Monitoring
            System. Track vitals, manage habits, monitor progress, and stay
            consistent with smart reminders — all in one place.
          </p>

          <button
            className="cta-btn"
            onClick={() => navigate("/signup")}
          >
            Join Now →
          </button>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="footer-container">

          <div className="footer-brand">
            <div className="logo-circle">PH</div>
            <h2>Health Monitor</h2>
            <p>
              Your smart companion for tracking health metrics,
              building habits, and achieving long-term wellness goals.
            </p>
          </div>

          <div className="footer-links">
            <h3>Explore</h3>
            <ul>
              <li>Home</li>
              <li>Dashboard</li>
              <li>Habits</li>
              <li>Reports</li>
            </ul>
          </div>

          <div className="footer-links">
            <h3>Features</h3>
            <ul>
              <li>Vital Tracking</li>
              <li>Habit Monitoring</li>
              <li>Reminders</li>
              <li>Monthly Reports</li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          © 2026 Personal Health Monitoring System | All Rights Reserved
        </div>
      </footer>
    </>
  );
};

export default CTAWithFooter;
