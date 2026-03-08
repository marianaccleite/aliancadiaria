export interface Verse {
  text: string;
  reference: string;
}

export interface Devotional {
  id: string;
  title: string;
  category: string;
  verse: Verse;
  reflection: string;
  prayer: string;
}

export interface Prayer {
  id: string;
  title: string;
  category: string;
  text: string;
  verse: Verse;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  days: number;
  dailyContent: { verse: Verse; reflection: string; prayer: string }[];
}

// ~365+ verses for daily variety
export const versesOfTheDay: Verse[] = [
  { text: "Porque Deus tanto amou o mundo que deu o seu Filho Unigênito, para que todo o que nele crer não pereça, mas tenha a vida eterna.", reference: "João 3:16" },
  { text: "O Senhor é o meu pastor; nada me faltará.", reference: "Salmos 23:1" },
  { text: "Tudo posso naquele que me fortalece.", reference: "Filipenses 4:13" },
  { text: "Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento.", reference: "Provérbios 3:5" },
  { text: "Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus.", reference: "Isaías 41:10" },
  { text: "Entrega o teu caminho ao Senhor; confia nele, e ele tudo fará.", reference: "Salmos 37:5" },
  { text: "Buscai primeiro o Reino de Deus e a sua justiça, e todas essas coisas vos serão acrescentadas.", reference: "Mateus 6:33" },
  { text: "Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz e não de mal, para vos dar o fim que esperais.", reference: "Jeremias 29:11" },
  { text: "Lança o teu cuidado sobre o Senhor, e ele te susterá.", reference: "Salmos 55:22" },
  { text: "Alegrai-vos sempre no Senhor; outra vez digo: alegrai-vos!", reference: "Filipenses 4:4" },
  { text: "Mas os que esperam no Senhor renovarão as suas forças; subirão com asas como águias.", reference: "Isaías 40:31" },
  { text: "Vinde a mim, todos os que estais cansados e sobrecarregados, e eu vos aliviarei.", reference: "Mateus 11:28" },
  // 13-24
  { text: "Eu sou o caminho, a verdade e a vida.", reference: "João 14:6" },
  { text: "O Senhor é a minha luz e a minha salvação; a quem temerei?", reference: "Salmos 27:1" },
  { text: "Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia.", reference: "Salmos 46:1" },
  { text: "Sede fortes e corajosos. Não temais, nem vos espanteis, pois o Senhor, o vosso Deus, estará convosco por onde quer que andeis.", reference: "Josué 1:9" },
  { text: "E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e os vossos pensamentos em Cristo Jesus.", reference: "Filipenses 4:7" },
  { text: "O Senhor é bom, uma fortaleza no dia da angústia.", reference: "Naum 1:7" },
  { text: "Não se turbe o vosso coração; credes em Deus, crede também em mim.", reference: "João 14:1" },
  { text: "Mas buscai primeiro o reino de Deus, e a sua justiça, e todas estas coisas vos serão acrescentadas.", reference: "Mateus 6:33" },
  { text: "Eis que estou à porta e bato; se alguém ouvir a minha voz e abrir a porta, entrarei em sua casa.", reference: "Apocalipse 3:20" },
  { text: "Porque onde estiver o vosso tesouro, aí estará também o vosso coração.", reference: "Mateus 6:21" },
  { text: "O amor é paciente, o amor é bondoso.", reference: "1 Coríntios 13:4" },
  { text: "Cria em mim, ó Deus, um coração puro e renova em mim um espírito reto.", reference: "Salmos 51:10" },
  // 25-36
  { text: "O Senhor é o meu rochedo, a minha cidadela e o meu libertador.", reference: "Salmos 18:2" },
  { text: "Pois pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus.", reference: "Efésios 2:8" },
  { text: "Ensina-me a fazer a tua vontade, pois tu és o meu Deus.", reference: "Salmos 143:10" },
  { text: "Bendize, ó minha alma, ao Senhor, e tudo o que há em mim bendiga o seu santo nome.", reference: "Salmos 103:1" },
  { text: "Eu vim para que tenham vida e a tenham com abundância.", reference: "João 10:10" },
  { text: "Quem habita no esconderijo do Altíssimo, à sombra do Onipotente descansará.", reference: "Salmos 91:1" },
  { text: "O Senhor é fiel e vos fortalecerá e guardará do maligno.", reference: "2 Tessalonicenses 3:3" },
  { text: "Não andeis ansiosos de coisa alguma; em tudo, sejam conhecidas as vossas petições diante de Deus.", reference: "Filipenses 4:6" },
  { text: "Tudo tem o seu tempo determinado, e há tempo para todo o propósito debaixo do céu.", reference: "Eclesiastes 3:1" },
  { text: "Se Deus é por nós, quem será contra nós?", reference: "Romanos 8:31" },
  { text: "Ó Senhor, tu me sondas e me conheces.", reference: "Salmos 139:1" },
  { text: "E conhecereis a verdade, e a verdade vos libertará.", reference: "João 8:32" },
  // 37-48
  { text: "Todas as coisas cooperam juntamente para o bem daqueles que amam a Deus.", reference: "Romanos 8:28" },
  { text: "Eu te amo, ó Senhor, força minha.", reference: "Salmos 18:1" },
  { text: "O choro pode durar uma noite, mas a alegria vem pela manhã.", reference: "Salmos 30:5" },
  { text: "Confiai nele, ó povo, em todo o tempo; derramai perante ele o vosso coração.", reference: "Salmos 62:8" },
  { text: "Porque o Senhor dá a sabedoria; da sua boca é que vem o conhecimento e o entendimento.", reference: "Provérbios 2:6" },
  { text: "Deita sobre o Senhor os teus cuidados, e ele te sustentará.", reference: "Salmos 55:22" },
  { text: "Eu, o Senhor, sondo o coração, eu provo os pensamentos.", reference: "Jeremias 17:10" },
  { text: "Os que semeiam em lágrimas segarão com alegria.", reference: "Salmos 126:5" },
  { text: "Aquele que em vós começou a boa obra a aperfeiçoará até ao dia de Cristo Jesus.", reference: "Filipenses 1:6" },
  { text: "O Senhor é compassivo e misericordioso, longânimo e assaz benigno.", reference: "Salmos 103:8" },
  { text: "Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo.", reference: "Salmos 23:4" },
  { text: "Lâmpada para os meus pés é a tua palavra e luz para o meu caminho.", reference: "Salmos 119:105" },
  // 49-60
  { text: "Acheguemo-nos, pois, com confiança ao trono da graça.", reference: "Hebreus 4:16" },
  { text: "Porque o Senhor, teu Deus, é quem vai contigo; não te deixará nem te desamparará.", reference: "Deuteronômio 31:6" },
  { text: "Porque dele, por ele e para ele são todas as coisas. A ele seja a glória para sempre!", reference: "Romanos 11:36" },
  { text: "Clama a mim, e responder-te-ei e anunciar-te-ei coisas grandes e firmes, que não sabes.", reference: "Jeremias 33:3" },
  { text: "O Senhor está perto de todos os que o invocam, de todos os que o invocam em verdade.", reference: "Salmos 145:18" },
  { text: "Guia-me na tua verdade e ensina-me, pois tu és o Deus da minha salvação.", reference: "Salmos 25:5" },
  { text: "Bem-aventurados os misericordiosos, porque eles alcançarão misericórdia.", reference: "Mateus 5:7" },
  { text: "Deus não nos deu o espírito de temor, mas de fortaleza, de amor e de moderação.", reference: "2 Timóteo 1:7" },
  { text: "Porquanto o Senhor conhece o caminho dos justos.", reference: "Salmos 1:6" },
  { text: "Cada um exerça o dom que recebeu para servir aos outros.", reference: "1 Pedro 4:10" },
  { text: "O fruto do Espírito é amor, alegria, paz, paciência, amabilidade, bondade, fidelidade.", reference: "Gálatas 5:22" },
  { text: "Quão preciosa é, ó Deus, a tua benignidade!", reference: "Salmos 36:7" },
  // 61-72
  { text: "Em ti, Senhor, confio; não seja eu jamais confundido.", reference: "Salmos 31:1" },
  { text: "Mas a vereda dos justos é como a luz da aurora, que vai brilhando mais e mais até ser dia perfeito.", reference: "Provérbios 4:18" },
  { text: "Nenhuma arma forjada contra ti prosperará.", reference: "Isaías 54:17" },
  { text: "Espera no Senhor, anima-te, e ele fortalecerá o teu coração.", reference: "Salmos 27:14" },
  { text: "A misericórdia do Senhor dura para sempre sobre aqueles que o temem.", reference: "Salmos 103:17" },
  { text: "Agora, pois, permanecem a fé, a esperança e o amor, estes três; mas o maior destes é o amor.", reference: "1 Coríntios 13:13" },
  { text: "Nem olhos viram, nem ouvidos ouviram, as coisas que Deus preparou para aqueles que o amam.", reference: "1 Coríntios 2:9" },
  { text: "Ele sara os quebrantados de coração e lhes pensa as feridas.", reference: "Salmos 147:3" },
  { text: "Eu sou a videira; vós sois os ramos. Quem permanece em mim e eu nele, dá muito fruto.", reference: "João 15:5" },
  { text: "O nome do Senhor é torre forte; o justo corre para ela e está seguro.", reference: "Provérbios 18:10" },
  { text: "Em todas estas coisas somos mais que vencedores, por aquele que nos amou.", reference: "Romanos 8:37" },
  { text: "Quando passares pelas águas, estarei contigo; quando pelos rios, eles não te submergirão.", reference: "Isaías 43:2" },
  // 73-84
  { text: "Não to mandei eu? Esforça-te e tem bom ânimo; não pasmes, nem te espantes.", reference: "Josué 1:9" },
  { text: "Sede, pois, imitadores de Deus, como filhos amados.", reference: "Efésios 5:1" },
  { text: "Porque a palavra de Deus é viva e eficaz.", reference: "Hebreus 4:12" },
  { text: "Louvai ao Senhor, porque ele é bom; porque a sua benignidade é para sempre.", reference: "Salmos 136:1" },
  { text: "O Senhor te abençoe e te guarde.", reference: "Números 6:24" },
  { text: "Sede misericordiosos, como também vosso Pai é misericordioso.", reference: "Lucas 6:36" },
  { text: "Porque somos feitura sua, criados em Cristo Jesus para boas obras.", reference: "Efésios 2:10" },
  { text: "Antes de te formar no ventre, eu te conheci.", reference: "Jeremias 1:5" },
  { text: "Peçam e lhes será dado; busquem e encontrarão; batam e a porta lhes será aberta.", reference: "Mateus 7:7" },
  { text: "A tua palavra é a verdade.", reference: "João 17:17" },
  { text: "Mas Deus prova o seu amor para conosco, em que Cristo morreu por nós, sendo nós ainda pecadores.", reference: "Romanos 5:8" },
  { text: "Sonda-me, ó Deus, e conhece o meu coração; prova-me e conhece os meus pensamentos.", reference: "Salmos 139:23" },
  // 85-96
  { text: "Disse-lhe Jesus: Eu sou a ressurreição e a vida.", reference: "João 11:25" },
  { text: "A esperança não nos decepciona, porque o amor de Deus é derramado em nossos corações.", reference: "Romanos 5:5" },
  { text: "Deleita-te também no Senhor, e te concederá os desejos do teu coração.", reference: "Salmos 37:4" },
  { text: "Eu vim buscar e salvar o que se havia perdido.", reference: "Lucas 19:10" },
  { text: "Portanto, se alguém está em Cristo, nova criatura é.", reference: "2 Coríntios 5:17" },
  { text: "Aquietai-vos e sabei que eu sou Deus.", reference: "Salmos 46:10" },
  { text: "Deus é amor; e quem está em amor está em Deus.", reference: "1 João 4:16" },
  { text: "Porque nada é impossível para Deus.", reference: "Lucas 1:37" },
  { text: "Combati o bom combate, acabei a carreira, guardei a fé.", reference: "2 Timóteo 4:7" },
  { text: "No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.", reference: "João 1:1" },
  { text: "O meu socorro vem do Senhor, que fez o céu e a terra.", reference: "Salmos 121:2" },
  { text: "Graça e paz vos sejam multiplicadas.", reference: "1 Pedro 1:2" },
  // 97-120
  { text: "Não julgueis, para que não sejais julgados.", reference: "Mateus 7:1" },
  { text: "Amarás o teu próximo como a ti mesmo.", reference: "Mateus 22:39" },
  { text: "Eu estarei convosco todos os dias, até à consumação dos séculos.", reference: "Mateus 28:20" },
  { text: "Ser-vos-á como a luz da manhã, quando sai o sol.", reference: "2 Samuel 23:4" },
  { text: "Porque o salário do pecado é a morte, mas o dom gratuito de Deus é a vida eterna.", reference: "Romanos 6:23" },
  { text: "Irmãos, não julgo que o haja alcançado; mas uma coisa faço: esquecendo-me das coisas que ficam atrás.", reference: "Filipenses 3:13" },
  { text: "Bem-aventurados os limpos de coração, porque eles verão a Deus.", reference: "Mateus 5:8" },
  { text: "Não vos conformeis com este mundo, mas transformai-vos pela renovação do vosso entendimento.", reference: "Romanos 12:2" },
  { text: "Eis que faço novas todas as coisas.", reference: "Apocalipse 21:5" },
  { text: "Dai, e ser-vos-á dado.", reference: "Lucas 6:38" },
  { text: "Que diremos a estas coisas? Se Deus é por nós, quem será contra nós?", reference: "Romanos 8:31" },
  { text: "Seja a vossa moderação conhecida de todos os homens. Perto está o Senhor.", reference: "Filipenses 4:5" },
  { text: "O justo viverá pela fé.", reference: "Habacuque 2:4" },
  { text: "Porque o Senhor dos Exércitos tem um dia reservado contra todos os soberbos.", reference: "Isaías 2:12" },
  { text: "Bom é louvar ao Senhor e cantar louvores ao teu nome, ó Altíssimo.", reference: "Salmos 92:1" },
  { text: "Na casa de meu Pai há muitas moradas.", reference: "João 14:2" },
  { text: "Pois onde se acham dois ou três reunidos em meu nome, aí estou no meio deles.", reference: "Mateus 18:20" },
  { text: "Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco.", reference: "1 Tessalonicenses 5:18" },
  { text: "A vossa fé não se apoie na sabedoria dos homens, mas no poder de Deus.", reference: "1 Coríntios 2:5" },
  { text: "Consolai, consolai o meu povo, diz o vosso Deus.", reference: "Isaías 40:1" },
  { text: "Grande é o Senhor e muito digno de louvor.", reference: "Salmos 145:3" },
  { text: "Bem-aventurados os que têm fome e sede de justiça, porque eles serão fartos.", reference: "Mateus 5:6" },
  { text: "O Senhor é a minha força e o meu cântico; ele se tornou a minha salvação.", reference: "Êxodo 15:2" },
  { text: "Mas eu confiarei na tua misericórdia; o meu coração se alegrará na tua salvação.", reference: "Salmos 13:5" },
  // 121-150
  { text: "Porque onde está a tua riqueza, aí estará também o teu coração.", reference: "Lucas 12:34" },
  { text: "Confessai as vossas culpas uns aos outros e orai uns pelos outros, para que sareis.", reference: "Tiago 5:16" },
  { text: "Bendito seja o Deus e Pai de nosso Senhor Jesus Cristo, que nos abençoou com todas as bênçãos espirituais.", reference: "Efésios 1:3" },
  { text: "Tudo quanto fizerdes, fazei-o de todo o coração, como ao Senhor.", reference: "Colossenses 3:23" },
  { text: "O Senhor é a minha rocha, a minha fortaleza e o meu libertador.", reference: "2 Samuel 22:2" },
  { text: "Coragem! Sou eu. Não tenham medo.", reference: "Mateus 14:27" },
  { text: "Não retribuam mal com mal, nem insulto com insulto.", reference: "1 Pedro 3:9" },
  { text: "Orai sem cessar.", reference: "1 Tessalonicenses 5:17" },
  { text: "O Senhor te guardará de todo o mal; ele guardará a tua alma.", reference: "Salmos 121:7" },
  { text: "Porque nada trouxemos para este mundo, e manifesto é que nada podemos levar dele.", reference: "1 Timóteo 6:7" },
  { text: "Quem ama a disciplina ama o conhecimento.", reference: "Provérbios 12:1" },
  { text: "Fiquem firmes e não se deixem escravizar de novo.", reference: "Gálatas 5:1" },
  { text: "Filhinhos, não amemos de palavra, nem de língua, mas por obra e em verdade.", reference: "1 João 3:18" },
  { text: "Levantarei os meus olhos para os montes; de onde vem o meu socorro?", reference: "Salmos 121:1" },
  { text: "A graça do Senhor Jesus Cristo seja com o vosso espírito.", reference: "Filemom 1:25" },
  { text: "Vigiai, estai firmes na fé; portai-vos varonilmente e fortalecei-vos.", reference: "1 Coríntios 16:13" },
  { text: "Ensina-nos a contar os nossos dias, para que alcancemos coração sábio.", reference: "Salmos 90:12" },
  { text: "Eu é que sei os planos que tenho para vocês, planos de fazê-los prosperar.", reference: "Jeremias 29:11" },
  { text: "Disse Jesus: Deixai vir os meninos a mim e não os impeçais.", reference: "Marcos 10:14" },
  { text: "Em verdade, em verdade vos digo: aquele que crê em mim tem a vida eterna.", reference: "João 6:47" },
  // 151-180
  { text: "Melhor é o fim das coisas do que o princípio delas.", reference: "Eclesiastes 7:8" },
  { text: "O Senhor é justo em todos os seus caminhos e santo em todas as suas obras.", reference: "Salmos 145:17" },
  { text: "Revesti-vos de toda a armadura de Deus.", reference: "Efésios 6:11" },
  { text: "Não te deixes vencer do mal, mas vence o mal com o bem.", reference: "Romanos 12:21" },
  { text: "Amai-vos uns aos outros, assim como eu vos amei.", reference: "João 13:34" },
  { text: "Se o meu povo, que se chama pelo meu nome, se humilhar e orar, eu ouvirei dos céus.", reference: "2 Crônicas 7:14" },
  { text: "Porque o Senhor corrige ao que ama.", reference: "Hebreus 12:6" },
  { text: "Quem anda com sábios ficará sábio.", reference: "Provérbios 13:20" },
  { text: "O justo florescerá como a palmeira.", reference: "Salmos 92:12" },
  { text: "Não temas, ó terra! Exulta e alegra-te, porque o Senhor fez grandes coisas.", reference: "Joel 2:21" },
  { text: "Sede santos, porque eu sou santo.", reference: "1 Pedro 1:16" },
  { text: "Não há judeu nem grego, não há servo nem livre; porque todos vós sois um em Cristo Jesus.", reference: "Gálatas 3:28" },
  { text: "A fé é a certeza daquilo que esperamos e a prova das coisas que não vemos.", reference: "Hebreus 11:1" },
  { text: "Porque a letra mata, mas o Espírito vivifica.", reference: "2 Coríntios 3:6" },
  { text: "Mas na tua grande misericórdia não os destruíste nem os desamparaste.", reference: "Neemias 9:31" },
  { text: "Provai e vede que o Senhor é bom; bem-aventurado o homem que nele confia.", reference: "Salmos 34:8" },
  { text: "Por isso vos digo: tudo o que pedirdes, orando, crede que o recebereis.", reference: "Marcos 11:24" },
  { text: "Ele não permitirá que o teu pé vacile; não dormitará aquele que te guarda.", reference: "Salmos 121:3" },
  { text: "Bem-aventurados os pacificadores, porque eles serão chamados filhos de Deus.", reference: "Mateus 5:9" },
  { text: "Quando estou fraco, então sou forte.", reference: "2 Coríntios 12:10" },
  { text: "Os céus declaram a glória de Deus e o firmamento anuncia a obra das suas mãos.", reference: "Salmos 19:1" },
  { text: "E tudo quanto pedirdes em meu nome eu o farei.", reference: "João 14:13" },
  { text: "Eu os conduzirei e os levarei a pastagens verdejantes.", reference: "Ezequiel 34:14" },
  { text: "Agrada-te do Senhor e Ele satisfará os desejos do teu coração.", reference: "Salmos 37:4" },
  { text: "Tudo o que é verdadeiro, tudo o que é respeitável, tudo o que é justo, nisso pensai.", reference: "Filipenses 4:8" },
  { text: "Edificarei a minha igreja, e as portas do inferno não prevalecerão contra ela.", reference: "Mateus 16:18" },
  { text: "Ensinar-te-ei e instruir-te-ei no caminho que deves seguir.", reference: "Salmos 32:8" },
  { text: "A fé vem pelo ouvir, e o ouvir pela palavra de Cristo.", reference: "Romanos 10:17" },
  { text: "Jeová-Jiré: Na montanha do Senhor se proverá.", reference: "Gênesis 22:14" },
  { text: "Jesus Cristo é o mesmo ontem, hoje e eternamente.", reference: "Hebreus 13:8" },
  // 181-210
  { text: "Bendito o homem que confia no Senhor, e cuja esperança é o Senhor.", reference: "Jeremias 17:7" },
  { text: "Não por força nem por violência, mas pelo meu Espírito, diz o Senhor.", reference: "Zacarias 4:6" },
  { text: "Buscar-me-eis e me achareis quando me buscardes de todo o vosso coração.", reference: "Jeremias 29:13" },
  { text: "Pai nosso, que estás nos céus, santificado seja o teu nome.", reference: "Mateus 6:9" },
  { text: "Não há condenação para os que estão em Cristo Jesus.", reference: "Romanos 8:1" },
  { text: "Disse o Senhor ao meu Senhor: Assenta-te à minha mão direita.", reference: "Salmos 110:1" },
  { text: "Pois o Altíssimo é poderoso; santo é o seu nome.", reference: "Lucas 1:49" },
  { text: "Voltarão os resgatados do Senhor e virão a Sião com cânticos.", reference: "Isaías 35:10" },
  { text: "Ama o Senhor teu Deus de todo o teu coração, de toda a tua alma e de todo o teu entendimento.", reference: "Mateus 22:37" },
  { text: "Sejam bondosos e compassivos uns para com os outros.", reference: "Efésios 4:32" },
  { text: "Porque o meu jugo é suave e o meu fardo é leve.", reference: "Mateus 11:30" },
  { text: "Bendito o Senhor Deus de Israel, que visitou e remiu o seu povo.", reference: "Lucas 1:68" },
  { text: "Não envelheçam os teus olhos; guarda os meus mandamentos e vive.", reference: "Provérbios 4:4" },
  { text: "E sobre todas estas coisas, revesti-vos de amor, que é o vínculo da perfeição.", reference: "Colossenses 3:14" },
  { text: "O que está em vós é maior do que o que está no mundo.", reference: "1 João 4:4" },
  { text: "Examinai tudo. Retende o bem.", reference: "1 Tessalonicenses 5:21" },
  { text: "Que a graça do Senhor Jesus seja com todos.", reference: "Apocalipse 22:21" },
  { text: "O Senhor é clemente e misericordioso, tardio em irar-se e grande em benignidade.", reference: "Salmos 145:8" },
  { text: "Ouve, Israel: o Senhor nosso Deus é o único Senhor.", reference: "Deuteronômio 6:4" },
  { text: "Dai a César o que é de César, e a Deus o que é de Deus.", reference: "Mateus 22:21" },
  { text: "Quem crê em mim, como diz a Escritura, rios de água viva correrão do seu ventre.", reference: "João 7:38" },
  { text: "Grandes são as obras do Senhor.", reference: "Salmos 111:2" },
  { text: "Porque pela esperança fomos salvos.", reference: "Romanos 8:24" },
  { text: "A terra é do Senhor e tudo o que nela se contém.", reference: "Salmos 24:1" },
  { text: "Seja feita a tua vontade, assim na terra como no céu.", reference: "Mateus 6:10" },
  { text: "Filho meu, ouve a instrução de teu pai e não deixes a doutrina de tua mãe.", reference: "Provérbios 1:8" },
  { text: "O meu Deus suprirá todas as vossas necessidades segundo as suas riquezas em glória.", reference: "Filipenses 4:19" },
  { text: "Senhor, a quem iremos nós? Tu tens as palavras da vida eterna.", reference: "João 6:68" },
  { text: "Todo o que o Pai me dá virá a mim; e o que vem a mim de maneira nenhuma o lançarei fora.", reference: "João 6:37" },
  { text: "Feliz o homem que acha sabedoria, e o homem que adquire conhecimento.", reference: "Provérbios 3:13" },
  // 211-240
  { text: "Crescei na graça e no conhecimento de nosso Senhor e Salvador Jesus Cristo.", reference: "2 Pedro 3:18" },
  { text: "Eu, porém, sou como a oliveira verde na casa de Deus.", reference: "Salmos 52:8" },
  { text: "Vós sois a luz do mundo.", reference: "Mateus 5:14" },
  { text: "Quem me segue não andará em trevas.", reference: "João 8:12" },
  { text: "A tua fidelidade chega até às nuvens.", reference: "Salmos 36:5" },
  { text: "Tende bom ânimo; eu venci o mundo.", reference: "João 16:33" },
  { text: "É melhor confiar no Senhor do que confiar nos homens.", reference: "Salmos 118:8" },
  { text: "Eis que estou convosco todos os dias.", reference: "Mateus 28:20" },
  { text: "Não havendo sábia direção, o povo cai, mas na multidão de conselheiros há segurança.", reference: "Provérbios 11:14" },
  { text: "O Senhor está perto dos que têm o coração quebrantado.", reference: "Salmos 34:18" },
  { text: "Amados, amemo-nos uns aos outros, pois o amor procede de Deus.", reference: "1 João 4:7" },
  { text: "Derrama a tua ira sobre as nações que não te conhecem.", reference: "Salmos 79:6" },
  { text: "Por isso, não desanimamos. Embora exteriormente estejamos a desgastar-nos, interiormente estamos sendo renovados.", reference: "2 Coríntios 4:16" },
  { text: "Eu sou a porta; se alguém entrar por mim, será salvo.", reference: "João 10:9" },
  { text: "O vosso adversário, o diabo, anda em derredor, bramando como leão. Resisti-lhe, firmes na fé.", reference: "1 Pedro 5:8-9" },
  { text: "A tua justiça é como as grandes montanhas.", reference: "Salmos 36:6" },
  { text: "Tornai-vos, pois, uns para com os outros, hospitaleiros.", reference: "1 Pedro 4:9" },
  { text: "Com Deus faremos proezas.", reference: "Salmos 60:12" },
  { text: "Tu és o meu abrigo; tu me protegerás da tribulação.", reference: "Salmos 32:7" },
  { text: "Respondeu Jesus: Amai os vossos inimigos e orai pelos que vos perseguem.", reference: "Mateus 5:44" },
  { text: "Todos erraram e destituídos estão da glória de Deus.", reference: "Romanos 3:23" },
  { text: "A boca fala do que está cheio o coração.", reference: "Mateus 12:34" },
  { text: "Não nos cansemos de fazer o bem, pois no tempo próprio colheremos.", reference: "Gálatas 6:9" },
  { text: "Vós sois o sal da terra.", reference: "Mateus 5:13" },
  { text: "O Senhor reinará para sempre, o teu Deus, ó Sião, de geração em geração.", reference: "Salmos 146:10" },
  { text: "Os meus tempos estão nas tuas mãos.", reference: "Salmos 31:15" },
  { text: "Porque grande é o Senhor e mui digno de ser louvado.", reference: "1 Crônicas 16:25" },
  { text: "Dai ao Senhor a glória devida ao seu nome.", reference: "Salmos 29:2" },
  { text: "Sede fiéis até à morte e dar-vos-ei a coroa da vida.", reference: "Apocalipse 2:10" },
  { text: "Mas, a todos quantos o receberam, deu-lhes o poder de serem feitos filhos de Deus.", reference: "João 1:12" },
  // 241-270
  { text: "Só o Senhor é Deus; além dele não há outro.", reference: "Deuteronômio 4:35" },
  { text: "Que riquezas da sua glória e do mistério de Cristo.", reference: "Colossenses 1:27" },
  { text: "O começo da sabedoria é o temor do Senhor.", reference: "Provérbios 9:10" },
  { text: "Uma geração vai, outra vem, mas a terra permanece para sempre.", reference: "Eclesiastes 1:4" },
  { text: "Tomai sobre vós o meu jugo e aprendei de mim.", reference: "Mateus 11:29" },
  { text: "Bendizei ao Senhor, vós todos os seus anjos.", reference: "Salmos 103:20" },
  { text: "O Espírito do Senhor está sobre mim, pois me ungiu para pregar boas novas.", reference: "Lucas 4:18" },
  { text: "Mil anos diante dos teus olhos são como o dia de ontem.", reference: "Salmos 90:4" },
  { text: "Mas eu vos digo: Amai os vossos inimigos.", reference: "Mateus 5:44" },
  { text: "Até os montes se derreteram diante do Senhor.", reference: "Juízes 5:5" },
  { text: "Cristo em vós, esperança da glória.", reference: "Colossenses 1:27" },
  { text: "Canta ao Senhor um cântico novo, porque fez maravilhas.", reference: "Salmos 98:1" },
  { text: "E eis que eu estou convosco todos os dias até a consumação dos séculos.", reference: "Mateus 28:20" },
  { text: "Honra a teu pai e a tua mãe.", reference: "Êxodo 20:12" },
  { text: "Sede como crianças, porque dos tais é o reino dos céus.", reference: "Mateus 19:14" },
  { text: "Nisto consiste o amor: não em que nós tenhamos amado a Deus, mas em que ele nos amou.", reference: "1 João 4:10" },
  { text: "Os passos de um homem bom são confirmados pelo Senhor.", reference: "Salmos 37:23" },
  { text: "Se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar.", reference: "1 João 1:9" },
  { text: "Quero cantar ao Senhor enquanto eu viver.", reference: "Salmos 104:33" },
  { text: "Tu, Senhor, és bom e perdoador.", reference: "Salmos 86:5" },
  { text: "Misericórdia quero e não sacrifício.", reference: "Mateus 9:13" },
  { text: "O Senhor faz justiça e direito a todos os oprimidos.", reference: "Salmos 103:6" },
  { text: "Pai, perdoa-lhes, porque não sabem o que fazem.", reference: "Lucas 23:34" },
  { text: "Vocês são templo de Deus e o Espírito de Deus habita em vocês.", reference: "1 Coríntios 3:16" },
  { text: "Lembrai-vos das maravilhas que ele fez.", reference: "Salmos 105:5" },
  { text: "Abre a tua boca, e eu a encherei.", reference: "Salmos 81:10" },
  { text: "Fortalecei-vos no Senhor e na força do seu poder.", reference: "Efésios 6:10" },
  { text: "Pois tudo o que é nascido de Deus vence o mundo.", reference: "1 João 5:4" },
  { text: "Faze-me ouvir a tua benignidade pela manhã.", reference: "Salmos 143:8" },
  { text: "Guardei a tua palavra no meu coração, para não pecar contra ti.", reference: "Salmos 119:11" },
  // 271-300
  { text: "E viverão em segurança, porque agora o seu poder alcançará os confins da terra.", reference: "Miquéias 5:4" },
  { text: "Fiel é o Senhor em todas as suas palavras.", reference: "Salmos 145:13" },
  { text: "Temos, porém, este tesouro em vasos de barro.", reference: "2 Coríntios 4:7" },
  { text: "Sede prudentes como as serpentes e simples como as pombas.", reference: "Mateus 10:16" },
  { text: "A verdadeira religião é esta: visitar órfãos e viúvas nas suas tribulações.", reference: "Tiago 1:27" },
  { text: "O Senhor é a minha herança e o meu cálice.", reference: "Salmos 16:5" },
  { text: "Porque estreita é a porta e apertado o caminho que leva à vida.", reference: "Mateus 7:14" },
  { text: "A minha graça te basta, porque o meu poder se aperfeiçoa na fraqueza.", reference: "2 Coríntios 12:9" },
  { text: "Eis que vos dou poder para pisar serpentes e escorpiões.", reference: "Lucas 10:19" },
  { text: "Ninguém pode servir a dois senhores.", reference: "Mateus 6:24" },
  { text: "Tudo posso naquele que me fortalece.", reference: "Filipenses 4:13" },
  { text: "As misericórdias do Senhor são a causa de não sermos consumidos.", reference: "Lamentações 3:22" },
  { text: "O Senhor é grande e digno de todo louvor.", reference: "Salmos 48:1" },
  { text: "Porque os olhos do Senhor estão sobre os justos.", reference: "1 Pedro 3:12" },
  { text: "E Deus enxugará toda lágrima dos seus olhos.", reference: "Apocalipse 21:4" },
  { text: "Revestiu-me das vestes de salvação.", reference: "Isaías 61:10" },
  { text: "O Deus eterno, o Senhor, o criador dos fins da terra, não se cansa nem se fatiga.", reference: "Isaías 40:28" },
  { text: "Que maravilhoso é contemplar a tua face!", reference: "Salmos 17:15" },
  { text: "Quero louvar-te, Senhor, de todo o meu coração.", reference: "Salmos 9:1" },
  { text: "Eu te louvarei, porque de um modo assombroso e maravilhoso fui formado.", reference: "Salmos 139:14" },
  { text: "Graça e verdade vieram por meio de Jesus Cristo.", reference: "João 1:17" },
  { text: "Porque os meus pensamentos não são os vossos pensamentos.", reference: "Isaías 55:8" },
  { text: "O Senhor dos Exércitos está conosco; o Deus de Jacó é o nosso refúgio.", reference: "Salmos 46:7" },
  { text: "E sabemos que todas as coisas contribuem juntamente para o bem.", reference: "Romanos 8:28" },
  { text: "Quero habitar na casa do Senhor por longos dias.", reference: "Salmos 23:6" },
  { text: "Deus resistirá os soberbos, mas dará graça aos humildes.", reference: "Tiago 4:6" },
  { text: "Toda boa dádiva e todo dom perfeito vem do alto.", reference: "Tiago 1:17" },
  { text: "Fazei discípulos de todas as nações.", reference: "Mateus 28:19" },
  { text: "Assim resplandeça a vossa luz diante dos homens.", reference: "Mateus 5:16" },
  { text: "Quem é sábio? Quem é entendido entre vós? Mostre pelo seu bom trato as suas obras.", reference: "Tiago 3:13" },
  // 301-330
  { text: "O justo viverá da fé.", reference: "Romanos 1:17" },
  { text: "Onde não há visão, o povo perece.", reference: "Provérbios 29:18" },
  { text: "Sê forte e corajoso.", reference: "Deuteronômio 31:6" },
  { text: "O amor cobre uma multidão de pecados.", reference: "1 Pedro 4:8" },
  { text: "Descansem no Senhor e esperem nele.", reference: "Salmos 37:7" },
  { text: "Eu sou o bom pastor. O bom pastor dá a vida pelas ovelhas.", reference: "João 10:11" },
  { text: "Todos os caminhos do Senhor são amor e fidelidade.", reference: "Salmos 25:10" },
  { text: "Somos mais que vencedores por aquele que nos amou.", reference: "Romanos 8:37" },
  { text: "O meu jugo é suave e o meu fardo é leve.", reference: "Mateus 11:30" },
  { text: "Deus habita no seu santo templo.", reference: "Salmos 11:4" },
  { text: "O Senhor te abençoe e te guarde; o Senhor faça resplandecer o rosto sobre ti.", reference: "Números 6:24-25" },
  { text: "Quem é forte entre os seres celestiais que se compare ao Senhor?", reference: "Salmos 89:6" },
  { text: "E tudo o que fizerdes, seja em palavra ou ação, fazei em nome do Senhor Jesus.", reference: "Colossenses 3:17" },
  { text: "Na multidão de palavras não falta transgressão, mas quem modera os lábios é prudente.", reference: "Provérbios 10:19" },
  { text: "Crê no Senhor Jesus Cristo e serás salvo, tu e a tua casa.", reference: "Atos 16:31" },
  { text: "O Espírito de Deus se movia sobre a face das águas.", reference: "Gênesis 1:2" },
  { text: "Abençoado é aquele cuja transgressão é perdoada.", reference: "Salmos 32:1" },
  { text: "Eis que todas as almas são minhas.", reference: "Ezequiel 18:4" },
  { text: "Bem-aventurados os que choram, porque serão consolados.", reference: "Mateus 5:4" },
  { text: "Eu conheço as minhas ovelhas, e as minhas ovelhas me conhecem.", reference: "João 10:14" },
  { text: "É bom esperar em silêncio a salvação do Senhor.", reference: "Lamentações 3:26" },
  { text: "O Senhor é o meu pastor, e nada me faltará.", reference: "Salmos 23:1" },
  { text: "O fruto do justo é árvore de vida.", reference: "Provérbios 11:30" },
  { text: "Mais perto, meu Deus, de Ti.", reference: "Gênesis 28:12" },
  { text: "Quem dá ao pobre empresta ao Senhor.", reference: "Provérbios 19:17" },
  { text: "E esta é a confiança que temos nele: se pedirmos alguma coisa segundo a sua vontade, ele nos ouve.", reference: "1 João 5:14" },
  { text: "Fiz um pacto com os meus olhos.", reference: "Jó 31:1" },
  { text: "Dai graças ao Senhor, porque ele é bom.", reference: "Salmos 107:1" },
  { text: "Deus fez tudo belo a seu tempo.", reference: "Eclesiastes 3:11" },
  { text: "Ele cuida de vós.", reference: "1 Pedro 5:7" },
  // 331-366
  { text: "Grandioso é o nosso Senhor e de grande poder.", reference: "Salmos 147:5" },
  { text: "O sol da justiça nascerá, trazendo cura nas suas asas.", reference: "Malaquias 4:2" },
  { text: "Sabemos que Deus age em todas as coisas para o bem.", reference: "Romanos 8:28" },
  { text: "A mão de Deus estava sobre eles para o bem.", reference: "Esdras 8:18" },
  { text: "O Senhor é a tua sombra à tua mão direita.", reference: "Salmos 121:5" },
  { text: "O Espírito Santo vos ensinará tudo.", reference: "João 14:26" },
  { text: "Deus é o nosso refúgio e a nossa força.", reference: "Salmos 46:1" },
  { text: "Eu sou a luz do mundo.", reference: "João 8:12" },
  { text: "Guarda o teu coração, porque dele procedem as saídas da vida.", reference: "Provérbios 4:23" },
  { text: "Aquele que começou a boa obra em vocês vai completá-la.", reference: "Filipenses 1:6" },
  { text: "O Senhor é grande e muito digno de louvor.", reference: "Salmos 96:4" },
  { text: "Minha alma engrandece ao Senhor.", reference: "Lucas 1:46" },
  { text: "Eu e o Pai somos um.", reference: "João 10:30" },
  { text: "Porque forte é como a morte o amor.", reference: "Cantares 8:6" },
  { text: "Senhor, tu tens sido o nosso refúgio, de geração em geração.", reference: "Salmos 90:1" },
  { text: "Bem-aventurados os mansos, porque eles herdarão a terra.", reference: "Mateus 5:5" },
  { text: "Quem crer e for batizado será salvo.", reference: "Marcos 16:16" },
  { text: "Edificai a vossa vida sobre o alicerce da fé.", reference: "Judas 1:20" },
  { text: "Eis que estou à porta e bato.", reference: "Apocalipse 3:20" },
  { text: "Procura apresentar-te a Deus aprovado.", reference: "2 Timóteo 2:15" },
  { text: "O Senhor é um Deus de justiça. Bem-aventurados todos os que nele esperam.", reference: "Isaías 30:18" },
  { text: "O Senhor completará o que por mim começou.", reference: "Salmos 138:8" },
  { text: "Tenham coragem! Eu venci o mundo.", reference: "João 16:33" },
  { text: "Eu vos escolhi a vós e vos designei para que vades e deis fruto.", reference: "João 15:16" },
  { text: "Grandes coisas fez o Senhor por nós, pelas quais estamos alegres.", reference: "Salmos 126:3" },
  { text: "Com longura de dias o fartarei e lhe mostrarei a minha salvação.", reference: "Salmos 91:16" },
  { text: "Pois onde estiver o vosso tesouro, aí estará o vosso coração.", reference: "Mateus 6:21" },
  { text: "O Senhor é o meu ajudador e não temerei.", reference: "Hebreus 13:6" },
  { text: "E tudo o que pedirdes em oração, crendo, recebereis.", reference: "Mateus 21:22" },
  { text: "Há um tempo para nascer e um tempo para morrer.", reference: "Eclesiastes 3:2" },
  { text: "O Senhor é a minha porção, diz a minha alma; portanto esperarei nele.", reference: "Lamentações 3:24" },
  { text: "Servir ao Senhor com alegria.", reference: "Salmos 100:2" },
  { text: "Porque o Senhor é bom; a sua misericórdia dura para sempre.", reference: "Salmos 100:5" },
  { text: "Tu guardarás em perfeita paz aquele cuja mente está firme em ti.", reference: "Isaías 26:3" },
  { text: "Eu sou o Alfa e o Ômega, o princípio e o fim.", reference: "Apocalipse 21:6" },
  { text: "E a graça de nosso Senhor transbordou com a fé e o amor que há em Cristo Jesus.", reference: "1 Timóteo 1:14" },
];

