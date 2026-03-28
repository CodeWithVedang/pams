import React, { useEffect, useState } from "react";
import { 
  CheckCircle2, 
  Droplets, 
  Flame, 
  Brain, 
  Plus, 
  Trophy, 
  TrendingUp,
  Clock,
  ExternalLink,
  Loader2,
  CalendarDays
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid,
  Cell,
  AreaChart,
  Area
} from "recharts";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabase";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const { user } = useAuth();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weeklyData, setWeeklyData] = useState([]);

  // Subscribe to habits in Supabase
  useEffect(() => {
    if (!user?.uid) return;

    const fetchHabits = async () => {
      const { data, error } = await supabase
        .from('habits')
        .select('*')
        .eq('user_id', user.uid);
      
      if (!error && data) {
        const mappedData = data.map(d => ({ ...d, completed: d.completed || [] }));
        setHabits(mappedData);
      }
      setLoading(false);
    };

    fetchHabits();

    const subscription = supabase
      .channel('habits_channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'habits', filter: `user_id=eq.${user.uid}` }, payload => {
        fetchHabits();
      })
      .subscribe();

    // Dummy weekly data derived from last 7 days metrics
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    setWeeklyData(days.map(day => ({ 
      day, 
      value: Math.floor(Math.random() * 8) + 2,
      activity: Math.floor(Math.random() * 50) + 50 
    })));

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [user?.uid]);

  const markComplete = async (habitId, currentCompleted = []) => {
    const today = new Date().toISOString().split("T")[0];
    if (currentCompleted.includes(today)) return;

    try {
      const nextCompleted = [...currentCompleted, today];
      const currentStreak = habits.find(h => h.id === habitId).streak || 0;
      
      await supabase
        .from('habits')
        .update({
          completed: nextCompleted,
          last_completed: today,
          streak: currentStreak + 1
        })
        .eq('id', habitId);
        
      // Optimistic update
      setHabits(prev => prev.map(h => 
        h.id === habitId 
          ? { ...h, completed: nextCompleted, last_completed: today, streak: currentStreak + 1 } 
          : h
      ));
    } catch (err) {
      console.error("Error updating habit:", err);
    }
  };

  const today = new Date().toISOString().split("T")[0];
  const completedToday = habits.filter(h => h.completed?.includes(today)).length;
  const totalHabits = habits.length;
  const progressPercent = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-4 py-20">
        <Loader2 className="w-12 h-12 animate-spin text-primary-600" />
        <p className="text-slate-500 font-medium animate-pulse">Synchronizing your biological data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-fade-in pb-12">
      {/* WELCOME HEADER */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-primary-600 font-bold text-sm uppercase tracking-widest mb-2">
            <CalendarDays className="w-4 h-4" />
            {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            How's it going, <span className="text-primary-600">{user?.displayName?.split(' ')[0]}</span>? 👋
          </h1>
          <p className="mt-2 text-slate-500 font-medium text-lg italic">"Health is not about the weight you lose, but the life you gain."</p>
        </div>
        <button onClick={() => window.location.href = '/habits'} className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-primary-500/25 transition-all flex items-center gap-2 group transform active:scale-95">
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          Add New Metric
        </button>
      </section>

      {/* STATS OVERVIEW */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Habits Progress", val: `${completedToday}/${totalHabits}`, sub: `${progressPercent}% Today`, icon: <CheckCircle2 />, color: "bg-emerald-50 text-emerald-600", border: "border-emerald-100" },
          { label: "Hydration", val: "1.8L", sub: "Goal: 2.5L", icon: <Droplets />, color: "bg-blue-50 text-blue-600", border: "border-blue-100" },
          { label: "Active Calories", val: "482", sub: "Peak: 2 PM", icon: <Flame />, color: "bg-orange-50 text-orange-600", border: "border-orange-100" },
          { label: "Focus Session", val: "3.2h", sub: "Above avg", icon: <Brain />, color: "bg-purple-50 text-purple-600", border: "border-purple-100" },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5, shadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05)" }}
            className={`bg-white p-6 rounded-3xl border ${stat.border} shadow-sm transition-all`}
          >
            <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center mb-4 text-xl`}>
              {stat.icon}
            </div>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-1">{stat.label}</p>
            <h3 className="text-3xl font-extrabold text-slate-900 mb-1">{stat.val}</h3>
            <span className={`text-xs font-bold leading-relaxed ${stat.color.replace('bg-', 'text-').replace('-50', '-700')}`}>
              {stat.sub}
            </span>
          </motion.div>
        ))}
      </section>

      {/* MIDDLE SECTION - CHARTS & INSIGHTS */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Activity Overview</h3>
                <p className="text-sm text-slate-500 font-medium">Monitoring last 7 days</p>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-lg text-xs font-bold text-slate-500 border border-slate-100 italic">
                  Weekly Average: 72%
                </div>
              </div>
            </div>
            
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', fontWeight: 'bold' }}
                  />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} dy={10} />
                  <Area type="monotone" dataKey="activity" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorVal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-primary-600 to-primary-800 p-8 rounded-[32px] text-white shadow-xl shadow-primary-500/20 relative overflow-hidden group">
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700" />
            <div className="absolute -left-12 -top-12 w-48 h-48 bg-accent-400/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3 leading-tight">Elite Status <br />Unlocks Soon</h3>
              <p className="text-primary-100 font-medium mb-6 opacity-80 leading-relaxed text-sm">You are in the top 5% of active users this week. Keep up the 5-day streak!</p>
              <button className="w-full bg-white text-primary-700 font-bold py-3.5 rounded-xl hover:bg-primary-50 transition-colors flex items-center justify-center gap-2 group/btn">
                View Milestones
                <TrendingUp className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
             <div className="flex items-center gap-3 mb-6">
               <div className="w-10 h-10 bg-accent-50 text-accent-600 rounded-xl flex items-center justify-center">
                 <Clock className="w-5 h-5 font-bold" />
               </div>
               <h3 className="text-lg font-bold text-slate-900 tracking-tight">Daily Insight</h3>
             </div>
             <p className="text-slate-600 font-medium leading-relaxed mb-6 italic">
                "Small improvements are believable. When they're believable, they're achievable. When they're achievable, they're sustainable."
             </p>
             <div className="flex items-center justify-between pt-4 border-t border-slate-50">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">James Clear</span>
               <ExternalLink className="w-4 h-4 text-slate-300 hover:text-primary-500 cursor-pointer" />
             </div>
          </div>
        </div>
      </section>

      {/* HABITS TRACKING SECTION */}
      <section className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden pb-8">
        <div className="p-8 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-1">Today's Habits</h3>
            <p className="text-slate-500 font-medium">The secret of your future is hidden in your daily routine.</p>
          </div>
          <div className="flex items-center gap-2 px-6 py-2 bg-slate-50 rounded-2xl border border-slate-100">
             <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Completion Rate</span>
             <span className="text-lg font-black text-primary-600">{progressPercent}%</span>
          </div>
        </div>

        <div className="px-8 mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {habits.length > 0 ? (
              habits.map((h, i) => {
                const isDone = h.completed?.includes(today);
                return (
                  <motion.div 
                    layout
                    key={h.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ scale: 1.02 }}
                    className={`
                      p-6 rounded-3xl border transition-all flex flex-col justify-between h-[180px] group
                      ${isDone 
                        ? "bg-slate-50 border-slate-100 opacity-80" 
                        : "bg-white border-slate-200 hover:border-primary-300 shadow-sm hover:shadow-lg"}
                    `}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-4">
                         <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${isDone ? 'bg-slate-200 text-slate-500' : 'bg-primary-50 text-primary-600'}`}>
                           {h.category || "General"}
                         </span>
                         <div className="flex items-center gap-1 text-slate-400 font-bold text-xs">
                           <TrendingUp className="w-3 h-3" />
                           {h.streak || 0}d
                         </div>
                      </div>
                      <h4 className={`text-xl font-bold ${isDone ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{h.name}</h4>
                    </div>

                    {!isDone ? (
                      <button 
                        onClick={() => markComplete(h.id, h.completed)}
                        className="mt-4 w-full py-3 bg-white border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 active:scale-95"
                      >
                        Complete Session
                      </button>
                    ) : (
                      <div className="mt-4 w-full py-3 bg-emerald-100 text-emerald-700 rounded-2xl font-black text-sm flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        Well Done!
                      </div>
                    )}
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full py-16 flex flex-col items-center justify-center">
                 <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <Plus className="w-8 h-8 text-slate-300" />
                 </div>
                 <h4 className="text-xl font-bold text-slate-400">Your routine is empty</h4>
                 <p className="text-slate-400">Add your first habit to start tracking progress</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}