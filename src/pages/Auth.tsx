import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import ramadanBg from "@/assets/ramadan-bg.jpg";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [gender, setGender] = useState<"Fille" | "Garçon">("Fille");
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;

        if (data.user) {
          // Update profile with extra info
          await supabase.from("profiles").update({
            first_name: firstName,
            gender,
            date_of_birth: dob || null,
          }).eq("user_id", data.user.id);
        }
        toast.success("Inscription réussie ! Vérifiez votre email pour confirmer.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Connexion réussie !");
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-15">
        <img src={ramadanBg} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="w-full max-w-sm relative z-10 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl text-foreground mb-2">🌙 Ramadan Planner</h1>
          <p className="text-muted-foreground text-sm">Organisez votre mois béni avec sérénité</p>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
          <div className="flex mb-6 bg-muted rounded-lg p-1">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-2 text-sm rounded-md font-medium transition-colors ${mode === "login" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            >
              Connexion
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`flex-1 py-2 text-sm rounded-md font-medium transition-colors ${mode === "signup" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            >
              Inscription
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <>
                <div>
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} required placeholder="Votre prénom" />
                </div>
                <div>
                  <Label>Genre</Label>
                  <div className="flex gap-3 mt-1">
                    {(["Fille", "Garçon"] as const).map(g => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGender(g)}
                        className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${gender === g ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border text-foreground hover:bg-muted"}`}
                      >
                        {g === "Fille" ? "👧 Fille" : "👦 Garçon"}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="dob">Date de naissance</Label>
                  <Input id="dob" type="date" value={dob} onChange={e => setDob(e.target.value)} />
                </div>
              </>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="votre@email.com" />
            </div>
            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" minLength={6} />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Chargement..." : mode === "login" ? "Se connecter" : "S'inscrire"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