// ~60+ devotionals for variety
export const devotionals: Devotional[] = [
  {
    id: "d1", title: "A Força da Fé", category: "Fé",
    verse: { text: "Ora, a fé é a certeza daquilo que esperamos e a prova das coisas que não vemos.", reference: "Hebreus 11:1" },
    reflection: "A fé não é apenas acreditar no que podemos ver, mas confiar plenamente no caráter de Deus, mesmo quando o caminho parece incerto. Cada passo de fé nos aproxima mais do propósito que Ele tem para nós.",
    prayer: "Senhor, aumenta a minha fé. Ajuda-me a confiar em Ti mesmo quando não consigo enxergar o caminho. Sei que Tu és fiel e que cuidas de mim. Amém."
  },
  {
    id: "d2", title: "Paz na Ansiedade", category: "Ansiedade",
    verse: { text: "Não andeis ansiosos de coisa alguma; em tudo, porém, sejam conhecidas, diante de Deus, as vossas petições.", reference: "Filipenses 4:6" },
    reflection: "A ansiedade tenta roubar nossa paz, mas Deus nos convida a entregar todas as preocupações a Ele. Quando oramos e confiamos, a paz que excede todo entendimento guarda nosso coração.",
    prayer: "Pai, entrego a Ti toda a minha ansiedade. Sei que Tu cuidas de mim e que nada está fora do Teu controle. Preenche meu coração com a Tua paz. Amém."
  },
  {
    id: "d3", title: "Coração Grato", category: "Gratidão",
    verse: { text: "Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco.", reference: "1 Tessalonicenses 5:18" },
    reflection: "A gratidão transforma nossa perspectiva. Quando escolhemos ser gratos, mesmo nas dificuldades, reconhecemos que Deus está presente em cada momento da nossa vida.",
    prayer: "Senhor, obrigado por tudo que tens feito em minha vida. Ensina-me a ter um coração grato em todas as circunstâncias. Amém."
  },
  {
    id: "d4", title: "Esperança que Não Decepciona", category: "Esperança",
    verse: { text: "E a esperança não nos decepciona, porque o amor de Deus é derramado em nossos corações pelo Espírito Santo.", reference: "Romanos 5:5" },
    reflection: "Mesmo nos dias mais difíceis, a esperança em Deus nos sustenta. Ele é a âncora da nossa alma, firme e segura. Não importa a tempestade, Ele está no controle.",
    prayer: "Deus de esperança, renova minha confiança em Ti. Sei que os Teus planos são maiores que os meus e que Tu estás trabalhando em meu favor. Amém."
  },
  {
    id: "d5", title: "Descobrindo Seu Propósito", category: "Propósito",
    verse: { text: "Porque somos feitura sua, criados em Cristo Jesus para boas obras, as quais Deus de antemão preparou para que andássemos nelas.", reference: "Efésios 2:10" },
    reflection: "Deus criou cada um de nós com um propósito único. Ele preparou obras especiais para realizarmos. Quando buscamos Sua vontade, encontramos significado e direção para nossa vida.",
    prayer: "Senhor, revela o Teu propósito para a minha vida. Quero caminhar nas obras que Tu preparaste para mim. Guia meus passos. Amém."
  },
  {
    id: "d6", title: "Confiando no Pai", category: "Confiança em Deus",
    verse: { text: "Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento.", reference: "Provérbios 3:5" },
    reflection: "Confiar em Deus significa soltar o controle e permitir que Ele guie nossos passos. Quando confiamos de todo coração, encontramos descanso e segurança em Seus braços.",
    prayer: "Pai, eu confio em Ti. Ajuda-me a soltar o controle e descansar nos Teus cuidados. Sei que Tu me amas e que Teus planos são perfeitos. Amém."
  },
  // Additional devotionals for more variety
  {
    id: "d7", title: "O Poder da Oração", category: "Fé",
    verse: { text: "Orai sem cessar.", reference: "1 Tessalonicenses 5:17" },
    reflection: "A oração é o canal de comunicação com Deus. Não precisa ser eloquente, basta ser sincera. Ele ouve cada suspiro, cada pedido, cada agradecimento do nosso coração.",
    prayer: "Senhor, ensina-me a orar. Que minha vida seja uma conversa constante Contigo. Que eu busque Tua face em cada momento. Amém."
  },
  {
    id: "d8", title: "Vencendo o Medo", category: "Ansiedade",
    verse: { text: "Deus não nos deu o espírito de temor, mas de fortaleza, de amor e de moderação.", reference: "2 Timóteo 1:7" },
    reflection: "O medo não vem de Deus. Quando enfrentamos situações assustadoras, podemos nos lembrar de que o Espírito que habita em nós é de poder, amor e domínio próprio.",
    prayer: "Pai, substitua o medo pelo Teu poder. Quero enfrentar cada dia com coragem e confiança em Ti. Amém."
  },
  {
    id: "d9", title: "Bênçãos Incontáveis", category: "Gratidão",
    verse: { text: "Bendize, ó minha alma, ao Senhor, e tudo o que há em mim bendiga o seu santo nome.", reference: "Salmos 103:1" },
    reflection: "Quando paramos para contar nossas bênçãos, percebemos que são incontáveis. Deus é generoso e fiel em cada detalhe da nossa vida.",
    prayer: "Senhor, abre meus olhos para ver Tuas bênçãos em cada detalhe. Que minha alma Te bendiga sempre. Amém."
  },
  {
    id: "d10", title: "Âncora da Alma", category: "Esperança",
    verse: { text: "Acheguemo-nos, pois, com confiança ao trono da graça.", reference: "Hebreus 4:16" },
    reflection: "Nossa esperança não é frágil. Ela é firme e segura como uma âncora, porque está fundamentada no caráter imutável de Deus.",
    prayer: "Deus, sê a âncora da minha alma. Quando as ondas da vida me sacudirem, mantém-me firme em Ti. Amém."
  },
  {
    id: "d11", title: "Chamados para Servir", category: "Propósito",
    verse: { text: "Cada um exerça o dom que recebeu para servir aos outros.", reference: "1 Pedro 4:10" },
    reflection: "Nosso propósito se cumpre quando usamos nossos dons para abençoar outros. Servir é a expressão mais pura do amor de Cristo em nós.",
    prayer: "Senhor, mostra-me como usar meus dons para Tua glória. Quero servir aos outros com amor e alegria. Amém."
  },
  {
    id: "d12", title: "Descansando em Deus", category: "Confiança em Deus",
    verse: { text: "Vinde a mim, todos os que estais cansados e sobrecarregados, e eu vos aliviarei.", reference: "Mateus 11:28" },
    reflection: "Jesus nos convida a descansar Nele. Não precisamos carregar o peso do mundo. Quando nos rendemos, Ele nos renova.",
    prayer: "Jesus, venho a Ti cansado. Renova minhas forças e me dá o Teu descanso. Amém."
  },
  {
    id: "d13", title: "A Palavra que Transforma", category: "Fé",
    verse: { text: "Porque a palavra de Deus é viva e eficaz.", reference: "Hebreus 4:12" },
    reflection: "A Bíblia não é um livro comum. É a Palavra viva de Deus que penetra nosso coração, nos transforma e nos direciona para uma vida plena.",
    prayer: "Senhor, que a Tua Palavra transforme minha mente e meu coração todos os dias. Amém."
  },
  {
    id: "d14", title: "Superando a Preocupação", category: "Ansiedade",
    verse: { text: "Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós.", reference: "1 Pedro 5:7" },
    reflection: "A preocupação nos paralisa, mas Deus nos chama para lançar sobre Ele toda ansiedade. Ele cuida de nós com amor incondicional.",
    prayer: "Pai, eu lanço toda preocupação sobre Ti agora. Confio que Tu tens cuidado de cada detalhe da minha vida. Amém."
  },
  {
    id: "d15", title: "Celebrando a Vida", category: "Gratidão",
    verse: { text: "Este é o dia que o Senhor fez; regozijemo-nos e alegremo-nos nele.", reference: "Salmos 118:24" },
    reflection: "Cada dia é um presente de Deus. Celebrar a vida é reconhecer que cada manhã traz novas misericórdias e oportunidades de viver para Ele.",
    prayer: "Obrigado, Senhor, por este dia. Ajuda-me a vivê-lo com alegria e propósito. Amém."
  },
  {
    id: "d16", title: "Renovando a Esperança", category: "Esperança",
    verse: { text: "Mas os que esperam no Senhor renovarão as suas forças.", reference: "Isaías 40:31" },
    reflection: "Esperar no Senhor não é ficar parado. É confiar ativamente que Ele está agindo, mesmo quando não vemos os resultados imediatos.",
    prayer: "Senhor, renova minha esperança hoje. Quero voar como águia, correr sem cansar, caminhar sem desfalecer. Amém."
  },
  {
    id: "d17", title: "Luz do Mundo", category: "Propósito",
    verse: { text: "Vós sois a luz do mundo.", reference: "Mateus 5:14" },
    reflection: "Jesus nos chamou para brilhar. Nossa vida deve refletir Seu amor e graça em um mundo que precisa desesperadamente de esperança.",
    prayer: "Senhor, que minha vida brilhe para Ti. Usa-me como instrumento de luz e amor. Amém."
  },
  {
    id: "d18", title: "Fortaleza nos Momentos Difíceis", category: "Confiança em Deus",
    verse: { text: "Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia.", reference: "Salmos 46:1" },
    reflection: "Nos momentos mais difíceis, Deus é nossa fortaleza. Ele não nos abandona na tempestade, mas nos protege e nos sustenta.",
    prayer: "Deus, sê minha fortaleza hoje. Protege-me e sustenta-me com Tua mão poderosa. Amém."
  },
  // More devotionals
  {
    id: "d19", title: "Fé que Move Montanhas", category: "Fé",
    verse: { text: "Se tiverdes fé como um grão de mostarda, direis a este monte: Passa daqui para acolá, e ele passará.", reference: "Mateus 17:20" },
    reflection: "Deus não pede uma fé gigante, mas uma fé genuína. Até a menor medida de fé verdadeira pode mover as maiores montanhas da nossa vida.",
    prayer: "Senhor, não preciso de muita fé — preciso de fé verdadeira em Ti. Move as montanhas da minha vida. Amém."
  },
  {
    id: "d20", title: "Paz Interior", category: "Ansiedade",
    verse: { text: "A paz vos deixo; a minha paz vos dou.", reference: "João 14:27" },
    reflection: "A paz que Jesus oferece é diferente da paz do mundo. É uma paz que permanece mesmo no meio da tempestade, porque vem do Príncipe da Paz.",
    prayer: "Jesus, enche-me com a Tua paz. Que ela transborde do meu coração para todos ao meu redor. Amém."
  },
  {
    id: "d21", title: "Gratidão nas Provações", category: "Gratidão",
    verse: { text: "Meus irmãos, tende por motivo de grande gozo o passardes por várias provações.", reference: "Tiago 1:2" },
    reflection: "As provações são oportunidades de crescimento. Quando somos gratos mesmo nas dificuldades, desenvolvemos perseverança e maturidade espiritual.",
    prayer: "Pai, obrigado pelas provações que me fortalecem. Ajuda-me a crescer em cada desafio. Amém."
  },
  {
    id: "d22", title: "Novo Amanhecer", category: "Esperança",
    verse: { text: "O choro pode durar uma noite, mas a alegria vem pela manhã.", reference: "Salmos 30:5" },
    reflection: "Depois de cada noite escura, Deus traz um novo amanhecer. Nossas dores são temporárias, mas a alegria do Senhor é eterna.",
    prayer: "Senhor, traga um novo amanhecer sobre a minha vida. Transforme meu choro em alegria. Amém."
  },
  {
    id: "d23", title: "Sal da Terra", category: "Propósito",
    verse: { text: "Vós sois o sal da terra.", reference: "Mateus 5:13" },
    reflection: "Assim como o sal preserva e dá sabor, somos chamados a fazer diferença onde estamos, preservando valores e dando significado às relações.",
    prayer: "Senhor, usa-me como sal neste mundo. Que eu preserve o que é bom e dê sabor à vida das pessoas. Amém."
  },
  {
    id: "d24", title: "Nos Braços do Pai", category: "Confiança em Deus",
    verse: { text: "O eterno Deus é a tua habitação, e por baixo estão os braços eternos.", reference: "Deuteronômio 33:27" },
    reflection: "Não importa quão fundo pareçamos cair, os braços eternos de Deus sempre estão lá para nos segurar. Ele nunca nos deixa ir.",
    prayer: "Pai, segura-me em Teus braços eternos. Não importa o que eu enfrente, sei que Tu me sustentarás. Amém."
  },
  {
    id: "d25", title: "Armadura de Deus", category: "Fé",
    verse: { text: "Revesti-vos de toda a armadura de Deus.", reference: "Efésios 6:11" },
    reflection: "A batalha espiritual é real, mas Deus nos equipou com uma armadura completa. Quando nos revestimos dela, estamos protegidos e preparados.",
    prayer: "Senhor, reveste-me com Tua armadura hoje. Protege-me em cada batalha. Amém."
  },
  {
    id: "d26", title: "Descanso para a Alma", category: "Ansiedade",
    verse: { text: "Aquietai-vos e sabei que eu sou Deus.", reference: "Salmos 46:10" },
    reflection: "Em um mundo barulhento, Deus nos chama para a quietude. No silêncio, podemos ouvir Sua voz e encontrar descanso para nossa alma inquieta.",
    prayer: "Senhor, aquieta minha alma. No silêncio, fala ao meu coração. Amém."
  },
  {
    id: "d27", title: "Maravilhas de Deus", category: "Gratidão",
    verse: { text: "Lembrai-vos das maravilhas que ele fez.", reference: "Salmos 105:5" },
    reflection: "Quando lembramos das maravilhas que Deus já fez em nossa vida, nossa fé se fortalece para enfrentar o presente e o futuro.",
    prayer: "Obrigado, Senhor, por cada maravilha que fizeste. Fortalece minha fé ao lembrar de Tua fidelidade. Amém."
  },
  {
    id: "d28", title: "Futuro nas Mãos de Deus", category: "Esperança",
    verse: { text: "Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor.", reference: "Jeremias 29:11" },
    reflection: "O futuro pode parecer incerto, mas está nas mãos do Deus que conhece o fim desde o princípio. Seus planos para nós são de paz e prosperidade.",
    prayer: "Senhor, entrego meu futuro em Tuas mãos. Confio nos Teus planos perfeitos. Amém."
  },
  {
    id: "d29", title: "Vasos de Barro", category: "Propósito",
    verse: { text: "Temos, porém, este tesouro em vasos de barro.", reference: "2 Coríntios 4:7" },
    reflection: "Somos vasos imperfeitos, mas Deus deposita Seu tesouro em nós. Nossa fraqueza é a vitrine do poder de Deus.",
    prayer: "Pai, usa minha fraqueza para mostrar Teu poder. Que eu seja um vaso que transborde Tua glória. Amém."
  },
  {
    id: "d30", title: "Fidelidade de Deus", category: "Confiança em Deus",
    verse: { text: "O Senhor é fiel e vos fortalecerá e guardará do maligno.", reference: "2 Tessalonicenses 3:3" },
    reflection: "A fidelidade de Deus não depende da nossa. Ele é fiel em todas as circunstâncias, e Sua proteção nos acompanha em cada passo.",
    prayer: "Obrigado por Tua fidelidade, Senhor. Fortalece-me e guarda-me de todo mal. Amém."
  },
  {
    id: "d31", title: "Caminhando pela Fé", category: "Fé",
    verse: { text: "Porque andamos por fé e não por vista.", reference: "2 Coríntios 5:7" },
    reflection: "Caminhar por fé é confiar em Deus mesmo sem ver o destino final. Cada passo dado na fé é um passo mais perto do cumprimento de Suas promessas.",
    prayer: "Senhor, dá-me coragem para caminhar por fé, não por vista. Confio no Teu direcionamento. Amém."
  },
  {
    id: "d32", title: "Liberdade em Cristo", category: "Esperança",
    verse: { text: "E conhecereis a verdade, e a verdade vos libertará.", reference: "João 8:32" },
    reflection: "Em Cristo encontramos verdadeira liberdade. Não somos mais prisioneiros do passado, do medo ou da culpa. A verdade nos faz livres.",
    prayer: "Jesus, obrigado pela liberdade que encontro em Ti. Ajuda-me a viver na plenitude desta liberdade. Amém."
  },
  {
    id: "d33", title: "Perdão que Cura", category: "Gratidão",
    verse: { text: "Se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar.", reference: "1 João 1:9" },
    reflection: "O perdão de Deus é completo e restaurador. Quando confessamos nossos pecados, Ele nos limpa e nos renova completamente.",
    prayer: "Pai, obrigado pelo Teu perdão. Limpa-me e renova-me. Ajuda-me a perdoar os outros assim como Tu me perdoaste. Amém."
  },
  {
    id: "d34", title: "Força na Fraqueza", category: "Confiança em Deus",
    verse: { text: "A minha graça te basta, porque o meu poder se aperfeiçoa na fraqueza.", reference: "2 Coríntios 12:9" },
    reflection: "Nossas fraquezas não são impedimentos para Deus. Pelo contrário, é justamente na nossa fragilidade que o poder de Deus se manifesta de forma mais gloriosa.",
    prayer: "Senhor, sou fraco, mas em Ti sou forte. Que Teu poder se aperfeiçoe em minha fraqueza. Amém."
  },
  {
    id: "d35", title: "Frutos do Espírito", category: "Propósito",
    verse: { text: "O fruto do Espírito é amor, alegria, paz, paciência, amabilidade, bondade, fidelidade.", reference: "Gálatas 5:22" },
    reflection: "Os frutos do Espírito são a evidência da presença de Deus em nós. Quando cultivamos estes frutos, vivemos o propósito para o qual fomos criados.",
    prayer: "Espírito Santo, produz em mim frutos que glorifiquem ao Pai. Amém."
  },
  {
    id: "d36", title: "Renovação Diária", category: "Fé",
    verse: { text: "Por isso, não desanimamos. Embora exteriormente estejamos a desgastar-nos, interiormente estamos sendo renovados.", reference: "2 Coríntios 4:16" },
    reflection: "A renovação espiritual é um processo diário. Mesmo quando o corpo cansa, nosso espírito é fortalecido pela presença de Deus em nós.",
    prayer: "Renova-me a cada dia, Senhor. Que minha fé cresça mesmo quando o corpo cansar. Amém."
  },
];

