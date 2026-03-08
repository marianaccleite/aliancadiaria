import { NavLink as RouterNavLink } from "react-router-dom";
import { Home, BookOpen, Heart, HandHelping, Flame, BookMarked, LogOut, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const navItems = [
  { to: "/", icon: Home, label: "Início" },
  { to: "/biblia", icon: BookOpen, label: "Bíblia" },
  { to: "/devocionais", icon: Heart, label: "Devocionais" },
  { to: "/oracoes", icon: HandHelping, label: "Orações" },
  { to: "/desafios", icon: Flame, label: "Desafios" },
  { to: "/diario", icon: BookMarked, label: "Diário" },
];

export default function BottomNav({ showAdmin = false }: { showAdmin?: boolean }) {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Até logo! 🙏");
      // Force full page reload to clear all cached state
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    } catch {
      // Even if signOut throws, redirect
      window.location.href = "/";
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border shadow-soft">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <RouterNavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors ${isActive ? "text-accent" : "text-muted-foreground"
              }`
            }
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{label}</span>
          </RouterNavLink>
        ))}
        {showAdmin && (
          <RouterNavLink
            to="/admin"
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors ${isActive ? "text-accent" : "text-muted-foreground"
              }`
            }
          >
            <Shield className="w-5 h-5" />
            <span className="text-[10px] font-medium">Admin</span>
          </RouterNavLink>
        )}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-muted-foreground hover:text-destructive transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-[10px] font-medium">Sair</span>
        </button>
      </div>
    </nav>
  );
}

