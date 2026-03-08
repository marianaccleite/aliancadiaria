import { useState } from "react";
import { oldTestament, newTestament, BibleBook } from "@/data/bible";
import { ChevronRight, ChevronLeft, BookOpen, BookmarkPlus, Share2, Loader2, Search, X } from "lucide-react";
import { useDiary } from "@/hooks/useDiary";
import { toast } from "sonner";

// api.bible configuration
const API_BIBLE_KEY = "sgWzO3o7PH5k8UlBY9Aa_";
const BIBLE_ID = "35b94e98b2e3a01a-01"; // Nova Versão Internacional (NVI) - Português
const API_BASE = "https://rest.api.bible/v1";

// Map Portuguese book names → api.bible book IDs
const BOOK_ID_MAP: Record<string, string> = {
  "Gênesis": "GEN", "Êxodo": "EXO", "Levítico": "LEV", "Números": "NUM",
  "Deuteronômio": "DEU", "Josué": "JOS", "Juízes": "JDG", "Rute": "RUT",
  "1 Samuel": "1SA", "2 Samuel": "2SA", "1 Reis": "1KI", "2 Reis": "2KI",
  "1 Crônicas": "1CH", "2 Crônicas": "2CH", "Esdras": "EZR", "Neemias": "NEH",
  "Ester": "EST", "Jó": "JOB", "Salmos": "PSA", "Provérbios": "PRO",
  "Eclesiastes": "ECC", "Cantares": "SNG", "Isaías": "ISA", "Jeremias": "JER",
  "Lamentações": "LAM", "Ezequiel": "EZK", "Daniel": "DAN", "Oséias": "HOS",
  "Joel": "JOL", "Amós": "AMO", "Obadias": "OBA", "Jonas": "JON",
  "Miquéias": "MIC", "Naum": "NAM", "Habacuque": "HAB", "Sofonias": "ZEP",
  "Ageu": "HAG", "Zacarias": "ZEC", "Malaquias": "MAL",
  "Mateus": "MAT", "Marcos": "MRK", "Lucas": "LUK", "João": "JHN",
  "Atos": "ACT", "Romanos": "ROM", "1 Coríntios": "1CO", "2 Coríntios": "2CO",
  "Gálatas": "GAL", "Efésios": "EPH", "Filipenses": "PHP", "Colossenses": "COL",
  "1 Tessalonicenses": "1TH", "2 Tessalonicenses": "2TH", "1 Timóteo": "1TI",
  "2 Timóteo": "2TI", "Tito": "TIT", "Filemom": "PHM", "Hebreus": "HEB",
  "Tiago": "JAS", "1 Pedro": "1PE", "2 Pedro": "2PE", "1 João": "1JN",
  "2 João": "2JN", "3 João": "3JN", "Judas": "JUD", "Apocalipse": "REV",
};

interface BibleVerse {
  number: number;
  text: string;
}

// Parse chapter text from api.bible format:
// "   [1] Texto do versículo.\n   [2] Texto...\n"
function parseChapterText(raw: string): BibleVerse[] {
  const verses: BibleVerse[] = [];
  // Match [number] followed by text until next [number] or end
  const regex = /\[(\d+)\]\s*([\s\S]*?)(?=\[\d+\]|$)/g;
  let match;
  while ((match = regex.exec(raw)) !== null) {
    const number = parseInt(match[1], 10);
    const text = match[2].replace(/\s+/g, " ").trim();
    if (text) verses.push({ number, text });
  }
  return verses;
}

