import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { 
  Dumbbell, 
  Droplets, 
  Apple, 
  Moon, 
  Brain, 
  BookOpen, 
  Footprints, 
  Smartphone,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FeatureCard = ({ icon, title, description, image, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: delay / 1000 }}
    viewport={{ once: true }}
    className="group bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 hover:-translate-y-2 flex flex-col"
  >
    <div className="h-64 overflow-hidden relative">
      <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-60" />
      <div className="absolute bottom-6 left-6 flex items-center gap-3">
        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white ring-1 ring-white/30 shadow-lg">
          {icon}
        </div>
      </div>
    </div>
    <div className="p-8 flex-1">
      <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight group-hover:text-primary-600 transition-colors">{title}</h3>
      <p className="text-slate-600 leading-relaxed font-medium mb-6 italic opacity-80">
        {description}
      </p>
      <Link to="/dashboard" className="flex items-center gap-2 text-primary-600 font-bold group/link cursor-pointer w-fit">
        Explore Metrics
        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
      </Link>
    </div>
  </motion.div>
);

function Features() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const features = [
    {
      icon: <Dumbbell className="w-6 h-6" />,
      title: "Morning Exercise",
      image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=1000",
      description: "Track your daily cardio, strength training, and flexibility workouts. Monitor calories burned and progress graphs effortlessly.",
    },
    {
      icon: <Droplets className="w-6 h-6" />,
      title: "Hydration Balance",
      image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=1000",
      description: "Maintain proper water consumption. Get intelligent reminders based on your activity levels and environmental conditions.",
    },
    {
      icon: <Apple className="w-6 h-6" />,
      title: "Nutritional Intake",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1000",
      description: "Log your meals and monitor key nutrients. Build balanced eating habits for long-term health and sustainable energy.",
    },
    {
      icon: <Moon className="w-6 h-6" />,
      title: "Sleep Cycles",
      image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&q=80&w=1000",
      description: "Improve your sleep quality by monitoring deep patterns and recovery time to boost mental clarity and performance.",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Mindfulness",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1000",
      description: "Track meditation sessions and reduce stress levels. Improve emotional balance and inner peace across your busy day.",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Knowledge Habits",
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=1000",
      description: "Build a strong reading habit by tracking daily learning time and personal development milestones.",
    },
    {
      icon: <Footprints className="w-6 h-6" />,
      title: "Movement Tracking",
      image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=1000",
      description: "Monitor daily steps, distance, and passive calorie burn to maintain an active lifestyle without extra effort.",
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Digital Detox",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1000",
      description: "Reduce digital distractions. Monitor screen time and boost real-life productivity with focused work blocks.",
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* NAVBAR (Static on pages like this for non-dashboard views) */}
      <nav className="h-20 flex items-center justify-between px-8 bg-white border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center font-black">L</div>
          <span className="text-xl font-black text-slate-900 tracking-tight">LifeTrack</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/" className="text-sm font-bold text-slate-500 hover:text-primary-600 transition-colors">Home</Link>
          <Link to="/features" className="text-sm font-bold text-primary-600">Features</Link>
          <Link to="/signup">
            <button className="px-6 py-2 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-20">
        {/* HERO */}
        <div className="text-center max-w-3xl mx-auto mb-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 text-primary-700 rounded-full text-xs font-black uppercase tracking-widest border border-primary-100 mb-6">
              <CheckCircle2 className="w-4 h-4" /> Comprehensive Tracking
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 tracking-tighter leading-tight">
              One platform. <br />
              <span className="text-primary-600 underline decoration-primary-200 underline-offset-8">Every health metric</span> you need.
            </h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed italic opacity-80">
              Our advanced features provide the biological insights necessary for 
              high performance and sustainable wellness.
            </p>
          </motion.div>
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <FeatureCard 
              key={i} 
              {...f} 
              delay={i * 100}
            />
          ))}
        </div>

        {/* FINAL CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-12 bg-primary-600 rounded-[48px] text-white text-center shadow-2xl shadow-primary-500/25 relative overflow-hidden"
        >
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
           
           <div className="relative z-10 w-full max-w-2xl mx-auto">
             <h2 className="text-4xl font-black mb-6 tracking-tight">Ready to optimize your biology?</h2>
             <p className="text-primary-100 text-lg font-medium mb-10 opacity-90 italic">
               Join thousands of others building their best versions with LifeTrack's biological feedback loops.
             </p>
             <Link to="/signup">
                <button className="px-10 py-4 bg-white text-primary-700 text-lg font-black rounded-2xl shadow-xl hover:bg-primary-50 transition-all active:scale-95 group">
                  Start Real-time Tracking
                  <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
             </Link>
           </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Features;