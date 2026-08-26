/** Groups the line-up into the filter chips above the logo wall. */
export type ChannelCategory =
  | 'rai'
  | 'mediaset'
  | 'sky'
  | 'sport'
  | 'altri'
  | 'kids'
  | 'intl'
  | 'vod';

export interface Channel {
  id: string;
  name: string;
  category: ChannelCategory;
  quality: '4K Ultra HD' | 'Full HD' | '60 FPS';
  /** Emoji fallback, shown when no logo file is present. */
  logo: string;
  /**
   * Resolved URL of a bundled logo image, matched on id from
   * src/assets/logos/<id>.(png|jpg|svg|webp). Undefined when no file exists.
   */
  logoSrc?: string;
  /**
   * Word set under a family logo to tell sister channels apart — "Calcio"
   * under the Sky Sport mark, "Action" under Sky Cinema.
   */
  logoCaption?: string;
  currentProgram?: string;
  popular?: boolean;
}

export interface MediaItem {
  id: string;
  title: string;
  type: 'film' | 'serie';
  year: number;
  rating?: number;
  genre: string;
  quality: '4K Ultra HD' | 'Full HD';
  /** Resolved URL of the bundled poster image. */
  poster: string;
  /** Gradient shown behind the poster while it loads. */
  accent: string;
  badge?: string;
}

export interface MediaRow {
  id: string;
  title: string;
  /** Optional supporting line under the row title. */
  subtitle?: string;
  items: MediaItem[];
}

export interface PricingPlan {
  id: string;
  durationMonths: number;
  name: string;
  price: number;
  originalPrice: number;
  savePercentage: number;
  periodLabel: string;
  isPopular?: boolean;
  features: string[];
}

export type PlanTierId = 'basis' | 'premium';
export type PlanDurationId = '3m' | '6m' | '15m';

export interface PlanDuration {
  id: PlanDurationId;
  label: string;
  months: number;
  /** Discount chip, e.g. '-50%' */
  badge?: string;
  /** Emphasis line, e.g. 'BESTE DEAL' */
  note?: string;
}

export interface PlanTier {
  id: PlanTierId;
  name: string;
  label: string;
  features: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  deviceUsed: string;
}

export interface SetupStep {
  number: number;
  title: string;
  description: string;
  iconName: string;
  detail: string;
}
