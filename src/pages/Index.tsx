import { useAuth } from "@/hooks/useAuth";
import { useParams } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import DayDetail from "@/pages/DayDetail";
import Auth from "@/pages/Auth";

const Index = () => {
  const { user, loading } = useAuth();
  const { dayNumber } = useParams();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center animate-fade-in">
          <p className="font-display text-2xl text-foreground">🌙</p>
          <p className="text-sm text-muted-foreground mt-2">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user) return <Auth />;
  if (dayNumber) return <DayDetail />;
  return <Dashboard />;
};

export default Index;
