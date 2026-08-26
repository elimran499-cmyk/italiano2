/**
 * Dati di contatto centrali. Gli ordini passano da WhatsApp: i pulsanti aprono
 * una chat con il numero qui sotto e un messaggio precompilato.
 * Numero in formato internazionale senza + e senza spazi.
 */
export const WHATSAPP_NUMBER = '447832486269';

/** Formato di visualizzazione del numero, ad esempio nel footer. */
export const WHATSAPP_DISPLAY = '+44 7832 486269';

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
