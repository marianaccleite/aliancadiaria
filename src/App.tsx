import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import BottomNav from "@/components/BottomNav";
import HomePage from "@/pages/HomePage";
import BiblePage from "@/pages/BiblePage";
import DevotionalsPage from "@/pages/DevotionalsPage";
import PrayersPage from "@/pages/PrayersPage";
import ChallengesPage from "@/pages/ChallengesPage";
import DiaryPage from "@/pages/DiaryPage";
import AuthPage from "@/pages/AuthPage";
import LandingPage from "@/pages/LandingPage";
import PendingPage from "@/pages/PendingPage";
import AdminPage from "@/pages/AdminPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  const { user, loading, accessStatus, isAdmin } = useAuth();

  if (loading || accessStatus === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center animate-fade-in">
          <img src="/logo.png" alt="Aliança com Deus" className="w-20 h-20 object-contain rounded-2xl mx-auto mb-4" />
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  // Not logged in - show landing and auth
  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  // Admin user - can access both admin panel and full app
  if (isAdmin) {
    return (
      <div className="max-w-lg mx-auto min-h-screen relative">
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/biblia" element={<BiblePage />} />
          <Route path="/devocionais" element={<DevotionalsPage />} />
          <Route path="/oracoes" element={<PrayersPage />} />
          <Route path="/desafios" element={<ChallengesPage />} />
          <Route path="/diario" element={<DiaryPage />} />
          <Route path="/auth" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BottomNav showAdmin />
      </div>
    );
  }

  // User pending or rejected
  if (accessStatus !== "approved") {
    return (
      <Routes>
        <Route path="*" element={<PendingPage />} />
      </Routes>
    );
  }

  // Approved user - full app
  return (
    <div className="max-w-lg mx-auto min-h-screen relative">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/biblia" element={<BiblePage />} />
        <Route path="/devocionais" element={<DevotionalsPage />} />
        <Route path="/oracoes" element={<PrayersPage />} />
        <Route path="/desafios" element={<ChallengesPage />} />
        <Route path="/diario" element={<DiaryPage />} />
        <Route path="/auth" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <BottomNav />
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
