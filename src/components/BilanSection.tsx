import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Star, BookOpen, Moon, Sparkles } from "lucide-react";

interface BilanData {
  perfectDays: number;
  coranDays: number;
  namesLearned: number;
  tarawihDays: number;
  prayerDays: number;
  missedDays: { day: number; reason: string }[];
}

const BilanSection = () => {
  const { user } = useAuth();
  const [bilan, setBilan] = useState<BilanData>({
    perfectDays: 0, coranDays: 0, namesLearned: 0,
    tarawihDays: 0, prayerDays: 0, missedDays: [],
  });

  useEffect(() => {
    if (!user) return;
    supabase
      .from("daily_entries")
      .select("*")
      .eq("user_id", user.id)
      .then(({ data }) => {
        if (!data) return;
        let perfectDays = 0, coranDays = 0, tarawihDays = 0, prayerDays = 0;
        const missedDays: { day: number; reason: string }[] = [];

        data.forEach(entry => {
          if (entry.quran_reading) coranDays++;
          if (entry.tarawih) tarawihDays++;
          if (entry.fajr_fard && entry.dhuhr_fard && entry.asr_fard && entry.maghrib_fard && entry.isha_fard) prayerDays++;
          
          const allEssentials = entry.quran_reading && entry.morning_adhkar && entry.evening_adhkar && entry.tarawih && entry.on_time_prayer;
          const allPrayers = entry.fajr_fard && entry.dhuhr_fard && entry.asr_fard && entry.maghrib_fard && entry.isha_fard;
          if (allEssentials && allPrayers) perfectDays++;

          if (!entry.is_fasting) {
            missedDays.push({
              day: entry.day_number,
              reason: entry.cycle_phase || "Autre",
            });
          }
        });

        setBilan({
          perfectDays, coranDays, namesLearned: 0,
          tarawihDays, prayerDays, missedDays,
        });
      });
  }, [user]);

  const stats = [
    { icon: Star, label: "jours parfaits", value: bilan.perfectDays, color: "text-gold" },
    { icon: BookOpen, label: "jours Coran", value: bilan.coranDays, color: "text-primary" },
    { icon: Moon, label: "Taraweeh", value: bilan.tarawihDays, color: "text-gold" },
    { icon: Sparkles, label: "5 prières", value: bilan.prayerDays, color: "text-primary" },
  ];

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="bg-card rounded-2xl p-5 border border-border">
        <h3 className="font-display text-base font-bold mb-4 flex items-center gap-2">
          <span className="text-gold">◆</span> TON BILAN
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {stats.map(s => (
            <div key={s.label} className="flex flex-col items-center text-center gap-1">
              <s.icon size={20} className={s.color} />
              <span className="text-2xl font-bold text-foreground">{s.value}</span>
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Jours à rattraper */}
      {bilan.missedDays.length > 0 && (
        <div className="bg-card rounded-2xl p-5 border border-border">
          <h3 className="font-display text-base font-bold mb-2 flex items-center gap-2">
            <span className="text-gold">◆</span> JOURS À RATTRAPER
          </h3>
          <p className="text-xs text-muted-foreground mb-3">
            Allah a facilité ces jours pour toi. Tu pourras les rattraper après le Ramadan, insha'Allah.
          </p>
          <div className="space-y-2">
            {bilan.missedDays.map(d => (
              <div
                key={d.day}
                className="flex items-center justify-between bg-secondary rounded-xl px-4 py-2.5"
              >
                <span className="font-bold text-sm">Jour {d.day}</span>
                <span className="text-xs text-gold font-medium">{d.reason}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gold font-semibold mt-3">
            {bilan.missedDays.length} jour{bilan.missedDays.length > 1 ? "s" : ""} à rattraper
          </p>
        </div>
      )}
    </div>
  );
};

export default BilanSection;
