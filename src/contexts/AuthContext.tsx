import { createContext, useContext, useEffect, useState, useRef, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type AccessStatus = "pending" | "approved" | "rejected" | "loading" | null;

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  accessStatus: AccessStatus;
  isAdmin: boolean;
  signOut: () => Promise<void>;
  refreshAccess: () => Promise<AccessStatus>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  accessStatus: "loading",
  isAdmin: false,
  signOut: async () => { },
  refreshAccess: async () => null,
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [accessStatus, setAccessStatus] = useState<AccessStatus>("loading");
  const [isAdmin, setIsAdmin] = useState(false);
  const initialized = useRef(false);

  const checkAccess = async (userId: string): Promise<{ status: AccessStatus; admin: boolean }> => {
    try {
      const [accessResult, roleResult] = await Promise.all([
        supabase.from("user_access").select("status").eq("user_id", userId).maybeSingle(),
        supabase.rpc("has_role", { _user_id: userId, _role: "admin" }),
      ]);

      const status = (accessResult.data?.status as AccessStatus) || "pending";
      const admin = roleResult.data === true;
      return { status, admin };
    } catch {
      return { status: "pending", admin: false };
    }
  };

  const refreshAccess = async (): Promise<AccessStatus> => {
    if (!session?.user) return null;
    const { status, admin } = await checkAccess(session.user.id);
    setAccessStatus(status);
    setIsAdmin(admin);
    return status; // Return the fresh status so callers can act on it immediately
  };

  useEffect(() => {
    // Get initial session first
    supabase.auth.getSession().then(async ({ data: { session: initialSession } }) => {
      setSession(initialSession);
      if (initialSession?.user) {
        const { status, admin } = await checkAccess(initialSession.user.id);
        setAccessStatus(status);
        setIsAdmin(admin);
      } else {
        setAccessStatus(null);
        setIsAdmin(false);
      }
      setLoading(false);
      initialized.current = true;
    });

    // Listen for auth state changes AFTER initialization
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      if (!initialized.current && event !== "SIGNED_OUT") return;

      setSession(newSession);

      if (event === "SIGNED_OUT") {
        setAccessStatus(null);
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      if (newSession?.user) {
        // Only re-check on actual sign in events, not on every token refresh
        if (event === "SIGNED_IN" || event === "USER_UPDATED") {
          const { status, admin } = await checkAccess(newSession.user.id);
          setAccessStatus(status);
          setIsAdmin(admin);
        }
      } else {
        setAccessStatus(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setSession(null);
    setAccessStatus(null);
    setIsAdmin(false);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ session, user: session?.user ?? null, loading, accessStatus, isAdmin, signOut, refreshAccess }}>
      {children}
    </AuthContext.Provider>
  );
}
