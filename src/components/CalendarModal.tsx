import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Trash2, Plus } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

interface CalEvent {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  event_type: string | null;
}

const CalendarModal = ({ open, onClose }: Props) => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<CalEvent[]>([]);
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!user || !open) return;
    supabase
      .from("calendar_events")
      .select("*")
      .eq("user_id", user.id)
      .order("event_date")
      .then(({ data }) => {
        if (data) setEvents(data);
      });
  }, [user, open]);

  const dateStr = selectedDate?.toISOString().split("T")[0] || "";
  const dayEvents = events.filter(e => e.event_date === dateStr);

  const addEvent = async () => {
    if (!user || !title.trim() || !dateStr) return;
    const { data, error } = await supabase
      .from("calendar_events")
      .insert({ user_id: user.id, title, description, event_date: dateStr })
      .select()
      .single();
    if (error) { toast.error(error.message); return; }
    setEvents([...events, data]);
    setTitle("");
    setDescription("");
    setAdding(false);
    toast.success("Événement ajouté ✓");
  };

  const deleteEvent = async (id: string) => {
    await supabase.from("calendar_events").delete().eq("id", id);
    setEvents(events.filter(e => e.id !== id));
    toast.success("Événement supprimé");
  };

  const eventDates = events.map(e => new Date(e.event_date + "T00:00:00"));

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display">📅 Agenda Ramadan</DialogTitle>
        </DialogHeader>

        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          modifiers={{ hasEvent: eventDates }}
          modifiersClassNames={{ hasEvent: "bg-accent/30 font-bold" }}
          className="rounded-md border"
        />

        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold">
              Événements du {selectedDate?.toLocaleDateString("fr-FR")}
            </h4>
            <Button size="sm" variant="outline" onClick={() => setAdding(!adding)} className="gap-1">
              <Plus size={14} /> Ajouter
            </Button>
          </div>

          {adding && (
            <div className="space-y-2 mb-3 p-3 bg-muted rounded-lg">
              <Input placeholder="Titre" value={title} onChange={e => setTitle(e.target.value)} />
              <Textarea placeholder="Description (optionnel)" value={description} onChange={e => setDescription(e.target.value)} rows={2} />
              <Button size="sm" onClick={addEvent}>Enregistrer</Button>
            </div>
          )}

          {dayEvents.length === 0 && !adding && (
            <p className="text-sm text-muted-foreground italic">Aucun événement ce jour</p>
          )}

          {dayEvents.map(ev => (
            <div key={ev.id} className="flex items-start justify-between p-2 bg-card rounded-lg border border-border mb-2">
              <div>
                <p className="text-sm font-medium">{ev.title}</p>
                {ev.description && <p className="text-xs text-muted-foreground">{ev.description}</p>}
              </div>
              <button onClick={() => deleteEvent(ev.id)} className="text-destructive hover:text-destructive/80 p-1">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarModal;