export const prayers: Prayer[] = [
  {
    id: "p1", title: "Oração da Manhã", category: "manhã",
    text: "Senhor, neste novo dia que começa, eu Te agradeço pela vida, pela saúde e por mais uma oportunidade de viver. Guia meus passos, ilumina minha mente e enche meu coração de paz. Que eu possa ser luz onde houver escuridão e amor onde houver dor. Abençoa meu trabalho, minha família e todos que cruzarem o meu caminho. Em nome de Jesus, amém.",
    verse: { text: "Este é o dia que o Senhor fez; regozijemo-nos e alegremo-nos nele.", reference: "Salmos 118:24" }
  },
  {
    id: "p2", title: "Oração da Tarde", category: "tarde",
    text: "Senhor, na metade deste dia, eu paro para renovar minhas forças em Ti. Obrigado por tudo que aconteceu até aqui. Peço que continues me guiando, me dando sabedoria e paciência. Que o restante deste dia seja abençoado e produtivo segundo a Tua vontade. Amém.",
    verse: { text: "Busquei o Senhor, e ele me respondeu; livrou-me de todos os meus temores.", reference: "Salmos 34:4" }
  },
  {
    id: "p3", title: "Oração da Noite", category: "noite",
    text: "Senhor, ao encerrar este dia, eu Te agradeço por cada momento vivido. Perdoa-me onde errei e ajuda-me a ser melhor amanhã. Protege meu sono, minha casa e minha família. Que eu descanse em Tua paz, sabendo que Tu velas por mim. Amém.",
    verse: { text: "Em paz me deito e logo pego no sono, porque só tu, Senhor, me fazes viver em segurança.", reference: "Salmos 4:8" }
  },
  {
    id: "p4", title: "Oração pela Família", category: "família",
    text: "Pai celestial, eu entrego minha família em Tuas mãos. Protege cada membro, fortalece nossos laços de amor e nos ajude a viver em unidade. Afasta todo mal, toda discórdia e toda enfermidade. Que nosso lar seja um lugar de paz, amor e presença de Deus. Amém.",
    verse: { text: "Quanto a mim e à minha casa, serviremos ao Senhor.", reference: "Josué 24:15" }
  },
  {
    id: "p5", title: "Oração contra Ansiedade", category: "ansiedade",
    text: "Senhor, eu entrego toda minha ansiedade a Ti. Sei que Tu cuidas de mim e que nada está fora do Teu controle. Acalma meu coração, aquieta minha mente e me enche de Tua paz. Ajuda-me a viver um dia de cada vez, confiando em Tua provisão. Amém.",
    verse: { text: "Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós.", reference: "1 Pedro 5:7" }
  },
  {
    id: "p6", title: "Oração por Direção", category: "direção",
    text: "Senhor, eu preciso da Tua direção. Ilumina meu caminho, mostra-me qual decisão tomar e guia meus passos segundo a Tua vontade. Não quero andar por minha própria sabedoria, mas pela Tua. Abre e fecha portas conforme o Teu propósito para mim. Amém.",
    verse: { text: "Lâmpada para os meus pés é a tua palavra e luz para o meu caminho.", reference: "Salmos 119:105" }
  },
  {
    id: "p7", title: "Oração por Proteção", category: "proteção",
    text: "Deus Todo-Poderoso, eu clamo pela Tua proteção. Cobre-me com o Teu manto, cerca-me com Teus anjos e livra-me de todo mal. Protege minha mente, meu corpo e meu espírito. Que eu caminhe seguro sob a Tua sombra. Em nome de Jesus, amém.",
    verse: { text: "Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará.", reference: "Salmos 91:1" }
  },
];

