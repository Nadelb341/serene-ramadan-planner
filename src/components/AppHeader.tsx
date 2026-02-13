import { Home, Settings, LogOut, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";

const AppHeader = () => {
  const { isAdmin, signOut, profile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-primary border-b border-border">
      <h1 className="font-display text-lg text-primary-foreground tracking-wide">
        🌙 Ramadan Planner
      </h1>
      <div className="flex items-center gap-1">
        <button
          onClick={() => navigate("/")}
          className={`p-2 rounded-lg transition-colors ${isActive("/") ? "bg-accent text-accent-foreground" : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"}`}
          title="Accueil"
        >
          <Home size={20} />
        </button>
        <button
          onClick={() => navigate("/settings")}
          className={`p-2 rounded-lg transition-colors ${isActive("/settings") ? "bg-accent text-accent-foreground" : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"}`}
          title="Paramètres"
        >
          <Settings size={20} />
        </button>
        {isAdmin && (
          <button
            onClick={() => navigate("/admin")}
            className={`p-2 rounded-lg transition-colors ${isActive("/admin") ? "bg-accent text-accent-foreground" : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"}`}
            title="Administration"
          >
            <Shield size={18} />
          </button>
        )}
        <button
          onClick={signOut}
          className="p-2 rounded-lg text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
          title="Quitter"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
