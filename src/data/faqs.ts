import { FAQItem } from '../types';
import { SHORTEST_TERM_MONTHS } from './pricing';

export const FAQS_DATA: FAQItem[] = [
  {
    id: 'activation-speed',
    question: 'Quanto tempo serve per attivare il mio account Italia IPTV?',
    answer: 'Praticamente subito! Dopo aver completato l’ordine ricevi entro 2-10 minuti le tue credenziali personali e una guida di installazione chiara via e-mail e WhatsApp.'
  },
  {
    id: 'satellite-req',
    question: 'Mi serve una parabola o un decoder speciale?',
    answer: 'No, assolutamente. Italia IPTV funziona al 100% via internet. Ti bastano una connessione e un dispositivo come una Smart TV, un Amazon Fire Stick, un box Android, un Apple TV, un tablet, uno smartphone o un computer.'
  },
  {
    id: 'internet-speed',
    question: 'Che velocità di connessione serve per lo streaming in 4K?',
    answer: 'Per un’esperienza fluida in Full HD e 4K Ultra HD consigliamo una connessione stabile di almeno 15-25 Mbps. Grazie alla nostra tecnologia Anti-Freeze™ v9.0 l’immagine non va in buffering, nemmeno durante le partite più seguite.'
  },
  {
    id: 'device-compatibility',
    question: 'Su quali dispositivi e app posso usare Italia IPTV?',
    answer: 'Italia IPTV è compatibile con quasi ogni schermo moderno: Smart TV Samsung e LG (con IBO Player, Nanomid o Smart One), Android TV, Amazon Fire Stick (con IPTV Smarters Pro o XCIPTV), Apple TV (con GSE o TiviMate), iOS, telefoni Android e Windows/Mac.'
  },
  {
    id: 'sports-channels',
    question: 'Sono inclusi Serie A, Champions League, Sky Sport, DAZN e la Formula 1?',
    answer: 'Sì! Tutti i principali canali sportivi italiani — Sky Sport Uno, Sky Sport Calcio, Sky Sport F1 e MotoGP, DAZN con la Serie A, Eurosport e i canali sportivi internazionali — sono inclusi di serie in 4K Ultra HD a 60 FPS, senza costi mensili aggiuntivi.'
  },
  {
    id: 'first-package',
    question: 'Posso provare prima per un periodo breve?',
    answer: `Non offriamo account di prova gratuiti, ma puoi iniziare senza alcun vincolo con il pacchetto da ${SHORTEST_TERM_MONTHS} mesi — la nostra durata più breve. Nessun contratto e nessun rinnovo automatico: decidi tu se proseguire. Non sai quale pacchetto scegliere? Scrivici su WhatsApp e ti consigliamo senza impegno.`
  }
];
