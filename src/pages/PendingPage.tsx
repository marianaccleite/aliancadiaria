import { useState } from "react";
import { Clock, Loader2, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import logoUrl from "/logo.png";

export default function PendingPage() {
  const { signOut, accessStatus } = useAuth();
  const [checking, setChecking] = useState(false);

  const handleCheckStatus = async () => {
    setChecking(true);
    try {
      // Query Supabase directly — don't rely on React state which may be stale
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        toast.error("Sessão expirada. Faça login novamente.");
        await signOut();
        window.location.href = "/";
        return;
      }

      const { data, error } = await supabase
        .from("user_access")
        .select("status")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;

      const status = data?.status;

      if (status === "approved") {
        toast.success("🎉 Acesso aprovado! Bem-vindo ao Aliança com Deus!");
        // Full reload so AuthContext re-initializes with fresh status
        setTimeout(() => window.location.reload(), 1200);
      } else if (status === "rejected") {
        toast.error("Seu acesso foi negado. Entre em contato com o administrador.");
      } else {
        toast.info("Seu cadastro ainda está sendo analisado. Tente novamente mais tarde.");
      }
    } catch (err) {
      console.error("Check status error:", err);
      toast.error("Erro ao verificar. Tente novamente.");
    } finally {
      setChecking(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-background animate-fade-in">
      <img src={logoUrl} alt="Aliança com Deus" className="w-20 h-20 object-contain rounded-2xl mb-6" />

      <div className="w-full max-w-sm bg-card rounded-2xl p-6 shadow-card text-center">
        {accessStatus === "rejected" ? (
          <>
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">😔</span>
            </div>
            <h2 className="font-display text-xl font-semibold mb-2">Acesso Negado</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Infelizmente seu acesso não foi aprovado. Entre em contato com o administrador para mais informações.
            </p>
          </>
        ) : (
          <>
            <Clock className="w-12 h-12 text-accent mx-auto mb-4" />
            <h2 className="font-display text-xl font-semibold mb-2">Cadastro Recebido!</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Seu cadastro foi recebido com sucesso e está <strong>aguardando aprovação</strong> do administrador. Assim que for liberado, clique abaixo para entrar.
            </p>
            <button
              onClick={handleCheckStatus}
              disabled={checking}
              className="w-full bg-accent text-primary-foreground rounded-xl py-3 font-semibold text-sm flex items-center justify-center gap-2 mb-3 disabled:opacity-70 hover:opacity-90 transition-opacity"
            >
              {checking ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Verificando acesso...</>
              ) : (
                <><CheckCircle className="w-4 h-4" /> Verificar e entrar no app</>
              )}
            </button>
          </>
        )}
        <button
          onClick={handleSignOut}
          className="w-full bg-muted text-muted-foreground rounded-xl py-3 font-semibold text-sm hover:bg-muted/80 transition-colors"
        >
          Sair
        </button>
      </div>
    </div>
  );
}
