
import { useNavigate } from "react-router-dom";
import "./activities.css";

function Activities() {
  const navigate = useNavigate();

  const activities = [
    {
      title: "Morning Walk",
      location: "Outdoor Cardio",
      desc: "Track your daily walking steps and calories burned.",
      img: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5",
    },
    {
      title: "Gym Workout",
      location: "Strength Training",
      desc: "Monitor your weight training sessions.",
      img: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1",
    },
    {
      title: "Yoga Session",
      location: "Flexibility",
      desc: "Improve flexibility and reduce stress.",
      img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
    },
    {
      title: "Cycling",
      location: "Endurance",
      desc: "Track cycling distance and performance.",
      img: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8",
    },
    {
      title: "Healthy Diet",
      location: "Nutrition",
      desc: "Log meals and calories intake.",
      img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
    },
    {
      title: "Meditation",
      location: "Mental Health",
      desc: "Daily mindfulness tracking.",
      img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    },
    {
      title: "Sleep Tracking",
      location: "Recovery",
      desc: "Monitor sleep cycle and quality.",
      img: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6",
    },
    {
      title: "Water Intake",
      location: "Hydration",
      desc: "Track daily water consumption.",
      img: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d",
    },
  ];

  return (
    <section className="activities">
      <div className="activities-header">
        <h2>Featured Activities</h2>
        <span>Track your daily health progress</span>
      </div>

      <div className="activity-grid">
        {activities.map((item, index) => (
          <div key={index} className="activity-card">
            <img src={item.img} alt={item.title} />
            <div className="activity-content">
              <h3>{item.title}</h3>
              <p className="location">{item.location}</p>
              <p>{item.desc}</p>

              <button
                className="visit-btn"
                onClick={() => navigate("/features")}
              >
                click hear →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Activities;
