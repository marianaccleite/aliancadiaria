import { useState } from "react";
import { devotionals } from "@/data/content";
import { useDiary } from "@/hooks/useDiary";
import { Heart, ChevronLeft, BookmarkPlus } from "lucide-react";
import { toast } from "sonner";

const categories = ["Todas", "Fé", "Ansiedade", "Gratidão", "Esperança", "Propósito", "Confiança em Deus"];

export default function DevotionalsPage() {
  const [category, setCategory] = useState("Todas");
  const [selected, setSelected] = useState<string | null>(null);
  const { addEntry } = useDiary();

  const filtered = category === "Todas" ? devotionals : devotionals.filter(d => d.category === category);
  const devotional = selected ? devotionals.find(d => d.id === selected) : null;

  if (devotional) {
    return (
      <div className="pb-20 animate-fade-in px-4 pt-6">
        <button onClick={() => setSelected(null)} className="flex items-center gap-1 text-sm text-accent mb-4">
          <ChevronLeft className="w-4 h-4" /> Voltar
        </button>
        <span className="text-xs font-semibold text-accent uppercase tracking-wide">{devotional.category}</span>
        <h1 className="font-display text-2xl font-bold mt-1 mb-4">{devotional.title}</h1>
        
        <div className="bg-card rounded-2xl p-5 shadow-card mb-4">
          <p className="font-display italic text-lg leading-relaxed">"{devotional.verse.text}"</p>
          <p className="text-sm text-accent font-semibold mt-2">{devotional.verse.reference}</p>
        </div>

        <div className="bg-card rounded-2xl p-5 shadow-card mb-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">Reflexão</h3>
          <p className="text-sm leading-relaxed">{devotional.reflection}</p>
        </div>

        <div className="bg-card rounded-2xl p-5 shadow-card mb-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">Oração</h3>
          <p className="text-sm leading-relaxed italic">{devotional.prayer}</p>
        </div>

        <button
          onClick={() => {
            addEntry({ type: "devotional", title: devotional.title, content: devotional.reflection, reference: devotional.verse.reference });
            toast.success("Devocional salvo no diário!");
          }}
          className="w-full bg-accent text-primary-foreground rounded-xl py-3 font-semibold text-sm flex items-center justify-center gap-2"
        >
          <BookmarkPlus className="w-4 h-4" /> Salvar no Diário
        </button>
      </div>
    );
  }

  return (
    <div className="pb-20 animate-fade-in">
      <div className="px-4 pt-6">
        <div className="flex items-center gap-2 mb-5">
          <Heart className="w-5 h-5 text-accent" />
          <h1 className="font-display text-2xl font-bold">Devocionais</h1>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                category === cat ? "bg-accent text-primary-foreground" : "bg-card text-muted-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map(d => (
            <button
              key={d.id}
              onClick={() => setSelected(d.id)}
              className="w-full text-left bg-card rounded-2xl p-4 shadow-card hover:bg-secondary transition-colors"
            >
              <span className="text-xs text-accent font-semibold uppercase">{d.category}</span>
              <h3 className="font-display text-lg font-semibold mt-1">{d.title}</h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{d.verse.text}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
