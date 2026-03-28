import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase";

export const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for persistent simple auth
    const session = localStorage.getItem("auth_session");
    if (session) {
      setUser(JSON.parse(session));
    }
    setLoading(false);
  }, []);

  const signup = async (username, password, name) => {
    // insert into public.users
    const { data, error } = await supabase
      .from('users')
      .insert([{ username, password, name }])
      .select()
      .single();

    if (error) throw error;

    const sessionUser = {
      uid: data.id,
      username: data.username,
      displayName: data.name,
    };
    
    setUser(sessionUser);
    localStorage.setItem("auth_session", JSON.stringify(sessionUser));
    return sessionUser;
  };

  const login = async (username, password) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .eq('password', password)
      .single();

    if (error || !data) {
      throw new Error("Invalid username or password");
    }

    const sessionUser = {
      uid: data.id,
      username: data.username,
      displayName: data.name,
    };

    setUser(sessionUser);
    localStorage.setItem("auth_session", JSON.stringify(sessionUser));
    return sessionUser;
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("auth_session");
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};