export const challenges: Challenge[] = [
  {
    id: "c1", title: "7 Dias Orando Antes de Dormir", description: "Reserve um momento todas as noites para falar com Deus antes de dormir.", days: 7,
    dailyContent: Array.from({ length: 7 }, (_, i) => ({
      verse: versesOfTheDay[i % versesOfTheDay.length],
      reflection: `Dia ${i + 1}: Encerre seu dia em oração, entregando suas preocupações ao Senhor e agradecendo por Sua fidelidade.`,
      prayer: "Senhor, obrigado por este dia. Entrego meu descanso em Tuas mãos. Protege meu sono e renova minhas forças. Amém."
    }))
  },
  {
    id: "c2", title: "21 Dias Fortalecendo Sua Fé", description: "Uma jornada de 21 dias para crescer espiritualmente.", days: 21,
    dailyContent: Array.from({ length: 21 }, (_, i) => ({
      verse: versesOfTheDay[i % versesOfTheDay.length],
      reflection: `Dia ${i + 1}: A fé cresce quando nos alimentamos da Palavra de Deus e praticamos a confiança diária Nele.`,
      prayer: "Senhor, fortalece minha fé dia após dia. Quero conhecer-Te mais e confiar em Ti plenamente. Amém."
    }))
  },
  {
    id: "c3", title: "30 Dias Caminhando com Deus", description: "Um mês inteiro dedicado a desenvolver intimidade com Deus.", days: 30,
    dailyContent: Array.from({ length: 30 }, (_, i) => ({
      verse: versesOfTheDay[i % versesOfTheDay.length],
      reflection: `Dia ${i + 1}: Caminhar com Deus é uma escolha diária. Hoje, escolha buscar Sua presença em tudo que fizer.`,
      prayer: "Pai, quero caminhar cada dia mais perto de Ti. Molda meu caráter e dirige meus passos. Amém."
    }))
  },
  {
    id: "c4", title: "7 Dias Vencendo a Ansiedade", description: "Aprenda a entregar suas preocupações nas mãos de Deus.", days: 7,
    dailyContent: Array.from({ length: 7 }, (_, i) => ({
      verse: versesOfTheDay[(i + 5) % versesOfTheDay.length],
      reflection: `Dia ${i + 1}: A ansiedade perde força quando entregamos nossos medos a Deus e confiamos no Seu cuidado.`,
      prayer: "Senhor, entrego minha ansiedade a Ti. Troca meu medo por Tua paz que excede todo entendimento. Amém."
    }))
  },
];

