import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

/**
 * A price that rolls like an odometer when it changes.
 *
 * Every digit is a vertical strip carrying 0-9; changing the value slides the
 * strip so the new digit lands in the window. Non-digits (€, the decimal comma)
 * are drawn plainly, so the whole formatted string can be handed over as-is.
 *
 * Digits are tabular, which keeps each strip exactly one digit wide and stops
 * the price jittering as the numbers roll.
 */

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

interface DigitProps {
  value: number;
  /** Index from the right, so lower digits lead and higher ones follow. */
  order: number;
  reduced: boolean;
}

const Digit: React.FC<DigitProps> = ({ value, order, reduced }) => (
  <span
    className="relative inline-block overflow-hidden align-baseline tabular-nums"
    style={{ height: '1em', lineHeight: '1em' }}
  >
    {/* Invisible digit sets the column width without affecting the baseline */}
    <span className="invisible">0</span>

    <motion.span
      className="absolute inset-x-0 top-0 flex flex-col"
      initial={false}
      animate={{ y: `${-value}em` }}
      transition={
        reduced
          ? { duration: 0 }
          : { type: 'spring', stiffness: 260, damping: 30, mass: 0.9, delay: order * 0.045 }
      }
    >
      {DIGITS.map((digit) => (
        <span
          key={digit}
          className="flex items-center justify-center"
          style={{ height: '1em', lineHeight: '1em' }}
        >
          {digit}
        </span>
      ))}
    </motion.span>
  </span>
);

interface RollingPriceProps {
  /** Formatted price, e.g. "€29,99". */
  value: string;
  className?: string;
}

export const RollingPrice: React.FC<RollingPriceProps> = ({ value, className = '' }) => {
  const reduced = useReducedMotion() ?? false;
  const chars = value.split('');
  const digitCount = chars.filter((char) => /\d/.test(char)).length;
  let seen = 0;

  return (
    <span className={`inline-flex items-baseline tabular-nums ${className}`}>
      <span aria-hidden="true" className="inline-flex items-baseline">
      {chars.map((char, index) => {
        if (!/\d/.test(char)) {
          return (
            <span key={`${char}-${index}`}>{char}</span>
          );
        }
        // Rightmost digit rolls first, the way a real counter settles.
        const order = digitCount - 1 - seen;
        seen += 1;
        return (
          <Digit
            key={index}
            value={Number(char)}
            order={order}
            reduced={reduced}
          />
        );
      })}
      </span>
      {/* The rolling strips are decorative; screen readers get the plain value. */}
      <span className="sr-only">{value}</span>
    </span>
  );
};
