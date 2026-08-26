import { Channel } from '../types';

/**
 * I loghi dei canali sono associati tramite id: basta mettere un file in
 * src/assets/logos/<id canale>.png (o .jpg/.svg/.webp) e viene raccolto
 * automaticamente — nessuna modifica al codice. I canali senza file usano il
 * riquadro con il wordmark disegnato. Stessa convenzione dei poster in media.ts.
 */
const LOGOS = import.meta.glob('../assets/logos/*.{png,jpg,jpeg,svg,webp}', {
  eager: true,
  import: 'default'
}) as Record<string, string>;

const LOGO_BY_ID: Record<string, string> = Object.fromEntries(
  Object.entries(LOGOS).map(([path, url]) => [
    path.split('/').pop()!.replace(/\.[^.]+$/, ''),
    url
  ])
);

/**
 * Sister channels that carry their family's mark rather than one of their own:
 * Sky publishes a single Sky Sport, Sky Cinema and Sky mark for these. The
 * channel's own name is set under the logo through logoCaption, so no two tiles
 * on the wall look alike.
 */
const LOGO_ALIASES: Record<string, string> = {
  'sky-cinema-due': 'sky-cinema-uno',
  'sky-cinema-collection': 'sky-cinema-uno',
  'sky-cinema-family': 'sky-cinema-uno',
  'sky-cinema-action': 'sky-cinema-uno',
  'sky-cinema-comedy': 'sky-cinema-uno',
  'sky-cinema-romance': 'sky-cinema-uno',
  'sky-cinema-suspense': 'sky-cinema-uno',
  'sky-sport-calcio': 'sky-sport-uno',
  'sky-sport-football': 'sky-sport-uno',
  'sky-sport-arena': 'sky-sport-uno',
  'sky-sport-max': 'sky-sport-uno',
  'sky-sport-motogp': 'sky-sport-uno',
  'sky-sport-tennis': 'sky-sport-uno',
  'sky-sport-golf': 'sky-sport-uno',
  'sky-sport-nba': 'sky-sport-uno',
  'sky-serie': 'sky-italia',
  'sky-investigation': 'sky-italia',
  'sky-crime': 'sky-italia',
  'sky-documentaries': 'sky-italia',
  'sky-nature': 'sky-italia'
};

const withLogos = (channels: Channel[]): Channel[] =>
  channels.map((channel) => ({
    ...channel,
    logoSrc: LOGO_BY_ID[channel.id] ?? LOGO_BY_ID[LOGO_ALIASES[channel.id]]
  }));

/**
 * Il palinsesto italiano al completo: Rai, Mediaset, Sky, DAZN, La7, i canali
 * Discovery e quelli per bambini, più una selezione internazionale. È la vetrina
 * usata dal muro di loghi a scorrimento e dai filtri per gruppo.
 */
