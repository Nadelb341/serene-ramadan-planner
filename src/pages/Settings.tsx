import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Settings = () => {
  const { user, profile } = useAuth();
  const [firstName, setFirstName] = useState(profile?.first_name || "");
  const [gender, setGender] = useState<string>(profile?.gender || "Fille");
  const [dob, setDob] = useState(profile?.date_of_birth || "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name);
      setGender(profile.gender || "Fille");
      setDob(profile.date_of_birth || "");
    }
  }, [profile]);

  const save = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").update({
      first_name: firstName,
      gender: gender as any,
      date_of_birth: dob || null,
    }).eq("user_id", user.id);
    if (error) toast.error(error.message);
    else toast.success("Profil mis à jour ✓");
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="p-4 max-w-md mx-auto animate-fade-in">
        <h2 className="font-display text-xl mb-4">⚙️ Paramètres</h2>

        <div className="bg-card rounded-xl p-4 border border-border space-y-4">
          <div>
            <Label>Prénom</Label>
            <Input value={firstName} onChange={e => setFirstName(e.target.value)} />
          </div>
          <div>
            <Label>Genre</Label>
            <div className="flex gap-3 mt-1">
              {["Fille", "Garçon"].map(g => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${gender === g ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border text-foreground hover:bg-muted"}`}
                >
                  {g === "Fille" ? "👧 Fille" : "👦 Garçon"}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label>Date de naissance</Label>
            <Input type="date" value={dob} onChange={e => setDob(e.target.value)} />
          </div>
          <div>
            <Label>Email</Label>
            <Input value={user?.email || ""} disabled className="bg-muted" />
          </div>
          <Button onClick={save} disabled={saving} className="w-full">
            {saving ? "Sauvegarde..." : "Enregistrer"}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Settings;
