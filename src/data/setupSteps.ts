import { SetupStep } from '../types';
import { CHANNEL_COUNT } from './stats';
import { DURATION_SUMMARY } from './pricing';

export const SETUP_STEPS: SetupStep[] = [
  {
    number: 1,
    title: 'Scegli il Tuo Pacchetto',
    description: `Seleziona la durata che preferisci (${DURATION_SUMMARY}) e paga in sicurezza con carta, PayPal, Apple Pay o in crypto (Bitcoin, USDT, ETH).`,
    iconName: 'ShoppingBag',
    detail: 'Nessun contratto — rinnovi solo se vuoi tu'
  },
  {
    number: 2,
    title: 'Attivazione Immediata via Mail e WhatsApp',
    description: 'Dopo la richiesta ricevi automaticamente entro 2-5 minuti il tuo link M3U e le credenziali Xtream Codes.',
    iconName: 'Zap',
    detail: 'Consegna automatica e velocissima, 24/7'
  },
  {
    number: 3,
    title: 'Installa e Inizia a Guardare',
    description: `Inserisci le credenziali nell'app consigliata (IPTV Smarters, IBO Player, TiviMate) e goditi subito ${CHANNEL_COUNT} canali!`,
    iconName: 'Tv',
    detail: 'Guida passo passo inclusa'
  }
];
