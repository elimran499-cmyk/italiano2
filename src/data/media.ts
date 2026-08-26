import { MediaItem, MediaRow } from '../types';

/**
 * Titoli, anni, voti, generi e locandine da IMDb (luglio 2026).
 *
 * Le locandine stanno in ../assets/posters/<id titolo>.jpg e sono associate
 * tramite id: per aggiungere un titolo basta metterci la sua immagine con il
 * nome file corrispondente.
 */
const POSTERS = import.meta.glob('../assets/posters/*.webp', {
  eager: true,
  import: 'default'
}) as Record<string, string>;

type RawMediaItem = Omit<MediaItem, 'poster'>;
type RawMediaRow = Omit<MediaRow, 'items'> & { items: RawMediaItem[] };

const withPosters = (rows: RawMediaRow[]): MediaRow[] =>
  rows.map((row) => ({
    ...row,
    items: row.items.map((item) => ({
      ...item,
      poster: POSTERS[`../assets/posters/${item.id}.webp`]
    }))
  }));

export const MEDIA_ROWS: MediaRow[] = withPosters([
  {
    id: 'series',
    title: 'Le Serie Più Viste del Momento',
    items: [
      {
        id: 'sr-house-of-the-dragon',
        title: 'House of the Dragon',
        type: 'serie',
        year: 2022,
        rating: 8.3,
        genre: 'Azione / Avventura',
        quality: '4K Ultra HD',
        accent: 'from-red-700 to-slate-900',
        badge: '#1 di Tendenza'
      },
      {
        id: 'sr-the-hawk',
        title: 'The Hawk',
        type: 'serie',
        year: 2026,
        rating: 6.4,
        genre: 'Commedia / Sport',
        quality: '4K Ultra HD',
        accent: 'from-amber-600 to-orange-900',
        badge: 'Nuovo'
      },
      {
        id: 'sr-ride-or-die',
        title: 'Ride or Die',
        type: 'serie',
        year: 2026,
        rating: 7.6,
        genre: 'Azione / Avventura',
        quality: '4K Ultra HD',
        accent: 'from-orange-600 to-red-900',
        badge: 'Nuovo'
      },
      {
        id: 'sr-silo',
        title: 'Silo',
        type: 'serie',
        year: 2023,
        rating: 8.1,
        genre: 'Fantascienza / Mistero',
        quality: '4K Ultra HD',
        accent: 'from-slate-600 to-slate-950'
      },
      {
        id: 'sr-i-will-find-you',
        title: 'I Will Find You',
        type: 'serie',
        year: 2026,
        rating: 7.1,
        genre: 'Crimine / Mistero',
        quality: '4K Ultra HD',
        accent: 'from-cyan-700 to-slate-900',
        badge: 'Nuovo'
      },
      {
        id: 'sr-ransom-canyon',
        title: 'Ransom Canyon',
        type: 'serie',
        year: 2025,
        rating: 6.8,
        genre: 'Drammatico / Western',
        quality: '4K Ultra HD',
        accent: 'from-amber-700 to-stone-900'
      },
      {
        id: 'sr-lanterns',
        title: 'Lanterns',
        type: 'serie',
        year: 2026,
        genre: 'Azione / Crimine',
        quality: '4K Ultra HD',
        accent: 'from-emerald-600 to-green-950',
        badge: 'In Arrivo'
      },
      {
        id: 'sr-stuart-fails',
        title: 'Stuart Fails to Save the Universe',
        type: 'serie',
        year: 2026,
        rating: 7.1,
        genre: 'Commedia / Fantascienza',
        quality: '4K Ultra HD',
        accent: 'from-violet-600 to-indigo-950',
        badge: 'Nuovo'
      },
      {
        id: 'sr-lucky',
        title: 'Lucky',
        type: 'serie',
        year: 2026,
        rating: 6.6,
        genre: 'Crimine / Thriller',
        quality: '4K Ultra HD',
        accent: 'from-green-600 to-emerald-950',
        badge: 'Nuovo'
      },
      {
        id: 'sr-neuromancer',
        title: 'Neuromancer',
        type: 'serie',
        year: 2027,
        genre: 'Fantascienza / Thriller',
        quality: '4K Ultra HD',
        accent: 'from-fuchsia-600 to-indigo-950',
        badge: 'In Arrivo'
      },
      {
        id: 'sr-cape-fear',
        title: 'Cape Fear',
        type: 'serie',
        year: 2026,
        rating: 6.8,
        genre: 'Crimine / Thriller',
        quality: '4K Ultra HD',
        accent: 'from-sky-700 to-slate-950',
        badge: 'Nuovo'
      },
      {
        id: 'sr-widows-bay',
        title: "Widow's Bay",
        type: 'serie',
        year: 2026,
        rating: 8.1,
        genre: 'Commedia / Horror',
        quality: '4K Ultra HD',
        accent: 'from-purple-700 to-slate-950',
        badge: 'Nuovo'
      },
      {
        id: 'sr-game-of-thrones',
        title: 'Game of Thrones',
        type: 'serie',
        year: 2011,
        rating: 9.2,
        genre: 'Drammatico / Fantasy',
        quality: '4K Ultra HD',
        accent: 'from-slate-700 to-neutral-950'
      },
      {
        id: 'sr-little-house',
        title: 'Little House on the Prairie',
        type: 'serie',
        year: 2026,
        rating: 7.3,
        genre: 'Drammatico / Famiglia',
        quality: '4K Ultra HD',
        accent: 'from-lime-600 to-emerald-900',
        badge: 'Nuovo'
      },
      {
        id: 'sr-gign',
        title: 'GIGN',
        type: 'serie',
        year: 2026,
        rating: 6.3,
        genre: 'Azione',
        quality: '4K Ultra HD',
        accent: 'from-blue-700 to-slate-950',
        badge: 'Nuovo'
      }
    ]
  },
  {
    id: 'films',
    title: 'I Migliori Film',
    subtitle: 'Dai titoli premiati alle perle ancora da scoprire',
    items: [
      {
        id: 'fl-another-round',
        title: 'Another Round',
        type: 'film',
        year: 2020,
        rating: 7.7,
        genre: 'Commedia / Drammatico',
        quality: '4K Ultra HD',
        accent: 'from-amber-500 to-orange-800',
        badge: 'Oscar'
      },
      {
        id: 'fl-after-love',
        title: 'After Love',
        type: 'film',
        year: 2020,
        rating: 7.3,
        genre: 'Drammatico',
        quality: 'Full HD',
        accent: 'from-rose-600 to-slate-900'
      },
      {
        id: 'fl-da-5-bloods',
        title: 'Da 5 Bloods',
        type: 'film',
        year: 2020,
        rating: 6.5,
        genre: 'Avventura / Guerra',
        quality: '4K Ultra HD',
        accent: 'from-yellow-700 to-green-950'
      },
      {
        id: 'fl-dear-comrades',
        title: 'Dear Comrades!',
        type: 'film',
        year: 2020,
        rating: 7.4,
        genre: 'Drammatico / Storico',
        quality: 'Full HD',
        accent: 'from-red-700 to-neutral-900'
      },
      {
        id: 'fl-devil-all-the-time',
        title: 'The Devil All the Time',
        type: 'film',
        year: 2020,
        rating: 7.1,
        genre: 'Crimine / Thriller',
        quality: '4K Ultra HD',
        accent: 'from-stone-600 to-stone-950'
      },
      {
        id: 'fl-dinner-in-america',
        title: 'Dinner in America',
        type: 'film',
        year: 2020,
        rating: 7.5,
        genre: 'Commedia / Musica',
        quality: 'Full HD',
        accent: 'from-pink-600 to-purple-900'
      },
      {
        id: 'fl-the-disciple',
        title: 'The Disciple',
        type: 'film',
        year: 2020,
        rating: 7.1,
        genre: 'Drammatico / Musica',
        quality: 'Full HD',
        accent: 'from-indigo-600 to-slate-900'
      },
      {
        id: 'fl-farewell-amor',
        title: 'Farewell Amor',
        type: 'film',
        year: 2020,
        rating: 6.9,
        genre: 'Drammatico / Romantico',
        quality: 'Full HD',
        accent: 'from-fuchsia-600 to-rose-900'
      },
      {
        id: 'fl-father-otac',
        title: 'Father',
        type: 'film',
        year: 2020,
        rating: 7.6,
        genre: 'Drammatico',
        quality: 'Full HD',
        accent: 'from-slate-500 to-slate-900'
      },
      {
        id: 'fl-the-father',
        title: 'The Father',
        type: 'film',
        year: 2020,
        rating: 8.2,
        genre: 'Drammatico / Mistero',
        quality: '4K Ultra HD',
        accent: 'from-blue-600 to-indigo-950',
        badge: 'Oscar'
      },
      {
        id: 'fl-fear-strah',
        title: 'Fear',
        type: 'film',
        year: 2020,
        rating: 7.2,
        genre: 'Commedia / Romantico',
        quality: 'Full HD',
        accent: 'from-teal-600 to-slate-900'
      },
      {
        id: 'fl-forty-year-old-version',
        title: 'The Forty-Year-Old Version',
        type: 'film',
        year: 2020,
        rating: 7.2,
        genre: 'Commedia / Drammatico',
        quality: 'Full HD',
        accent: 'from-neutral-500 to-neutral-900'
      },
      {
        id: 'fl-hamilton',
        title: 'Hamilton',
        type: 'film',
        year: 2020,
        rating: 8.3,
        genre: 'Biografico / Storico',
        quality: '4K Ultra HD',
        accent: 'from-amber-600 to-yellow-900',
        badge: 'Top 10'
      },
      {
        id: 'fl-ending-things',
        title: "I'm Thinking of Ending Things",
        type: 'film',
        year: 2020,
        rating: 6.5,
        genre: 'Drammatico / Thriller',
        quality: '4K Ultra HD',
        accent: 'from-sky-700 to-slate-950'
      },
      {
        id: 'fl-identifying-features',
        title: 'Identifying Features',
        type: 'film',
        year: 2020,
        rating: 7.3,
        genre: 'Drammatico',
        quality: 'Full HD',
        accent: 'from-orange-700 to-amber-950'
      }
    ]
  },
  {
    id: 'familie',
    title: 'Bambini e Famiglia',
    subtitle: 'Grandi classici senza tempo per tutta la famiglia',
    items: [
      {
        id: 'kf-sinbad',
        title: 'The 7th Voyage of Sinbad',
        type: 'film',
        year: 1958,
        rating: 7.0,
        genre: 'Avventura / Famiglia',
        quality: 'Full HD',
        accent: 'from-teal-500 to-blue-900'
      },
      {
        id: 'kf-gulliver',
        title: 'The 3 Worlds of Gulliver',
        type: 'film',
        year: 1960,
        rating: 6.4,
        genre: 'Avventura / Fantasy',
        quality: 'Full HD',
        accent: 'from-amber-500 to-orange-800'
      },
      {
        id: 'kf-jason-argonauts',
        title: 'Jason and the Argonauts',
        type: 'film',
        year: 1963,
        rating: 7.3,
        genre: 'Avventura / Famiglia',
        quality: 'Full HD',
        accent: 'from-cyan-600 to-blue-900'
      },
      {
        id: 'kf-lotr-1978',
        title: 'The Lord of the Rings',
        type: 'film',
        year: 1978,
        rating: 6.2,
        genre: 'Animazione / Fantasy',
        quality: 'Full HD',
        accent: 'from-yellow-600 to-stone-900'
      },
      {
        id: 'kf-water-babies',
        title: 'The Water Babies',
        type: 'film',
        year: 1978,
        rating: 6.1,
        genre: 'Animazione / Famiglia',
        quality: 'Full HD',
        accent: 'from-sky-400 to-cyan-800'
      },
      {
        id: 'kf-watership-down',
        title: 'Watership Down',
        type: 'film',
        year: 1978,
        rating: 7.5,
        genre: 'Animazione / Avventura',
        quality: 'Full HD',
        accent: 'from-lime-600 to-green-900'
      },
      {
        id: 'kf-lion-witch-wardrobe',
        title: 'The Lion, the Witch & the Wardrobe',
        type: 'film',
        year: 1979,
        rating: 7.0,
        genre: 'Animazione / Avventura',
        quality: 'Full HD',
        accent: 'from-amber-600 to-red-900'
      },
      {
        id: 'kf-clash-of-titans',
        title: 'Clash of the Titans',
        type: 'film',
        year: 1981,
        rating: 6.9,
        genre: 'Avventura / Fantasy',
        quality: 'Full HD',
        accent: 'from-yellow-500 to-slate-900'
      },
      {
        id: 'kf-et',
        title: 'E.T. the Extra-Terrestrial',
        type: 'film',
        year: 1982,
        rating: 7.9,
        genre: 'Famiglia / Fantascienza',
        quality: '4K Ultra HD',
        accent: 'from-indigo-500 to-purple-900',
        badge: 'Classico'
      },
      {
        id: 'kf-last-unicorn',
        title: 'The Last Unicorn',
        type: 'film',
        year: 1982,
        rating: 7.3,
        genre: 'Animazione / Avventura',
        quality: 'Full HD',
        accent: 'from-pink-400 to-violet-800'
      },
      {
        id: 'kf-dark-crystal',
        title: 'The Dark Crystal',
        type: 'film',
        year: 1982,
        rating: 7.1,
        genre: 'Avventura / Fantasy',
        quality: 'Full HD',
        accent: 'from-violet-600 to-indigo-950'
      },
      {
        id: 'kf-wind-in-the-willows',
        title: 'The Wind in the Willows',
        type: 'film',
        year: 1983,
        rating: 7.5,
        genre: 'Animazione / Famiglia',
        quality: 'Full HD',
        accent: 'from-green-500 to-emerald-900'
      },
      {
        id: 'kf-ghostbusters',
        title: 'Ghostbusters',
        type: 'film',
        year: 1984,
        rating: 7.8,
        genre: 'Commedia / Fantasy',
        quality: '4K Ultra HD',
        accent: 'from-slate-500 to-red-900',
        badge: 'Classico'
      },
      {
        id: 'kf-karate-kid',
        title: 'The Karate Kid',
        type: 'film',
        year: 1984,
        rating: 7.3,
        genre: 'Azione / Famiglia',
        quality: '4K Ultra HD',
        accent: 'from-red-600 to-neutral-900'
      },
      {
        id: 'kf-neverending-story',
        title: 'The NeverEnding Story',
        type: 'film',
        year: 1984,
        rating: 7.3,
        genre: 'Avventura / Famiglia',
        quality: 'Full HD',
        accent: 'from-amber-500 to-purple-900'
      }
    ]
  }
]);
