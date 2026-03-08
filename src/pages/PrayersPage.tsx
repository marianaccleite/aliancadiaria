import { useState } from "react";
import { prayers } from "@/data/content";
import { useDiary } from "@/hooks/useDiary";
import { HandHelping, ChevronLeft, BookmarkPlus, Share2, MessageCircleHeart, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export default function PrayersPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [showOreComigo, setShowOreComigo] = useState(false);
  const [feeling, setFeeling] = useState("");
  const [generatedPrayer, setGeneratedPrayer] = useState<{ prayer: string; verse: string; reference: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { addEntry } = useDiary();
  const prayer = selected ? prayers.find(p => p.id === selected) : null;

  const shareContent = async (text: string) => {
    try {
      if (navigator.share) {
        await navigator.share({ text: text + "\n\nEnviado pelo app Aliança com Deus" });
      } else {
        await navigator.clipboard.writeText(text + "\n\nEnviado pelo app Aliança com Deus");
        toast.success("Copiado para a área de transferência!");
      }
    } catch {
      try {
        await navigator.clipboard.writeText(text + "\n\nEnviado pelo app Aliança com Deus");
        toast.success("Copiado para a área de transferência!");
      } catch {
        toast.error("Não foi possível compartilhar");
      }
    }
  };

  const generatePrayer = async () => {
    if (!feeling.trim()) {
      toast.error("Escreva o que você está sentindo");
      return;
    }
    setIsLoading(true);
    setGeneratedPrayer(null);

    try {
      const { data, error } = await supabase.functions.invoke("ore-comigo", {
        body: { feeling: feeling.trim() },
      });

      if (error) throw error;
      setGeneratedPrayer(data);
    } catch (err: any) {
      console.error("Ore comigo error:", err);
      toast.error("Não foi possível gerar a oração. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  if (showOreComigo) {
    return (
      <div className="pb-20 animate-fade-in px-4 pt-6">
        <button onClick={() => { setShowOreComigo(false); setGeneratedPrayer(null); setFeeling(""); }} className="flex items-center gap-1 text-sm text-accent mb-4">
          <ChevronLeft className="w-4 h-4" /> Voltar
        </button>
        <div className="flex items-center gap-2 mb-5">
          <MessageCircleHeart className="w-5 h-5 text-accent" />
          <h1 className="font-display text-2xl font-bold">Ore Comigo</h1>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          Compartilhe o que está no seu coração. Vamos orar juntos baseados na Palavra de Deus.
        </p>

        <textarea
          value={feeling}
          onChange={(e) => setFeeling(e.target.value)}
          placeholder="Escreva o que você está sentindo ou passando..."
          className="w-full bg-card border border-border rounded-2xl p-4 text-sm text-foreground placeholder:text-muted-foreground/50 resize-none h-32 focus:outline-none focus:ring-2 focus:ring-accent/30"
        />

        <button
          onClick={generatePrayer}
          disabled={isLoading || !feeling.trim()}
          className="w-full bg-accent text-primary-foreground rounded-xl py-3 font-semibold text-sm mt-3 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Gerando oração...
            </>
          ) : (
            <>
              <MessageCircleHeart className="w-4 h-4" /> Gerar Oração
            </>
          )}
        </button>

        {generatedPrayer && (
          <div className="mt-5 space-y-4 animate-fade-in">
            <div className="bg-card rounded-2xl p-5 shadow-card">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Sua Oração</h3>
              <p className="text-sm leading-relaxed italic text-foreground">{generatedPrayer.prayer}</p>
            </div>

            <div className="bg-card rounded-2xl p-5 shadow-card">
              <p className="font-display italic">"{generatedPrayer.verse}"</p>
              <p className="text-sm text-accent font-semibold mt-2">{generatedPrayer.reference}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  addEntry({ type: "prayer", title: "Oração Personalizada", content: generatedPrayer.prayer, reference: generatedPrayer.reference });
                  toast.success("Oração salva no diário!");
                }}
                className="flex-1 bg-accent text-primary-foreground rounded-xl py-3 font-semibold text-sm flex items-center justify-center gap-2"
              >
                <BookmarkPlus className="w-4 h-4" /> Salvar
              </button>
              <button
                onClick={() => shareContent(`${generatedPrayer.prayer}\n\n"${generatedPrayer.verse}" — ${generatedPrayer.reference}`)}
                className="flex-1 bg-card text-foreground rounded-xl py-3 font-semibold text-sm flex items-center justify-center gap-2 border border-border"
              >
                <Share2 className="w-4 h-4" /> Compartilhar
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (prayer) {
    return (
      <div className="pb-20 animate-fade-in px-4 pt-6">
        <button onClick={() => setSelected(null)} className="flex items-center gap-1 text-sm text-accent mb-4">
          <ChevronLeft className="w-4 h-4" /> Voltar
        </button>
        <h1 className="font-display text-2xl font-bold mb-4">{prayer.title}</h1>

        <div className="bg-card rounded-2xl p-5 shadow-card mb-4">
          <p className="text-sm leading-relaxed italic">{prayer.text}</p>
        </div>

        <div className="bg-card rounded-2xl p-5 shadow-card mb-4">
          <p className="font-display italic">"{prayer.verse.text}"</p>
          <p className="text-sm text-accent font-semibold mt-2">{prayer.verse.reference}</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => {
              addEntry({ type: "prayer", title: prayer.title, content: prayer.text, reference: prayer.verse.reference });
              toast.success("Oração salva no diário!");
            }}
            className="flex-1 bg-accent text-primary-foreground rounded-xl py-3 font-semibold text-sm flex items-center justify-center gap-2"
          >
            <BookmarkPlus className="w-4 h-4" /> Salvar
          </button>
          <button
            onClick={() => shareContent(`${prayer.title}\n\n${prayer.text}\n\n"${prayer.verse.text}" — ${prayer.verse.reference}`)}
            className="flex-1 bg-card text-foreground rounded-xl py-3 font-semibold text-sm flex items-center justify-center gap-2 border border-border"
          >
            <Share2 className="w-4 h-4" /> Compartilhar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20 animate-fade-in">
      <div className="px-4 pt-6">
        <div className="flex items-center gap-2 mb-5">
          <HandHelping className="w-5 h-5 text-accent" />
          <h1 className="font-display text-2xl font-bold">Biblioteca de Orações</h1>
        </div>

        {/* Ore Comigo CTA */}
        <button
          onClick={() => setShowOreComigo(true)}
          className="w-full gradient-gold rounded-2xl p-4 shadow-soft text-left mb-4 transition-transform active:scale-[0.98]"
        >
          <div className="flex items-center gap-3">
            <MessageCircleHeart className="w-8 h-8 text-accent" />
            <div>
              <h3 className="font-display text-lg font-semibold text-foreground">Ore Comigo</h3>
              <p className="text-xs text-muted-foreground">Receba uma oração personalizada baseada na Palavra de Deus</p>
            </div>
          </div>
        </button>

        <div className="space-y-3">
          {prayers.map(p => (
            <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              className="w-full text-left bg-card rounded-2xl p-4 shadow-card hover:bg-secondary transition-colors"
            >
              <h3 className="font-display text-lg font-semibold">{p.title}</h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{p.text}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