export default function BiblePage() {
  const [tab, setTab] = useState<"old" | "new">("old");
  const [search, setSearch] = useState("");
  const [selectedBook, setSelectedBook] = useState<BibleBook | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [verses, setVerses] = useState<BibleVerse[]>([]);
  const [loadingChapter, setLoadingChapter] = useState(false);
  const { addEntry } = useDiary();

  const books = tab === "old" ? oldTestament : newTestament;

  const shareContent = async (text: string) => {
    try {
      if (navigator.share) {
        await navigator.share({ text: text + "\n\nAliança com Deus" });
      } else {
        await navigator.clipboard.writeText(text);
        toast.success("Copiado!");
      }
    } catch {
      await navigator.clipboard.writeText(text).catch(() => { });
      toast.success("Copiado!");
    }
  };

  const loadChapter = async (book: BibleBook, chapter: number) => {
    setSelectedChapter(chapter);
    setLoadingChapter(true);
    setVerses([]);

    const bookId = BOOK_ID_MAP[book.name];
    if (!bookId) {
      toast.error("Livro não encontrado.");
      setLoadingChapter(false);
      return;
    }

    try {
      const chapterId = `${bookId}.${chapter}`;
      const url = `${API_BASE}/bibles/${BIBLE_ID}/chapters/${chapterId}` +
        `?content-type=text&include-notes=false&include-titles=false` +
        `&include-verse-numbers=true&include-verse-spans=false`;

      const resp = await fetch(url, {
        headers: { "api-key": API_BIBLE_KEY },
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.message || `HTTP ${resp.status}`);
      }

      const json = await resp.json();
      const rawContent: string = json?.data?.content ?? "";

      const parsed = parseChapterText(rawContent);

      if (parsed.length > 0) {
        setVerses(parsed);
      } else {
        toast.error("Capítulo sem versículos disponíveis.");
      }
    } catch (err: any) {
      console.error("Bible API error:", err);
      toast.error("Erro ao carregar capítulo. Verifique sua conexão.");
    } finally {
      setLoadingChapter(false);
    }
  };

  // ── Chapter view ────────────────────────────────────────────────────────────
  if (selectedBook && selectedChapter !== null) {
    const chapterRef = `${selectedBook.name} ${selectedChapter}`;
    return (
      <div className="pb-20 animate-fade-in">
        <div className="px-4 pt-6">
          <button
            onClick={() => { setSelectedChapter(null); setVerses([]); }}
            className="flex items-center gap-1 text-sm text-accent mb-4"
          >
            <ChevronLeft className="w-4 h-4" /> Voltar
          </button>
          <h1 className="font-display text-2xl font-bold mb-1">{chapterRef}</h1>
          <p className="text-xs text-muted-foreground mb-4">NVI — Nova Versão Internacional</p>

          {loadingChapter ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-accent" />
              <p className="text-sm text-muted-foreground">Carregando capítulo...</p>
            </div>
          ) : verses.length > 0 ? (
            <div className="bg-card rounded-2xl p-5 shadow-card mb-4">
              <div className="space-y-2">
                {verses.map(v => (
                  <p key={v.number} className="text-sm leading-relaxed">
                    <span className="text-accent font-bold text-xs mr-1.5">{v.number}</span>
                    {v.text}
                  </p>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-card rounded-2xl p-5 shadow-card mb-4 text-center">
              <p className="text-sm text-muted-foreground">Selecione um capítulo para ler.</p>
            </div>
          )}

          {/* Chapter navigation */}
          <div className="flex gap-2 mb-4">
            {selectedChapter > 1 && (
              <button
                onClick={() => loadChapter(selectedBook, selectedChapter - 1)}
                className="flex-1 bg-card border border-border rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> Cap. {selectedChapter - 1}
              </button>
            )}
            {selectedChapter < selectedBook.chapters && (
              <button
                onClick={() => loadChapter(selectedBook, selectedChapter + 1)}
                className="flex-1 bg-card border border-border rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-1"
              >
                Cap. {selectedChapter + 1} <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                addEntry({
                  type: "verse",
                  title: chapterRef,
                  content: `Leitura de ${chapterRef}`,
                  reference: chapterRef,
                });
                toast.success("Salvo no diário!");
              }}
              className="flex-1 bg-accent text-primary-foreground rounded-xl py-3 font-semibold text-sm flex items-center justify-center gap-2"
            >
              <BookmarkPlus className="w-4 h-4" /> Salvar
            </button>
            <button
              onClick={() => shareContent(
                verses.map(v => `${v.number} ${v.text}`).join("\n") +
                `\n\n— ${chapterRef} (NVI)`
              )}
              className="flex-1 bg-card text-foreground rounded-xl py-3 font-semibold text-sm flex items-center justify-center gap-2 border border-border"
            >
              <Share2 className="w-4 h-4" /> Compartilhar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Book chapters view ──────────────────────────────────────────────────────
  if (selectedBook) {
    return (
      <div className="pb-20 animate-fade-in">
        <div className="px-4 pt-6">
          <button onClick={() => setSelectedBook(null)} className="flex items-center gap-1 text-sm text-accent mb-4">
            <ChevronLeft className="w-4 h-4" /> Voltar
          </button>
          <h1 className="font-display text-2xl font-bold mb-4">{selectedBook.name}</h1>
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: selectedBook.chapters }, (_, i) => (
              <button
                key={i}
                onClick={() => loadChapter(selectedBook, i + 1)}
                className="bg-card rounded-xl p-3 text-center font-semibold text-sm shadow-card hover:bg-secondary transition-colors active:scale-95"
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Book list ───────────────────────────────────────────────────────────────
  return (
    <div className="pb-20 animate-fade-in">
      <div className="px-4 pt-6">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="w-5 h-5 text-accent" />
          <h1 className="font-display text-2xl font-bold">Bíblia Sagrada</h1>
        </div>
        <p className="text-xs text-muted-foreground mb-4">Nova Versão Internacional (NVI) — Português</p>

        {/* Tab selector */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => { setTab("old"); setSearch(""); }}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors ${tab === "old" ? "bg-accent text-primary-foreground" : "bg-card text-muted-foreground"
              }`}
          >
            Antigo Testamento
          </button>
          <button
            onClick={() => { setTab("new"); setSearch(""); }}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors ${tab === "new" ? "bg-accent text-primary-foreground" : "bg-card text-muted-foreground"
              }`}
          >
            Novo Testamento
          </button>
        </div>

        {/* Search bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar livro..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-9 py-2.5 bg-card rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Book list */}
        {(() => {
          const filtered = books.filter(b =>
            b.name.toLowerCase().includes(search.toLowerCase())
          );
          return filtered.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-sm text-muted-foreground">Nenhum livro encontrado para "{search}"</p>
            </div>
          ) : null;
        })()}
        <div className="space-y-1.5">
          {books.filter(b => b.name.toLowerCase().includes(search.toLowerCase())).map((book) => (
            <button
              key={book.name}
              onClick={() => setSelectedBook(book)}
              className="w-full flex items-center justify-between bg-card rounded-xl px-4 py-3.5 shadow-card hover:bg-secondary transition-colors"
            >
              <span className="text-sm font-medium">{book.name}</span>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-xs">{book.chapters} cap.</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
