import { BookOpen, Heart, Flame, HandHelping, BookMarked, Sparkles, Shield, ChevronRight, Star, Check, Smartphone, Bell, Brain, ThumbsUp, MessageCircle, Share2, MoreHorizontal, Repeat2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import logoUrl from "/logo.png";
import avatarMaria from "@/assets/avatar_maria.png";
import avatarJoao from "@/assets/avatar_joao.png";
import avatarAna from "@/assets/avatar_ana.png";

const features = [
  { icon: BookOpen, title: "Versículo do Dia", desc: "Uma palavra de Deus personalizada todos os dias para fortalecer sua fé" },
  { icon: Heart, title: "Devocionais Diários", desc: "Reflexões profundas com versículo, meditação e oração guiada" },
  { icon: HandHelping, title: "Orações Guiadas", desc: "Biblioteca com mais de 50 orações e IA para orar com você" },
  { icon: Flame, title: "Desafios Espirituais", desc: "Desafios de 7, 21 e 30 dias para criar hábitos com Deus" },
  { icon: BookMarked, title: "Diário Espiritual", desc: "Salve versículos e orações favoritos — sincronizado na nuvem" },
  { icon: Brain, title: "Ore Comigo (IA)", desc: "Orações personalizadas geradas com inteligência artificial" },
  { icon: Bell, title: "Notificações Diárias", desc: "Lembrete matinal com uma palavra de Deus para o seu dia" },
  { icon: Smartphone, title: "App no Celular", desc: "Instale diretamente no celular, funciona sem internet" },
];

const testimonials = [
  {
    name: "Maria Santos",
    handle: "@mariasantos",
    avatar: "MS",
    avatarImg: avatarMaria,
    avatarBg: "from-pink-500 to-rose-600",
    time: "2h atrás",
    platform: "Instagram",
    text: "Gente, que app incrível! 😭🙏 Já faz 3 meses que uso o Aliança com Deus e minha vida de oração mudou completamente. Todo dia acordo com uma palavra nova e fresca do Senhor. Impossível imaginar minha manhã sem ele!\n\n#AliançaComDeus #Fé #VersículoDoDia",
    likes: 248,
    comments: 31,
    shares: 14,
    verified: true,
  },
  {
    name: "João Paulo",
    handle: "@joaopaulofe",
    avatar: "JP",
    avatarImg: avatarJoao,
    avatarBg: "from-blue-500 to-indigo-600",
    time: "1 dia atrás",
    platform: "Twitter",
    text: "Completei o desafio de 30 dias do @AliancaComDeus e não tem preço esse sentimento! 🔥 Minha fé nunca esteve tão forte. Se você tá buscando uma rotina espiritual sólida, esse app é o caminho!\n\nNos últimos 30 dias orei todos os dias. TODOS. 💪",
    likes: 183,
    comments: 22,
    shares: 41,
    verified: false,
  },
  {
    name: "Ana Carvalho",
    handle: "@anacarvalho_luz",
    avatar: "AC",
    avatarImg: avatarAna,
    avatarBg: "from-violet-500 to-purple-600",
    time: "3 dias atrás",
    platform: "Instagram",
    text: "A função \"Ore Comigo\" com IA é ABSURDAMENTE boa 😍✨ Cada oração parece feita especialmente pra mim. Chorei de emoção na primeira vez que usei.\n\nSe você ainda não baixou o Aliança com Deus, o que tá esperando? 🙏💜 #Indicação",
    likes: 519,
    comments: 67,
    shares: 98,
    verified: true,
  },
];

// Simulated app screens data
const appScreens = [
  {
    title: "Versículo do Dia",
    emoji: "📖",
    color: "from-blue-900 to-blue-700",
    content: '"O Senhor é o meu pastor; nada me faltará." — Salmos 23:1',
    sub: "Palavra fresca de Deus todos os dias",
  },
  {
    title: "Desafios Espirituais",
    emoji: "🔥",
    color: "from-orange-900 to-orange-700",
    content: "21 Dias Fortalecendo Sua Fé\n━━━━━━━━━━━ 62%",
    sub: "Progresso sincronizado na nuvem",
  },
  {
    title: "Ore Comigo (IA)",
    emoji: "✨",
    color: "from-purple-900 to-purple-700",
    content: '"Pai, eu entrego toda minha ansiedade a Ti. Sei que Tu cuidas de mim..."',
    sub: "Orações personalizadas com IA",
  },
  {
    title: "Bíblia Completa",
    emoji: "📚",
    color: "from-green-900 to-green-700",
    content: "Gênesis • Êxodo • Levítico\nSalmos • Provérbios • João...",
    sub: "Todos os 66 livros disponíveis",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-[85vh] min-h-[600px] overflow-hidden">
        <img src={heroBg} alt="Luz divina" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <img src={logoUrl} alt="Aliança com Deus" className="w-24 h-24 object-contain rounded-3xl mb-4 shadow-2xl" />
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-3 leading-tight">
            Aliança com Deus
          </h1>
          <p className="text-primary-foreground/80 text-lg md:text-xl mb-3 max-w-md">
            O app que transforma sua vida espiritual — versículos, devocionais, orações e desafios todo dia
          </p>
          <div className="flex items-center gap-1 mb-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            ))}
            <span className="text-primary-foreground/70 text-sm ml-1">+500 membros ativos</span>
          </div>

          {/* Pricing CTA */}
          <button
            onClick={() => navigate("/auth")}
            className="bg-accent text-primary-foreground px-8 py-4 rounded-2xl font-bold text-lg shadow-soft hover:opacity-90 transition-all active:scale-95 mb-3"
          >
            Começar agora — R$ 14,90/mês
          </button>
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2">
              <span className="text-primary-foreground/50 line-through text-sm">R$ 39,90/mês</span>
              <span className="bg-red-500/80 text-white text-xs font-bold px-2 py-0.5 rounded-full">63% OFF</span>
            </div>
            <p className="text-accent/90 text-xs font-semibold">🔥 Plano Promocional — Oferta por tempo limitado!</p>
            <p className="text-primary-foreground/50 text-xs mt-1">Cancele quando quiser • Sem fidelidade</p>
          </div>
        </div>
      </div>

      {/* App Screenshots - Simulated */}
      <section className="py-16 px-6 bg-secondary/30">
        <div className="max-w-lg mx-auto">
          <h2 className="font-display text-2xl font-bold text-center mb-2">Veja o app em ação</h2>
          <p className="text-muted-foreground text-center mb-10">Interface linda, intuitiva e feita para sua jornada com Deus</p>

          <div className="grid grid-cols-2 gap-3">
            {appScreens.map((screen) => (
              <div key={screen.title} className={`rounded-2xl bg-gradient-to-br ${screen.color} p-4 shadow-lg`}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{screen.emoji}</span>
                  <span className="text-white font-semibold text-xs">{screen.title}</span>
                </div>
                <div className="bg-white/10 rounded-xl p-3 mb-2">
                  <p className="text-white/90 text-xs leading-relaxed whitespace-pre-line">{screen.content}</p>
                </div>
                <p className="text-white/60 text-[10px]">{screen.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6">
        <div className="max-w-lg mx-auto">
          <h2 className="font-display text-2xl font-bold text-center mb-2">Tudo o que você precisa</h2>
          <p className="text-muted-foreground text-center mb-10">Para uma vida espiritual mais profunda e consistente</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-card rounded-2xl p-5 shadow-card flex gap-3 items-start">
                <div className="bg-accent/10 rounded-xl p-2.5 flex-shrink-0">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-display font-semibold mb-1 text-sm">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-snug">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Social Media Style */}
      <section className="py-16 px-4 bg-secondary/50">
        <div className="max-w-lg mx-auto">
          <h2 className="font-display text-2xl font-bold text-center mb-2">O que dizem nossos membros</h2>
          <p className="text-muted-foreground text-center mb-10">Vidas transformadas — direto das redes sociais 💬</p>
          <div className="space-y-4">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-card rounded-2xl shadow-card overflow-hidden border border-border/50">
                {/* Post Header */}
                <div className="flex items-center justify-between px-4 pt-4 pb-3">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.avatarBg} flex-shrink-0 shadow-md overflow-hidden`}>
                      {t.avatarImg
                        ? <img src={t.avatarImg} alt={t.name} className="w-full h-full object-cover object-top" />
                        : <span className="flex items-center justify-center w-full h-full text-white font-bold text-xs">{t.avatar}</span>
                      }
                    </div>
                    {/* Name + handle */}
                    <div>
                      <div className="flex items-center gap-1">
                        <p className="text-sm font-bold text-foreground leading-none">{t.name}</p>
                        {t.verified && (
                          <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-accent flex-shrink-0">
                            <Check className="w-2 h-2 text-white stroke-[3]" />
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{t.handle} · {t.time}</p>
                    </div>
                  </div>
                  {/* Platform badge */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-muted-foreground/60 font-medium">{t.platform}</span>
                    <MoreHorizontal className="w-4 h-4 text-muted-foreground/40" />
                  </div>
                </div>

                {/* Post Text */}
                <div className="px-4 pb-3">
                  <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{t.text}</p>
                </div>

                {/* Divider */}
                <div className="border-t border-border/40 mx-4" />

                {/* Interaction Bar */}
                <div className="flex items-center justify-between px-2 py-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-accent/10 transition-colors group">
                    <ThumbsUp className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                    <span className="text-xs text-muted-foreground group-hover:text-accent transition-colors font-medium">{t.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-blue-500/10 transition-colors group">
                    <MessageCircle className="w-4 h-4 text-muted-foreground group-hover:text-blue-400 transition-colors" />
                    <span className="text-xs text-muted-foreground group-hover:text-blue-400 transition-colors font-medium">{t.comments}</span>
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-green-500/10 transition-colors group">
                    <Repeat2 className="w-4 h-4 text-muted-foreground group-hover:text-green-400 transition-colors" />
                    <span className="text-xs text-muted-foreground group-hover:text-green-400 transition-colors font-medium">{t.shares}</span>
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-secondary transition-colors group">
                    <Share2 className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-6">
        <div className="max-w-sm mx-auto">
          {/* Urgency badge */}
          <div className="text-center mb-4">
            <span className="bg-red-500/10 text-red-500 text-xs font-bold px-4 py-1.5 rounded-full border border-red-500/20">
              🔥 OFERTA POR TEMPO LIMITADO
            </span>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-card text-center border-2 border-accent">
            <Shield className="w-8 h-8 text-accent mx-auto mb-3" />
            <h3 className="font-display text-xl font-bold mb-1">Plano Aliança</h3>
            <p className="text-muted-foreground text-sm mb-4">Acesso completo a todas as funcionalidades</p>

            <div className="mb-1">
              <span className="text-muted-foreground line-through text-sm">R$ 39,90/mês</span>
            </div>
            <div className="mb-2">
              <span className="text-4xl font-bold text-foreground">R$ 14,90</span>
              <span className="text-muted-foreground">/mês</span>
            </div>
            <p className="text-accent text-xs font-semibold mb-3">✨ Plano Promocional — Economize 63%!</p>

            {/* Transparency note */}
            <div className="bg-secondary/60 border border-border/60 rounded-xl px-4 py-3 mb-6 text-left">
              <p className="text-xs text-muted-foreground leading-relaxed">
                💛 <span className="font-semibold text-foreground">Por que esse valor?</span> O Aliança com Deus é um projeto feito com amor e fé.
                O valor mensal é usado exclusivamente para cobrir os custos de servidores, banco de dados e
                inteligência artificial que mantêm o app funcionando todos os dias para você.
              </p>
            </div>

            <ul className="text-left space-y-2 mb-6">
              {[
                "Versículos e devocionais diários",
                "Biblioteca de orações",
                "Ore Comigo com IA",
                "Desafios espirituais (7, 21 e 30 dias)",
                "Diário espiritual na nuvem",
                "Bíblia completa (66 livros)",
                "Notificações diárias de manhã",
                "App instalável no celular (PWA)",
              ].map(item => (
                <li key={item} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-accent flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={() => navigate("/auth")}
              className="w-full bg-accent text-primary-foreground rounded-xl py-4 font-bold text-sm hover:opacity-90 transition-opacity mb-4"
            >
              Quero começar agora →
            </button>

            {/* 7-day guarantee */}
            <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/25 rounded-xl px-4 py-3 mb-3">
              <Shield className="w-8 h-8 text-green-500 flex-shrink-0" />
              <div className="text-left">
                <p className="text-xs font-bold text-green-500">Garantia de 7 dias</p>
                <p className="text-[11px] text-muted-foreground leading-snug">
                  Não gostou? Devolvemos 100% do seu dinheiro, sem perguntas.
                </p>
              </div>
            </div>

            <p className="text-muted-foreground text-xs">Cancele quando quiser • Sem taxa de cancelamento • Sem fidelidade</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6 bg-secondary/30">
        <div className="max-w-sm mx-auto text-center">
          <img src={logoUrl} alt="Aliança com Deus" className="w-16 h-16 object-contain rounded-2xl mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold mb-3">Pronto para se aproximar de Deus?</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Comece hoje mesmo sua jornada espiritual com o app que vai transformar sua vida de fé.
          </p>
          <button
            onClick={() => navigate("/auth")}
            className="w-full bg-accent text-primary-foreground rounded-2xl py-4 font-bold text-base hover:opacity-90 transition-all active:scale-95 mb-3"
          >
            Começar agora por R$ 14,90/mês
          </button>
          <p className="text-muted-foreground text-xs">De <span className="line-through">R$ 39,90</span> — por tempo limitado</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-lg mx-auto text-center space-y-2">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Aliança com Deus. Todos os direitos reservados.</p>
          <p className="text-xs text-muted-foreground">
            Dúvidas ou suporte?{" "}
            <a
              href="https://wa.me/5511981662982?text=Ol%C3%A1%2C%20tenho%20uma%20d%C3%BAvida%20sobre%20o%20Alian%C3%A7a%20com%20Deus!"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 font-semibold underline underline-offset-2 hover:text-green-400 transition-colors"
            >
              Fale conosco pelo WhatsApp
            </a>
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/5511981662982?text=Ol%C3%A1%2C%20tenho%20uma%20d%C3%BAvida%20sobre%20o%20Alian%C3%A7a%20com%20Deus!"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-4 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-400 active:scale-95 text-white rounded-full shadow-lg transition-all duration-200"
        style={{ paddingLeft: '14px', paddingRight: '16px', paddingTop: '10px', paddingBottom: '10px' }}
      >
        {/* WhatsApp SVG icon */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
        <span className="text-sm font-semibold">Suporte</span>
      </a>
    </div>
  );
}
