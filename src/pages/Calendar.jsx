import React, { useState, useEffect } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  Calendar as CalendarIcon,
  Flame,
  Trophy,
  Activity,
  Zap,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../supabase";
import { useAuth } from "../context/AuthContext";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function HabitCalendar() {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [activitiesMap, setActivitiesMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [topStreak, setTopStreak] = useState(0);

  useEffect(() => {
    if (!user?.uid) return;

    const fetchHabits = async () => {
      const { data, error } = await supabase
        .from('habits')
        .select('*')
        .eq('user_id', user.uid);
      
      if (!error && data) {
        const tempMap = {};
        let maxStreak = 0;
        data.forEach(h => {
          if (h.streak > maxStreak) maxStreak = h.streak;
          (h.completed || []).forEach(dateStr => {
            if (!tempMap[dateStr]) tempMap[dateStr] = { completed: [], missed: [] };
            tempMap[dateStr].completed.push(h.name);
          });
        });
        setActivitiesMap(tempMap);
        setTopStreak(maxStreak);
      }
      setLoading(false);
    };

    fetchHabits();
  }, [user?.uid]);

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const changeMonth = (offset) => {
    setCurrentDate(new Date(currentYear, currentMonth + offset, 1));
  };

  const activity = activitiesMap[selectedDate] || { completed: [], missed: [] };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin w-10 h-10 text-primary-600" /></div>;

  return (
    <div className="space-y-10 animate-fade-in pb-12">
      {/* HEADER */}
      <section>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Timeline Log</h1>
        <p className="text-slate-500 font-medium italic mt-2">Historical synchronization of your biological performance.</p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* CALENDAR MAIN */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden">
           <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center">
                    <CalendarIcon className="w-6 h-6" />
                 </div>
                 <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase leading-none">{months[currentMonth]}</h2>
                    <span className="text-sm font-bold text-slate-400">{currentYear} Profile</span>
                 </div>
              </div>
              <div className="flex gap-2">
                 <button onClick={() => changeMonth(-1)} className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors text-slate-500">
                    <ChevronLeft className="w-5 h-5" />
                 </button>
                 <button onClick={() => changeMonth(1)} className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors text-slate-500">
                    <ChevronRight className="w-5 h-5" />
                 </button>
              </div>
           </div>

           <div className="grid grid-cols-7 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                <div key={d} className="text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] py-4">{d}</div>
              ))}
           </div>

           <div className="grid grid-cols-7 gap-2">
              {Array(firstDayOfMonth).fill(null).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const hasActivity = !!activitiesMap[dateStr];
                const isSelected = selectedDate === dateStr;
                const isToday = new Date().toISOString().split('T')[0] === dateStr;

                return (
                  <motion.div
                    key={day}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`
                      aspect-square rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all relative group
                      ${isSelected ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30' : 'bg-slate-50 hover:bg-white border border-transparent hover:border-slate-200'}
                      ${isToday && !isSelected ? 'ring-2 ring-primary-200' : ''}
                    `}
                  >
                    <span className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-700'}`}>{day}</span>
                    {hasActivity && (
                      <div className="flex gap-1 mt-1">
                        <div className={`w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-primary-400'}`} />
                        <div className={`w-1 h-1 rounded-full opacity-60 ${isSelected ? 'bg-white' : 'bg-primary-400'}`} />
                      </div>
                    )}
                    {isToday && !isSelected && (
                       <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-primary-500 rounded-full" />
                    )}
                  </motion.div>
                );
              })}
           </div>

           <div className="mt-10 pt-8 border-t border-slate-50 flex items-center gap-6">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                 <div className="w-2 h-2 rounded-full bg-primary-500" /> Active Dataset
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                 <div className="w-2 h-2 rounded-full bg-slate-200" /> Empty Node
              </div>
           </div>
        </div>

        {/* SIDEBAR LOGS */}
        <div className="space-y-8">
           <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm min-h-[400px]">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-50">
                 <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase leading-none">Day Logs</h3>
                 <span className="text-xs font-bold text-slate-400 italic">
                   {new Date(selectedDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                 </span>
              </div>

              <AnimatePresence mode="wait">
                 <motion.div 
                    key={selectedDate}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                 >
                    {activity.completed.length > 0 || activity.missed.length > 0 ? (
                       <>
                          <div className="space-y-4">
                             <h4 className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest px-1">
                                <CheckCircle2 className="w-4 h-4" /> Synthesized
                             </h4>
                             <div className="grid grid-cols-1 gap-2">
                                {activity.completed.map((a, i) => (
                                   <div key={i} className="px-5 py-3 bg-emerald-50 text-emerald-700 rounded-2xl text-sm font-bold border border-emerald-100 flex items-center justify-between">
                                      {a}
                                      <Zap className="w-3.5 h-3.5 opacity-50" />
                                   </div>
                                ))}
                             </div>
                          </div>

                          {activity.missed.length > 0 && (
                             <div className="space-y-4">
                                <h4 className="flex items-center gap-2 text-[10px] font-black text-rose-500 uppercase tracking-widest px-1">
                                   <XCircle className="w-4 h-4" /> Drifted
                                </h4>
                                <div className="grid grid-cols-1 gap-2">
                                   {activity.missed.map((a, i) => (
                                      <div key={i} className="px-5 py-3 bg-rose-50 text-rose-600 rounded-2xl text-sm font-bold border border-rose-100 flex items-center justify-between">
                                         {a}
                                         <Activity className="w-3.5 h-3.5 opacity-50" />
                                      </div>
                                   ))}
                                </div>
                             </div>
                          )}
                       </>
                    ) : (
                       <div className="py-12 text-center space-y-4">
                          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mx-auto">
                             <CalendarIcon className="w-8 h-8" />
                          </div>
                          <p className="text-slate-400 font-bold text-sm italic">No biological data recorded for this node.</p>
                       </div>
                    )}
                 </motion.div>
              </AnimatePresence>
           </div>

           <div className="bg-gradient-to-br from-primary-600 to-indigo-700 p-8 rounded-[40px] text-white shadow-xl shadow-primary-500/20">
              <div className="flex items-center gap-3 mb-6">
                <Flame className="w-8 h-8 text-orange-400" />
                <div>
                   <h4 className="text-xl font-black tracking-tight leading-none uppercase">Current Streak</h4>
                   <span className="text-[10px] font-bold text-primary-200 uppercase tracking-widest">Global Ranking: #242</span>
                </div>
              </div>
              <h2 className="text-5xl font-black mb-4">12 <span className="text-xl font-medium text-primary-200">Days</span></h2>
              <div className="flex items-center gap-2 mb-8">
                 <Trophy className="w-4 h-4 text-orange-400" />
                 <span className="text-xs font-bold text-primary-100/80">3 days until next milestone</span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                 <div className="h-full bg-white w-[80%] shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}