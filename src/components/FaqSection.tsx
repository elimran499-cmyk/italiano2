import React, { useState } from 'react';
import { FAQS_DATA } from '../data/faqs';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { CONTACT_LINK } from '../data/contact';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string>('activation-speed');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? '' : id);
  };

  return (
    <section id="faq" className="py-14 sm:py-20 bg-canvas relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeading
          label="FAQ"
          title={<>Hai ancora <span className="hl-pill">domande</span>?</>}
          intro="Qui trovi le risposte alle domande più frequenti sui nostri servizi IPTV."
        />

        {/* FAQ Accordion */}
        <div className="mt-12 space-y-3">
          {FAQS_DATA.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className="bg-canvas-alt/80 rounded-2xl border border-ink/10 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 sm:p-6 text-left font-bold text-ink text-base sm:text-lg flex items-center justify-between gap-4 hover:text-emerald-700 transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full bg-paper border border-ink/10 flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-brand/10 border-emerald-300 text-emerald-600' : 'text-ink-soft'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-ink-soft text-sm leading-relaxed border-t border-ink/8 pt-4 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Live Support Box */}
        <div className="mt-10 bg-canvas-alt border border-ink/10 rounded-2xl p-6 text-center space-y-3">
          <p className="text-sm font-semibold text-ink-soft">
            Non trovi la tua domanda?
          </p>
          <a
            href={CONTACT_LINK}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand/100 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Fai la Tua Domanda su WhatsApp (24/7)</span>
          </a>
        </div>

      </div>
    </section>
  );
};
