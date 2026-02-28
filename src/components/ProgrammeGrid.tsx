import { Moon, BookOpen, Heart, Sparkles } from "lucide-react";

interface ProgrammeGridProps {
  dayNumber: number;
  entry: {
    quran_reading: boolean;
    dhikr: boolean;
    tarawih: boolean;
    morning_adhkar: boolean;
    evening_adhkar: boolean;
  };
}

const ProgrammeGrid = ({ dayNumber, entry }: ProgrammeGridProps) => {
  const items = [
    { icon: "🌙", label: "Noms d'Allah", done: false },
    { icon: "📖", label: "Coran", done: entry.quran_reading },
    { icon: "🤲", label: "Dua", done: entry.morning_adhkar && entry.evening_adhkar },
    { icon: "📿", label: "Dhikr", done: entry.dhikr },
    { icon: "🏃", label: "Sport", done: false },
    { icon: "🌙", label: "Taraweeh", done: entry.tarawih },
  ];

  const completedCount = items.filter(i => i.done).length;

  return (
    <div className="bg-card rounded-2xl p-5 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-base font-bold flex items-center gap-2">
          <span className="text-gold">◆</span> TON PROGRAMME DU JOUR
        </h3>
        <span className="text-sm font-bold text-gold">{completedCount}/{items.length}</span>
      </div>
      
      {/* Progress bar */}
      <div className="w-full h-1.5 bg-secondary rounded-full mb-4">
        <div
          className="h-full bg-gold rounded-full transition-all"
          style={{ width: `${(completedCount / items.length) * 100}%` }}
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        {items.map(item => (
          <div
            key={item.label}
            className={`flex flex-col items-center gap-2 rounded-xl p-3 transition-all ${
              item.done ? "bg-primary/15 border border-primary/30" : "bg-secondary"
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-xs font-medium text-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgrammeGrid;
