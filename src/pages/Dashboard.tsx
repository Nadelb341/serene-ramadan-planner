import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import AppHeader from "@/components/AppHeader";
import DayGrid from "@/components/DayGrid";
import BilanSection from "@/components/BilanSection";
import NotesSection from "@/components/NotesSection";
import { Moon, StickyNote } from "lucide-react";

const Dashboard = () => {
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState<"accueil" | "calendrier">("accueil");
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [dayProgress, setDayProgress] = useState<Record<number, number>>({});

  useEffect(() => {
    if (!user) return;
    supabase
      .from("daily_entries")
      .select("*")
      .eq("user_id", user.id)
      .then(({ data }) => {
        if (!data) return;
        setCompletedDays(data.map(d => d.day_number));
        
        const progress: Record<number, number> = {};
        data.forEach(entry => {
          let count = 0;
          if (entry.quran_reading) count++;
          if (entry.dhikr) count++;
          if (entry.morning_adhkar && entry.evening_adhkar) count++;
          if (entry.tarawih) count++;
          if (entry.fajr_fard && entry.dhuhr_fard && entry.asr_fard && entry.maghrib_fard && entry.isha_fard) count++;
          progress[entry.day_number] = count;
        });
        setDayProgress(progress);
      });
  }, [user]);

  const greeting = profile?.first_name
    ? `Assalamu Alaikum, ${profile.first_name} 🌙`
    : "Assalamu Alaikum 🌙";

  const totalProgress = completedDays.length;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />

      <main className="flex-1 p-4 max-w-2xl mx-auto w-full">
        {/* Greeting */}
        <div className="mb-4 animate-fade-in">
          <h2 className="font-display text-xl text-foreground">{greeting}</h2>
        </div>

        {/* Tabs */}
        <div className="flex bg-muted rounded-xl p-1 mb-5">
          {([
            { key: "accueil" as const, label: "Accueil" },
            { key: "calendrier" as const, label: "Calendrier" },
          ]).map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-2.5 text-sm rounded-lg font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "accueil" && (
          <div className="space-y-5 animate-fade-in">
            {/* Hero card */}
            <div className="bg-primary/10 rounded-2xl p-6 text-center border border-primary/20">
              <Moon size={40} className="text-gold mx-auto mb-2" />
              <h3 className="font-display text-2xl font-bold text-foreground">Ramadan 2026</h3>
              <p className="text-sm text-muted-foreground mt-1">Ton calendrier spirituel</p>
            </div>

            {/* Progression */}
            <div className="bg-card rounded-2xl p-5 border border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="font-display text-sm font-bold">Progression</span>
                <span className="text-sm font-bold text-gold">{totalProgress}/30 jours</span>
              </div>
              <div className="w-full h-2.5 bg-secondary rounded-full">
                <div
                  className="h-full bg-gold rounded-full transition-all"
                  style={{ width: `${(totalProgress / 30) * 100}%` }}
                />
              </div>
            </div>

            {/* Bilan */}
            <BilanSection />
          </div>
        )}

        {activeTab === "calendrier" && (
          <div className="space-y-5 animate-fade-in">
            {/* Title */}
            <div className="text-center">
              <h3 className="font-display text-2xl font-bold text-foreground flex items-center justify-center gap-2">
                Ramadan 2026 🌙
              </h3>
              <p className="text-sm text-muted-foreground">Ton calendrier spirituel</p>
            </div>

            {/* Progression */}
            <div className="bg-card rounded-2xl p-4 border border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="font-display text-sm font-bold">Progression</span>
                <span className="text-sm font-bold text-gold">{totalProgress}/30 jours</span>
              </div>
              <div className="w-full h-2.5 bg-secondary rounded-full">
                <div
                  className="h-full bg-gold rounded-full transition-all"
                  style={{ width: `${(totalProgress / 30) * 100}%` }}
                />
              </div>
            </div>

            {/* 30-day grid */}
            <DayGrid completedDays={completedDays} dayProgress={dayProgress} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
