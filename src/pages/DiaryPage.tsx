import { useDiary } from "@/hooks/useDiary";
import { BookMarked, Trash2, BookOpen, Heart, HandHelping } from "lucide-react";
import { toast } from "sonner";

const typeIcons = { verse: BookOpen, devotional: Heart, prayer: HandHelping };
const typeLabels = { verse: "Versículo", devotional: "Devocional", prayer: "Oração" };

export default function DiaryPage() {
  const { entries, removeEntry } = useDiary();

  return (
    <div className="pb-20 animate-fade-in">
      <div className="px-4 pt-6">
        <div className="flex items-center gap-2 mb-5">
          <BookMarked className="w-5 h-5 text-accent" />
          <h1 className="font-display text-2xl font-bold">Diário Espiritual</h1>
        </div>

        {entries.length === 0 ? (
          <div className="text-center py-16">
            <BookMarked className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">Seu diário está vazio.</p>
            <p className="text-sm text-muted-foreground/60 mt-1">Salve versículos, orações e devocionais aqui.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {entries.map(entry => {
              const Icon = typeIcons[entry.type];
              return (
                <div key={entry.id} className="bg-card rounded-2xl p-4 shadow-card">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4 text-accent" />
                      <span className="text-xs font-semibold text-accent uppercase">{typeLabels[entry.type]}</span>
                    </div>
                    <button
                      onClick={() => { removeEntry(entry.id); toast.success("Removido do diário"); }}
                      className="text-muted-foreground/40 hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="font-semibold text-sm">{entry.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-3">{entry.content}</p>
                  {entry.reference && <p className="text-xs text-accent mt-1">{entry.reference}</p>}
                  <p className="text-[10px] text-muted-foreground/50 mt-2">
                    {new Date(entry.savedAt).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
