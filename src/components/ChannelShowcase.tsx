import React, { useState } from 'react';
import { CHANNELS_DATA } from '../data/channels';
import { Channel, ChannelCategory } from '../types';
import { RefreshCw, Sparkles } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { ChannelLogo } from './ChannelLogo';
import { DURATION_SUMMARY } from '../data/pricing';

interface ChannelShowcaseProps {
  onOpenCheckoutModal: () => void;
}

/** Righe del muro di loghi. Ognuna scorre nel verso opposto a quella sopra. */
const ROW_COUNT = 3;

/** Secondi che un riquadro impiega ad attraversare la riga — regola la velocità. */
const SECONDS_PER_TILE = 3.2;

/** Una riga più corta di così lascerebbe dei buchi, quindi i suoi elementi si ripetono. */
const MIN_ROW_ITEMS = 8;

type Filter = 'tutti' | ChannelCategory;

/** I gruppi del palinsesto, nell'ordine in cui compaiono i chip. */
const FILTERS: { id: Filter; label: string }[] = [
  { id: 'tutti', label: 'Tutti' },
  { id: 'rai', label: 'Rai' },
  { id: 'mediaset', label: 'Mediaset' },
  { id: 'sky', label: 'Sky' },
  { id: 'sport', label: 'Sport' },
  { id: 'altri', label: 'La7 & Discovery' },
  { id: 'kids', label: 'Bambini' },
  { id: 'vod', label: 'On Demand' },
  { id: 'intl', label: 'Internazionali' }
];

const fillRow = (items: Channel[]): Channel[] => {
  if (items.length === 0) return [];
  const filled = [...items];
  while (filled.length < MIN_ROW_ITEMS) filled.push(...items);
  return filled;
};

/** Distribuisce i canali filtrati sulle righe, a giro. */
const splitIntoRows = (channels: Channel[]): Channel[][] => {
  const rows: Channel[][] = Array.from({ length: ROW_COUNT }, () => []);
  channels.forEach((channel, index) => rows[index % ROW_COUNT].push(channel));
  return rows.map(fillRow).filter((row) => row.length > 0);
};

interface MarqueeRowProps {
  channels: Channel[];
  direction: 'left' | 'right';
}

/**
 * Una riga di loghi che scorre all'infinito.
 *
 * Il binario contiene due passaggi identici e si anima di -50%. Ogni passaggio
 * porta con sé uno spazio finale pari al proprio spazio interno, così un
 * passaggio è esattamente metà del binario e il ciclo si chiude sullo stesso
 * fotogramma — nessuna giuntura, qualunque sia il numero di riquadri.
 */
const MarqueeRow: React.FC<MarqueeRowProps> = ({ channels, direction }) => (
  <div className="overflow-hidden">
    <div
      className={`flex w-max hover:[animation-play-state:paused] ${
        direction === 'left' ? 'marquee-left' : 'marquee-right'
      }`}
      style={
        { '--marquee-duration': `${Math.max(18, channels.length * SECONDS_PER_TILE)}s` } as React.CSSProperties
      }
    >
      {[0, 1].map((pass) => (
        <div
          key={pass}
          className="flex gap-3 sm:gap-4 pr-3 sm:pr-4"
          aria-hidden={pass === 1 ? true : undefined}
        >
          {channels.map((channel, index) => (
            <ChannelLogo key={`${pass}-${channel.id}-${index}`} channel={channel} />
          ))}
        </div>
      ))}
    </div>
  </div>
);

export const ChannelShowcase: React.FC<ChannelShowcaseProps> = ({ onOpenCheckoutModal }) => {
  const [filter, setFilter] = useState<Filter>('tutti');

  const visible =
    filter === 'tutti'
      ? CHANNELS_DATA
      : CHANNELS_DATA.filter((channel) => channel.category === filter);

  // La chiave rimonta il muro al cambio filtro, così le righe ripartono
  // dall'inizio invece di riprendere a metà dell'animazione precedente.
  const rows = splitIntoRows(visible);

  return (
    <section
      id="canali"
      className="py-14 sm:py-20 bg-canvas-alt pattern-majolica relative border-y border-ink/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <SectionHeading
          label="Canali"
          title={<>Scopri l'offerta <span className="hl-pill">completa</span> di canali</>}
          intro="Tutta la TV italiana in un unico abbonamento: Rai, Mediaset, Sky, DAZN, La7, i canali Discovery e quelli per i più piccoli. Dalla Serie A alla Formula 1, fino ai film appena usciti al cinema — in 4K Ultra HD cristallino."
        />

        {/* Filtri per gruppo */}
        <div className="mt-8 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 w-max sm:w-auto sm:flex-wrap sm:justify-center">
            {FILTERS.map((option) => {
              const isActive = option.id === filter;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setFilter(option.id)}
                  aria-pressed={isActive}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all border ${
                    isActive
                      ? 'bg-ink text-white border-ink shadow-md'
                      : 'bg-paper/70 text-ink-soft border-ink/10 hover:text-ink hover:border-ink/25'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="mt-5 max-w-5xl mx-auto flex items-center justify-end gap-4 px-1">
          {rows.length > 0 && (
            <p className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-ink-soft/70">
              <RefreshCw className="w-3.5 h-3.5" />
              Scorre in automatico
            </p>
          )}
        </div>

        {/* Muro di loghi a scorrimento continuo — le righe alternano il verso */}
        <div className="mt-4 relative">
          <div
            key={filter}
            className="space-y-3 sm:space-y-4 [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]"
          >
            {rows.map((row, index) => (
              <MarqueeRow
                key={index}
                channels={row}
                direction={index % 2 === 0 ? 'left' : 'right'}
              />
            ))}
          </div>
        </div>

        {/* Channel Banner Callout */}
        <div className="relative overflow-hidden mt-10 max-w-4xl mx-auto bg-ink text-white rounded-xl p-6 sm:p-8 shadow-xl shadow-ink/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <span aria-hidden="true" className="glow-azzurro absolute inset-0 pointer-events-none" />
          <div className="relative space-y-1 text-center sm:text-left">
            <h3 className="font-display text-xl sm:text-2xl font-extrabold">
              Tutti i tuoi canali preferiti in un solo abbonamento
            </h3>
            <p className="text-white/70 text-sm sm:text-base font-medium">
              Scegli una durata di {DURATION_SUMMARY} e guardi entro 5 minuti sulla tua TV o sul telefono.
            </p>
          </div>
          <button
            onClick={onOpenCheckoutModal}
            className="relative px-6 py-3.5 bg-brand hover:bg-brand-deep text-white font-display font-extrabold text-sm rounded-full shadow-md transition-all shrink-0 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Vedi i Pacchetti</span>
          </button>
        </div>

      </div>
    </section>
  );
};