export function getRandomVerse(): Verse {
  return versesOfTheDay[Math.floor(Math.random() * versesOfTheDay.length)];
}

export function getDailyVerse(): Verse {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return versesOfTheDay[dayOfYear % versesOfTheDay.length];
}

export function getDailyDevotional(): Devotional {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return devotionals[dayOfYear % devotionals.length];
}

export function getDailyPrayer(): Prayer {
  const hour = new Date().getHours();
  if (hour < 12) return prayers[0];
  if (hour < 18) return prayers[1];
  return prayers[2];
}

// Daily word - only 1 per day, stored by date
const DAILY_WORD_KEY = "alianca-daily-word";

export function getDailyWord(): Verse & { reflection: string } {
  const today = new Date().toISOString().split("T")[0];
  try {
    const stored = JSON.parse(localStorage.getItem(DAILY_WORD_KEY) || "{}");
    if (stored.date === today) return stored.word;
  } catch {}
  
  // Generate new word for today using date as seed
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const index = (dayOfYear * 7 + 3) % versesOfTheDay.length; // Different from daily verse
  const verse = versesOfTheDay[index];
  const word = {
    text: verse.text,
    reference: verse.reference,
    reflection: "Deus tem uma palavra especial para você hoje. Medite neste versículo e permita que o Espírito Santo fale ao seu coração."
  };
  localStorage.setItem(DAILY_WORD_KEY, JSON.stringify({ date: today, word }));
  return word;
}