export const CHANNELS_DATA: Channel[] = withLogos([
  // ---------------- Rai ----------------
  {
    id: 'rai-1',
    name: 'Rai 1 4K UHD',
    category: 'rai',
    quality: '4K Ultra HD',
    logo: '📺',
    currentProgram: 'Tg1 & Prima Serata',
    popular: true
  },
  {
    id: 'rai-2',
    name: 'Rai 2 HD',
    category: 'rai',
    quality: 'Full HD',
    logo: '📡',
    currentProgram: 'Boss in Incognito'
  },
  {
    id: 'rai-3',
    name: 'Rai 3 HD',
    category: 'rai',
    quality: 'Full HD',
    logo: '📰',
    currentProgram: 'Chi l’ha visto? / Tg3',
    popular: true
  },
  {
    id: 'rai-4',
    name: 'Rai 4 HD',
    category: 'rai',
    quality: 'Full HD',
    logo: '🎯',
    currentProgram: 'Serie Crime & Azione'
  },
  {
    id: 'rai-5',
    name: 'Rai 5 HD',
    category: 'rai',
    quality: 'Full HD',
    logo: '🎭',
    currentProgram: 'Teatro, Musica e Cultura'
  },
  {
    id: 'rai-movie',
    name: 'Rai Movie HD',
    category: 'rai',
    quality: 'Full HD',
    logo: '🎞️',
    currentProgram: 'Grande Cinema Italiano'
  },
  {
    id: 'rai-premium',
    name: 'Rai Premium HD',
    category: 'rai',
    quality: 'Full HD',
    logo: '💫',
    currentProgram: 'Fiction Rai e Repliche'
  },
  {
    id: 'rai-storia',
    name: 'Rai Storia HD',
    category: 'rai',
    quality: 'Full HD',
    logo: '🏛️',
    currentProgram: 'Passato e Presente'
  },
  {
    id: 'rai-scuola',
    name: 'Rai Scuola HD',
    category: 'rai',
    quality: 'Full HD',
    logo: '📚',
    currentProgram: 'Lezioni e Documentari'
  },
  {
    id: 'rai-news-24',
    name: 'Rai News 24 HD',
    category: 'rai',
    quality: 'Full HD',
    logo: '🌍',
    currentProgram: 'Notizie in Diretta'
  },
  // ---------------- Mediaset ----------------
  {
    id: 'canale-5',
    name: 'Canale 5 UHD',
    category: 'mediaset',
    quality: 'Full HD',
    logo: '5️⃣',
    currentProgram: 'Striscia la Notizia / Tg5',
    popular: true
  },
  {
    id: 'italia-1',
    name: 'Italia 1 HD',
    category: 'mediaset',
    quality: 'Full HD',
    logo: '🎬',
    currentProgram: 'Le Iene & Film d’Azione',
    popular: true
  },
  {
    id: 'rete-4',
    name: 'Rete 4 HD',
    category: 'mediaset',
    quality: 'Full HD',
    logo: '4️⃣',
    currentProgram: 'Quarta Repubblica'
  },
  {
    id: 'venti-mediaset',
    name: '20 Mediaset HD',
    category: 'mediaset',
    quality: 'Full HD',
    logo: '🍿',
    currentProgram: 'Film e Serie in Prima Serata'
  },
  {
    id: 'iris',
    name: 'Iris HD',
    category: 'mediaset',
    quality: 'Full HD',
    logo: '🎥',
    currentProgram: 'Classici del Cinema'
  },
  {
    id: 'la5',
    name: 'La5 HD',
    category: 'mediaset',
    quality: 'Full HD',
    logo: '💐',
    currentProgram: 'Intrattenimento e Lifestyle'
  },
  {
    id: 'cine34',
    name: 'Cine34 HD',
    category: 'mediaset',
    quality: 'Full HD',
    logo: '🇮🇹',
    currentProgram: 'Commedia all’Italiana'
  },
  {
    id: 'focus',
    name: 'Focus HD',
    category: 'mediaset',
    quality: 'Full HD',
    logo: '🔬',
    currentProgram: 'Documentari e Scienza'
  },
  {
    id: 'top-crime',
    name: 'Top Crime HD',
    category: 'mediaset',
    quality: 'Full HD',
    logo: '🕵️',
    currentProgram: 'Gialli e Investigazioni'
  },
  {
    id: 'mediaset-extra',
    name: 'Mediaset Extra HD',
    category: 'mediaset',
    quality: 'Full HD',
    logo: '📼',
    currentProgram: 'Grande Fratello & Cult TV'
  },
  {
    id: 'italia-2',
    name: 'Italia 2 HD',
    category: 'mediaset',
    quality: 'Full HD',
    logo: '🎮',
    currentProgram: 'Anime, Serie e Comedy'
  },
  {
    id: 'tgcom24',
    name: 'TGcom24 HD',
    category: 'mediaset',
    quality: 'Full HD',
    logo: '🗞️',
    currentProgram: 'Notizie Tutto il Giorno'
  },
  // ---------------- Sky ----------------
  {
    id: 'sky-uno',
    name: 'Sky Uno HD',
    category: 'sky',
    quality: 'Full HD',
    logo: '⭐',
    currentProgram: 'MasterChef Italia',
    popular: true
  },
  {
    id: 'sky-atlantic',
    name: 'Sky Atlantic 4K',
    category: 'sky',
    quality: '4K Ultra HD',
    logo: '🌊',
    currentProgram: 'Le Grandi Serie HBO',
    popular: true
  },
  {
    id: 'sky-serie',
    name: 'Sky Serie HD',
    logoCaption: 'Serie',
    category: 'sky',
    quality: 'Full HD',
    logo: '📀',
    currentProgram: 'Serie Italiane e Internazionali'
  },
  {
    id: 'sky-investigation',
    name: 'Sky Investigation HD',
    logoCaption: 'Investigation',
    category: 'sky',
    quality: 'Full HD',
    logo: '🔍',
    currentProgram: 'Casi Irrisolti'
  },
  {
    id: 'sky-crime',
    name: 'Sky Crime HD',
    logoCaption: 'Crime',
    category: 'sky',
    quality: 'Full HD',
    logo: '🚔',
    currentProgram: 'True Crime'
  },
  {
    id: 'sky-documentaries',
    name: 'Sky Documentaries HD',
    logoCaption: 'Documentaries',
    category: 'sky',
    quality: 'Full HD',
    logo: '🎙️',
    currentProgram: 'Documentari d’Autore'
  },
  {
    id: 'sky-nature',
    name: 'Sky Nature HD',
    logoCaption: 'Nature',
    category: 'sky',
    quality: 'Full HD',
    logo: '🌿',
    currentProgram: 'Natura e Ambiente'
  },
  {
    id: 'sky-arte',
    name: 'Sky Arte HD',
    category: 'sky',
    quality: 'Full HD',
    logo: '🖼️',
    currentProgram: 'Arte e Grandi Mostre'
  },
  {
    id: 'sky-cinema-uno',
    name: 'Sky Cinema Uno 4K',
    logoCaption: 'Uno',
    category: 'sky',
    quality: '4K Ultra HD',
    logo: '🍿',
    currentProgram: 'Prime Visioni Ogni Sera',
    popular: true
  },
  {
    id: 'sky-cinema-due',
    name: 'Sky Cinema Due HD',
    logoCaption: 'Due',
    category: 'sky',
    quality: 'Full HD',
    logo: '🎬',
    currentProgram: 'Il Film della Serata'
  },
  {
    id: 'sky-cinema-collection',
    name: 'Sky Cinema Collection HD',
    logoCaption: 'Collection',
    category: 'sky',
    quality: 'Full HD',
    logo: '🗂️',
    currentProgram: 'Saghe e Rassegne'
  },
  {
    id: 'sky-cinema-family',
    name: 'Sky Cinema Family HD',
    logoCaption: 'Family',
    category: 'sky',
    quality: 'Full HD',
    logo: '👨‍👩‍👧',
    currentProgram: 'Film per Tutta la Famiglia'
  },
  {
    id: 'sky-cinema-action',
    name: 'Sky Cinema Action HD',
    logoCaption: 'Action',
    category: 'sky',
    quality: 'Full HD',
    logo: '💥',
    currentProgram: 'Azione e Avventura'
  },
  {
    id: 'sky-cinema-comedy',
    name: 'Sky Cinema Comedy HD',
    logoCaption: 'Comedy',
    category: 'sky',
    quality: 'Full HD',
    logo: '😄',
    currentProgram: 'Commedie Italiane'
  },
  {
    id: 'sky-cinema-romance',
    name: 'Sky Cinema Romance HD',
    logoCaption: 'Romance',
    category: 'sky',
    quality: 'Full HD',
    logo: '❤️',
    currentProgram: 'Storie d’Amore'
  },
  {
    id: 'sky-cinema-suspense',
    name: 'Sky Cinema Suspense HD',
    logoCaption: 'Suspense',
    category: 'sky',
    quality: 'Full HD',
    logo: '🌑',
    currentProgram: 'Thriller e Suspense'
  },
  {
    id: 'sky-tg24',
    name: 'Sky TG24 HD',
    category: 'sky',
    quality: 'Full HD',
    logo: '📻',
    currentProgram: 'Ultime Notizie e Approfondimenti'
  },
  {
    id: 'comedy-central',
    name: 'Comedy Central HD',
    category: 'sky',
    quality: 'Full HD',
    logo: '🎤',
    currentProgram: 'Stand-up e Sitcom'
  },
  {
    id: 'cielo',
    name: 'Cielo HD',
    category: 'sky',
    quality: 'Full HD',
    logo: '☁️',
    currentProgram: 'Documentari e Film in Chiaro'
  },
  {
    id: 'tv8',
    name: 'TV8 HD',
    category: 'sky',
    quality: 'Full HD',
    logo: '🍝',
    currentProgram: 'Cucina & Intrattenimento'
  },
  // ---------------- Sport ----------------
  {
    id: 'sky-sport-uno',
    name: 'Sky Sport Uno 4K',
    logoCaption: 'Uno',
    category: 'sport',
    quality: '4K Ultra HD',
    logo: '⚽',
    currentProgram: 'Live: Serie A — Posticipo Serale',
    popular: true
  },
  {
    id: 'sky-sport-calcio',
    name: 'Sky Sport Calcio HD',
    logoCaption: 'Calcio',
    category: 'sport',
    quality: 'Full HD',
    logo: '🥅',
    currentProgram: 'Live: Serie A Diretta Gol',
    popular: true
  },
  {
    id: 'sky-sport-football',
    name: 'Sky Sport Football HD',
    logoCaption: 'Football',
    category: 'sport',
    quality: 'Full HD',
    logo: '🏟️',
    currentProgram: 'Live: Premier League e Liga'
  },
  {
    id: 'sky-sport-arena',
    name: 'Sky Sport Arena HD',
    logoCaption: 'Arena',
    category: 'sport',
    quality: 'Full HD',
    logo: '🏀',
    currentProgram: 'Live: Basket e Volley'
  },
  {
    id: 'sky-sport-max',
    name: 'Sky Sport Max HD',
    logoCaption: 'Max',
    category: 'sport',
    quality: 'Full HD',
    logo: '🥇',
    currentProgram: 'Il Meglio dello Sport'
  },
  {
    id: 'sky-sport-24',
    name: 'Sky Sport 24 HD',
    category: 'sport',
    quality: 'Full HD',
    logo: '📊',
    currentProgram: 'Notizie Sportive 24h'
  },
  {
    id: 'sky-sport-f1',
    name: 'Sky Sport F1 4K 60fps',
    category: 'sport',
    quality: '60 FPS',
    logo: '🏎️',
    currentProgram: 'Live: GP di Monza — Qualifiche',
    popular: true
  },
  {
    id: 'sky-sport-motogp',
    name: 'Sky Sport MotoGP HD',
    logoCaption: 'MotoGP',
    category: 'sport',
    quality: 'Full HD',
    logo: '🏍️',
    currentProgram: 'Live: MotoGP del Mugello',
    popular: true
  },
  {
    id: 'sky-sport-tennis',
    name: 'Sky Sport Tennis HD',
    logoCaption: 'Tennis',
    category: 'sport',
    quality: 'Full HD',
    logo: '🎾',
    currentProgram: 'Live: ATP Tour'
  },
  {
    id: 'sky-sport-golf',
    name: 'Sky Sport Golf HD',
    logoCaption: 'Golf',
    category: 'sport',
    quality: 'Full HD',
    logo: '⛳',
    currentProgram: 'Live: PGA Tour'
  },
  {
    id: 'sky-sport-nba',
    name: 'Sky Sport NBA HD',
    logoCaption: 'NBA',
    category: 'sport',
    quality: 'Full HD',
    logo: '🏀',
    currentProgram: 'Live: NBA Regular Season'
  },
  {
    id: 'dazn-1',
    name: 'DAZN 1 4K',
    category: 'sport',
    quality: '4K Ultra HD',
    logo: '🔥',
    currentProgram: 'Live: Inter - Milan (Derby della Madonnina)',
    popular: true
  },
  {
    id: 'dazn-2',
    name: 'DAZN 2 HD',
    logoCaption: '2',
    category: 'sport',
    quality: 'Full HD',
    logo: '⚽',
    currentProgram: 'Live: Serie A e Serie B'
  },
  {
    id: 'zona-dazn',
    name: 'Zona DAZN HD',
    logoCaption: 'Zona',
    category: 'sport',
    quality: 'Full HD',
    logo: '📶',
    currentProgram: 'Tutta la Serie A in Contemporanea'
  },
  {
    id: 'rai-sport',
    name: 'Rai Sport HD',
    category: 'sport',
    quality: 'Full HD',
    logo: '🚴',
    currentProgram: 'Ciclismo: Giro d’Italia'
  },
  {
    id: 'eurosport-1',
    name: 'Eurosport 1 HD',
    category: 'sport',
    quality: 'Full HD',
    logo: '🎾',
    currentProgram: 'Tennis: Internazionali d’Italia'
  },
  {
    id: 'eurosport-2',
    name: 'Eurosport 2 HD',
    category: 'sport',
    quality: 'Full HD',
    logo: '🚵',
    currentProgram: 'Ciclismo e Sport Invernali'
  },
  {
    id: 'supertennis',
    name: 'SuperTennis HD',
    category: 'sport',
    quality: 'Full HD',
    logo: '🎾',
    currentProgram: 'Tornei ATP e WTA'
  },
  {
    id: 'sportitalia',
    name: 'Sportitalia HD',
    category: 'sport',
    quality: 'Full HD',
    logo: '📣',
    currentProgram: 'Calciomercato e Primavera'
  },
  {
    id: 'inter-tv',
    name: 'Inter TV HD',
    category: 'sport',
    quality: 'Full HD',
    logo: '🔵',
    currentProgram: 'Il Canale Nerazzurro'
  },
  {
    id: 'milan-tv',
    name: 'Milan TV HD',
    category: 'sport',
    quality: 'Full HD',
    logo: '🔴',
    currentProgram: 'Il Canale Rossonero'
  },
  {
    id: 'juventus-tv',
    name: 'Juventus TV HD',
    category: 'sport',
    quality: 'Full HD',
    logo: '⚪',
    currentProgram: 'Il Canale Bianconero'
  },
  {
    id: 'roma-tv',
    name: 'Roma TV HD',
    category: 'sport',
    quality: 'Full HD',
    logo: '🟡',
    currentProgram: 'Il Canale Giallorosso'
  },
  {
    id: 'lazio-style',
    name: 'Lazio Style Channel HD',
    category: 'sport',
    quality: 'Full HD',
    logo: '🦅',
    currentProgram: 'Il Canale Biancoceleste'
  },
  {
    id: 'sky-sports-main',
    name: 'Sky Sports Main Event 4K',
    category: 'sport',
    quality: '4K Ultra HD',
    logo: '🇬🇧',
    currentProgram: 'Live: Premier League Super Sunday'
  },
  // ---------------- Altri canali italiani ----------------
  {
    id: 'la7',
    name: 'La7 HD',
    category: 'altri',
    quality: 'Full HD',
    logo: '🗞️',
    currentProgram: 'Otto e Mezzo / DiMartedì',
    popular: true
  },
  {
    id: 'la7d',
    name: 'La7d HD',
    category: 'altri',
    quality: 'Full HD',
    logo: '💃',
    currentProgram: 'Serie e Lifestyle'
  },
  {
    id: 'nove',
    name: 'Nove HD',
    category: 'altri',
    quality: 'Full HD',
    logo: '9️⃣',
    currentProgram: 'Che Tempo Che Fa',
    popular: true
  },
  {
    id: 'real-time',
    name: 'Real Time HD',
    category: 'altri',
    quality: 'Full HD',
    logo: '👰',
    currentProgram: 'Matrimonio a Prima Vista Italia'
  },
  {
    id: 'dmax',
    name: 'DMAX HD',
    category: 'altri',
    quality: 'Full HD',
    logo: '🛠️',
    currentProgram: 'Avventura e Documentari'
  },
  {
    id: 'giallo',
    name: 'Giallo HD',
    category: 'altri',
    quality: 'Full HD',
    logo: '🔦',
    currentProgram: 'Gialli e Misteri'
  },
  {
    id: 'food-network',
    name: 'Food Network HD',
    category: 'altri',
    quality: 'Full HD',
    logo: '🍕',
    currentProgram: 'Cucina Italiana e Ricette'
  },
  {
    id: 'hgtv',
    name: 'HGTV HD',
    category: 'altri',
    quality: 'Full HD',
    logo: '🏡',
    currentProgram: 'Casa e Ristrutturazioni'
  },
  {
    id: 'motor-trend',
    name: 'Motor Trend HD',
    category: 'altri',
    quality: 'Full HD',
    logo: '🚗',
    currentProgram: 'Motori e Officine'
  },
  {
    id: 'warner-tv',
    name: 'Warner TV HD',
    category: 'altri',
    quality: 'Full HD',
    logo: '🎬',
    currentProgram: 'Serie e Film Warner'
  },
  // ---------------- Bambini ----------------
  {
    id: 'rai-gulp',
    name: 'Rai Gulp HD',
    category: 'kids',
    quality: 'Full HD',
    logo: '🧒',
    currentProgram: 'Cartoni e Serie per Ragazzi'
  },
  {
    id: 'rai-yoyo',
    name: 'Rai YoYo HD',
    category: 'kids',
    quality: 'Full HD',
    logo: '🧸',
    currentProgram: 'Programmi per i Più Piccoli'
  },
  {
    id: 'boing',
    name: 'Boing HD',
    category: 'kids',
    quality: 'Full HD',
    logo: '🚀',
    currentProgram: 'Cartoni e Avventure'
  },
  {
    id: 'cartoonito',
    name: 'Cartoonito HD',
    category: 'kids',
    quality: 'Full HD',
    logo: '🎈',
    currentProgram: 'Cartoni per la Prima Infanzia'
  },
  {
    id: 'k2',
    name: 'K2 HD',
    category: 'kids',
    quality: 'Full HD',
    logo: '🎪',
    currentProgram: 'Serie Animate per Ragazzi'
  },
  {
    id: 'frisbee',
    name: 'Frisbee HD',
    category: 'kids',
    quality: 'Full HD',
    logo: '🌈',
    currentProgram: 'Cartoni e Giochi'
  },
  {
    id: 'super',
    name: 'Super! HD',
    category: 'kids',
    quality: 'Full HD',
    logo: '⚡',
    currentProgram: 'Cartoni e Live Action'
  },
  {
    id: 'disney-channel',
    name: 'Disney Channel Italia',
    category: 'kids',
    quality: 'Full HD',
    logo: '🏰',
    currentProgram: 'Serie Animate in Italiano'
  },
  {
    id: 'nickelodeon',
    name: 'Nickelodeon Italia HD',
    category: 'kids',
    quality: 'Full HD',
    logo: '🟧',
    currentProgram: 'SpongeBob & Paw Patrol'
  },
  {
    id: 'cartoon-network',
    name: 'Cartoon Network Italia HD',
    category: 'kids',
    quality: 'Full HD',
    logo: '🎨',
    currentProgram: 'Cartoni in Italiano'
  },
  {
    id: 'disney-junior',
    name: 'Disney Junior HD',
    category: 'kids',
    quality: 'Full HD',
    logo: '🎠',
    currentProgram: 'Serie per i Piccolissimi'
  },
  {
    id: 'nick-jr',
    name: 'Nick Jr. HD',
    category: 'kids',
    quality: 'Full HD',
    logo: '🐾',
    currentProgram: 'Serie Prescolari'
  },
  // ---------------- Film e serie on demand ----------------
  {
    id: 'vod-netflix',
    name: 'Netflix Originals (VOD)',
    category: 'vod',
    quality: '4K Ultra HD',
    logo: '🔴',
    currentProgram: 'Libreria Originals Completa',
    popular: true
  },
  {
    id: 'vod-prime',
    name: 'Prime Video (VOD)',
    category: 'vod',
    quality: '4K Ultra HD',
    logo: '📦',
    currentProgram: 'Film e Serie Amazon Original'
  },
  {
    id: 'vod-disney',
    name: 'Disney+ (VOD)',
    category: 'vod',
    quality: '4K Ultra HD',
    logo: '✨',
    currentProgram: 'Disney, Pixar, Marvel e Star'
  },
  {
    id: 'vod-now',
    name: 'NOW (VOD)',
    category: 'vod',
    quality: 'Full HD',
    logo: '▶️',
    currentProgram: 'Il Meglio di Sky On Demand'
  },
  // ---------------- Internazionali ----------------
  {
    id: 'bbc-one',
    name: 'BBC One 4K UK',
    category: 'intl',
    quality: '4K Ultra HD',
    logo: '🇬🇧',
    currentProgram: 'Grandi Show e News della BBC'
  },
  {
    id: 'bbc-two',
    name: 'BBC Two HD UK',
    category: 'intl',
    quality: 'Full HD',
    logo: '🇬🇧',
    currentProgram: 'Documentari e Comedy'
  },
  {
    id: 'cnn-intl',
    name: 'CNN International HD',
    category: 'intl',
    quality: 'Full HD',
    logo: '🌐',
    currentProgram: 'Breaking News dal Mondo'
  },
  {
    id: 'france-24',
    name: 'France 24 HD',
    category: 'intl',
    quality: 'Full HD',
    logo: '🇫🇷',
    currentProgram: 'Notizie in Francese e Inglese'
  },
  {
    id: 'tf1-fr',
    name: 'TF1 HD',
    category: 'intl',
    quality: 'Full HD',
    logo: '🇫🇷',
    currentProgram: 'Serie e Film Francesi'
  },
  {
    id: 'zdf-de',
    name: 'ZDF HD',
    category: 'intl',
    quality: 'Full HD',
    logo: '🇩🇪',
    currentProgram: 'Heute Journal & Krimi'
  },
  {
    id: 'rtl-de',
    name: 'RTL Television HD',
    category: 'intl',
    quality: 'Full HD',
    logo: '🇩🇪',
    currentProgram: 'Show e Serie Tedesche'
  }
]);
