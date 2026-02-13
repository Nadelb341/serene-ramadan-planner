import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AppHeader from "@/components/AppHeader";
import DaySelector from "@/components/DaySelector";
import DailyPlanner from "@/components/DailyPlanner";
import CalendarModal from "@/components/CalendarModal";
import NotesSection from "@/components/NotesSection";
import { Calendar, BookOpen, StickyNote } from "lucide-react";

const Dashboard = () => {
  const { user, profile } = useAuth();
  const [selectedDay, setSelectedDay] = useState(1);
  const [activeTab, setActiveTab] = useState<"planner" | "calendar" | "notes">("planner");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("daily_entries")
      .select("day_number")
      .eq("user_id", user.id)
      .then(({ data }) => {
        if (data) setCompletedDays(data.map(d => d.day_number));
      });
  }, [user]);

  const greeting = profile?.first_name
    ? `Assalamu Alaikum, ${profile.first_name} 🌙`
    : "Assalamu Alaikum 🌙";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />

      <main className="flex-1 p-4 max-w-2xl mx-auto w-full">
        <div className="mb-4 animate-fade-in">
          <h2 className="font-display text-xl text-foreground">{greeting}</h2>
          <p className="text-sm text-muted-foreground">Ramadan 2026 • Jour {selectedDay}/30</p>
        </div>

        {/* Tab bar */}
        <div className="flex bg-muted rounded-lg p-1 mb-4">
          {([
            { key: "planner" as const, icon: BookOpen, label: "Planner" },
            { key: "calendar" as const, icon: Calendar, label: "Agenda" },
            { key: "notes" as const, icon: StickyNote, label: "Notes" },
          ]).map(tab => (
            <button
              key={tab.key}
              onClick={() => tab.key === "calendar" ? setCalendarOpen(true) : setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-sm rounded-md font-medium transition-colors ${activeTab === tab.key && tab.key !== "calendar" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "planner" && (
          <>
            <DaySelector
              selectedDay={selectedDay}
              onSelectDay={setSelectedDay}
              completedDays={completedDays}
            />
            <DailyPlanner
              dayNumber={selectedDay}
              onSaved={() => {
                if (!completedDays.includes(selectedDay)) {
                  setCompletedDays([...completedDays, selectedDay]);
                }
              }}
            />
          </>
        )}

        {activeTab === "notes" && <NotesSection />}

        <CalendarModal open={calendarOpen} onClose={() => setCalendarOpen(false)} />
      </main>
    </div>
  );
};

export default Dashboard;
