import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ArrowRight, 
  Activity, 
  Shield, 
  Zap, 
  BarChart3, 
  Check, 
  Layers, 
  Bell 
} from "lucide-react";
import { motion } from "framer-motion";

// Landing components

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary-600 text-white flex items-center justify-center shadow-lg">
                <Activity className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-slate-900 tracking-tight">LifeTrack</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <Link to="/features" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">Features</Link>
            </div>

            <div className="flex items-center gap-4">
              <Link to="/login" className="text-slate-700 hover:text-primary-600 font-semibold px-4 py-2 transition-colors">Sign In</Link>
              <Link to="/signup" className="bg-primary-600 hover:bg-primary-700 text-white font-bold px-6 py-2.5 rounded-full shadow-lg shadow-primary-500/25 transition-all transform hover:-translate-y-0.5">
                Join Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-50 rounded-full blur-[120px] opacity-60" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-50 rounded-full blur-[120px] opacity-60" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-primary-700 uppercase bg-primary-50 rounded-full border border-primary-100">
                The #1 Health Track Platform
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8">
                Master Your Habits. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
                  Transfrom Your Life.
                </span>
              </h1>
              <p className="max-w-2xl mx-auto text-xl text-slate-600 mb-10 leading-relaxed">
                Connect your body and mind. Track every metric, build lasting habits, 
                and get AI-powered insights to become your best self.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => navigate("/signup")}
                  className="w-full sm:w-auto px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white text-lg font-bold rounded-2xl shadow-xl shadow-primary-500/20 transition-all flex items-center justify-center gap-2 group"
                >
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex -space-x-2">
                  {["A", "B", "C", "D"].map((n, i) => (
                    <img key={i} className="w-10 h-10 rounded-full ring-4 ring-white shadow-sm" src={`https://ui-avatars.com/api/?name=${n}&background=random&color=fff`} alt="user" />
                  ))}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 ring-4 ring-white text-xs font-bold text-slate-600 shadow-sm relative z-10">
                    +2k
                  </div>
                </div>
                <span className="text-slate-500 font-medium">Trusted by 10k+ users</span>
              </div>
            </motion.div>

            {/* DASHBOARD PREVIEW */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-20 relative px-4"
            >
              <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                  alt="Dashboard Preview" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES GRID */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">Powerful Features</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">Built for high performance and deep insights into your daily life.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Instant Tracking",
                desc: "Log your habits and metrics in seconds with our optimized interface.",
                color: "text-blue-600",
                bg: "bg-blue-50"
              },
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: "Deep Analytics",
                desc: "Visualize your progress over time with clinical-grade charts and reports.",
                color: "text-accent-600",
                bg: "bg-accent-50"
              },
              {
                icon: <Bell className="w-8 h-8" />,
                title: "Smart Reminders",
                desc: "Custom notification system that learns your routine and nudge you naturally.",
                color: "text-purple-600",
                bg: "bg-purple-50"
              },
              {
                icon: <Layers className="w-8 h-8" />,
                title: "All-in-One",
                desc: "Combine water intake, steps, focus time and more in one unified dashboard.",
                color: "text-orange-600",
                bg: "bg-orange-50"
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Privacy First",
                desc: "Your data is encrypted end-to-end. Your privacy is our top priority.",
                color: "text-emerald-600",
                bg: "bg-emerald-50"
              },
              {
                icon: <Check className="w-8 h-8" />,
                title: "Goal Setting",
                desc: "Break down long-term goals into tiny, achievable daily actions.",
                color: "text-rose-600",
                bg: "bg-rose-50"
              }
            ].map((f, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm transition-all"
              >
                <div className={`${f.bg} ${f.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6`}>
                  {f.icon}
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3">{f.title}</h3>
                <p className="text-slate-600 leading-relaxed font-medium">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 py-12 text-center">
        <div className="flex items-center justify-center gap-2 text-white mb-6">
          <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center shadow-lg">
            <Activity className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">LifeTrack</span>
        </div>
        <p className="text-slate-500 font-medium max-w-sm mx-auto">
          Reimagine how you live your life with powerful habit tracking.
        </p>
        <p className="text-slate-600 text-sm mt-8 opacity-50">&copy; 2026 LifeTrack Systems. All rights reserved.</p>
      </footer>
    </div>
  );
}
