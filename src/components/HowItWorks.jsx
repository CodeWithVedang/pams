import "./howitworks.css";

function HowItWorks() {
  return (
    <section className="how-section">
      <div className="how-header">
        <h2>How HealthSync Works</h2>
        <p>Monitor your health in three simple steps</p>
      </div>

      <div className="how-steps">
        <div className="step-card">
          <div className="step-icon">📊</div>
          <h3>Step 1: Add Metrics</h3>
          <p>
            Enter your daily health data like steps, sleep hours,
            water intake, and calories.
          </p>
        </div>

        <div className="step-card">
          <div className="step-icon">📈</div>
          <h3>Step 2: Track Progress</h3>
          <p>
            Visualize your performance with real-time charts
            and weekly reports.
          </p>
        </div>

        <div className="step-card">
          <div className="step-icon">🎯</div>
          <h3>Step 3: Achieve Goals</h3>
          <p>
            Set health goals and stay consistent with smart
            reminders and insights.
          </p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;

