import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ChevronLeft, Save, BookOpen, Star, Sparkles, Heart } from "lucide-react";
import { RAMADAN_DAYS, EID_PRAYER_INFO, END_RAMADAN_DUA } from "@/data/ramadanContent";
import ProgrammeGrid from "@/components/ProgrammeGrid";

type EntryData = {
  is_fasting: boolean;
  fasting_reason: string;
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
  is_fasting: true, fasting_reason: "", cycle_phase: "", energy_level: 3,
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

const fastingReasons = [
  { icon: "🩸", label: "Règles" },
  { icon: "🏥", label: "Maladie" },
  { icon: "✈️", label: "Voyage" },
  { icon: "💬", label: "Autre" },
];

const DayDetail = () => {
  const { dayNumber: dayParam } = useParams();
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const dayNumber = parseInt(dayParam || "1");
  const [entry, setEntry] = useState<EntryData>({ ...defaultEntry });
  const [saving, setSaving] = useState(false);
  const [existingId, setExistingId] = useState<string | null>(null);
  const [showNotFasting, setShowNotFasting] = useState(false);

  const dayContent = RAMADAN_DAYS[dayNumber - 1];
  const phase = dayNumber <= 10 ? "Miséricorde" : dayNumber <= 20 ? "Pardon" : "Protection";

  useEffect(() => {
    if (!dayContent) {
      navigate("/");
    }
  }, [dayContent, navigate]);

  useEffect(() => {
    if (!user) return;
    setEntry({ ...defaultEntry });
    setExistingId(null);
    setShowNotFasting(false);

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
          if (!mapped.is_fasting) setShowNotFasting(true);
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
      const { fasting_reason, ...dbFields } = entry;
      const payload = {
        ...dbFields,
        cycle_phase: entry.is_fasting ? entry.cycle_phase : entry.fasting_reason || entry.cycle_phase,
        user_id: user.id,
        day_number: dayNumber,
      };
      if (existingId) {
        const { error } = await supabase.from("daily_entries").update(payload).eq("id", existingId);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from("daily_entries").insert(payload).select("id").single();
        if (error) throw error;
        setExistingId(data.id);
      }
      toast.success(`Jour ${dayNumber} sauvegardé ✓`);
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center px-4 py-3 bg-primary border-b border-border">
        <button onClick={() => navigate("/")} className="p-2 rounded-lg text-primary-foreground hover:bg-primary-foreground/10">
          <ChevronLeft size={24} />
        </button>
        <h1 className="flex-1 text-center font-display text-lg text-primary-foreground">Jour {dayNumber}</h1>
        <div className="w-10" />
      </header>

      <main className="p-4 max-w-2xl mx-auto pb-8 space-y-4">
        {/* Day title */}
        <div className="text-center py-2">
          <h2 className="font-display text-3xl font-bold text-foreground">Jour {dayNumber}</h2>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary mt-1 inline-block">
            {phase}
          </span>
        </div>

        {/* Fasting toggle */}
        <button
          onClick={() => {
            if (entry.is_fasting) {
              setShowNotFasting(true);
              update("is_fasting", false);
            } else {
              setShowNotFasting(false);
              update("is_fasting", true);
              update("fasting_reason", "");
            }
          }}
          className="w-full flex items-center gap-3 bg-card rounded-xl px-4 py-3 border border-border text-left"
        >
          <span className="text-lg">🤲</span>
          <span className="text-sm text-muted-foreground flex-1">
            {entry.is_fasting ? "Je jeûne aujourd'hui ✓" : "Je n'ai pas jeûné ce jour"}
          </span>
          <ChevronLeft size={16} className="text-muted-foreground rotate-180" />
        </button>

        {/* Fasting reason selector */}
        {showNotFasting && !entry.is_fasting && (
          <div className="bg-card rounded-2xl p-5 border border-border animate-fade-in">
            <h4 className="font-display text-base font-bold mb-3 text-center">Je n'ai pas jeûné ce jour</h4>
            <div className="grid grid-cols-2 gap-2">
              {fastingReasons.map(r => (
                <button
                  key={r.label}
                  onClick={() => update("fasting_reason", r.label)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium border transition-all ${
                    entry.fasting_reason === r.label
                      ? "bg-primary/15 border-primary/30 text-foreground"
                      : "bg-secondary border-border text-muted-foreground"
                  }`}
                >
                  <span>{r.icon}</span> {r.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Programme du jour */}
        <ProgrammeGrid dayNumber={dayNumber} entry={entry} />

        {/* Coran */}
        <div className="bg-primary/10 rounded-2xl p-5 border border-primary/20">
          <div className="flex items-center gap-2 mb-3">
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

        {/* Noms d'Allah */}
        {dayContent.namesOfAllah.length > 0 && (
          <div className="bg-gold/10 rounded-2xl p-5 border border-gold/20">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={16} className="text-gold" />
              <h4 className="font-display text-sm font-bold">J'apprends les noms d'Allah ﷻ</h4>
            </div>
            <ul className="space-y-1.5">
              {dayContent.namesOfAllah.map((name, i) => (
                <li key={i} className="text-sm text-foreground flex items-start gap-2">
                  <Star size={12} className="text-gold mt-1 flex-shrink-0" />
                  {name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Challenge */}
        <div className="bg-secondary rounded-2xl p-5 border border-border">
          <h4 className="font-display text-sm font-bold mb-2">🏆 Challenge du jour</h4>
          <p className="text-sm text-foreground">{dayContent.challenge}</p>
        </div>

        {/* Hadith */}
        <div className="bg-primary/5 rounded-2xl p-5 border border-primary/15">
          <h4 className="font-display text-sm font-bold mb-2 text-primary">📜 Hadith / Rappel</h4>
          <p className="text-sm italic text-foreground">{dayContent.hadith.text}</p>
          {dayContent.hadith.source && (
            <p className="text-xs text-muted-foreground mt-1">— {dayContent.hadith.source}</p>
          )}
        </div>

        {/* Essentials checklist */}
        <div className="bg-card rounded-2xl p-5 border border-border">
          <h4 className="font-display text-sm font-bold mb-3">✅ Les essentiels</h4>
          <div className="grid grid-cols-2 gap-2.5">
            {essentials.map(e => (
              <label key={e.key} className="flex items-center gap-2.5 text-sm cursor-pointer">
                <Checkbox checked={entry[e.key]} onCheckedChange={v => update(e.key, !!v)} />
                {e.label}
              </label>
            ))}
          </div>
        </div>

        {/* Prayers */}
        <div className="bg-card rounded-2xl p-5 border border-border">
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
                    <td className="py-2.5 font-medium">{p}</td>
                    {prayerKeys[p].map(k => (
                      <td key={k} className="text-center py-2.5">
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

        {/* Hygiène de vie */}
        <div className="bg-card rounded-2xl p-5 border border-border">
          <h4 className="font-display text-sm font-bold mb-3">🍽️ Hygiène de vie</h4>
          {([
            { key: "sahur_notes" as const, label: "🌅 Sahur" },
            { key: "iftar_notes" as const, label: "🌙 Iftar" },
            { key: "sport_notes" as const, label: "🏃 Sport" },
          ]).map(item => (
            <div key={item.key} className="mb-3">
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

        {/* Energy */}
        <div className="bg-card rounded-2xl p-5 border border-border">
          <h4 className="font-display text-sm font-bold mb-2">⚡ Niveau d'énergie</h4>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map(l => (
              <button
                key={l}
                onClick={() => update("energy_level", l)}
                className={`flex-1 h-9 rounded-lg text-xs font-bold transition-all ${
                  l <= entry.energy_level ? "bg-gold text-foreground" : "bg-secondary text-muted-foreground"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Tomorrow */}
        <div className="bg-card rounded-2xl p-5 border border-border">
          <h4 className="font-display text-sm font-bold mb-2">🌟 Pour demain Insha'Allah</h4>
          <Textarea
            value={entry.tomorrow_plans}
            onChange={e => update("tomorrow_plans", e.target.value)}
            placeholder="Mes objectifs pour demain..."
            rows={3}
            className="text-sm"
          />
        </div>

        {/* Faith & gratitude */}
        <div className="bg-card rounded-2xl p-5 border border-border">
          <h4 className="font-display text-sm font-bold mb-2">💫 Niveau de foi</h4>
          <div className="flex gap-1 mb-4">
            {Array.from({ length: 10 }, (_, i) => i + 1).map(l => (
              <button
                key={l}
                onClick={() => update("faith_level", l)}
                className={`flex-1 h-7 rounded text-xs font-bold transition-all ${
                  l <= entry.faith_level ? "bg-gold text-foreground" : "bg-secondary text-muted-foreground"
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

        {/* Eid content for day 30 */}
        {dayNumber === 30 && (
          <>
            <div className="bg-gold/10 rounded-2xl p-5 border border-gold/20">
              <h4 className="font-display text-sm font-bold mb-2">🕌 La prière de l'Aid</h4>
              <p className="text-sm text-foreground whitespace-pre-line">{EID_PRAYER_INFO}</p>
            </div>
            <div className="bg-primary/10 rounded-2xl p-5 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Heart size={16} className="text-primary" />
                <h4 className="font-display text-sm font-bold">🤲 Invocation de fin de Ramadan</h4>
              </div>
              <p className="text-sm text-foreground whitespace-pre-line">{END_RAMADAN_DUA}</p>
            </div>
          </>
        )}

        {/* Save */}
        <Button onClick={save} disabled={saving} className="w-full gap-2 h-12 text-base rounded-xl">
          <Save size={18} />
          {saving ? "Sauvegarde..." : `Sauvegarder le jour ${dayNumber}`}
        </Button>
      </main>
    </div>
  );
};

export default DayDetail;
