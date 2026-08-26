import React, { useState } from 'react';
import { Tv, Smartphone, Monitor, Shield, Download, ChevronRight, Check } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { whatsappLink } from '../data/contact';

export const DeviceCompatibility: React.FC = () => {
  const [selectedDevice, setSelectedDevice] = useState<string>('smarttv');

  const devices = [
    {
      id: 'smarttv',
      name: 'Smart TV (Samsung / LG)',
      apps: ['IBO Player', 'Smart One IPTV', 'Nanomid', 'SS IPTV'],
      description: 'Scarica semplicemente l\'app gratuita IBO Player o Smart One dal Samsung Tizen Store o dall\'LG Content Store, inserisci le credenziali ed è fatta!',
      icon: Tv
    },
    {
      id: 'firestick',
      name: 'Amazon Firestick & Fire TV',
      apps: ['IPTV Smarters Pro', 'XCIPTV Player', 'TiviMate'],
      description: 'La scelta migliore per cambiare canale in un lampo! Funziona benissimo con TiviMate o IPTV Smarters Pro tramite l\'app Downloader.',
      icon: Monitor
    },
    {
      id: 'android',
      name: 'Android TV / Google TV',
      apps: ['TiviMate 4K', 'IPTV Smarters', 'GSE Smart IPTV'],
      description: 'Installa direttamente dal Google Play Store su Sony Bravia, Philips Ambilight, Xiaomi Mi Box o Nvidia Shield.',
      icon: Tv
    },
    {
      id: 'apple',
      name: 'Apple TV, iPhone e iPad',
      apps: ['IPTV Smarters Lite', 'GSE Smart IPTV', 'Snappier Player'],
      description: 'Scarica la nostra app partner dall\'App Store, inserisci i dati Xtream Codes e goditi il 4K su tutti i tuoi schermi Apple.',
      icon: Smartphone
    }
  ];

  const activeDeviceObj = devices.find((d) => d.id === selectedDevice) || devices[0];

  return (
    <section id="guida" className="py-14 sm:py-20 bg-canvas-alt pattern-majolica border-t border-ink/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          label="Dispositivi"
          title={<>Guarda sul tuo dispositivo <span className="hl-pill">preferito</span></>}
          intro="Nessuna installazione complicata. In 3 minuti è pronto sulla tua Smart TV, sulla chiavetta di streaming, sullo smartphone o sul tablet."
        />

        {/* Device Switcher */}
        <div className="mt-12 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
          {devices.map((device) => {
            const Icon = device.icon;
            const isActive = device.id === selectedDevice;
            return (
              <button
                key={device.id}
                onClick={() => setSelectedDevice(device.id)}
                className={`p-4 rounded-lg border text-left transition-all duration-200 flex flex-col justify-between ${
                  isActive
                    ? 'bg-paper border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                    : 'bg-paper/60 border-ink/10 hover:border-ink/25 hover:bg-white'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                  isActive ? 'bg-brand/100 text-white' : 'bg-ink/8 text-ink-soft'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`font-bold text-sm ${isActive ? 'text-brand-light' : 'text-ink'}`}>
                    {device.name}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Device Details Card */}
        <div className="mt-6 max-w-4xl mx-auto bg-paper p-6 sm:p-8 rounded-xl border border-ink/10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/10 text-brand-light text-xs font-bold rounded-lg border border-brand/30">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Supporto passo passo</span>
            </div>
            <h3 className="text-2xl font-black text-ink">
              Guida per {activeDeviceObj.name}
            </h3>
            <p className="text-ink-soft text-sm leading-relaxed">
              {activeDeviceObj.description}
            </p>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-ink-soft">App consigliate:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {activeDeviceObj.apps.map((app, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-ink/8 text-ink text-xs font-bold rounded-lg border border-ink/10"
                  >
                    ✓ {app}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto shrink-0 bg-brand/10 p-6 rounded-lg border border-brand/25 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-brand/100 text-white flex items-center justify-center mx-auto shadow-md">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-ink text-sm">Ti serve aiuto per l'installazione?</div>
              <p className="text-xs text-ink-soft mt-1">La nostra assistenza ti segue dal vivo su WhatsApp!</p>
            </div>
            <a
              href={whatsappLink('Ciao Italia IPTV, ho bisogno di aiuto per l\'installazione.')}
              target="_blank"
              rel="noreferrer"
              className="inline-block w-full py-2.5 px-4 bg-brand/100 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
            >
              Assistenza Installazione su WhatsApp
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
