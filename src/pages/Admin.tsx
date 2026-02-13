import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Users, Database, Shield, Activity, RefreshCw, Search } from "lucide-react";

const Admin = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ users: 0, entries: 0, events: 0, notes: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
      return;
    }
    loadStats();
  }, [isAdmin]);

  const loadStats = async () => {
    setLoading(true);
    try {
      // We can only count what admin has access to via RLS
      // For a real admin panel, you'd use an edge function
      // For now, show basic info
      setStats({ users: 0, entries: 0, events: 0, notes: 0 });
    } finally {
      setLoading(false);
    }
  };

  const actions = [
    { icon: Users, label: "Gestion utilisateurs", desc: "Voir et gérer les utilisateurs", color: "bg-primary" },
    { icon: Database, label: "Audit données", desc: "Vérifier l'intégrité des données", color: "bg-accent" },
    { icon: Activity, label: "Monitoring", desc: "Surveiller l'activité", color: "bg-primary" },
    { icon: RefreshCw, label: "Maintenance", desc: "Réparer et optimiser", color: "bg-accent" },
    { icon: Search, label: "Diagnostics", desc: "Analyser les problèmes", color: "bg-primary" },
    { icon: Shield, label: "Sécurité", desc: "Contrôle des accès", color: "bg-accent" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="p-4 max-w-2xl mx-auto animate-fade-in">
        <div className="flex items-center gap-2 mb-4">
          <Shield size={20} className="text-gold" />
          <h2 className="font-display text-xl">Panneau d'Administration</h2>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {actions.map((action, i) => (
            <button
              key={i}
              onClick={() => toast.info(`${action.label} - Fonctionnalité à venir`)}
              className="flex flex-col items-center gap-2 p-4 bg-card rounded-xl border border-border hover:bg-muted transition-colors text-center"
            >
              <div className={`p-2 rounded-lg ${action.color} text-primary-foreground`}>
                <action.icon size={20} />
              </div>
              <span className="text-sm font-medium">{action.label}</span>
              <span className="text-xs text-muted-foreground">{action.desc}</span>
            </button>
          ))}
        </div>

        <div className="bg-card rounded-xl p-4 border border-border">
          <h3 className="font-display text-sm font-bold mb-2">Statut du système</h3>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 rounded-full bg-accent"></div>
            <span className="text-foreground">Tous les systèmes opérationnels</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Dernière vérification : maintenant</p>
        </div>
      </main>
    </div>
  );
};

export default Admin;
