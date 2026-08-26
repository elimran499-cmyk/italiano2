import React from 'react';
import { SETUP_STEPS } from '../data/setupSteps';
import { ShoppingBag, Zap, Tv, CheckCircle, ArrowRight } from 'lucide-react';
import { CONTACT_LINK } from '../data/contact';
import { SectionHeading } from './SectionHeading';

interface SetupStepsProps {
  onOpenCheckoutModal: () => void;
}

export const SetupSteps: React.FC<SetupStepsProps> = ({ onOpenCheckoutModal }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShoppingBag':
        return ShoppingBag;
      case 'Zap':
        return Zap;
      case 'Tv':
      default:
        return Tv;
    }
  };

  return (
    <section className="py-14 sm:py-20 bg-canvas relative border-t border-ink/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          label="Installazione"
          title={<>Installato in <span className="hl-pill">3 passaggi</span></>}
          intro="Nessun tecnico da chiamare. In pochi minuti stai già guardando i tuoi canali live preferiti."
        />

        {/* 3 Steps Cards */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 relative max-w-5xl mx-auto">
          {SETUP_STEPS.map((step) => {
            const IconComponent = getIcon(step.iconName);

            return (
              <div
                key={step.number}
                className="bg-paper p-8 rounded-xl border border-ink/10 relative shadow-xs hover:shadow-lg hover:border-brand hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[3px] bg-brand origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                />
                {/* Large Number Badge */}
                <div className="absolute top-6 right-6 w-12 h-12 rounded-lg bg-brand/15 text-brand-deep font-display font-extrabold text-xl flex items-center justify-center group-hover:bg-brand group-hover:text-ink transition-colors duration-300">
                  0{step.number}
                </div>

                <div>
                  <div className="w-12 h-12 rounded-lg bg-ink text-white flex items-center justify-center mb-6">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <h3 className="font-display text-xl font-extrabold text-ink pr-12">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-ink-soft text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-ink/8 text-xs font-bold text-brand-deep flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-brand-deep" />
                  <span>{step.detail}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onOpenCheckoutModal}
            className="glass-brand px-8 py-4 text-white font-display font-bold text-sm rounded-full hover:brightness-110 transition-all inline-flex items-center gap-2"
          >
            <span>Scegli Subito il Tuo Pacchetto</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href={CONTACT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="glass px-8 py-4 text-ink font-display font-bold text-sm rounded-full hover:brightness-[0.98] transition-all inline-flex items-center gap-2"
          >
            <span>Ti Serve Aiuto? Contattaci</span>
          </a>
        </div>

      </div>
    </section>
  );
};
