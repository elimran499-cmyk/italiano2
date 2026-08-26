import { PlanDuration, PlanDurationId, PlanTier, PlanTierId, PricingPlan } from '../types';
import { TIER_STATS } from './stats';

/**
 * Il listino è una griglia a tre assi: livello × durata × numero di dispositivi.
 * Ogni combinazione è un importo fisso una tantum, quindi i prezzi stanno in una
 * tabella invece di essere calcolati da una tariffa mensile.
 */

export const PLAN_DURATIONS: PlanDuration[] = [
  { id: '3m', label: '3 Mesi', months: 3 },
  { id: '6m', label: '6 Mesi', months: 6 },
  { id: '15m', label: '12 + 3 Mesi', months: 15, badge: '-50%', note: 'OFFERTA TOP' }
];

/** Numero di schermi che possono guardare in contemporanea. */
export const DEVICE_OPTIONS = [1, 2, 3, 4] as const;

export const PLAN_TIERS: Record<PlanTierId, PlanTier> = {
  basis: {
    id: 'basis',
    name: 'Pacchetto Base',
    label: 'BASE',
    features: [
      'Qualità SD, HD e Full HD',
      `${TIER_STATS.basis.channels} canali live`,
      'Rai, Mediaset, La7, Sky e DAZN',
      `${TIER_STATS.basis.vod} film e serie on demand`,
      'Aggiornamenti settimanali dei contenuti',
      'Tecnologia Anti-Freeze',
      'Funziona su tutti i tuoi dispositivi',
      'Contenuti esclusivi in italiano',
      'Netflix, Prime Video, HBO, Apple TV+ e Disney+',
      'Visione 100% anonima',
      'Assistenza in italiano 24/7'
    ]
  },
  premium: {
    id: 'premium',
    name: 'Pacchetto Premium VIP',
    label: 'PREMIUM VIP',
    features: [
      'Qualità da SD fino a 4K, 8K, HDR e VR',
      `${TIER_STATS.premium.channels} canali live`,
      'Rai, Mediaset, La7, Sky Sport, DAZN e Eurosport',
      `${TIER_STATS.premium.vod} film e serie on demand`,
      'Aggiornamenti quotidiani dei contenuti',
      'Tutti gli eventi sportivi PPV inclusi',
      'Anti-Freeze PRO di livello enterprise',
      'Funziona su tutti i tuoi dispositivi',
      'VPN inclusa',
      'Contenuti VIP esclusivi',
      'Netflix, Prime Video, HBO, Apple TV+, Disney+ e NOW',
      'Account manager VIP dedicato',
      'Assistenza VIP, attiva 24 ore su 24'
    ]
  }
};

/** Prezzi in euro, indicizzati per livello → durata → (numero dispositivi - 1). */
const PRICE_TABLE: Record<PlanTierId, Record<PlanDurationId, number[]>> = {
  basis: {
    '3m': [24.99, 39.99, 49.99, 57.99],
    '6m': [34.99, 49.99, 69.99, 89.99],
    '15m': [49, 79, 109, 129]
  },
  premium: {
    '3m': [34.99, 49.99, 69.99, 89.99],
    '6m': [44.99, 79.99, 99.99, 139.99],
    '15m': [78, 124.99, 179.99, 199.99]
  }
};

/** Prezzo una tantum per una combinazione livello / durata / dispositivi. */
export const getPlanPrice = (
  tier: PlanTierId,
  duration: PlanDurationId,
  devices: number
): number => PRICE_TABLE[tier][duration][devices - 1];

/** Costo effettivo al mese, per la riga "da … al mese". */
export const getMonthlyPrice = (
  tier: PlanTierId,
  duration: PlanDurationId,
  devices: number
): number => {
  const plan = PLAN_DURATIONS.find((d) => d.id === duration);
  return getPlanPrice(tier, duration, devices) / (plan ? plan.months : 1);
};

export const formatEuro = (value: number): string => `€${value.toFixed(2).replace('.', ',')}`;

/** Durata più breve a listino — il punto d'ingresso, oggi 3 mesi. */
export const SHORTEST_TERM_MONTHS = PLAN_DURATIONS[0].months;

/**
 * Elenco leggibile delle durate disponibili, es. "3, 6 o 12 + 3 mesi".
 * I testi che elencano le durate leggono da qui, così restano allineati.
 */
export const DURATION_SUMMARY = (() => {
  const terms = PLAN_DURATIONS.map((d) => d.label.replace(/\s*mesi?/i, '').trim());
  return `${terms.slice(0, -1).join(', ')} o ${terms[terms.length - 1]} mesi`;
})();

/**
 * Elenco piatto usato dal modale di checkout, che ordina un singolo pacchetto.
 * Una voce per livello × durata al prezzo per un dispositivo.
 */
export const PRICING_PLANS: PricingPlan[] = (
  Object.keys(PLAN_TIERS) as PlanTierId[]
).flatMap((tierId) =>
  PLAN_DURATIONS.map((duration) => {
    const price = getPlanPrice(tierId, duration.id, 1);
    const tier = PLAN_TIERS[tierId];
    // Il pacchetto da 15 mesi porta un badge -50%, quindi il prezzo di listino è il doppio.
    const originalPrice = duration.badge ? price * 2 : price;

    return {
      id: `${tierId}-${duration.id}`,
      durationMonths: duration.months,
      name: `${tier.label} · ${duration.label}`,
      price,
      originalPrice,
      savePercentage: duration.badge ? 50 : 0,
      periodLabel: `${formatEuro(price / duration.months)} al mese · 1 dispositivo`,
      isPopular: tierId === 'premium' && duration.id === '15m',
      features: tier.features
    };
  })
);

/** Selezione predefinita: il pacchetto Premium 12+3 in evidenza. */
export const DEFAULT_PLAN_ID = 'premium-15m';
