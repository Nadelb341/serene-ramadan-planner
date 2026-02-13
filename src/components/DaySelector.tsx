import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface DaySelectorProps {
  selectedDay: number;
  onSelectDay: (day: number) => void;
  completedDays: number[];
}

const DaySelector = ({ selectedDay, onSelectDay, completedDays }: DaySelectorProps) => {
  const phases = [
    { label: "Miséricorde", days: [1, 10], color: "bg-primary" },
    { label: "Pardon", days: [11, 20], color: "bg-accent" },
    { label: "Protection", days: [21, 30], color: "gradient-night" },
  ];

  const getPhase = (day: number) => {
    if (day <= 10) return 0;
    if (day <= 20) return 1;
    return 2;
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-2 text-xs text-muted-foreground">
        {phases.map(p => (
          <span key={p.label} className="font-medium">{p.label}</span>
        ))}
      </div>
      <ScrollArea className="w-full">
        <div className="flex gap-1.5 pb-2">
          {Array.from({ length: 30 }, (_, i) => i + 1).map(day => {
            const isSelected = day === selectedDay;
            const isCompleted = completedDays.includes(day);
            const phase = getPhase(day);

            return (
              <button
                key={day}
                onClick={() => onSelectDay(day)}
                className={`
                  flex-shrink-0 w-9 h-9 rounded-full text-xs font-semibold transition-all
                  ${isSelected
                    ? "bg-primary text-primary-foreground ring-2 ring-accent ring-offset-2 ring-offset-background scale-110"
                    : isCompleted
                      ? "bg-accent/30 text-accent-foreground border border-accent"
                      : "bg-muted text-muted-foreground hover:bg-secondary"
                  }
                `}
              >
                {day}
              </button>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default DaySelector;
