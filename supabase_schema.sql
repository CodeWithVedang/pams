-- Run these queries in your Supabase SQL Editor to set up the necessary tables.

-- 1. Create Users Table (Simple Auth)
CREATE TABLE public.users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Habits Table
CREATE TABLE public.habits (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    category TEXT,
    completed TEXT[] DEFAULT ARRAY[]::TEXT[],
    last_completed TEXT,
    streak INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Turn off Row Level Security (RLS) for simple access (since we are doing manual auth)
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.habits DISABLE ROW LEVEL SECURITY;

-- Grant permissions to anon role
GRANT ALL ON TABLE public.users TO anon;
GRANT ALL ON TABLE public.habits TO anon;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon;
