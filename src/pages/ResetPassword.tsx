import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Lock, CheckCircle } from "lucide-react";
import ramadanBg from "@/assets/ramadan-bg.jpg";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for the PASSWORD_RECOVERY event from Supabase
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setIsRecovery(true);
      }
    });

    // Also check URL hash for type=recovery
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) {
      setIsRecovery(true);
    }

    return () => subscription.unsubscribe();
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }
    if (password.length < 6) {
      toast.error("Le mot de passe doit faire au moins 6 caractères");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setSuccess(true);
      toast.success("Ton mot de passe a été mis à jour avec succès !");
      setTimeout(() => navigate("/"), 2500);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isRecovery) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={ramadanBg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="bg-card rounded-xl p-6 shadow-lg border border-border max-w-sm w-full text-center relative z-10">
          <Lock size={40} className="mx-auto text-muted-foreground mb-3" />
          <h2 className="font-display text-lg mb-2">Lien invalide ou expiré</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Ce lien de réinitialisation est invalide ou a déjà été utilisé.
          </p>
          <Button onClick={() => navigate("/")} className="w-full">
            Retour à la connexion
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img src={ramadanBg} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="bg-card rounded-xl p-6 shadow-lg border border-border max-w-sm w-full animate-fade-in relative z-10">
        {success ? (
          <div className="text-center py-6">
            <CheckCircle size={48} className="mx-auto text-accent mb-3" />
            <h2 className="font-display text-lg mb-1">Mot de passe modifié !</h2>
            <p className="text-sm text-muted-foreground">Redirection vers le tableau de bord...</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <h1 className="font-display text-2xl text-foreground mb-1">🌙</h1>
              <h2 className="font-display text-lg mb-1">Nouveau mot de passe</h2>
              <p className="text-sm text-muted-foreground">
                Choisissez un nouveau mot de passe sécurisé.
              </p>
            </div>

            <form onSubmit={handleReset} className="space-y-4">
              <div>
                <Label htmlFor="new-password">Nouveau mot de passe</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  minLength={6}
                />
              </div>
              <div>
                <Label htmlFor="confirm-password">Confirmer le nouveau mot de passe</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  minLength={6}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Mise à jour..." : "Enregistrer et se connecter"}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
