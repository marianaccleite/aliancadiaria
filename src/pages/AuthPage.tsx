import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mail, Lock, ArrowRight, Loader2, Eye, EyeOff, UserPlus, LogIn } from "lucide-react";
import logoUrl from "/logo.png";

type Mode = "login" | "register";

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    if (password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      return;
    }
    setLoading(true);

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password,
        });
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast.error("E-mail ou senha incorretos. Verifique seus dados.");
          } else if (error.message.includes("Email not confirmed")) {
            toast.error("Por favor confirme seu e-mail antes de entrar.");
          } else {
            toast.error(error.message || "Erro ao entrar");
          }
          return;
        }
        // No toast here — app will auto-redirect and show the appropriate screen
      } else {
        // Register
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password: password,
          options: {
            data: { display_name: email.trim().split("@")[0] },
            emailRedirectTo: window.location.origin,
          },
        });

        if (signUpError) {
          if (signUpError.message.includes("already registered") || signUpError.message.includes("User already registered")) {
            toast.error("Este e-mail já está cadastrado. Faça login.");
            setMode("login");
          } else {
            toast.error(signUpError.message || "Erro ao criar conta");
          }
          return;
        }

        // Try immediate sign in (email confirmation may not be required)
        if (data.user && !data.session) {
          // User created — try to sign in now
          await supabase.auth.signInWithPassword({
            email: email.trim(),
            password: password,
          });
        }
        // No toast here — the app will redirect to PendingPage automatically
        // which already shows a clear message to the user
      }
    } catch (error: any) {
      toast.error(error.message || "Erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-background animate-fade-in">
      <div className="flex flex-col items-center gap-2 mb-8">
        <img src={logoUrl} alt="Aliança com Deus" className="w-24 h-24 object-contain rounded-2xl" />
        <h1 className="font-display text-2xl font-bold text-foreground">Aliança com Deus</h1>
      </div>

      <div className="w-full max-w-sm bg-card rounded-2xl p-6 shadow-card">
        {/* Tabs */}
        <div className="flex gap-1 bg-muted rounded-xl p-1 mb-6">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${mode === "login" ? "bg-accent text-primary-foreground shadow-sm" : "text-muted-foreground"}`}
          >
            <span className="flex items-center justify-center gap-1.5"><LogIn className="w-3.5 h-3.5" /> Entrar</span>
          </button>
          <button
            onClick={() => setMode("register")}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${mode === "register" ? "bg-accent text-primary-foreground shadow-sm" : "text-muted-foreground"}`}
          >
            <span className="flex items-center justify-center gap-1.5"><UserPlus className="w-3.5 h-3.5" /> Cadastrar</span>
          </button>
        </div>

        <h2 className="font-display text-xl font-semibold text-center mb-1">
          {mode === "login" ? "Bem-vindo de volta!" : "Criar conta"}
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-6">
          {mode === "login" ? "Entre com seu e-mail e senha" : "Preencha os dados para se cadastrar"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Sua senha (mínimo 6 caracteres)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-primary-foreground rounded-xl py-3 font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Aguarde...</>
            ) : mode === "login" ? (
              <><ArrowRight className="w-4 h-4" /> Entrar</>
            ) : (
              <><UserPlus className="w-4 h-4" /> Criar conta</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
