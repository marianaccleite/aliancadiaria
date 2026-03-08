import { createClient } from "https://esm.sh/@supabase/supabase-js@2.98.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Map Portuguese book names to API slugs (using abibliadigital.com.br)
const bookSlugs: Record<string, string> = {
  "Gênesis": "gn", "Êxodo": "ex", "Levítico": "lv", "Números": "nm", "Deuteronômio": "dt",
  "Josué": "js", "Juízes": "jz", "Rute": "rt", "1 Samuel": "1sm", "2 Samuel": "2sm",
  "1 Reis": "1rs", "2 Reis": "2rs", "1 Crônicas": "1cr", "2 Crônicas": "2cr",
  "Esdras": "ed", "Neemias": "ne", "Ester": "et", "Jó": "job", "Salmos": "sl",
  "Provérbios": "pv", "Eclesiastes": "ec", "Cantares": "ct", "Isaías": "is",
  "Jeremias": "jr", "Lamentações": "lm", "Ezequiel": "ez", "Daniel": "dn",
  "Oséias": "os", "Joel": "jl", "Amós": "am", "Obadias": "ob", "Jonas": "jn",
  "Miquéias": "mq", "Naum": "na", "Habacuque": "hc", "Sofonias": "sf",
  "Ageu": "ag", "Zacarias": "zc", "Malaquias": "ml",
  "Mateus": "mt", "Marcos": "mc", "Lucas": "lc", "João": "jo", "Atos": "at",
  "Romanos": "rm", "1 Coríntios": "1co", "2 Coríntios": "2co", "Gálatas": "gl",
  "Efésios": "ef", "Filipenses": "fp", "Colossenses": "cl",
  "1 Tessalonicenses": "1ts", "2 Tessalonicenses": "2ts", "1 Timóteo": "1tm",
  "2 Timóteo": "2tm", "Tito": "tt", "Filemom": "fm", "Hebreus": "hb",
  "Tiago": "tg", "1 Pedro": "1pe", "2 Pedro": "2pe", "1 João": "1jo",
  "2 João": "2jo", "3 João": "3jo", "Judas": "jd", "Apocalipse": "ap",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { book, chapter } = await req.json();
    const slug = bookSlugs[book];

    if (!slug) {
      return new Response(JSON.stringify({ error: "Livro não encontrado" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Use A Bíblia Digital API (free, Portuguese NVI)
    const response = await fetch(
      `https://www.abibliadigital.com.br/api/verses/nvi/${slug}/${chapter}`,
      {
        headers: { "Accept": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();

    const verses = data.verses?.map((v: any) => ({
      number: v.number,
      text: v.text,
    })) || [];

    return new Response(JSON.stringify({ verses, book: data.book?.name || book, chapter: data.chapter?.number || chapter }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
