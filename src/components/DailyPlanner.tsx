import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Save, BookOpen, Star, Sparkles, Heart } from "lucide-react";
import { RAMADAN_DAYS, EID_PRAYER_INFO, END_RAMADAN_DUA } from "@/data/ramadanContent";

interface Props {
  dayNumber: number;
  onSaved: () => void;
}

type EntryData = {
  is_fasting: boolean;
  cycle_phase: string;
  energy_level: number;
  quran_reading: boolean;
  morning_adhkar: boolean;
  evening_adhkar: boolean;
  istighfar: boolean;
  tarawih: boolean;
  tahajjud: boolean;
  charity: boolean;
  daily_challenge: boolean;
  dhikr: boolean;
  on_time_prayer: boolean;
  fajr_fard: boolean; fajr_sunnah: boolean; fajr_nafl: boolean;
  dhuhr_fard: boolean; dhuhr_sunnah: boolean; dhuhr_nafl: boolean;
  asr_fard: boolean; asr_sunnah: boolean; asr_nafl: boolean;
  maghrib_fard: boolean; maghrib_sunnah: boolean; maghrib_nafl: boolean;
  isha_fard: boolean; isha_sunnah: boolean; isha_nafl: boolean;
  sahur_notes: string;
  iftar_notes: string;
  sport_notes: string;
  tomorrow_plans: string;
  faith_level: number;
  gratitude_notes: string;
  three_good_things: string;
  improvement_tomorrow: string;
};

const defaultEntry: EntryData = {
  is_fasting: true, cycle_phase: "", energy_level: 3,
  quran_reading: false, morning_adhkar: false, evening_adhkar: false,
  istighfar: false, tarawih: false, tahajjud: false, charity: false,
  daily_challenge: false, dhikr: false, on_time_prayer: false,
  fajr_fard: false, fajr_sunnah: false, fajr_nafl: false,
  dhuhr_fard: false, dhuhr_sunnah: false, dhuhr_nafl: false,
  asr_fard: false, asr_sunnah: false, asr_nafl: false,
  maghrib_fard: false, maghrib_sunnah: false, maghrib_nafl: false,
  isha_fard: false, isha_sunnah: false, isha_nafl: false,
  sahur_notes: "", iftar_notes: "", sport_notes: "",
  tomorrow_plans: "", faith_level: 5,
  gratitude_notes: "", three_good_things: "", improvement_tomorrow: "",
};

