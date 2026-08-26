import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  DEVICE_OPTIONS,
  PLAN_DURATIONS,
  PLAN_TIERS,
  formatEuro,
  getMonthlyPrice,
  getPlanPrice
} from '../data/pricing';
import { PlanTierId } from '../types';
import { Check, Sparkles, ShieldCheck, Lock, CreditCard, Monitor, Star } from 'lucide-react';
import { CONTACT_LINK, orderLink } from '../data/contact';
import { SectionHeading } from './SectionHeading';
import { WhatsAppIcon } from './WhatsAppIcon';
import { RollingPrice } from './RollingPrice';

interface PricingProps {
  onOpenCheckoutModal: (planId?: string) => void;
}

const TIER_ORDER: PlanTierId[] = ['basis', 'premium'];

export const Pricing: React.FC<PricingProps> = ({ onOpenCheckoutModal }) => {
  const [tierId, setTierId] = useState<PlanTierId>('basis');
  const [devices, setDevices] = useState<number>(1);
  const reduceMotion = useReducedMotion();

  const tier = PLAN_TIERS[tierId];
  const isVip = tierId === 'premium';
  const deviceLabel = `${devices} ${devices === 1 ? 'dispositivo' : 'dispositivi'}`;

  /** Spring used by both sliding pills, so the two switches feel like one control. */
  const pill = reduceMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 420, damping: 34 };

  return (
    <section id="prezzi" className="py-14 sm:py-20 bg-canvas-alt pattern-majolica relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <SectionHeading
          label="Prezzi"
          title={<>Scegli il pacchetto giusto per <span className="hl-pill">te</span></>}
          intro="Un solo pagamento per ogni durata. Nessun abbonamento, nessun rinnovo automatico — e decidi tu su quanti schermi guardare in contemporanea."
        />

        {/* ---------- Tier switch ---------- */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex items-center gap-1 p-1.5 rounded-lg bg-paper border border-ink/10 shadow-sm">
            {TIER_ORDER.map((id) => {
              const isActive = id === tierId;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTierId(id)}
                  aria-pressed={isActive}
                  className={`relative px-5 sm:px-7 py-2.5 rounded-xl font-display font-extrabold text-sm sm:text-base transition-colors flex items-center gap-2 ${
                    isActive ? 'text-white' : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  {/* The filled pill slides between the two tiers rather than blinking */}
                  {isActive && (
                    <motion.span
                      layoutId="tier-pill"
                      transition={pill}
                      className={`absolute inset-0 rounded-xl shadow-md ${
                        id === 'premium' ? 'bg-brand' : 'bg-ink'
                      }`}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    {id === 'premium' && (
                      <Star className={`w-4 h-4 ${isActive ? 'fill-white text-white' : ''}`} />
                    )}
                    <span>{id === 'premium' ? 'Premium VIP' : 'Base'}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ---------- Device switch ---------- */}
        <div className="mt-4 flex justify-center">
          {/* 2x2 on phones — a wrapping flex row leaves an orphaned fourth chip */}
          <div className="grid grid-cols-2 sm:inline-flex sm:items-center gap-1 p-1.5 rounded-lg bg-paper border border-ink/10 shadow-sm">
            {DEVICE_OPTIONS.map((count) => {
              const isActive = count === devices;
              return (
                <button
                  key={count}
                  type="button"
                  onClick={() => setDevices(count)}
                  aria-pressed={isActive}
                  className={`relative px-3.5 sm:px-5 py-2.5 rounded-xl font-display font-extrabold text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5 ${
                    isActive ? 'text-white' : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="device-pill"
                      transition={pill}
                      className="absolute inset-0 rounded-xl bg-brand shadow-md"
                    />
                  )}
                  <span className="relative flex items-center gap-1.5">
                    <Monitor className="w-3.5 h-3.5" />
                    <span>
                      {count} {count === 1 ? 'Dispositivo' : 'Dispositivi'}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ---------- Una scheda per durata ---------- */}
        <div className="mt-9 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
          {PLAN_DURATIONS.map((duration) => {
            const price = getPlanPrice(tierId, duration.id, devices);
            const perMonth = getMonthlyPrice(tierId, duration.id, devices);
            const isDeal = Boolean(duration.note);

            return (
              <div
                key={duration.id}
                className={`relative rounded-xl p-6 sm:p-7 flex flex-col transition-colors duration-300 ${
                  isVip
                    ? isDeal
                      ? 'bg-brand-soft border-2 border-brand shadow-2xl shadow-brand/20'
                      : 'bg-brand-soft/60 border border-brand/30 shadow-lg shadow-brand/10'
                    : isDeal
                      ? 'bg-paper border-2 border-brand shadow-2xl shadow-brand/20'
                      : 'bg-paper border border-ink/10 shadow-sm hover:shadow-md hover:border-ink/25'
                }`}
              >
                {isDeal && (
                  <span
                    aria-hidden="true"
                    className="tricolore absolute inset-x-0 top-0 h-1 rounded-t-xl"
                  />
                )}

                {/* Deal badge */}
                {isDeal && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand text-white text-[11px] font-display font-extrabold px-4 py-1.5 rounded-full shadow-md uppercase tracking-wider whitespace-nowrap">
                    {duration.note} · {duration.badge}
                  </div>
                )}

                {/* Durata */}
                <p
                  className={`text-center text-xs sm:text-[13px] font-display font-extrabold uppercase tracking-[0.16em] mt-1 ${
                    'text-brand-deep'
                  }`}
                >
                  {duration.label}
                </p>

                {/* Price — remounts on every tier / device change so it animates in */}
                <p
                  className={`mt-3 text-center font-display text-4xl sm:text-[2.75rem] font-extrabold leading-none ${
                    'text-ink'
                  }`}
                >
                  <RollingPrice value={formatEuro(price)} />
                </p>

                <p
                  className={`mt-2 text-center text-[11px] sm:text-xs font-semibold ${
                    'text-ink-soft'
                  }`}
                >
                  ≈ <RollingPrice value={formatEuro(perMonth)} className="mx-0.5" /> al mese
                </p>

                <p
                  className={`mt-2.5 text-center text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1.5 ${
                    'text-ink-soft'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  {deviceLabel} incluso
                </p>

                {/* Order — opens WhatsApp with the chosen options prefilled */}
                <a
                  data-cta="order"
                  href={orderLink({
                    packageName: tier.name,
                    duration: duration.label,
                    devices,
                    price: formatEuro(price)
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-5 w-full py-3.5 rounded-full font-display font-extrabold text-sm transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 ${
                    isDeal
                      ? 'bg-brand hover:bg-brand-deep text-white shadow-lg'
                      : isVip
                        ? 'bg-brand hover:bg-brand-deep text-white shadow-lg shadow-brand/25'
                        : 'bg-ink hover:bg-ink/90 text-white'
                  }`}
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>{isVip ? 'Diventa VIP Ora' : 'Ordina Ora'}</span>
                </a>

                <div className={`mt-6 pt-5 border-t ${isVip ? 'border-brand/25' : 'border-ink/10'}`}>
                  {/* Tier chip + heading */}
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full shrink-0 ${
                        isVip ? 'bg-brand text-white' : 'bg-ink/8 text-ink-soft'
                      }`}
                    >
                      {tier.label}
                    </span>
                    <h3
                      className={`font-display text-[13px] sm:text-sm font-extrabold ${
                        isVip ? 'text-white' : 'text-ink'
                      }`}
                    >
                      Cosa include il {tier.name}?
                    </h3>
                  </div>

                  {/* Features — the list swaps wholesale when the tier changes */}
                  <ul
                      className={`mt-3.5 space-y-2 text-xs sm:text-[13px] font-medium ${
                        'text-ink'
                      }`}
                    >
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                          <span
                            className={`w-4.5 h-4.5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                              isVip ? 'bg-brand text-white' : 'bg-ink/8 text-ink-soft'
                            }`}
                          >
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                  </ul>
                </div>

                <div
                  className={`mt-5 text-center text-[11px] font-semibold flex items-center justify-center gap-1 ${
                    'text-ink-soft'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Non ti convince? Rimborso entro 7 giorni</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Payment Method Badges */}
        <div className="mt-14 max-w-3xl mx-auto text-center space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-ink-soft">
            Paga in Modo Sicuro e Veloce con il Tuo Metodo Preferito
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <div className="px-4 py-2.5 bg-paper rounded-xl border border-ink/10 shadow-2xs flex items-center gap-2 font-black text-ink text-xs sm:text-sm">
              <span className="w-3 h-3 rounded-full bg-brand/100" />
              <span>PayPal</span>
            </div>
            <div className="px-4 py-2.5 bg-paper rounded-xl border border-ink/10 shadow-2xs flex items-center gap-2 font-bold text-ink text-xs sm:text-sm">
              <CreditCard className="w-4 h-4" />
              <span>Carta di Credito / Visa / Mastercard</span>
            </div>
            <div className="px-4 py-2.5 bg-paper rounded-xl border border-ink/10 shadow-2xs flex items-center gap-2 font-bold text-ink text-xs sm:text-sm">
              <span className="text-brand-deep font-extrabold">₿</span>
              <span>Crypto (Bitcoin / USDT)</span>
            </div>
            <div className="px-4 py-2.5 bg-paper rounded-xl border border-ink/10 shadow-2xs flex items-center gap-2 font-bold text-ink text-xs sm:text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-italy-red" />
              <span>Satispay / Bonifico</span>
            </div>
            <div className="px-4 py-2.5 bg-paper rounded-xl border border-ink/10 shadow-2xs flex items-center gap-2 font-bold text-ink text-xs sm:text-sm">
              <span>Apple Pay</span>
            </div>
          </div>
        </div>

        {/* Advies Callout Box */}
        <div className="mt-12 max-w-2xl mx-auto text-center bg-paper border border-ink/10 rounded-lg p-6 shadow-xs">
          <p className="text-sm font-semibold text-ink">
            Hai ancora dubbi su quale pacchetto scegliere?
          </p>
          <a
            href={CONTACT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-ink hover:text-brand-deep underline underline-offset-4"
          >
            <Sparkles className="w-4 h-4" />
            <span>Chiedi una consulenza gratuita su WhatsApp &rarr;</span>
          </a>
          <p className="mt-4 text-[11px] font-semibold text-ink-soft flex items-center justify-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            Pagamento sicuro · Attivazione immediata in 5 minuti
          </p>
        </div>

      </div>
    </section>
  );
};
