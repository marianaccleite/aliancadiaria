import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import {
  Shield, Check, X, Loader2, RefreshCw, Users, Clock,
  UserCheck, UserX, Search, Copy, CheckCheck, AlertTriangle
} from "lucide-react";
import { toast } from "sonner";

interface UserAccess {
  id: string;
  user_id: string;
  email: string;
  display_name: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  updated_at: string;
}

type FilterType = "all" | "pending" | "approved" | "rejected";
type UpdatingMap = Record<string, boolean>;

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "agora mesmo";
  if (mins < 60) return `há ${mins}min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `há ${hours}h`;
  const days = Math.floor(hours / 24);
  return `há ${days}d`;
}

export default function AdminPage() {
  const { signOut } = useAuth();
  const [users, setUsers] = useState<UserAccess[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<FilterType>("pending");
  const [search, setSearch] = useState("");
  const [updating, setUpdating] = useState<UpdatingMap>({});
  const [copied, setCopied] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  // ── Direct Supabase query (no edge function → no cold start) ──────────────
  const fetchUsers = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);

    try {
      const { data, error } = await supabase
        .from("user_access")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setUsers((data as UserAccess[]) || []);
      setLastRefresh(new Date());
    } catch (err: any) {
      toast.error("Erro ao carregar usuários: " + (err.message || ""));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // ── Optimistic status update ────────────────────────────────────────────────
  const updateStatus = async (userId: string, status: "approved" | "rejected" | "pending") => {
    setUpdating(u => ({ ...u, [userId]: true }));

    // Optimistic update — change UI immediately
    setUsers(prev =>
      prev.map(u => (u.user_id === userId ? { ...u, status, updated_at: new Date().toISOString() } : u))
    );

    try {
      const { error } = await supabase
        .from("user_access")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("user_id", userId);

      if (error) throw error;
      toast.success(status === "approved" ? "✅ Usuário aprovado!" : "❌ Usuário rejeitado");
    } catch (err: any) {
      // Rollback on failure
      toast.error("Erro ao atualizar. Recarregando...");
      fetchUsers(true);
    } finally {
      setUpdating(u => ({ ...u, [userId]: false }));
    }
  };

  // ── Approve all pending at once ─────────────────────────────────────────────
  const approveAllPending = async () => {
    const pending = users.filter(u => u.status === "pending");
    if (pending.length === 0) return;

    const confirmed = window.confirm(`Aprovar os ${pending.length} usuários pendentes?`);
    if (!confirmed) return;

    // Optimistic
    setUsers(prev =>
      prev.map(u =>
        u.status === "pending"
          ? { ...u, status: "approved" as const, updated_at: new Date().toISOString() }
          : u
      )
    );

    try {
      const { error } = await supabase
        .from("user_access")
        .update({ status: "approved", updated_at: new Date().toISOString() })
        .eq("status", "pending");

      if (error) throw error;
      toast.success(`✅ ${pending.length} usuários aprovados!`);
    } catch {
      toast.error("Erro ao aprovar em lote. Recarregando...");
      fetchUsers(true);
    }
  };

  // ── Copy email ──────────────────────────────────────────────────────────────
  const copyEmail = async (email: string) => {
    await navigator.clipboard.writeText(email).catch(() => { });
    setCopied(email);
    setTimeout(() => setCopied(null), 2000);
  };

  // ── Derived data ────────────────────────────────────────────────────────────
  const counts = {
    all: users.length,
    pending: users.filter(u => u.status === "pending").length,
    approved: users.filter(u => u.status === "approved").length,
    rejected: users.filter(u => u.status === "rejected").length,
  };

  const filtered = users
    .filter(u => filter === "all" || u.status === filter)
    .filter(u => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        u.email.toLowerCase().includes(q) ||
        (u.display_name || "").toLowerCase().includes(q)
      );
    });

  const statusLabels: Record<string, string> = {
    approved: "Aprovado", rejected: "Rejeitado", pending: "Pendente",
  };
  const statusColors: Record<string, string> = {
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-600",
    pending: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-6 pb-24">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-accent" />
            <div>
              <h1 className="font-display text-xl font-bold">Painel Admin</h1>
              <p className="text-[10px] text-muted-foreground">
                Atualizado {timeAgo(lastRefresh.toISOString())}
                {refreshing && <span className="ml-1 text-accent">· sincronizando...</span>}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchUsers(true)}
              disabled={refreshing}
              className="p-2 rounded-lg bg-card shadow-card text-muted-foreground hover:text-accent transition-colors"
              title="Atualizar"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={signOut}
              className="p-2 rounded-lg bg-card shadow-card text-muted-foreground hover:text-destructive transition-colors"
              title="Sair"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {([
            { key: "all", label: "Total", Icon: Users, color: "text-foreground" },
            { key: "pending", label: "Pendentes", Icon: Clock, color: "text-yellow-600" },
            { key: "approved", label: "Aprovados", Icon: UserCheck, color: "text-green-600" },
            { key: "rejected", label: "Rejeitados", Icon: UserX, color: "text-red-500" },
          ] as const).map(({ key, label, Icon, color }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`bg-card rounded-xl p-3 text-center shadow-card transition-all ${filter === key ? "ring-2 ring-accent scale-[1.03]" : "hover:scale-[1.01]"
                }`}
            >
              <Icon className={`w-4 h-4 mx-auto mb-1 ${color}`} />
              <p className="text-lg font-bold leading-none">{counts[key]}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{label}</p>
            </button>
          ))}
        </div>

        {/* Search + batch approve */}
        <div className="flex gap-2 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por nome ou e-mail..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-card rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          {counts.pending > 0 && (
            <button
              onClick={approveAllPending}
              className="flex items-center gap-1.5 bg-green-600 text-white rounded-xl px-3 py-2.5 text-xs font-semibold whitespace-nowrap hover:bg-green-700 transition-colors"
              title="Aprovar todos os pendentes"
            >
              <CheckCheck className="w-4 h-4" />
              Aprovar {counts.pending}
            </button>
          )}
        </div>

        {/* List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Loader2 className="w-7 h-7 animate-spin text-accent" />
            <p className="text-sm text-muted-foreground">Carregando usuários...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <Users className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">
              {search ? "Nenhum resultado para sua busca" : "Nenhum usuário nesta categoria"}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map(user => (
              <div key={user.id} className="bg-card rounded-xl p-4 shadow-card">
                <div className="flex items-center justify-between gap-3">
                  {/* Avatar initial */}
                  <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-accent font-bold text-sm uppercase">
                      {(user.display_name || user.email || "?").charAt(0)}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">
                      {user.display_name || user.email.split("@")[0]}
                    </p>
                    <button
                      onClick={() => copyEmail(user.email)}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-accent transition-colors truncate max-w-full"
                      title="Copiar e-mail"
                    >
                      {copied === user.email
                        ? <><CheckCheck className="w-3 h-3 text-green-500 flex-shrink-0" /> Copiado!</>
                        : <><Copy className="w-3 h-3 flex-shrink-0" />{user.email}</>
                      }
                    </button>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${statusColors[user.status]}`}>
                        {statusLabels[user.status]}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        Cadastro: {new Date(user.created_at).toLocaleDateString("pt-BR")}
                      </span>
                      {user.updated_at !== user.created_at && (
                        <span className="text-[10px] text-muted-foreground">
                          · Atualizado: {timeAgo(user.updated_at)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-1.5 flex-shrink-0">
                    {updating[user.user_id] ? (
                      <Loader2 className="w-5 h-5 animate-spin text-accent" />
                    ) : (
                      <>
                        {user.status !== "approved" && (
                          <button
                            onClick={() => updateStatus(user.user_id, "approved")}
                            className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                            title="Aprovar"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        {user.status !== "rejected" && (
                          <button
                            onClick={() => updateStatus(user.user_id, "rejected")}
                            className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                            title="Rejeitar"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                        {user.status === "rejected" && (
                          <button
                            onClick={() => updateStatus(user.user_id, "pending")}
                            className="p-2 rounded-lg bg-yellow-50 text-yellow-600 hover:bg-yellow-100 transition-colors"
                            title="Voltar para pendente"
                          >
                            <AlertTriangle className="w-4 h-4" />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filtered.length > 0 && (
          <p className="text-center text-xs text-muted-foreground mt-4">
            Mostrando {filtered.length} de {users.length} usuários
            {search && ` · busca: "${search}"`}
          </p>
        )}
      </div>
    </div>
  );
}
