import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { feeling } = await req.json();
    if (!feeling || typeof feeling !== "string") {
      return new Response(JSON.stringify({ error: "Por favor, compartilhe o que você está sentindo." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `Você é um conselheiro cristão amoroso e compassivo. O usuário vai compartilhar o que está sentindo ou passando, e você deve gerar uma oração personalizada baseada em princípios bíblicos.

IMPORTANTE: Responda SEMPRE em formato JSON válido com exatamente esta estrutura:
{"prayer": "texto da oração aqui", "verse": "texto do versículo bíblico aqui", "reference": "referência bíblica aqui"}

A oração deve:
- Ser reconfortante, amorosa e baseada na Bíblia
- Ter entre 3 a 5 frases
- Começar com "Senhor" ou "Pai Celestial"
- Terminar com "Amém"
- Incluir referências indiretas a princípios bíblicos

O versículo deve ser relevante ao que a pessoa está sentindo.
Responda SOMENTE o JSON, sem markdown, sem código, sem explicação adicional.`
          },
          {
            role: "user",
            content: feeling,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_prayer",
              description: "Gera uma oração personalizada com versículo bíblico",
              parameters: {
                type: "object",
                properties: {
                  prayer: { type: "string", description: "A oração personalizada" },
                  verse: { type: "string", description: "O texto do versículo bíblico" },
                  reference: { type: "string", description: "A referência bíblica (ex: João 3:16)" },
                },
                required: ["prayer", "verse", "reference"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "generate_prayer" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Muitas solicitações. Tente novamente em alguns instantes." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Créditos insuficientes." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const result = await response.json();
    
    // Extract from tool call
    const toolCall = result.choices?.[0]?.message?.tool_calls?.[0];
    if (toolCall?.function?.arguments) {
      const parsed = JSON.parse(toolCall.function.arguments);
      return new Response(JSON.stringify(parsed), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fallback: try to parse content directly
    const content = result.choices?.[0]?.message?.content;
    if (content) {
      const parsed = JSON.parse(content);
      return new Response(JSON.stringify(parsed), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    throw new Error("No valid response from AI");
  } catch (e) {
    console.error("ore-comigo error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Erro ao gerar oração" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
