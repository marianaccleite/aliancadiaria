import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface DiaryEntry {
  id: string;
  type: "verse" | "prayer" | "devotional";
  title: string;
  content: string;
  reference?: string;
  savedAt: string;
}

export function useDiary() {
  const { user, loading: authLoading } = useAuth();
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for auth to finish loading before deciding
    if (authLoading) return;

    if (!user) {
      setEntries([]);
      setLoading(false);
      return;
    }

    const fetchEntries = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("diary_entries")
        .select("*")
        .order("saved_at", { ascending: false });

      if (!error && data) {
        setEntries(data.map(d => ({
          id: d.id,
          type: d.type as DiaryEntry["type"],
          title: d.title,
          content: d.content,
          reference: d.reference ?? undefined,
          savedAt: d.saved_at,
        })));
      }
      setLoading(false);
    };

    fetchEntries();
  }, [user, authLoading]);

  const addEntry = useCallback(async (entry: Omit<DiaryEntry, "id" | "savedAt">) => {
    if (!user) return;

    const { data, error } = await supabase
      .from("diary_entries")
      .insert({
        user_id: user.id,
        type: entry.type,
        title: entry.title,
        content: entry.content,
        reference: entry.reference || null,
      })
      .select()
      .single();

    if (!error && data) {
      const newEntry: DiaryEntry = {
        id: data.id,
        type: data.type as DiaryEntry["type"],
        title: data.title,
        content: data.content,
        reference: data.reference ?? undefined,
        savedAt: data.saved_at,
      };
      setEntries(prev => [newEntry, ...prev]);
    }
  }, [user]);

  const removeEntry = useCallback(async (id: string) => {
    if (!user) return;

    const { error } = await supabase
      .from("diary_entries")
      .delete()
      .eq("id", id);

    if (!error) {
      setEntries(prev => prev.filter(e => e.id !== id));
    }
  }, [user]);

  return { entries, addEntry, removeEntry, loading };
}

export function useChallengeProgress() {
  const { user, loading: authLoading } = useAuth();
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [lastCompleted, setLastCompleted] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for auth to finish loading before deciding
    if (authLoading) return;

    if (!user) {
      setProgress({});
      setLastCompleted({});
      setLoading(false);
      return;
    }

    const fetchProgress = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("challenge_progress")
        .select("*");

      if (!error && data) {
        const prog: Record<string, number> = {};
        const dates: Record<string, string> = {};
        data.forEach(d => {
          prog[d.challenge_id] = d.completed_days;
          if (d.last_completed_date) dates[d.challenge_id] = d.last_completed_date;
        });
        setProgress(prog);
        setLastCompleted(dates);
      }
      setLoading(false);
    };

    fetchProgress();
  }, [user, authLoading]);

  const canCompleteToday = useCallback((challengeId: string): boolean => {
    const today = new Date().toISOString().split("T")[0];
    return lastCompleted[challengeId] !== today;
  }, [lastCompleted]);

  const markDay = useCallback(async (challengeId: string): Promise<boolean> => {
    if (!user) return false;
    const today = new Date().toISOString().split("T")[0];
    if (lastCompleted[challengeId] === today) return false;

    const current = progress[challengeId] || 0;
    const newCount = current + 1;

    const { error } = await supabase
      .from("challenge_progress")
      .upsert({
        user_id: user.id,
        challenge_id: challengeId,
        completed_days: newCount,
        last_completed_date: today,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id,challenge_id" });

    if (!error) {
      setProgress(prev => ({ ...prev, [challengeId]: newCount }));
      setLastCompleted(prev => ({ ...prev, [challengeId]: today }));
      return true;
    }
    return false;
  }, [user, progress, lastCompleted]);

  return { progress, markDay, canCompleteToday, loading };
}
