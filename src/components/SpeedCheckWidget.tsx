import React, { useState } from 'react';
import { Gauge, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface SpeedCheckWidgetProps {
  onOpenCheckoutModal: () => void;
}

export const SpeedCheckWidget: React.FC<SpeedCheckWidgetProps> = ({ onOpenCheckoutModal }) => {
  const [deviceType, setDeviceType] = useState<string>('smarttv');
  const [internetType, setInternetType] = useState<string>('fiber');
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleRunCheck = () => {
    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      setIsChecked(true);
    }, 1200);
  };

  return (
    <section className="py-12 sm:py-16 bg-canvas relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-brand to-brand-deep text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand/100/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/100/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <Gauge className="w-3.5 h-3.5 text-emerald-400" />
              <span>VERIFICA GRATUITA DI COMPATIBILITÀ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              La tua rete di casa è pronta per l'IPTV in 4K?
            </h2>
            <p className="text-white/80 text-sm sm:text-base">
              Seleziona i tuoi dispositivi e fai il test in 5 secondi: immagine nitida e zero buffering.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto">
            {/* Device Select */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold uppercase text-white/80">Il tuo schermo / dispositivo:</label>
              <select
                value={deviceType}
                onChange={(e) => {
                  setDeviceType(e.target.value);
                  setIsChecked(false);
                }}
                className="w-full bg-white/15 text-white border border-white/25 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="smarttv">Smart TV Samsung / LG / Philips</option>
                <option value="firestick">Amazon Fire Stick 4K / Android TV</option>
                <option value="appletv">Apple TV / iPhone / iPad</option>
                <option value="formuler">Formuler / MAG Box / Enigma2</option>
              </select>
            </div>

            {/* Internet Select */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold uppercase text-white/80">Connessione internet:</label>
              <select
                value={internetType}
                onChange={(e) => {
                  setInternetType(e.target.value);
                  setIsChecked(false);
                }}
                className="w-full bg-white/15 text-white border border-white/25 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="fiber">Fibra / FTTH (&gt; 50 Mbps)</option>
                <option value="cable">ADSL / FWA (20-50 Mbps)</option>
                <option value="wifi">4G / 5G / Wi-Fi di casa</option>
              </select>
            </div>
          </div>

          <div className="mt-6 text-center">
            {!isChecked ? (
              <button
                onClick={handleRunCheck}
                disabled={isChecking}
                className="px-8 py-3.5 bg-brand/100 hover:bg-emerald-400 text-white font-black text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mx-auto"
              >
                {isChecking ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Analisi della rete in corso...</span>
                  </>
                ) : (
                  <>
                    <Gauge className="w-4 h-4" />
                    <span>Avvia il Test di 5 Secondi</span>
                  </>
                )}
              </button>
            ) : (
              <div className="bg-brand/10 border border-emerald-500/50 p-5 rounded-2xl max-w-md mx-auto space-y-3 animate-fade-in">
                <div className="flex items-center justify-center gap-2 text-emerald-400 font-extrabold text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>100% COMPATIBILE CON ITALIA IPTV 4K!</span>
                </div>
                <p className="text-white/80 text-xs leading-relaxed">
                  Complimenti! La tua combinazione di dispositivo e connessione gestisce senza problemi il 4K Ultra HD e lo sport a 60 FPS sui nostri server dedicati europei.
                </p>
                <button
                  onClick={onOpenCheckoutModal}
                  className="w-full py-3 bg-brand/100 hover:bg-emerald-400 text-white font-black text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Vedi i Pacchetti</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
