import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import "./Habits.css";

export default function HabitReminderPage() {
  const { category, habitName } = useParams();
  const navigate = useNavigate();

  const normalizedHabit = habitName?.trim().toLowerCase();

  // Main habit fields
  const [goal, setGoal] = useState("");
  const [duration, setDuration] = useState(""); // minutes
  const [logDate, setLogDate] = useState(new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState("");
  const [score, setScore] = useState(3); 
  const [time, setTime] = useState("");
  const [completed, setCompleted] = useState(false);
  const [gratitudePoints, setGratitudePoints] = useState([""]);
 // 🔹 DRINKING WATER STATES
  const [date, setDate] = useState("");
  const [water, setWater] = useState("");
  const [days, setDays] = useState([]);
const [meal, setMeal] = useState("");
const [sleepHours, setSleepHours] = useState("");
const [calories, setCalories] = useState("");
const [food,setFood] = useState("")
const [difficulty, setDifficulty] = useState("");
const [activityType,setActivityType] = useState("")
const [detoxType, setDetoxType] = useState("")
const [offlineActivity, setOfflineActivity] = useState("")
const [detoxMood, setDetoxMood] = useState("")
const [familyMembers,setFamilyMembers] = useState("")
const [familyMood,setFamilyMood] = useState("")
const [natureActivity,setNatureActivity] = useState("")
const [natureMood,setNatureMood] = useState("")
const [wakeTime, setWakeTime] = useState("")
const [targetTime, setTargetTime] = useState("")
const [musicType, setMusicType] = useState("")


const [weekDays, setWeekDays] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });
  // 🔹 TOGGLE DAY (circle)
  const toggleDay = (day) => {
    if (days.includes(day)) {
      setDays(days.filter((d) => d !== day));
    } else {
      setDays([...days, day]);
    }
  };

   // ---------------- REMINDER ----------------
  const showReminder = () => {
    if (Notification.permission === "granted") {
      new Notification("⏰ Habit Reminder", {
        body: `Time for ${habitName}!`,
      });
    }
  };
   const setHabitReminder = () => {
    if (!time) return alert("Select time ⏰");

    const now = new Date();
    const target = new Date();

    const [h, m] = time.split(":");
    target.setHours(h);
    target.setMinutes(m);

    let delay = target - now;
    if (delay < 0) delay += 24 * 60 * 60 * 1000;

    setTimeout(showReminder, delay);

    alert("Reminder set 🔔");
   };
     // ---------------- HANDLERS ----------------
  const handleCheck = (day) => {
    setWeekDays({ ...weekDays, [day]: !weekDays[day] });
  };

  const handlePointChange = (i, val) => {
    const arr = [...gratitudePoints];
    arr[i] = val;
    setGratitudePoints(arr);
  };

  const addGratitudePoint = () => {
    setGratitudePoints([...gratitudePoints, ""]);
  };
  

  const handleSave = () => {
    const habitData = {
      category,
      habitName,
      goal,
      duration,
      logDate,
      completed,
      score,
      notes,
      weekDays,
      reminderTime: time,
      gratitudePoints:
        normalizedHabit === "gratitude"
          ? gratitudePoints.filter((p) => p.trim() !== "")
          : [],
    };
    const existing = JSON.parse(localStorage.getItem("habits")) || [];
    existing.push(habitData);
    localStorage.setItem("habits", JSON.stringify(existing));

    alert("Habit Saved Successfully ✅");
    navigate(`/habits/${category}`);
  };
  return (

  <div className="reminder-overlay">

  <div className="reminder-card">

  <h2>✨ {habitName}</h2>


  

    

  {/* 💧 DRINKING WATER */}
        {normalizedHabit === "drinking-water" && (
          <>
            

            <input
              type="number"
              placeholder="Water Intake (glasses)"
              value={water}
              onChange={(e) => setWater(e.target.value)}
            />

           

            
          </>
        )}
 {normalizedHabit === "take-vitamins" && (
  <>
    

   
    
  </>
)}
{normalizedHabit === "sleep-on-time" && (
  <>
    

    {/* Sleep Hours */}
    <input
      type="number"
      placeholder="Hours slept (e.g. 7)"
      value={sleepHours}
      onChange={(e) => setSleepHours(e.target.value)}
    />
</>
)}
{normalizedHabit === "healthy-meal" && (
  <>
   
    {/* Meal */}
    <input
      type="text"
      placeholder="What did you eat?"
      value={meal}
      onChange={(e) => setMeal(e.target.value)}
    />

    
  </>
)}
{normalizedHabit === "take-calories" && (
  <>
   <input
type="text"
placeholder="Food Name"
value={food}
onChange={(e)=>setFood(e.target.value)}
/>

<input
type="number"
placeholder="Calories"
value={calories}
onChange={(e)=>setCalories(e.target.value)}
/>
  </>
)}

        {/* Workout */}
{normalizedHabit === "workout" && (
  <>
    
    <select value={goal} onChange={(e) => setGoal(e.target.value)}>
      <option value="">Select Workout Type</option>
      <option value="Cardio">Cardio</option>
      <option value="Gym Workout">Gym Workout</option>
      <option value="Home Workout">Home Workout</option>
    </select>
    <input
      type="number"
      placeholder="Duration (minutes)"
      value={duration}
      onChange={(e) => setDuration(e.target.value)}
    />
  </>
)}

{/* Strength Training */}
{normalizedHabit === "strength-training" && (
  <>
    
    <select value={goal} onChange={(e) => setGoal(e.target.value)}>
      <option value="">Training Type</option>
      <option value="Weights">Weights</option>
      <option value="Resistance Bands">Resistance Bands</option>
      <option value="Bodyweight">Bodyweight</option>
    </select>
    <input
      type="number"
      placeholder="Duration (minutes)"
      value={duration}
      onChange={(e) => setDuration(e.target.value)}
    />
  </>
)}

{/* Stretching */}
{normalizedHabit === "stretching" && (
  <>
   
    <select value={goal} onChange={(e) => setGoal(e.target.value)}>
      <option value="">Stretching Type</option>
      <option value="Morning Stretch">Morning Stretch</option>
      <option value="Yoga Stretch">Yoga Stretch</option>
      <option value="Flexibility Routine">Flexibility Routine</option>
    </select>
    <input
      type="number"
      placeholder="Duration (minutes)"
      value={duration}
      onChange={(e) => setDuration(e.target.value)}
    />
  </>
)}

{/* Daily Walk */}
{normalizedHabit === "daily-walk" && (
  <>
   
    <input
      type="number"
      placeholder="Steps / Duration"
      value={duration}
      onChange={(e) => setDuration(e.target.value)}
    />
  </>
)}

{/* Active Minutes */}
{normalizedHabit === "yoga" && (

<div className="yoga-section">

<h3>Yoga Details</h3>

<label>Yoga Type</label>
<select
value={yogaType}
onChange={(e)=>setYogaType(e.target.value)}
>

<option value="">Select Yoga Type</option>
<option value="Surya Namaskar">Surya Namaskar</option>
<option value="Hatha Yoga">Hatha Yoga</option>
<option value="Vinyasa Yoga">Vinyasa Yoga</option>
<option value="Power Yoga">Power Yoga</option>
<option value="Pranayama">Pranayama</option>

</select>

<label>Duration (minutes)</label>

<input
type="number"
value={duration}
onChange={(e)=>setDuration(e.target.value)}
/>

<label>Mood</label>

<select
value={mood}
onChange={(e)=>setMood(e.target.value)}
>

<option value="">Select Mood</option>
<option value="Relaxed">Relaxed</option>
<option value="Calm">Calm</option>
<option value="Energetic">Energetic</option>

</select>

<label>Notes</label>

<textarea
value={notes}
onChange={(e)=>setNotes(e.target.value)}
/>

</div>

)}

{/* Meditation */}
        {normalizedHabit === "meditation" && (
          <>
           
            <select value={goal} onChange={(e) => setGoal(e.target.value)}>
              <option value="">Select Type</option>
              <option value="Mindfulness">Mindfulness</option>
              <option value="Guided">Guided</option>
              <option value="Visualization">Visualization</option>
            </select>
            <input
              type="number"
              placeholder="Duration (minutes)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
            <input
              type="number"
              placeholder="Focus / Clarity (1–5)"
              min="1"
              max="5"
              value={score}
              onChange={(e) => setScore(e.target.value)}
            />
            <textarea
              placeholder="Reflection / Insight"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </>
        )}

        {/* Deep Breathing */}
        {normalizedHabit === "deep-breathing" && (
          <>
           
            <input
              type="number"
              placeholder="Duration (minutes)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
            <input
              type="number"
              placeholder="Focus / Calmness (1–5)"
              min="1"
              max="5"
              value={score}
              onChange={(e) => setScore(e.target.value)}
            />
            <textarea
              placeholder="Reflection / Insight"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </>
        )}

        {/* Reading */}
        {normalizedHabit === "reading" && (
          <>
           
            <input
              type="text"
              placeholder="Book / Article"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
            <input
              type="number"
              placeholder="Duration (minutes)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
            <textarea
              placeholder="Reflection / Key Takeaway"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </>
        )}

      
        {/* Gratitude */}
        {normalizedHabit === "gratitude" && (
          <>
            
            {gratitudePoints.map((point, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Gratitude Point ${index + 1}`}
                value={point}
                onChange={(e) => handlePointChange(index, e.target.value)}
                className="mb-2 w-full border rounded px-2 py-1"
              />
            ))}
            <button
              type="button"
              onClick={addGratitudePoint}
              className="bg-green-600 text-white px-3 py-1 rounded mb-2"
            >
              Add Another Gratitude
            </button>

            <input
              type="number"
              placeholder="Duration (minutes)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
            <textarea
              placeholder="Reflection / Insight"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </>
        )}
        {/* Morning Reflection */}
        {/* Morning Reflection */}
{normalizedHabit === "morning-reflection" && (
  <>
    

    <div className="reflection-grid">

      <div className="field">
        <label>Today's Intention</label>
        <input
          type="text"
          placeholder="Set your intention for the day"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
      </div>

      <div className="field">
        <label>Morning Energy Level</label>
        <select
          value={score}
          onChange={(e) => setScore(e.target.value)}
        >
          <option value="">Select Energy Level</option>
          <option value="High">High</option>
          <option value="Moderate">Moderate</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div className="field">
        <label>Main Focus for Today</label>
        <input
          type="text"
          placeholder="Example: Complete project module"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>

      <div className="field full">
        <label>Reflection Notes</label>
        <textarea
          placeholder="Write your thoughts, plans, or motivation for the day..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

    </div>
  </>
)}

{normalizedHabit === "task-planning" && (
  <>
  

    <div className="task-grid">

      <div className="task-field">
        <label>Task Title</label>
        <input
          type="text"
          placeholder="Enter task title"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
      </div>

      <div className="task-field">
        <label>Priority</label>
        <select
          value={score}
          onChange={(e) => setScore(e.target.value)}
        >
          <option value="">Select Priority</option>
          <option value="High Priority">High</option>
          <option value="Medium Priority">Medium</option>
          <option value="Low Priority">Low</option>
        </select>
      </div>

      <div className="task-field">
        <label>Deadline</label>
        <input
          type="date"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>

      <div className="task-field">
        <label>Estimated Time</label>
        <input
          type="number"
          placeholder="Time in minutes"
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>

      <div className="task-field full">
        <label>Task Description</label>
        <textarea
          placeholder="Add task details, notes, or instructions..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

    </div>
  </>
)}
{normalizedHabit === "deep-work" && (
  <>
  

    <div className="task-grid">

      <div className="task-field">
        <label>Work Title</label>
        <input
          type="text"
          placeholder="Example: Study Machine Learning"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
      </div>

      <div className="task-field">
        <label>Session Duration</label>
        <input
          type="number"
          placeholder="Minutes"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>

      <div className="task-field">
        <label>Start Time</label>
        <input
          type="time"
        />
      </div>

      <div className="task-field">
        <label>End Time</label>
        <input
          type="time"
        />
      </div>

      <div className="task-field full">
        <label>Work Notes</label>
        <textarea
          placeholder="What did you work on during this session?"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

    </div>
  </>
)}
{normalizedHabit === "goal-tracking" && (
  <>
    

    <div className="task-grid">

      <div className="task-field">
        <label>Goal Title</label>
        <input
          type="text"
          placeholder="Enter your goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
      </div>

      <div className="task-field">
        <label>Goal Type</label>
        <select
          value={score}
          onChange={(e) => setScore(e.target.value)}
        >
          <option value="">Select Goal Type</option>
          <option value="Daily Goal">Daily Goal</option>
          <option value="Weekly Goal">Weekly Goal</option>
          <option value="Monthly Goal">Monthly Goal</option>
        </select>
      </div>

      <div className="task-field">
        <label>Target Date</label>
        <input
          type="date"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>

      <div className="task-field">
        <label>Status</label>
        <select
          onChange={(e) => setCompleted(e.target.value === "Completed")}
        >
          <option value="">Select Status</option>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="task-field full">
        <label>Progress Notes</label>
        <textarea
          placeholder="Write progress updates..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

    </div>
  </>
)}
{normalizedHabit === "complete-task" && (
  <>
    

    <div className="task-grid">

      <div className="task-field">
        <label>Task Title</label>
        <input
          type="text"
          placeholder="Enter task title"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
      </div>

      <div className="task-field">
        <label>Priority</label>
        <select
          value={score}
          onChange={(e) => setScore(e.target.value)}
        >
          <option value="">Select Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div className="task-field">
        <label>Deadline</label>
        <input
          type="date"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>

      <div className="task-field">
        <label>Status</label>
        <select
          onChange={(e) => setCompleted(e.target.value === "Completed")}
        >
          <option value="">Select Status</option>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="task-field full">
        <label>Task Notes</label>
        <textarea
          placeholder="Write task details or progress notes..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

    </div>
  </>
)}
{normalizedHabit === "focus-session" && (
  <>
   

    <div className="task-grid">

      <div className="task-field">
        <label>Session Title</label>
        <input
          type="text"
          placeholder="Example: Study React"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
      </div>

      <div className="task-field">
        <label>Session Duration</label>
        <input
          type="number"
          placeholder="Minutes"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>

      <div className="task-field">
        <label>Start Time</label>
        <input type="time" />
      </div>

      <div className="task-field">
        <label>End Time</label>
        <input type="time" />
      </div>

      <div className="task-field full">
        <label>Session Notes</label>
        <textarea
          placeholder="Write what you focused on in this session..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

    </div>
  </>
)}
{normalizedHabit === "digital-detox" && (

<div className="detox-section">

<h3>Digital Detox</h3>

<label>Detox Type</label>
<select
value={detoxType}
onChange={(e)=>setDetoxType(e.target.value)}
>

<option value="">Select Detox Type</option>
<option value="Phone Detox">Phone Detox</option>
<option value="Social Media Detox">Social Media Detox</option>
<option value="All Screens">All Screens</option>

</select>


<label>Duration (minutes)</label>
<input
type="number"
placeholder="Screen free time"
value={duration}
onChange={(e)=>setDuration(e.target.value)}
/>


<label>Offline Activity</label>
<input
type="text"
placeholder="Example: Reading, Walking"
value={offlineActivity}
onChange={(e)=>setOfflineActivity(e.target.value)}
/>


<label>Mood After Detox</label>
<select
value={detoxMood}
onChange={(e)=>setDetoxMood(e.target.value)}
>

<option value="">Select Mood</option>
<option value="Relaxed">Relaxed</option>
<option value="Focused">Focused</option>
<option value="Calm">Calm</option>

</select>


<label>Notes</label>
<textarea
placeholder="Write about your experience..."
value={notes}
onChange={(e)=>setNotes(e.target.value)}
/>

</div>

)}

{normalizedHabit === "family-time" && (

<div className="family-section">
<label>Activity</label>
<select
value={activityType}
onChange={(e)=>setActivityType(e.target.value)}
>

<option value="">Select Activity</option>
<option value="Family Dinner">Family Dinner</option>
<option value="Talking / Chat">Talking</option>
<option value="Watching Movie">Movie Night</option>
<option value="Going Out">Going Out</option>
<option value="Playing Games">Playing Games</option>

</select>


<label>Duration (minutes)</label>
<input
type="number"
placeholder="Time spent"
value={duration}
onChange={(e)=>setDuration(e.target.value)}
/>


<label>Family Members</label>
<input
type="text"
placeholder="Example: Mom, Dad, Sister"
value={familyMembers}
onChange={(e)=>setFamilyMembers(e.target.value)}
/>


<label>Mood</label>
<select
value={familyMood}
onChange={(e)=>setFamilyMood(e.target.value)}
>

<option value="">Select Mood</option>
<option value="Happy">Happy</option>
<option value="Relaxed">Relaxed</option>
<option value="Enjoyable">Enjoyable</option>

</select>


<label>Notes</label>
<textarea
placeholder="Write about your family time..."
value={notes}
onChange={(e)=>setNotes(e.target.value)}
/>

</div>

)}
{normalizedHabit === "wake-early" && (

<div className="wake-section">


<label>Target Wake Time</label>
<input
type="time"
value={targetTime}
onChange={(e)=>setTargetTime(e.target.value)}
/>

<label>Actual Wake Time</label>
<input
type="time"
value={wakeTime}
onChange={(e)=>setWakeTime(e.target.value)}
/>

<label>Sleep Hours</label>
<input
type="number"
placeholder="Example: 7"
value={sleepHours}
onChange={(e)=>setSleepHours(e.target.value)}
/>



<label>Notes</label>
<textarea
placeholder="How did you feel after waking up?"
value={notes}
onChange={(e)=>setNotes(e.target.value)}
/>

</div>

)}
{normalizedHabit === "relax-music" && (

<div className="music-section">



<label>Music Type</label>
<select
value={musicType}
onChange={(e)=>setMusicType(e.target.value)}
>

<option value="">Select Music</option>
<option value="Calm Music">Calm Music</option>
<option value="Instrumental">Instrumental</option>
<option value="Meditation Music">Meditation Music</option>
<option value="Favorite Songs">Favorite Songs</option>

</select>


<label>Duration (minutes)</label>
<input
type="number"
placeholder="Listening time"
value={duration}
onChange={(e)=>setDuration(e.target.value)}
/>




<label>Notes</label>
<textarea
placeholder="Write about your experience..."
value={notes}
onChange={(e)=>setNotes(e.target.value)}
/>

</div>

)}
{normalizedHabit === "nature-time" && (

<div className="nature-section">



<label>Activity</label>
<select
value={natureActivity}
onChange={(e)=>setNatureActivity(e.target.value)}
>

<option value="">Select Activity</option>
<option value="Nature Walk">Nature Walk</option>
<option value="Garden Relax">Garden Relax</option>
<option value="Park Visit">Park Visit</option>
<option value="Beach Visit">Beach Visit</option>
<option value="Sunlight Time">Sunlight Time</option>

</select>
<label>Duration (minutes)</label>
<input
type="number"
placeholder="Time spent"
value={duration}
onChange={(e)=>setDuration(e.target.value)}
/>


<label>Mood After Activity</label>
<select
value={natureMood}
onChange={(e)=>setNatureMood(e.target.value)}
>

<option value="">Select Mood</option>
<option value="Relaxed">Relaxed</option>
<option value="Calm">Calm</option>
<option value="Happy">Happy</option>
<option value="Refreshed">Refreshed</option>

</select>


<label>Notes</label>
<textarea
placeholder="Write about your nature experience..."
value={notes}
onChange={(e)=>setNotes(e.target.value)}
/>

</div>

)}

        

        {/* Common Fields */}
        <div className="common-fields">
          <label>
            Date:
            <input
              type="date"
              value={logDate}
              onChange={(e) => setLogDate(e.target.value)}
            />
          </label>
          <label>
            Completed:
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
          </label>
        </div>
        {/* 🔔 REMINDER */}
        <div className="reminder-box">
          <h4>⏰ Reminder</h4>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          <button onClick={setHabitReminder}>Set Reminder</button>
        </div>

       
      

        {/* Weekly Schedule */}
        <div className="week-box">
          {Object.keys(weekDays).map((day) => (
            <div key={day}>
              <input
                type="checkbox"
                checked={weekDays[day]}
                onChange={() => handleCheck(day)}
              />
              {day}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="button-row">
          <button onClick={() => navigate(-1)}>Cancel</button>
          <button onClick={handleSave}>Save Habit</button>
        </div>
      </div>
    </div>
  );
}