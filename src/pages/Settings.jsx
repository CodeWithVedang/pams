import React, { useState } from "react";
import { 
  User, 
  Bell, 
  Moon, 
  Lock, 
  ShieldCheck, 
  Smartphone,
  CheckCircle2,
  Trash2,
  Activity,
  CreditCard,
  Target,
  Loader2
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabase";

const SettingsItem = ({ icon, title, description, children, border = true }) => (
  <div className={`py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 ${border ? 'border-b border-slate-50' : ''}`}>
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center shrink-0 text-slate-400 group-hover:text-primary-500 transition-colors">
        {icon}
      </div>
      <div>
        <h4 className="text-base font-bold text-slate-900 tracking-tight">{title}</h4>
        <p className="text-sm text-slate-500 font-medium italic opacity-80">{description}</p>
      </div>
    </div>
    <div className="flex items-center">
      {children}
    </div>
  </div>
);

const SectionHeader = ({ icon, title }) => (
  <div className="flex items-center gap-3 mb-8">
     <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center">
       {icon}
     </div>
     <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase">{title}</h3>
  </div>
);

export default function Settings() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [biometric, setBiometric] = useState(true);
  
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async () => {
    if (!name.trim() || !user?.uid) return;
    setLoading(true);
    try {
      await supabase.from("users").update({ name }).eq("id", user.uid);
      const session = JSON.parse(localStorage.getItem("auth_session"));
      session.displayName = name;
      localStorage.setItem("auth_session", JSON.stringify(session));
      // Optionally reload page to update context, or rely on next login
      window.location.reload(); 
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setIsEditing(false);
    }
  };

  const handleClearCache = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="space-y-12 animate-fade-in pb-20">
      {/* HEADER */}
      <section>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">System Configuration</h1>
        <p className="text-slate-500 font-medium italic">Adjust your biological tracking parameters and preferences.</p>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        {/* LEFT COLUMN: MAIN SETTINGS */}
        <div className="xl:col-span-2 space-y-12">
          
          {/* USER ACCOUNT */}
          <section className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden">
             <SectionHeader icon={<User className="w-6 h-6" />} title="User Account" />
             
             <div className="space-y-2">
                <SettingsItem 
                  title="Biometric Profile" 
                  description="Update your biological vitals and daily tracking labels."
                  icon={<Activity className="w-5 h-5" />}
                >
                  {isEditing ? (
                     <div className="flex gap-2">
                       <input 
                         type="text" 
                         value={name} 
                         onChange={e => setName(e.target.value)} 
                         className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                       />
                       <button onClick={handleUpdateProfile} disabled={loading} className="px-4 py-1.5 bg-primary-600 text-white font-bold rounded-lg text-sm flex items-center gap-2">
                         {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
                       </button>
                     </div>
                  ) : (
                     <div className="flex items-center gap-4">
                       <span className="text-sm font-bold text-slate-800">{user?.displayName || user?.username}</span>
                       <button onClick={() => setIsEditing(true)} className="px-6 py-2 bg-primary-600 text-white font-bold rounded-xl text-sm hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/10">Edit Profile</button>
                     </div>
                  )}
                </SettingsItem>

                <SettingsItem 
                  title="Email Verification" 
                  description="Managed via primary biological identity link."
                  icon={<ShieldCheck className="w-5 h-5" />}
                >
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-100">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                  </span>
                </SettingsItem>

                <SettingsItem 
                  title="Secondary Identifiers" 
                  description="Connect alternative medical or fitness data sources."
                  icon={<Smartphone className="w-5 h-5" />}
                  border={false}
                >
                  <button className="text-sm font-black text-slate-400 hover:text-primary-600 transition-colors">Manage Hooks</button>
                </SettingsItem>
             </div>
          </section>

          {/* PERMISSION & FEEDBACK */}
          <section className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
             <SectionHeader icon={<Bell className="w-6 h-6" />} title="Connectivity & Loops" />
             
             <div className="space-y-2">
                <SettingsItem 
                  title="Feedback Notifications" 
                  description="Real-time biological nudges based on dataset drift."
                  icon={<Bell className="w-5 h-5" />}
                >
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={notifications} onChange={() => setNotifications(!notifications)} />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600" />
                  </label>
                </SettingsItem>

                <SettingsItem 
                  title="Biological Encryption" 
                  description="Use advanced biometric locks for dataset access."
                  icon={<Lock className="w-5 h-5" />}
                >
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={biometric} onChange={() => setBiometric(!biometric)} />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600" />
                  </label>
                </SettingsItem>

                <SettingsItem 
                  title="Sub-Biological Tunnels" 
                  description="Managed secure storage for local offline datasets."
                  icon={<Archive className="w-5 h-5" />}
                  border={false}
                >
                  <button onClick={handleClearCache} className="text-sm font-black text-rose-500 hover:text-rose-600 transition-colors uppercase tracking-widest">Wipe Cache</button>
                </SettingsItem>
             </div>
          </section>
        </div>

        {/* RIGHT COLUMN: PREMIUM & STATUS */}
        <div className="space-y-8">
           <div className="bg-slate-900 p-8 rounded-[48px] text-white shadow-xl shadow-slate-900/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary-500/10 rounded-full blur-[80px]" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-primary-400 mb-6 backdrop-blur-md">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black mb-2 tracking-tight">Active Plan</h3>
                <p className="text-indigo-200 text-sm font-medium mb-8 leading-relaxed italic opacity-80 uppercase tracking-widest">Enterprise Biology Suite</p>
                <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/10">
                   <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Next Cycle</span>
                   <span className="text-sm font-black italic">May 14, 2026</span>
                </div>
                <button className="w-full py-4 bg-white text-slate-900 font-black rounded-2xl shadow-xl hover:bg-slate-50 transition-all active:scale-95 uppercase tracking-widest text-xs">
                  Upgrade Capacity
                </button>
              </div>
           </div>

           <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                 <div className="w-10 h-10 bg-accent-50 text-accent-600 rounded-xl flex items-center justify-center">
                   <Target className="w-5 h-5" />
                 </div>
                 <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">System Status</h3>
              </div>
              <ul className="space-y-4">
                 {[
                   { label: "Dataset Sync", val: "Operational", color: "text-emerald-500" },
                   { label: "Notification Hook", val: "12 ms latency", color: "text-slate-500" },
                   { label: "Encryption Grade", val: "AES-256-GCM", color: "text-blue-500" },
                   { label: "Local Database", val: "542 MB used", color: "text-slate-500" },
                 ].map((item, i) => (
                   <li key={i} className="flex items-center justify-between">
                     <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.label}</span>
                     <span className={`text-[11px] font-black italic ${item.color}`}>{item.val}</span>
                   </li>
                 ))}
              </ul>
              <div className="mt-8 pt-8 border-t border-slate-50">
                 <button 
                   onClick={async () => {
                     if (window.confirm("Are you sure you want to permanently delete your biological dataset? This cannot be undone.")) {
                       try {
                         await supabase.from("users").delete().eq("id", user.uid);
                         localStorage.clear();
                         window.location.href = "/";
                       } catch (e) {
                         console.error(e);
                       }
                     }
                   }}
                   className="w-full flex items-center justify-center gap-2 group text-rose-500 hover:text-rose-600 transition-colors font-black text-xs uppercase tracking-widest"
                 >
                   <Trash2 className="w-4 h-4 group-hover:shake" />
                   Terminate Account
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

// Minimal missing component for the layout
const Archive = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="5" x="2" y="3" rx="1"/>
    <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/>
    <path d="M10 12h4"/>
  </svg>
);