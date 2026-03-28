import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, User, Loader2, ArrowRight, CheckCircle2, Activity } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    try {
      await signup(username, password, name);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(`Failed to create account: ${err?.message || "Username might already be in use."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* LEFT SIDE: DECORATIVE */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-accent-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-600 to-accent-800 z-0" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl z-0" />
        <div className="absolute top-1/4 -right-12 w-64 h-64 bg-primary-400/10 rounded-full blur-2xl z-0" />
        
        <div className="relative z-10 flex items-center gap-2 text-2xl font-bold tracking-tight">
          <div className="w-10 h-10 rounded-xl bg-white text-accent-600 flex items-center justify-center shadow-lg">
            <Activity className="w-6 h-6" />
          </div>
          LifeTrack
        </div>

        <div className="relative z-10">
          <h1 className="text-5xl font-bold leading-tight mb-8">
            Starting your journey to <br />
            <span className="text-primary-100">Better Health?</span>
          </h1>
          
          <ul className="space-y-6">
            {[
              "Personalized habit tracking",
              "In-depth health analytics",
              "Smart reminder system",
              "Progress visualization"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-lg font-medium text-accent-50">
                <CheckCircle2 className="w-6 h-6 text-accent-200" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 mt-auto">
          <p className="text-accent-100 text-sm italic opacity-80">
            "Small changes today lead to monumental results tomorrow."
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: FORM */}
      <div className="flex flex-col justify-center items-center p-8 bg-slate-50">
        <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 animate-fade-in">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Join LifeTrack</h2>
            <p className="text-slate-500">Create your account to start tracking today.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-accent-500 transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 transition-all"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-accent-500 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 transition-all"
                  placeholder="name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">Password (at least 6 chars)</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-accent-500 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-accent-600 hover:bg-accent-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-accent-500/25 transition-all duration-300 disabled:opacity-70 group"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-500 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-accent-600 font-bold hover:underline underline-offset-4">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}