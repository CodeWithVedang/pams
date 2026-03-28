import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Bell, Search, User, LayoutGrid, Target, Calendar, BarChart3, Settings, X, CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabase";

export default function MainLayout() {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user?.uid) return;
    const fetchAlerts = async () => {
       const { data } = await supabase.from('habits').select('*').eq('user_id', user.uid);
       if (data) {
          const today = new Date().toISOString().split('T')[0];
          const pending = data.filter(h => !(h.completed || []).includes(today));
          
          let alerts = [];
          if (pending.length > 0) {
             alerts.push({ id: 1, text: `You have ${pending.length} habits left to conquer today!` });
          }
          if (data.length > 0) {
             const best = data.reduce((max, h) => h.streak > max.streak ? h : max, data[0]);
             if (best.streak > 3) {
                 alerts.push({ id: 2, text: `Incredible! Your ${best.name} streak is at ${best.streak} days!` });
             }
          }
          if (alerts.length === 0) {
             alerts.push({ id: 3, text: "All caught up! Excellent work today." });
          }
          setNotifications(alerts);
       }
    };
    fetchAlerts();
  }, [user?.uid]);

  const handleNotification = () => {
    setShowNotifications(!showNotifications);
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
      return;
    }
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification("LifeTrack Reminder", {
          body: "You have 3 habits left to complete today. Stay on track!",
          icon: "https://ui-avatars.com/api/?name=LT&background=3b82f6&color=fff&size=192"
        });
      }
    });
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      {/* SIDEBAR (Desktop) */}
      <Sidebar />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 lg:ml-72 flex flex-col min-h-screen">
        
        {/* HEADER / TOPBAR */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-20 px-8 bg-white/70 backdrop-blur-md border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="relative group hidden sm:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-500 transition-colors">
                <Search className="w-4 h-4" />
              </div>
              <input 
                type="text" 
                placeholder="Search habits, stats..." 
                className="w-64 pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:bg-white transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 relative">
            <button 
              onClick={handleNotification}
              className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors group cursor-pointer"
            >
              <Bell className="w-5 h-5 text-slate-500 group-hover:text-primary-600 transition-colors" />
              {notifications.length > 0 && notifications[0]?.id !== 3 && (
                 <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white ring-2 ring-primary-500/10"></span>
              )}
            </button>
            
            {showNotifications && (
              <div className="absolute top-14 right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 z-50 overflow-hidden animate-fade-in">
                 <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <span className="font-bold text-slate-900">Notifications</span>
                    <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                 </div>
                 <div className="max-h-80 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors flex gap-3 items-start">
                         <div className="mt-0.5 text-primary-500 flex-shrink-0">
                           <CheckCircle2 className="w-5 h-5" />
                         </div>
                         <p className="text-sm text-slate-700 font-medium leading-relaxed">{n.text}</p>
                      </div>
                    ))}
                 </div>
                 <div className="p-3 text-center bg-slate-50/50 border-t border-slate-100">
                    <button 
                      onClick={() => setNotifications([{ id: 3, text: "All caught up! Excellent work today." }])}
                      className="text-xs font-bold text-slate-500 hover:text-primary-600 transition-colors"
                    >
                      Mark all as read
                    </button>
                 </div>
              </div>
            )}
            
            <div className="h-6 w-[1px] bg-slate-200 hidden sm:block"></div>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{user?.displayName}</p>
                <p className="text-[11px] font-semibold text-slate-500">Premium User</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 p-0.5 group-hover:border-primary-500/50 transition-all overflow-hidden shadow-sm shadow-slate-200/50">
                <img 
                  src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || 'User'}&background=random`} 
                  alt="Avatar" 
                  className="w-full h-full rounded-lg"
                />
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto mb-20 lg:mb-0">
          <div className="max-w-7xl mx-auto">
             <Outlet />
          </div>
        </main>

        {/* MOBILE BOTTOM NAVIGATION */}
        <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-slate-100 flex items-center justify-around h-20 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] z-50 px-2 pb-2">
          {[
            { icon: <LayoutGrid className="w-6 h-6" />, to: "/dashboard", label: "Home" },
            { icon: <Target className="w-6 h-6" />, to: "/habits", label: "Habits" },
            { icon: <Calendar className="w-6 h-6" />, to: "/calendar", label: "Logs" },
            { icon: <BarChart3 className="w-6 h-6" />, to: "/reports", label: "Stats" },
            { icon: <Settings className="w-6 h-6" />, to: "/settings", label: "Settings" },
          ].map((item, i) => (
            <Link key={i} to={item.to} className="flex flex-col items-center justify-center w-1/5 py-2 group">
              <div className="p-2 rounded-xl text-slate-400 group-hover:text-primary-600 group-hover:bg-primary-50 transition-all">
                {item.icon}
              </div>
              <span className="text-[10px] font-bold text-slate-500 group-hover:text-primary-600 tracking-tight mt-1">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}