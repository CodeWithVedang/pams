import "./whychooseus.css";

function WhyChooseUs() {
  return (
    <section className="why-section">
      <div className="why-header">
        <h2>Why Choose HealthSync</h2>
        <p>Your complete personal health monitoring companion</p>
      </div>

      <div className="why-grid">
        <div className="why-card">
          <div className="why-icon">🔒</div>
          <h3>Secure Data</h3>
          <p>
            Your health data is encrypted and stored safely
            with complete privacy protection.
          </p>
        </div>

        <div className="why-card">
          <div className="why-icon">📊</div>
          <h3>Real-Time Insights</h3>
          <p>
            Get instant analytics, charts, and weekly
            progress reports.
          </p>
        </div>

        <div className="why-card">
          <div className="why-icon">⏰</div>
          <h3>Smart Reminders</h3>
          <p>
            Never miss workouts, water intake,
            or sleep tracking with notifications.
          </p>
        </div>

        <div className="why-card">
          <div className="why-icon">🎯</div>
          <h3>Goal Tracking</h3>
          <p>
            Set personalized health goals and
            track your improvement daily.
          </p>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;

