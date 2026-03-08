import { useState } from "react";
import { challenges } from "@/data/content";
import { useChallengeProgress } from "@/hooks/useDiary";
import { Flame, ChevronLeft, Check, Lock } from "lucide-react";
import { toast } from "sonner";

export default function ChallengesPage() {
  const { progress, markDay, canCompleteToday } = useChallengeProgress();
  const [selected, setSelected] = useState<string | null>(null);
  const challenge = selected ? challenges.find(c => c.id === selected) : null;

  if (challenge) {
    const completed = progress[challenge.id] || 0;
    const canComplete = canCompleteToday(challenge.id);

    // If user can still complete today → show next available day (index = completed)
    // If user already completed today → show the day they just completed (index = completed - 1)
    // This prevents showing "day 2 content" with a locked "day 1" button
    const displayDayIndex = canComplete
      ? Math.min(completed, challenge.days - 1)
      : Math.max(0, completed - 1);

    const todayContent = challenge.dailyContent[displayDayIndex];
    // The label shown to user (1-based)
    const displayDayNumber = displayDayIndex + 1;

    return (
      <div className="pb-20 animate-fade-in px-4 pt-6">
        <button onClick={() => setSelected(null)} className="flex items-center gap-1 text-sm text-accent mb-4">
          <ChevronLeft className="w-4 h-4" /> Voltar
        </button>
        <h1 className="font-display text-2xl font-bold mb-1">{challenge.title}</h1>
        <p className="text-sm text-muted-foreground mb-4">{challenge.description}</p>

        {/* Progress */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 bg-muted rounded-full h-2.5 overflow-hidden">
            <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${(completed / challenge.days) * 100}%` }} />
          </div>
          <span className="text-sm font-semibold text-accent">{completed}/{challenge.days}</span>
        </div>

        {/* Days grid */}
        <div className="flex flex-wrap gap-2 mb-5">
          {Array.from({ length: challenge.days }, (_, i) => (
            <div
              key={i}
              className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-semibold ${i < completed ? "bg-accent text-primary-foreground" : i === completed ? "bg-card border-2 border-accent text-accent" : "bg-muted text-muted-foreground"
                }`}
            >
              {i < completed ? <Check className="w-4 h-4" /> : i + 1}
            </div>
          ))}
        </div>

        {completed < challenge.days ? (
          <>
            <div className="bg-card rounded-2xl p-5 shadow-card mb-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">Dia {displayDayNumber}</h3>
              <p className="font-display italic text-lg mb-2">"{todayContent.verse.text}"</p>
              <p className="text-sm text-accent font-semibold mb-3">{todayContent.verse.reference}</p>
              <p className="text-sm text-muted-foreground mb-3">{todayContent.reflection}</p>
              <p className="text-sm italic">{todayContent.prayer}</p>
            </div>

            {canComplete ? (
              <button
                onClick={async () => {
                  const success = await markDay(challenge.id);
                  if (success) {
                    toast.success("Dia completado! 🙏");
                  } else {
                    toast.info("Você já completou o dia de hoje. Volte amanhã!");
                  }
                }}
                className="w-full bg-accent text-primary-foreground rounded-xl py-3 font-semibold text-sm"
              >
                ✓ Completar Dia {displayDayNumber}
              </button>
            ) : (
              <div className="w-full bg-muted rounded-xl py-3 text-center">
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Lock className="w-4 h-4" />
                  <span className="font-semibold text-sm">Volte amanhã para o próximo dia</span>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="bg-card rounded-2xl p-5 shadow-card text-center">
            <Flame className="w-8 h-8 text-accent mx-auto mb-2" />
            <h3 className="font-display text-lg font-semibold">Desafio Concluído! 🎉</h3>
            <p className="text-sm text-muted-foreground mt-1">Parabéns por completar este desafio!</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="pb-20 animate-fade-in">
      <div className="px-4 pt-6">
        <div className="flex items-center gap-2 mb-5">
          <Flame className="w-5 h-5 text-accent" />
          <h1 className="font-display text-2xl font-bold">Desafios com Deus</h1>
        </div>

        <div className="space-y-3">
          {challenges.map(c => {
            const done = progress[c.id] || 0;
            return (
              <button
                key={c.id}
                onClick={() => setSelected(c.id)}
                className="w-full text-left bg-card rounded-2xl p-4 shadow-card hover:bg-secondary transition-colors"
              >
                <h3 className="font-display text-lg font-semibold">{c.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{c.description}</p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: `${(done / c.days) * 100}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-accent">{done}/{c.days}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
