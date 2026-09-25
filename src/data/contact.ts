/**
 * Dati di contatto centrali. Gli ordini passano da WhatsApp: i pulsanti aprono
 * una chat con il numero qui sotto e un messaggio precompilato.
 * Numero in formato internazionale senza + e senza spazi.
 */
export const WHATSAPP_NUMBER = '447414662070';

/** Formato di visualizzazione del numero, ad esempio nel footer. */
export const WHATSAPP_DISPLAY = '+44 7414 662070';

export const whatsappLink = (message: string): string =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

/** Messaggio standard per i pulsanti generici "Contattaci". */
export const CONTACT_MESSAGE =
  'Ciao Italia IPTV, ho una domanda sui vostri pacchetti IPTV.';

export const CONTACT_LINK = whatsappLink(CONTACT_MESSAGE);

export interface OrderDetails {
  /** es. "Pacchetto Premium VIP" */
  packageName: string;
  /** es. "12 + 3 Mesi" */
  duration: string;
  /** Numero di schermi in contemporanea */
  devices: number;
  /** Prezzo formattato, es. "€78,00" */
  price: string;
}

/**
 * Link d'ordine con tutte le opzioni scelte nel messaggio, così l'assistenza sa
 * subito quale pacchetto, quale durata e quanti schermi.
 */
const orderLines = ({ packageName, duration, devices, price }: OrderDetails): string[] => [
  `Durata: ${duration}`,
  `Schermi: ${devices} ${devices === 1 ? 'dispositivo' : 'dispositivi'}`,
  `Prezzo: ${price}`
];

export const orderLink = ({ packageName, duration, devices, price }: OrderDetails): string =>
  whatsappLink(
    [
      `Ciao Italia IPTV, vorrei ordinare il ${packageName}.`,
      '',
      `Durata: ${duration}`,
      `Schermi: ${devices} ${devices === 1 ? 'dispositivo' : 'dispositivi'}`,
      `Prezzo: ${price}`
    ].join('\n')
  );

/**
 * Come l'ordine normale, ma la chat si apre già chiedendo di pagare in crypto,
 * così l'assistenza manda subito l'indirizzo giusto invece di dover chiedere.
 */
export const cryptoOrderLink = (details: OrderDetails): string =>
  whatsappLink(
    [
      `Ciao Italia IPTV, vorrei ordinare il ${details.packageName} e pagare in crypto.`,
      '',
      ...orderLines(details),
      '',
      'Posso pagare con Bitcoin, USDT o ETH?'
    ].join('\n')
  );
