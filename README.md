# 🌿 LifeTrack: Personal Activity Monitoring System (PAMS)

> **LifeTrack** is an advanced, fully functional health and habit-tracking SaaS application. It empowers users to monitor their biological habits, visualize progress through clinical-grade charts, and build sustainable wellness routines through real-time feedback loops.

![LifeTrack Dashboard Preview](https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)

---

## ✨ Key Features

### 🔐 Simple Authentication
- Implemented a decoupled custom username/password authentication wrapper using a Supabase `users` table instead of standard enterprise authentication mechanisms, ensuring ultra-fast sign-in without email verifications.

### 📊 Dynamic Biological Analytics (Reports)
- **Timeframe Filtering:** Seamlessly pivot performance charts between Weekly, Monthly, and Yearly aggregates.
- **Volumetric Distribution:** Visualize your habits mathematically across automatically generated pie charts mapped globally to your data fields.
- **Export Dataset:** Dedicated native CSV export pipelines to securely download your historical health timeline in a single click.

### 📅 Real-Time Calendar Pipeline
- Interactive streak matrices built atop your Supabase `habits` data. Selecting days intelligently fetches the precise timeline of health records established on that date.

### 📱 Progressive Web App (PWA) & Notifications
- Fully installable on all mobile operating systems (iOS/Android).
- Connects directly into native OS-level push notifications to autonomously retrieve, aggregate, and alert users regarding uncompleted daily habits.

### 💎 Premium Design System
- Polished using **Tailwind CSS 4.0** alongside **Framer Motion** for silky-smooth interactive modal animations, rich gradients, and heavily responsive mobile bottom-navigation menus.

---

## 🛠️ Technology Stack

- **Frontend Environment:** React 19 + Vite
- **Styling Architecture:** Tailwind CSS 4.0 (`@tailwindcss/vite`), Lucide React
- **Animation Layer:** Framer Motion
- **Data Visualization:** Recharts
- **Backend & Database Storage:** Supabase (PostgreSQL, Realtime Subscriptions)
- **Deployment & Edge Routing:** Vercel (Recommended)

---

## 🚀 Environment Setup & Deployment

To launch LifeTrack in your local environment, carefully follow the setup instructions below.

### 1. Initialize the Project

Clone the repository and install all dependencies:

```bash
git clone https://github.com/CodeWithVedang/pams.git
cd pams
npm install
```

### 2. Configure the Supabase Backend

Since this project leverages a custom PostgreSQL implementation, you must generate the tables first.

1. Navigate to your **[Supabase Dashboard](https://supabase.com/dashboard)**.
2. In your workspace's **SQL Editor**, run the exact queries found within the localized `supabase_schema.sql` component in your codebase repo. This defines the core `users` and `habits` logic structure.
3. Once completed, copy the dummy data pipeline defined in `seed_vedangs.sql` and run it via the SQL Editor to inject robust realistic graphs into your account interface instantly!

### 3. Bind Environmental Variables

Duplicate or create a `.env` file within the system's root directory (`health-ui/health-ui/`) and securely assign your active keys:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-api-key
```

### 4. Ignite the Development Server

Start the project using Vite's ultra-fast hot reloading server:

```bash
npm run dev
```

The application will be universally deployed to `http://localhost:5173/`.

---

## 🌐 Deploying to Vercel (Production)

To ship your code into a publicly accessible production-grade structure:

1. Push this entire repository up to your connected GitHub account.
2. Navigate to **[Vercel](https://vercel.com/)** and hit **Add New Project**.
3. Import the `CodeWithVedang/pams` repository.
4. Ensure the **Framework Preset** is configured to `Vite`.
5. Under **Environment Variables**, meticulously map your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
6. Click **Deploy**. Vercel will process your build outputs flawlessly into the `dist/` directory!

---

## 🔒 Security Disclaimer
This initial scaffolding utilizes **plain-text user passwords** stored explicitly within the `users` database table to simplify prototyping architecture. It also features explicitly disabled `ROW LEVEL SECURITY (RLS)`. **Before deploying to mass-market public audiences**, developers must refactor this architecture to properly hash keys using `bcrypt` and integrate restrictive RLS constraint parameters. 

---

### Developed continuously by the visionary teams contributing to the Personal Activity Monitoring Engine.
