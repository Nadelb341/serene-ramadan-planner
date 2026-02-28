import { useNavigate } from "react-router-dom";

interface DayGridProps {
  completedDays: number[];
  dayProgress: Record<number, number>; // day -> completed tasks count out of 5
}

const DayGrid = ({ completedDays, dayProgress }: DayGridProps) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-5 gap-2">
      {Array.from({ length: 30 }, (_, i) => i + 1).map(day => {
        const progress = dayProgress[day] || 0;
        const isCompleted = completedDays.includes(day);

        return (
          <button
            key={day}
            onClick={() => navigate(`/day/${day}`)}
            className={`
              relative aspect-square rounded-xl flex flex-col items-center justify-center gap-0.5
              transition-all active:scale-95 border
              ${isCompleted
                ? "bg-primary/15 border-primary/30 text-foreground"
                : "bg-card border-border text-foreground hover:bg-secondary"
              }
            `}
          >
            <span className="text-lg font-bold">{day}</span>
            <span className="text-[10px] text-muted-foreground">{progress}/5</span>
          </button>
        );
      })}
    </div>
  );
};

export default DayGrid;
