import React from "react";
import "./HabitInfoSection.css";

const HabitInfoSection = () => {
  return (
    <section className="habit-section">
      <div className="habit-container">

        <div className="habit-image">
          <img
            src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b"
            alt="Habit Tracking"
          />
        </div>

        <div className="habit-content">
          <p className="habit-subtitle">THE HABIT TRACKING REVOLUTION</p>

          <h2>
            The Future of <br />
            <span>Smart Habit Building</span>
          </h2>

          <p className="habit-description">
            Our Habit Tracking System helps you build powerful daily routines
            with smart reminders, real-time tracking, and detailed reports.
            Consistency creates success — and your growth should be measurable.
          </p>

          <div className="habit-highlight">
            Track daily habits, set weekly or monthly goals, receive reminders,
            and analyze your progress with visual reports — all in one dashboard.
          </div>

          <button
            className="habit-btn"
            onClick={() => alert("Habit Tracking System Page")}
          >
            LEARN OUR SYSTEM →
          </button>
        </div>

      </div>
    </section>
  );
};

export default HabitInfoSection;
