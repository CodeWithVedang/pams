import "./Habits.css";

import {
  LayoutDashboard,
  Target,
  Calendar,
  BarChart3,
  Settings,
  Droplet,
  Pill,
  Moon,
  ArrowLeft,
  Dumbbell,
  Heart,
  Activity,
  Brain,
  BookOpen,
  Smile,
  CheckCircle,
  Clock,
  Home,
  Users,
  Sun,
  Utensils,
  Flame,
  Footprints,
  Wind,
  Sunrise,
  ListTodo,
  Timer,
  Music,
  Leaf,
  Phone
} from "lucide-react";

import { NavLink, useNavigate, useParams } from "react-router-dom";

export default function HabitCategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();

  const habitData = {
    health: [
      { icon: <Droplet size={36} color="#3b82f6" />, title: "Drinking Water", desc: "8 glasses a day" },
      { icon: <Pill size={36} color="#ef4444" />, title: "Take Vitamins", desc: "Daily supplements" },
      { icon: <Moon size={36} color="#f59e0b" />, title: "Sleep On Time", desc: "Before 11 PM" },
      { icon: <Utensils size={36} color="#f59e0b" />, title: "Healthy Meal", desc: "Eat balanced and nutritious food" },
      { icon: <Flame size={36} color="#f59e0b" />, title: "Track Calories", desc: "Monitor your daily calorie intake" },
    ],

    fitness: [
      { icon: <Dumbbell size={36} color="#22c55e" />, title: "Workout", desc: "30 mins daily" },
      { icon: <Heart size={36} color="#ef4444" />, title: "strength training", desc: "Improve stamina" },
      { icon: <Activity size={36} color="#3b82f6" />, title: "Stretching", desc: "Morning flexibility" },
      { icon: <Footprints size={36} color="#f59e0b" />, title: "Daily Walk", desc: "Walk 5000+ steps" },
      { icon: <yoga size={36} color="#ef4444" />, title: "Yoga", desc: "flexibility, calmness, relaxation" },
    ],

    mindfulness: [
      { icon: <Brain size={36} color="#8b5cf6" />, title: "Meditation", desc: "10 mins daily" },
      { icon: <BookOpen size={36} color="#f59e0b" />, title: "Reading", desc: "Read 20 pages" },
      { icon: <Smile size={36} color="#22c55e" />, title: "Gratitude", desc: "Write 3 things" },
      { icon: <Wind size={36} color="#06b6d4" />, title: "Deep Breathing", desc: "5 mins breathing exercise" },
      { icon: <Sunrise size={36} color="#f97316" />, title: "Morning Reflection", desc: "Start day with clarity" },
    ],

    productivity: [
      { icon: <CheckCircle size={36} color="#22c55e" />, title: "Task Planning", desc: "Plan your day" },
      { icon: <Clock size={36} color="#3b82f6" />, title: "Deep Work", desc: "2 hours focus" },
      { icon: <Target size={36} color="#ef4444" />, title: "Goal Tracking", desc: "Review goals" },
      { icon: <ListTodo size={36} color="#14b8a6" />, title: "Complete Tasks", desc: "Finish daily tasks" },
      { icon: <Timer size={36} color="#6366f1" />, title: "Focus Session", desc: "Work without distraction" },
    ],

   lifestyle: [
  { icon: <Phone size={36} color="#22c55e" />, title: "digital detox", desc: "Keep space organized" },
  { icon: <Users size={36} color="#3b82f6" />, title: "Family Time", desc: "Spend quality time" },
  { icon: <Sun size={36} color="#f59e0b" />, title: "Wake Early", desc: "Start day fresh" },
  { icon: <Music size={36} color="#8b5cf6" />, title: "Relax with Music", desc: "Calm your mind" },
  { icon: <Leaf size={36} color="#10b981" />, title: "Nature Time", desc: "Spend time outdoors" },
],
  };

  const habits = habitData[category?.toLowerCase()] || [];

  // 🔥 FIX FUNCTION (MAIN)
  const formatTitle = (title) => {
    return title.toLowerCase().replace(/\s+/g, "-");
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <div>
          <div className="logo">LifeTrack</div>

          <div className="menu">
            <NavLink to="/dashboard" className="menu-item">
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </NavLink>

            <NavLink to="/habits" className="menu-item active">
              <Target size={18} />
              <span>Habits</span>
            </NavLink>

            <NavLink to="/calendar" className="menu-item">
              <Calendar size={18} />
              <span>Calendar</span>
            </NavLink>

            <NavLink to="/reports" className="menu-item">
              <BarChart3 size={18} />
              <span>Reports</span>
            </NavLink>

            <NavLink to="/settings" className="menu-item">
              <Settings size={18} />
              <span>Settings</span>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="main">
        <div className="header">
          <h2>My Habits</h2>
        </div>

        <div className="content fade-in">
          <div className="category-header">
            <h1>
              {category?.charAt(0).toUpperCase() + category?.slice(1)} Habits
            </h1>

            <div
              className="back-link"
              onClick={() => navigate("/habits")}
            >
              <ArrowLeft size={16} />
              Back to Categories
            </div>
          </div>

          <div className="habit-grid">
            {habits.length > 0 ? (
              habits.map((item, index) => (
                <div
                  key={index}
                  className="habit-card"
                  onClick={() =>
                    navigate(`/habit/${category}/${formatTitle(item.title)}`)
                  }
                  style={{ cursor: "pointer" }}
                >
                  {item.icon}
                  <h3>{item.title}</h3>
                  <p className="habit-desc">{item.desc}</p>
                  <span className="learn-more">Learn more →</span>
                </div>
              ))
            ) : (
              <p>No habits found for this category</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}