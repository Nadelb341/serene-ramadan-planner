import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Trash2, Save } from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
  updated_at: string;
}

const NotesSection = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!user) return;
    supabase
      .from("notes")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false })
      .then(({ data }) => {
        if (data) setNotes(data as Note[]);
      });
  }, [user]);

  const createNote = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("notes")
      .insert({ user_id: user.id, title: "Nouvelle note", content: "" })
      .select()
      .single();
    if (error) { toast.error(error.message); return; }
    const n = data as Note;
    setNotes([n, ...notes]);
    selectNote(n);
  };

  const selectNote = (n: Note) => {
    setSelectedNote(n);
    setTitle(n.title);
    setContent(n.content);
  };

  const saveNote = async () => {
    if (!selectedNote) return;
    const { error } = await supabase
      .from("notes")
      .update({ title, content })
      .eq("id", selectedNote.id);
    if (error) { toast.error(error.message); return; }
    setNotes(notes.map(n => n.id === selectedNote.id ? { ...n, title, content } : n));
    toast.success("Note sauvegardée ✓");
  };

  const deleteNote = async (id: string) => {
    await supabase.from("notes").delete().eq("id", id);
    setNotes(notes.filter(n => n.id !== id));
    if (selectedNote?.id === id) { setSelectedNote(null); setTitle(""); setContent(""); }
    toast.success("Note supprimée");
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display text-lg">📝 Mes Notes</h3>
        <Button size="sm" variant="outline" onClick={createNote} className="gap-1">
          <Plus size={14} /> Nouvelle
        </Button>
      </div>

      {selectedNote ? (
        <div className="bg-card rounded-xl p-4 border border-border space-y-3">
          <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Titre" className="font-semibold" />
          <Textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Contenu de la note..." rows={8} />
          <div className="flex gap-2">
            <Button size="sm" onClick={saveNote} className="gap-1"><Save size={14} /> Sauvegarder</Button>
            <Button size="sm" variant="outline" onClick={() => setSelectedNote(null)}>Retour</Button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {notes.length === 0 && (
            <p className="text-sm text-muted-foreground italic text-center py-8">Aucune note. Créez-en une !</p>
          )}
          {notes.map(n => (
            <div
              key={n.id}
              onClick={() => selectNote(n)}
              className="flex items-center justify-between p-3 bg-card rounded-lg border border-border cursor-pointer hover:bg-muted transition-colors"
            >
              <div>
                <p className="text-sm font-medium">{n.title || "Sans titre"}</p>
                <p className="text-xs text-muted-foreground line-clamp-1">{n.content || "Vide"}</p>
              </div>
              <button
                onClick={e => { e.stopPropagation(); deleteNote(n.id); }}
                className="text-destructive/60 hover:text-destructive p-1"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesSection;
