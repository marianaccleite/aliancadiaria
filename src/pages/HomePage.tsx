import { useState, useEffect } from "react";
import { getDailyVerse, getDailyDevotional, getDailyPrayer, getDailyWord, challenges } from "@/data/content";
import { useDiary, useChallengeProgress } from "@/hooks/useDiary";
import { BookOpen, Sparkles, Heart, Flame, Share2, BookmarkPlus, Bell } from "lucide-react";
import { toast } from "sonner";
import { requestNotificationPermission, scheduleDailyNotification } from "@/lib/notifications";
import heroBg from "@/assets/hero-bg.jpg";

export default function HomePage() {
  const verse = getDailyVerse();
  const devotional = getDailyDevotional();
  const prayer = getDailyPrayer();
  const { addEntry } = useDiary();
  const { progress } = useChallengeProgress();
  const [showWord, setShowWord] = useState(false);
  const dailyWord = getDailyWord();
  const [notifEnabled, setNotifEnabled] = useState(
    typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted"
  );

  useEffect(() => {
    scheduleDailyNotification();
  }, []);

  const enableNotifications = async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      setNotifEnabled(true);
      scheduleDailyNotification();
      toast.success("Notificações ativadas! 🔔");
    } else {
      toast.error("Permissão negada para notificações");
    }
  };

  const receiveWord = () => {
    setShowWord(true);
  };

  const saveVerse = (text: string, reference: string) => {
    addEntry({ type: "verse", title: reference, content: text, reference });
    toast.success("Versículo salvo no diário!");
  };

  const shareContent = async (text: string) => {
    try {
      if (navigator.share) {
        await navigator.share({ text: text + "\n\nEnviado pelo app Aliança com Deus" });
      } else {
        await navigator.clipboard.writeText(text + "\n\nEnviado pelo app Aliança com Deus");
        toast.success("Copiado para a área de transferência!");
      }
    } catch (err) {
      // User cancelled share or error
      try {
        await navigator.clipboard.writeText(text + "\n\nEnviado pelo app Aliança com Deus");
        toast.success("Copiado para a área de transferência!");
      } catch {
        toast.error("Não foi possível compartilhar");
      }
    }
  };

  const totalChallenges = challenges.reduce((acc, c) => acc + c.days, 0);
  const completedDays = Object.values(progress).reduce((a, b) => a + b, 0);

  return (
    <div className="pb-20 animate-fade-in">
      {/* Hero */}
      <div className="relative h-64 overflow-hidden rounded-b-3xl">
        <img src={heroBg} alt="Luz divina sobre montanhas" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative z-10 flex flex-col justify-end h-full p-6 pb-8">
          <h1 className="text-2xl font-display font-bold text-primary-foreground mb-1">Aliança com Deus</h1>
          <p className="text-primary-foreground/80 text-sm">Fortaleça sua fé todos os dias</p>
        </div>
      </div>

      <div className="px-4 space-y-5 mt-5">
        {/* Versículo do Dia */}
        <section className="bg-card rounded-2xl p-5 shadow-card">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-accent" />
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Versículo do Dia</h2>
          </div>
          <p className="font-display text-lg italic leading-relaxed text-foreground">"{verse.text}"</p>
          <p className="text-sm text-accent font-semibold mt-2">{verse.reference}</p>
          <div className="flex gap-2 mt-3">
            <button onClick={() => saveVerse(verse.text, verse.reference)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-accent transition-colors">
              <BookmarkPlus className="w-3.5 h-3.5" /> Salvar
            </button>
            <button onClick={() => shareContent(`"${verse.text}" - ${verse.reference}`)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-accent transition-colors">
              <Share2 className="w-3.5 h-3.5" /> Compartilhar
            </button>
          </div>
        </section>

        {/* Devocional do Dia */}
        <section className="bg-card rounded-2xl p-5 shadow-card">
          <div className="flex items-center gap-2 mb-3">
            <Heart className="w-4 h-4 text-accent" />
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Devocional do Dia</h2>
          </div>
          <h3 className="font-display text-lg font-semibold mb-2">{devotional.title}</h3>
          <p className="text-sm text-accent font-medium mb-2">"{devotional.verse.text}" — {devotional.verse.reference}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{devotional.reflection}</p>
        </section>

        {/* Oração do Dia */}
        <section className="bg-card rounded-2xl p-5 shadow-card">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-accent" />
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{prayer.title}</h2>
          </div>
          <p className="text-sm text-foreground leading-relaxed italic">{prayer.text}</p>
          <p className="text-xs text-accent font-medium mt-2">{prayer.verse.reference}</p>
        </section>

        {/* Receber Palavra */}
        <button
          onClick={receiveWord}
          className="w-full gradient-gold rounded-2xl p-5 shadow-soft text-center transition-transform active:scale-[0.98]"
        >
          <Sparkles className="w-6 h-6 text-accent mx-auto mb-2 animate-glow" />
          <span className="font-display text-lg font-semibold text-foreground">Receber uma Palavra para Hoje</span>
        </button>

        {showWord && (
          <section className="bg-card rounded-2xl p-5 shadow-card animate-fade-in border border-accent/20">
            <p className="font-display text-lg italic leading-relaxed">"{dailyWord.text}"</p>
            <p className="text-sm text-accent font-semibold mt-2">{dailyWord.reference}</p>
            <p className="text-sm text-muted-foreground mt-3">{dailyWord.reflection}</p>
            <div className="flex gap-2 mt-3">
              <button onClick={() => saveVerse(dailyWord.text, dailyWord.reference)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-accent transition-colors">
                <BookmarkPlus className="w-3.5 h-3.5" /> Salvar
              </button>
              <button onClick={() => shareContent(`"${dailyWord.text}" - ${dailyWord.reference}`)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-accent transition-colors">
                <Share2 className="w-3.5 h-3.5" /> Compartilhar
              </button>
            </div>
          </section>
        )}

        {/* Progresso dos Desafios */}
        <section className="bg-card rounded-2xl p-5 shadow-card">
          <div className="flex items-center gap-2 mb-3">
            <Flame className="w-4 h-4 text-accent" />
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Seu Progresso</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-muted rounded-full h-2.5 overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (completedDays / Math.max(1, totalChallenges)) * 100)}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-accent">{completedDays} dias</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Continue seus desafios espirituais!</p>
        </section>

        {/* Notificações */}
        {!notifEnabled && (
          <button
            onClick={enableNotifications}
            className="w-full bg-card rounded-2xl p-4 shadow-card flex items-center gap-3 hover:bg-secondary transition-colors"
          >
            <Bell className="w-6 h-6 text-accent" />
            <div className="text-left">
              <h3 className="font-semibold text-sm">Ativar notificações diárias</h3>
              <p className="text-xs text-muted-foreground">Receba uma palavra de Deus toda manhã</p>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
