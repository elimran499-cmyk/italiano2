import React from 'react';

interface SectionHeadingProps {
  /** Small label on the left, e.g. "Canali" */
  label: string;
  /** Display-face title, rendered under the rule */
  title?: React.ReactNode;
  /** Supporting copy under the title */
  intro?: React.ReactNode;
  align?: 'left' | 'center';
  /** 'dark' inverts the type for sections sitting on the charcoal background */
  tone?: 'light' | 'dark';
  className?: string;
}

/**
 * The label — rule — arrow-circle header used at the top of every body section.
 * Mirrors the "About ————— (>)" treatment from the reference layout.
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  label,
  title,
  intro,
  align = 'left',
  tone = 'light',
  className = ''
}) => {
  const isDark = tone === 'dark';

  return (
    <div className={`relative ${className}`}>

      <div className="relative">
        {/* Label + rule + arrow */}
        <div className="flex items-center gap-4">
          <span
            className="inline-flex items-center gap-2.5 shrink-0 px-3 py-1.5 rounded-full border border-brand/30 bg-brand/10 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-brand-light"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            {label}
          </span>
          {/* A hairline carries the eye across; the accent sits at its head */}
          <span className="h-px flex-1 bg-gradient-to-r from-brand/50 via-white/12 to-transparent" />

        </div>

        {(title || intro) && (
          <div className={`mt-7 ${align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-3xl'}`}>
            {title && (
              <h2
                className={`font-display text-3xl sm:text-4xl lg:text-[2.9rem] font-bold leading-[1.05] tracking-[-0.035em] ${
                  isDark ? 'text-white' : 'text-ink'
                }`}
              >
                {title}
              </h2>
            )}
            {intro && (
              <p
                className={`mt-4 text-base sm:text-lg leading-relaxed font-medium ${
                  isDark ? 'text-ink-soft' : 'text-ink-soft'
                }`}
              >
                {intro}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
