import { useAuth } from "@/hooks/useAuth";
import Dashboard from "@/pages/Dashboard";
import Auth from "@/pages/Auth";

const Index = () => {
  const { user, loading } = useAuth();

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
  return <Dashboard />;
};

export default Index;
