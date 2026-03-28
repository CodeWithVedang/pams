import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, Loader2, ArrowRight, Activity } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isForgotPassword) {
        // Mock Forgot Password Flow (Raw DB Update)
        const { supabase } = await import('../supabase');
        
        // 1. Check if user exists
        const { data: userData, error: fetchError } = await supabase
          .from('users')
          .select('*')
          .eq('username', username)
          .single();
          
        if (fetchError || !userData) {
           throw new Error("Username not found within the system.");
        }

        // 2. Update password directly
        const { error: updateError } = await supabase
          .from('users')
          .update({ password: password })
          .eq('username', username);

        if (updateError) throw updateError;
        
        setSuccess("Password successfully updated! You can now sign in.");
        setIsForgotPassword(false);
        setPassword("");
      } else {
        await login(username, password);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to authenticate. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* LEFT SIDE: DECORATIVE */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-primary-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800 z-0" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl z-0" />
        <div className="absolute top-1/4 -right-12 w-64 h-64 bg-accent-400/10 rounded-full blur-2xl z-0" />
        
        <div className="relative z-10 flex items-center gap-2 text-2xl font-bold tracking-tight">
          <div className="w-10 h-10 rounded-xl bg-white text-primary-600 flex items-center justify-center shadow-lg">
            <Activity className="w-6 h-6" />
          </div>
          LifeTrack
        </div>

        <div className="relative z-10">
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Everything you need for a <br />
            <span className="text-accent-300">better lifestyle.</span>
          </h1>
          <p className="text-primary-100 text-xl max-w-md">
            The world's most intuitive health and habit tracking platform. Monitor metrics, build habits, and reach your goals.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-4">
          <div className="flex -space-x-3">
            {["X", "Y", "Z", "A"].map((n, i) => (
              <img
                key={i}
                className="inline-block h-10 w-10 rounded-full ring-2 ring-primary-600 shadow-sm relative z-10"
                src={`https://ui-avatars.com/api/?name=${n}&background=random&color=fff`}
                alt="user"
              />
            ))}
          </div>
          <p className="text-sm font-medium text-primary-100">
            Joined by 10,000+ health enthusiasts
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: FORM */}
      <div className="flex flex-col justify-center items-center p-4 sm:p-8 bg-slate-50">
        <div className="w-full max-w-md bg-white p-6 sm:p-10 rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 animate-fade-in relative z-10">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">{isForgotPassword ? "Reset Password" : "Welcome Back"}</h2>
            <p className="text-slate-500 font-medium">{isForgotPassword ? "Provide your username and a new strong password." : "Sign in to your account to continue your progress."}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-2xl text-sm font-bold flex items-center justify-center">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 px-4 py-3 rounded-2xl text-sm font-bold flex items-center justify-center">
                {success}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-500 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                  placeholder="name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-semibold text-slate-700">{isForgotPassword ? "New Password" : "Password"}</label>
                {!isForgotPassword && (
                  <button type="button" onClick={() => { setIsForgotPassword(true); setError(""); setSuccess(""); }} className="text-xs font-bold text-primary-600 hover:text-primary-700 transition-colors">
                    Forgot?
                  </button>
                )}
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-500 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
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
              className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-primary-500/25 transition-all duration-300 disabled:opacity-70 group"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isForgotPassword ? "Update Password" : "Sign In"}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {isForgotPassword ? (
            <p className="mt-8 text-center text-slate-500 text-sm font-medium">
              Remember your password?{" "}
              <button onClick={() => { setIsForgotPassword(false); setError(""); }} className="text-primary-600 font-bold hover:underline underline-offset-4">
                Sign in
              </button>
            </p>
          ) : (
            <p className="mt-8 text-center text-slate-500 text-sm font-medium">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary-600 font-bold hover:underline underline-offset-4">
                Create account
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}