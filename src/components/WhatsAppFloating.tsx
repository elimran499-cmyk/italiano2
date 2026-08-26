import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { whatsappLink } from '../data/contact';
import { WhatsAppIcon } from './WhatsAppIcon';

export const WhatsAppFloating: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const text = customMsg || 'Ciao assistenza Italia IPTV, ho una domanda sull\'IPTV.';
    window.open(whatsappLink(text), '_blank', 'noopener');
    setIsOpen(false);
  };

  // Lifted on phones so it clears the floating bottom navigation.
  return (
    <div className="hidden lg:flex fixed bottom-5 right-5 z-40 flex-col items-end space-y-2">
      {/* Expanded WhatsApp Widget Box */}
      {isOpen && (
        <div className="bg-paper rounded-3xl shadow-2xl border border-ink/10 p-5 w-80 sm:w-88 animate-fade-in text-left relative space-y-3 mb-2">
          
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-ink-soft hover:bg-ink/8"
            aria-label="Chiudi"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 border-b border-ink/8 pb-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center font-bold text-lg">
                S
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-white animate-pulse"></span>
            </div>
            <div>
              <div className="font-black text-ink text-sm">Italia IPTV Support</div>
              <div className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>
                Online • Risponde entro 2 min
              </div>
            </div>
          </div>

          {/* Simulated Chat Message */}
          <div className="bg-brand/10 p-3.5 rounded-2xl border border-brand/20 text-xs text-ink space-y-1">
            <p className="font-semibold">👋 Ciao! Benvenuto su Italia IPTV.</p>
            <p className="text-ink-soft">
              Hai una domanda su un canale, sui pacchetti o ti serve aiuto per installare sulla TV?
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSendWhatsApp} className="space-y-2.5">
            <input
              type="text"
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              placeholder="Scrivi qui il tuo messaggio..."
              className="w-full px-3.5 py-2.5 bg-ink/5 border border-ink/10 rounded-xl text-xs font-medium text-ink placeholder:text-ink-soft focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="glass-brand w-full py-2.5 text-white font-bold text-xs rounded-full hover:brightness-110 transition-all flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Avvia la Chat WhatsApp</span>
            </button>
          </form>

        </div>
      )}

      {/* Floating Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group p-4 bg-brand hover:bg-emerald-600 text-white rounded-full shadow-xl shadow-emerald-500/30 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center"
        aria-label="WhatsApp Support Chat"
        id="btn-whatsapp-floating"
      >
        <WhatsAppIcon className="w-7 h-7" />
        
        {/* Unread notification ping dot */}
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand ring-2 ring-white flex items-center justify-center text-[9px] font-black text-white">
          1
        </span>
      </button>
    </div>
  );
};