const DailyPlanner = ({ dayNumber, onSaved }: Props) => {
  const { user, profile } = useAuth();
  const [entry, setEntry] = useState<EntryData>({ ...defaultEntry });
  const [saving, setSaving] = useState(false);
  const [existingId, setExistingId] = useState<string | null>(null);

  const dayContent = RAMADAN_DAYS[dayNumber - 1];

  useEffect(() => {
    if (!user) return;
    setEntry({ ...defaultEntry });
    setExistingId(null);

    supabase
      .from("daily_entries")
      .select("*")
      .eq("user_id", user.id)
      .eq("day_number", dayNumber)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setExistingId(data.id);
          const mapped: EntryData = { ...defaultEntry };
          Object.keys(defaultEntry).forEach(key => {
            if ((data as any)[key] !== null && (data as any)[key] !== undefined) {
              (mapped as any)[key] = (data as any)[key];
            }
          });
          setEntry(mapped);
        }
      });
  }, [user, dayNumber]);

  const update = (field: keyof EntryData, value: any) => {
    setEntry(prev => ({ ...prev, [field]: value }));
  };

  const save = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const payload = { ...entry, user_id: user.id, day_number: dayNumber };
      if (existingId) {
        const { error } = await supabase.from("daily_entries").update(payload).eq("id", existingId);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from("daily_entries").insert(payload).select("id").single();
        if (error) throw error;
        setExistingId(data.id);
      }
      onSaved();
      toast.success("Jour " + dayNumber + " sauvegardé ✓");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;
  const prayerKeys = {
    Fajr: ["fajr_fard", "fajr_sunnah", "fajr_nafl"],
    Dhuhr: ["dhuhr_fard", "dhuhr_sunnah", "dhuhr_nafl"],
    Asr: ["asr_fard", "asr_sunnah", "asr_nafl"],
    Maghrib: ["maghrib_fard", "maghrib_sunnah", "maghrib_nafl"],
    Isha: ["isha_fard", "isha_sunnah", "isha_nafl"],
  } as const;

  const essentials = [
    { key: "quran_reading" as const, label: "Lecture du Coran" },
    { key: "morning_adhkar" as const, label: "Adhkar du matin" },
    { key: "evening_adhkar" as const, label: "Adhkar du soir" },
    { key: "istighfar" as const, label: "Istighfar" },
    { key: "tarawih" as const, label: "Tarawih" },
    { key: "tahajjud" as const, label: "Tahajjud" },
    { key: "charity" as const, label: "Aumône" },
    { key: "daily_challenge" as const, label: "Défi du jour" },
    { key: "dhikr" as const, label: "Dhikr" },
    { key: "on_time_prayer" as const, label: "Prière à l'heure" },
  ];

  const showCycle = profile?.gender === "Fille";
  const phase = dayNumber <= 10 ? "Miséricorde" : dayNumber <= 20 ? "Pardon" : "Protection";

  return (
    <div className="space-y-4 animate-fade-in pb-6">
      {/* Header */}
      <div className="bg-card rounded-xl p-4 border border-border">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-display text-lg">Jour {dayNumber} / 30</h3>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-accent/20 text-accent-foreground">
            {phase}
          </span>
        </div>

        {/* Fasting */}
        <div className="flex items-center gap-4 mb-3 mt-3">
          <span className="text-sm font-medium">Je jeûne ?</span>
          {["Oui", "Non"].map(v => (
            <button
              key={v}
              onClick={() => update("is_fasting", v === "Oui")}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                (v === "Oui" && entry.is_fasting) || (v === "Non" && !entry.is_fasting)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        {/* Cycle (for Fille only) */}
        {showCycle && (
          <div className="mb-3">
            <span className="text-sm font-medium block mb-1">Phase du cycle</span>
            <Input
              placeholder="Ex: Folliculaire, Ovulatoire..."
              value={entry.cycle_phase}
              onChange={e => update("cycle_phase", e.target.value)}
              className="text-sm"
            />
          </div>
        )}

        {/* Energy */}
        <div className="mb-1">
          <span className="text-sm font-medium block mb-1">Niveau d'énergie</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(l => (
              <button
                key={l}
                onClick={() => update("energy_level", l)}
                className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
                  l <= entry.energy_level ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 📖 Coran du jour */}
      <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen size={16} className="text-primary" />
          <h4 className="font-display text-sm font-bold">📖 Lecture du Coran</h4>
        </div>
        <div className="space-y-2">
          <div>
            <span className="text-xs font-semibold text-muted-foreground">Méthode 1 :</span>
            <p className="text-sm text-foreground">{dayContent.coran.method1}</p>
          </div>
          <div>
            <span className="text-xs font-semibold text-muted-foreground">Méthode 2 :</span>
            <p className="text-sm text-foreground">{dayContent.coran.method2}</p>
          </div>
        </div>
      </div>

      {/* ✨ Noms d'Allah */}
      {dayContent.namesOfAllah.length > 0 && (
        <div className="bg-accent/10 rounded-xl p-4 border border-accent/20">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-accent" />
            <h4 className="font-display text-sm font-bold">J'apprends les noms d'Allah ﷻ</h4>
          </div>
          <ul className="space-y-1">
            {dayContent.namesOfAllah.map((name, i) => (
              <li key={i} className="text-sm text-foreground flex items-start gap-2">
                <Star size={12} className="text-accent mt-1 flex-shrink-0" />
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 🏆 Challenge du jour */}
      <div className="bg-secondary rounded-xl p-4 border border-border">
        <h4 className="font-display text-sm font-bold mb-1">🏆 Challenge du jour</h4>
        <p className="text-sm text-foreground">{dayContent.challenge}</p>
      </div>

      {/* 📜 Hadith / Rappel */}
      <div className="bg-primary/5 rounded-xl p-4 border border-primary/15">
        <h4 className="font-display text-sm font-bold mb-1 text-primary">📜 Hadith / Rappel</h4>
        <p className="text-sm italic text-foreground">{dayContent.hadith.text}</p>
        {dayContent.hadith.source && (
          <p className="text-xs text-muted-foreground mt-1">— {dayContent.hadith.source}</p>
        )}
      </div>

      {/* Essentials */}
      <div className="bg-card rounded-xl p-4 border border-border">
        <h4 className="font-display text-sm font-bold mb-3">✅ Les essentiels</h4>
        <div className="grid grid-cols-2 gap-2">
          {essentials.map(e => (
            <label key={e.key} className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox
                checked={entry[e.key]}
                onCheckedChange={v => update(e.key, !!v)}
              />
              {e.label}
            </label>
          ))}
        </div>
      </div>

      {/* Prayers */}
      <div className="bg-card rounded-xl p-4 border border-border">
        <h4 className="font-display text-sm font-bold mb-3">🕌 Prières</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted-foreground">
                <th className="text-left py-1"></th>
                <th className="text-center py-1 text-xs">Fard</th>
                <th className="text-center py-1 text-xs">Sunnah</th>
                <th className="text-center py-1 text-xs">Nafl</th>
              </tr>
            </thead>
            <tbody>
              {prayers.map(p => (
                <tr key={p} className="border-t border-border/50">
                  <td className="py-2 font-medium">{p}</td>
                  {prayerKeys[p].map(k => (
                    <td key={k} className="text-center py-2">
                      <Checkbox
                        checked={entry[k as keyof EntryData] as boolean}
                        onCheckedChange={v => update(k as keyof EntryData, !!v)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hygiene de vie */}
      <div className="bg-card rounded-xl p-4 border border-border">
        <h4 className="font-display text-sm font-bold mb-3">🍽️ Hygiène de vie</h4>
        {([
          { key: "sahur_notes" as const, label: "🌅 Sahur" },
          { key: "iftar_notes" as const, label: "🌙 Iftar" },
          { key: "sport_notes" as const, label: "🏃 Sport" },
        ]).map(item => (
          <div key={item.key} className="mb-2">
            <span className="text-sm font-medium">{item.label}</span>
            <Input
              value={entry[item.key]}
              onChange={e => update(item.key, e.target.value)}
              placeholder="Notes..."
              className="mt-1 text-sm"
            />
          </div>
        ))}
      </div>

      {/* Tomorrow */}
      <div className="bg-card rounded-xl p-4 border border-border">
        <h4 className="font-display text-sm font-bold mb-2">🌟 Pour demain Insha'Allah</h4>
        <Textarea
          value={entry.tomorrow_plans}
          onChange={e => update("tomorrow_plans", e.target.value)}
          placeholder="Mes objectifs pour demain..."
          rows={3}
          className="text-sm"
        />
      </div>

      {/* Faith, gratitude */}
      <div className="bg-card rounded-xl p-4 border border-border">
        <h4 className="font-display text-sm font-bold mb-2">💫 Niveau de foi</h4>
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 10 }, (_, i) => i + 1).map(l => (
            <button
              key={l}
              onClick={() => update("faith_level", l)}
              className={`flex-1 h-7 rounded text-xs font-bold transition-all ${
                l <= entry.faith_level ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <div>
            <span className="text-sm font-medium">Aujourd'hui, El hamdoullilah, je suis reconnaissant(e) pour :</span>
            <Textarea value={entry.gratitude_notes} onChange={e => update("gratitude_notes", e.target.value)} rows={2} className="mt-1 text-sm" />
          </div>
          <div>
            <span className="text-sm font-medium">3 choses qui se sont bien passées aujourd'hui :</span>
            <Textarea value={entry.three_good_things} onChange={e => update("three_good_things", e.target.value)} rows={2} className="mt-1 text-sm" />
          </div>
          <div>
            <span className="text-sm font-medium">Ce que je vais améliorer pour demain inshaAllah :</span>
            <Textarea value={entry.improvement_tomorrow} onChange={e => update("improvement_tomorrow", e.target.value)} rows={2} className="mt-1 text-sm" />
          </div>
        </div>
      </div>

      {/* Special content for last days */}
      {dayNumber === 30 && (
        <>
          <div className="bg-accent/10 rounded-xl p-4 border border-accent/20">
            <h4 className="font-display text-sm font-bold mb-2">🕌 La prière de l'Aid</h4>
            <p className="text-sm text-foreground whitespace-pre-line">{EID_PRAYER_INFO}</p>
          </div>
          <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Heart size={16} className="text-primary" />
              <h4 className="font-display text-sm font-bold">🤲 Invocation de fin de Ramadan</h4>
            </div>
            <p className="text-sm text-foreground whitespace-pre-line">{END_RAMADAN_DUA}</p>
          </div>
        </>
      )}

      {/* Save */}
      <Button onClick={save} disabled={saving} className="w-full gap-2">
        <Save size={16} />
        {saving ? "Sauvegarde..." : "Sauvegarder le jour " + dayNumber}
      </Button>
    </div>
  );
};

export default DailyPlanner;
