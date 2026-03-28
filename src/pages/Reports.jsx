import React, { useState, useEffect } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  Legend,
  CartesianGrid
} from "recharts";
import { 
  Trophy, 
  TrendingUp, 
  Calendar, 
  Target, 
  Download,
  Zap,
  Star
} from "lucide-react";
import { motion } from "framer-motion";

import { supabase } from "../supabase";
import { useAuth } from "../context/AuthContext";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444", "#38bdf8", "#fbbf24"];

const StatCard = ({ icon, label, value, trend, color, delay }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, delay: delay / 1000 }}
    className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6"
  >
    <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-xl shrink-0 shadow-sm`}>
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1">{label}</p>
      <div className="flex items-end gap-2">
        <h3 className="text-2xl font-black text-slate-900 leading-none">{value}</h3>
        <span className="text-xs font-bold text-emerald-500 mb-0.5">{trend}</span>
      </div>
    </div>
  </motion.div>
);

export default function Reports() {
  const { user } = useAuth();
  const [reportType, setReportType] = useState("weekly");
  
  const [pieData, setPieData] = useState([]);
  const [totalCompletions, setTotalCompletions] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [avgEfficiency, setAvgEfficiency] = useState(0);

  const [timelineData, setTimelineData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!user?.uid) return;
    const fetchReports = async () => {
      const { data, error } = await supabase.from('habits').select('*').eq('user_id', user.uid);
      if (!error && data) {
        let completions = 0;
        let maxStreak = 0;
        let categoryMap = {};
        let catSet = new Set();
        
        // Group by date to build dynamic timelines
        let actMap = {};

        data.forEach(h => {
          const compCount = (h.completed || []).length;
          completions += compCount;
          if (h.streak > maxStreak) maxStreak = h.streak;
          
          const cat = h.category || 'General';
          if (compCount > 0) {
            categoryMap[cat] = (categoryMap[cat] || 0) + compCount;
            catSet.add(cat);
          }
          
          (h.completed || []).forEach(dateStr => {
             if (!actMap[dateStr]) actMap[dateStr] = {};
             actMap[dateStr][cat] = (actMap[dateStr][cat] || 0) + 1;
          });
        });
        
        setCategories(Array.from(catSet));

        setTotalCompletions(completions);
        setBestStreak(maxStreak);
        
        const efficiency = data.length > 0 ? Math.min(Math.round((completions / (data.length * 30)) * 100), 100) : 0;
        setAvgEfficiency(efficiency);

        const newPieData = Object.keys(categoryMap).map(k => ({
          name: k,
          value: categoryMap[k]
        }));
        setPieData(newPieData.length ? newPieData : [{ name: "No Data", value: 1 }]);

        // Generate Timeframes
        const generateData = () => {
           let intervals = [];
           const now = new Date();
           if (reportType === "weekly") {
              for (let i = 6; i >= 0; i--) {
                 let d = new Date(now);
                 d.setDate(d.getDate() - i);
                 intervals.push({ label: d.toLocaleDateString('en-US', { weekday: 'short' }), match: d.toISOString().split('T')[0] });
              }
           } else if (reportType === "monthly") {
              for (let i = 3; i >= 0; i--) {
                 intervals.push({ label: `Wk ${4-i}`, match: null, weekNum: i });
              }
           } else {
              for (let i = 11; i >= 0; i--) {
                 let d = new Date(now);
                 d.setMonth(d.getMonth() - i);
                 intervals.push({ label: d.toLocaleDateString('en-US', { month: 'short' }), match: d.toISOString().split('T')[0].substring(0, 7) });
              }
           }
           
           return intervals.map((intv) => {
              let payload = { day: intv.label };
              Array.from(catSet).forEach(c => payload[c] = 0);
              
              Object.keys(actMap).forEach(d => {
                 let isMatch = false;
                 if (reportType === "weekly" && d === intv.match) isMatch = true;
                 if (reportType === "yearly" && d.startsWith(intv.match)) isMatch = true;
                 if (reportType === "monthly") {
                    let dateObj = new Date(d);
                    let diffDays = Math.floor((now - dateObj) / (1000 * 60 * 60 * 24));
                    if (diffDays >= intv.weekNum * 7 && diffDays < (intv.weekNum + 1) * 7) isMatch = true;
                 }
                 if (isMatch) {
                    Object.keys(actMap[d]).forEach(c => {
                       payload[c] += actMap[d][c];
                    });
                 }
              });
              return payload;
           });
        };
        
        setTimelineData(generateData());
      }
    };
    fetchReports();
  }, [user?.uid, reportType]);

  const handleDownload = () => {
    if (timelineData.length === 0) return;
    const header = Object.keys(timelineData[0]);
    const csv = [
      header.join(","),
      ...timelineData.map(row => header.map(h => row[h]).join(","))
    ].join("\n");
    
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `lifetrack_${reportType}_report.csv`;
    link.click();
  };

  return (
    <div className="space-y-10 animate-fade-in pb-12">
      {/* HEADER */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Biological Analytics</h1>
          <p className="text-slate-500 font-medium italic mt-2">Deep insights into your lifestyle feedback loops.</p>
        </div>
        <button 
          onClick={handleDownload}
          className="flex items-center gap-2 bg-white border border-slate-200 px-6 py-3 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
        >
          <Download className="w-4 h-4" />
          Export Dataset
        </button>
      </section>

      {/* STATS */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<Trophy />} 
          label="Total Completions" 
          value={totalCompletions.toString()} 
          trend="Active" 
          color="bg-emerald-50 text-emerald-600 border-emerald-100" 
          delay={100} 
        />
        <StatCard 
          icon={<TrendingUp />} 
          label="Average Efficiency" 
          value={`${avgEfficiency}%`} 
          trend="Calculated" 
          color="bg-blue-50 text-blue-600 border-blue-100" 
          delay={200} 
        />
        <StatCard 
          icon={<Calendar />} 
          label="Best Streak" 
          value={`${bestStreak} Days`} 
          trend="Active" 
          color="bg-orange-50 text-orange-600 border-orange-100" 
          delay={300} 
        />
        <StatCard 
          icon={<Target />} 
          label="Goal Accuracy" 
          value={`${Math.min(avgEfficiency + 10, 100)}%`} 
          trend="Est" 
          color="bg-purple-50 text-purple-600 border-purple-100" 
          delay={400} 
        />
      </section>

      {/* REPORT TYPE TOGGLE */}
      <div className="flex p-1 bg-slate-100 rounded-2xl w-fit">
        {["weekly", "monthly", "yearly"].map((t) => (
          <button
            key={t}
            onClick={() => setReportType(t)}
            className={`
              px-8 py-2.5 rounded-xl text-sm font-black transition-all uppercase tracking-widest
              ${reportType === t ? "bg-white text-primary-600 shadow-sm" : "text-slate-400 hover:text-slate-600"}
            `}
          >
            {t}
          </button>
        ))}
      </div>

      {/* CHARTS GRID */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
           <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">Performance Timeline</h3>
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                   <div className="w-2 h-2 rounded-full bg-primary-500" /> High Performance
                 </div>
              </div>
           </div>
           <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} dy={15} />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', fontWeight: 'bold' }}
                  />
                  {categories.map((cat, i) => (
                     <Bar key={cat} dataKey={cat} stackId="a" fill={COLORS[i % COLORS.length]} radius={i === categories.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
           <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-8">Volumetric Distribution</h3>
           <div className="h-[300px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <span className="text-3xl font-black text-slate-900 leading-none">{avgEfficiency}%</span>
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Efficiency</span>
              </div>
           </div>
           <div className="mt-8 space-y-4">
              {pieData.map((item, i) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: COLORS[i % COLORS.length]}} />
                    <span className="text-sm font-bold text-slate-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-black text-slate-900">{item.value}</span>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* TOP ACHIEVEMENTS */}
      <section className="bg-slate-900 rounded-[48px] p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
           <div className="space-y-4">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-primary-400">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="text-2xl font-black tracking-tight">Best Performance</h4>
              <p className="text-slate-400 font-medium leading-relaxed italic">
                Wednesdays are your highest-output days. You complete 94% of planned tasks.
              </p>
           </div>
           <div className="space-y-4">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-accent-400">
                <Star className="w-6 h-6" />
              </div>
              <h4 className="text-2xl font-black tracking-tight">Growth Area</h4>
              <p className="text-slate-400 font-medium leading-relaxed italic">
                Reading consistency has dropped by 12%. Increasing evening blocks could help.
              </p>
           </div>
           <div className="space-y-4 text-center md:text-left">
              <div className="inline-block p-6 bg-white/5 rounded-[32px] border border-white/10 w-full group hover:bg-white/10 transition-all cursor-pointer">
                 <p className="text-primary-400 font-black text-[10px] uppercase tracking-widest mb-2">Next Milestone</p>
                 <h4 className="text-4xl font-black mb-1">30 Days</h4>
                 <p className="text-lg font-bold text-white/60 italic leading-none">Perfect Health Streak</p>
                 <div className="mt-6 h-2 w-full bg-white/10 rounded-full overflow-hidden">
                   <div className="h-full bg-primary-500 w-[80%] group-hover:w-[85%] transition-all duration-1000" />
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}