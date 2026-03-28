import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutGrid, 
  Target, 
  Calendar, 
  BarChart3, 
  Settings, 
  LogOut,
  ChevronRight,
  Activity
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const SidebarItem = ({ icon, label, to, active }) => (
  <Link 
    to={to} 
    className={`
      flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-200 group
      ${active 
        ? "bg-primary-600 text-white shadow-lg shadow-primary-500/20" 
        : "text-slate-500 hover:bg-slate-50 hover:text-primary-600"}
    `}
  >
    <div className="flex items-center gap-3 font-semibold">
      <div className={`transition-transform duration-200 ${active ? "scale-110" : "group-hover:scale-110"}`}>
        {icon}
      </div>
      <span className="text-sm">{label}</span>
    </div>
    {active && <ChevronRight className="w-4 h-4" />}
  </Link>
);

export default function Sidebar() {
  const { logout, user } = useAuth();
  const location = useLocation();

  const menuItems = [
    { icon: <LayoutGrid className="w-5 h-5" />, label: "Dashboard", to: "/dashboard" },
    { icon: <Target className="w-5 h-5" />, label: "Habits", to: "/habits" },
    { icon: <Calendar className="w-5 h-5" />, label: "Calendar", to: "/calendar" },
    { icon: <BarChart3 className="w-5 h-5" />, label: "Reports", to: "/reports" },
    { icon: <Settings className="w-5 h-5" />, label: "Settings", to: "/settings" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-white border-r border-slate-100 flex flex-col p-6 z-40 hidden lg:flex">
      {/* Brand */}
      <div className="flex items-center gap-2 mb-12 px-2">
        <div className="w-10 h-10 rounded-xl bg-primary-600 text-white flex items-center justify-center shadow-lg">
          <Activity className="w-6 h-6" />
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-900">LifeTrack</span>
      </div>

      {/* Profile Summary */}
      <div className="mb-10 px-2">
        <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-3 border border-slate-100/50">
          <div className="w-10 h-10 rounded-full bg-primary-100 border-2 border-white overflow-hidden shadow-sm">
            <img src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || 'User'}&background=random`} alt="avatar" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-slate-900 truncate">{user?.displayName}</span>
            <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Premium Plan</span>
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="flex-1 space-y-1">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-2">Main Menu</p>
        {menuItems.map((item) => (
          <SidebarItem 
            key={item.to} 
            {...item} 
            active={location.pathname === item.to} 
          />
        ))}
      </div>

      {/* Logout */}
      <div className="pt-6 border-t border-slate-100">
        <button 
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-all font-semibold group"
        >
          <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="text-sm">Log Out</span>
        </button>
      </div>
    </aside>
  );
}
