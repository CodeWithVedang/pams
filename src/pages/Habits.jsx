import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Heart, 
  Dumbbell, 
  Brain, 
  Briefcase, 
  Home,
  ArrowRight,
  TrendingUp,
  Sparkles,
  X,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../supabase";
import { useAuth } from "../context/AuthContext";

const CategoryCard = ({ icon, title, description, color, onClick, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: delay / 1000 }}
    whileHover={{ y: -8, shadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05)" }}
    onClick={onClick}
    className="group bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm cursor-pointer hover:border-primary-200 transition-all flex flex-col justify-between h-[320px]"
  >
    <div>
      <div className={`w-16 h-16 ${color} rounded-[24px] flex items-center justify-center mb-8 shadow-inner transition-transform group-hover:scale-110 duration-300`}>
        {icon}
      </div>
      <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight group-hover:text-primary-600 transition-colors uppercase">{title}</h3>
      <p className="text-slate-500 font-medium leading-relaxed italic text-sm">
        {description}
      </p>
    </div>
    
    <div className="flex items-center justify-between pt-6 border-t border-slate-50">
      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
        <TrendingUp className="w-3.5 h-3.5" />
        Create Habit
      </div>
      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary-600 group-hover:text-white transition-all">
        <ArrowRight className="w-5 h-5" />
      </div>
    </div>
  </motion.div>
);

export default function HabitPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [habitName, setHabitName] = useState("");
  const [loading, setLoading] = useState(false);

  const categories = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Health",
      description: "Manage your biological vitals, hydration, and medical routines for peak longevity.",
      color: "bg-rose-50 text-rose-600"
    },
    {
      icon: <Dumbbell className="w-8 h-8" />,
      title: "Fitness",
      description: "Track physical performance, anaerobic progress, and metabolic expenditure.",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Mindfulness",
      description: "Optimize neural pathways through deep meditation, focus blocks, and mental clarity logs.",
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Productivity",
      description: "Accelerate your output by tracking high-leverage actions and elimination of distractions.",
      color: "bg-orange-50 text-orange-600"
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "Lifestyle",
      description: "Develop sustainable daily habits that harmonize your environment and personal growth.",
      color: "bg-emerald-50 text-emerald-600"
    }
  ];

  const handleCreateHabit = async (e) => {
    e.preventDefault();
    if (!habitName.trim() || !user?.uid) return;
    setLoading(true);

    try {
      await supabase.from("habits").insert([{
        user_id: user.uid,
        name: habitName,
        category: selectedCategory,
        completed: [],
        streak: 0
      }]);
      setIsModalOpen(false);
      setHabitName("");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating habit:", error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  return (
    <div className="animate-fade-in pb-12 relative">
      {/* HEADER SECTION */}
      <section className="mb-12">
        <div className="flex items-center gap-2 text-primary-600 font-bold text-xs uppercase tracking-[0.2em] mb-3">
          <Sparkles className="w-4 h-4" /> Blueprint for Growth
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Habit <span className="text-primary-600">Architecture</span>
        </h1>
        <p className="text-slate-500 text-lg font-medium max-w-2xl leading-relaxed italic">
          "We are what we repeatedly do. Excellence, then, is not an act, but a habit."
        </p>
      </section>

      {/* CATEGORIES GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat, i) => (
          <CategoryCard 
            key={cat.title}
            {...cat}
            delay={i * 100}
            onClick={() => openModal(cat.title)}
          />
        ))}

        {/* CUSTOM CATEGORY ADDER */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          onClick={() => openModal("Custom")}
          className="bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200 p-8 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-white hover:border-primary-300 transition-all h-[320px]"
        >
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-slate-300 group-hover:text-primary-500 shadow-sm mb-6 transition-colors">
            <span className="text-4xl font-light">+</span>
          </div>
          <h3 className="text-xl font-bold text-slate-400 group-hover:text-primary-600 mb-2 transition-colors">Custom Category</h3>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest italic">Define your own path</p>
        </motion.div>
      </section>

      {/* BOTTOM INFO */}
      <section className="mt-20 p-10 bg-white rounded-[40px] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-8">
         <div className="w-20 h-20 bg-primary-600 text-white rounded-[24px] flex items-center justify-center shrink-0 shadow-lg shadow-primary-500/20">
           <TrendingUp className="w-10 h-10" />
         </div>
         <div>
           <h4 className="text-2xl font-black text-slate-900 mb-2 tracking-tight uppercase">Compound Interest</h4>
           <p className="text-slate-600 font-medium leading-relaxed italic opacity-80">
             Tracking your habits for just 30 days results in a 68% higher chance of long-term success. 
             Start small, stay consistent, and watch the transformation unfold.
           </p>
         </div>
         <button 
           onClick={() => navigate("/reports")} 
           className="md:ml-auto px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-black rounded-2xl shadow-lg transition-all active:scale-95 whitespace-nowrap"
         >
           View Global Stats
         </button>
      </section>

      {/* CREATE HABIT MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white max-w-md w-full rounded-[32px] p-8 shadow-2xl relative"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <h2 className="text-2xl font-black text-slate-900 mb-2">Create New Habit</h2>
              <p className="text-sm font-medium text-slate-500 mb-6 italic">Category: <span className="font-bold text-primary-600">{selectedCategory}</span></p>

              <form onSubmit={handleCreateHabit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Habit Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Drink 2L Water"
                    value={habitName}
                    onChange={(e) => setHabitName(e.target.value)}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-900 font-medium"
                  />
                </div>

                {selectedCategory === "Custom" && (
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Custom Category Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Finances"
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-900 font-medium"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-black rounded-2xl shadow-lg shadow-primary-500/25 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Initialize Habit"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}