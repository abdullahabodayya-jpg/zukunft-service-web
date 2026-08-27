/**
 * The Zukunft Service brand lockup, in two forms.
 *
 * `asset` renders the client's own logo file and is what the header uses. The
 * file arrived as a 4824x2036 PNG flattened onto solid white, which cannot sit
 * on this site's cream surface without showing as a paler rectangle, so it was
 * un-composited from white into real alpha, trimmed to its bounding box and
 * scaled to 1600px. The un-compositing recovers per-pixel coverage rather than
 * thresholding, which is what keeps the serif wordmark's edges smooth instead
 * of leaving a white fringe.
 *
 * `compact` / `full` stay drawn as inline SVG, and are NOT dead code: they are
 * what the dark hero panel uses. The supplied logo is dark green on
 * transparency, so on `data-surface="dark"` it would be a dark shape on a dark
 * ground - technically present, visually gone. The drawn mark takes its colour
 * from `currentColor` and the gold from a token, so it inverts with the surface
 * automatically. Swapping the panel to the asset needs a light or reversed
 * version of the logo from the client first.
 *
 * The `full` variant additionally carries the two taglines, which the supplied
 * file does not include.
 */

import Image from 'next/image';

import { cn } from '@/lib/cn';

/** Intrinsic aspect of `public/logo-lockup.png` after trimming: 1600 x 675. */
const LOCKUP_ASPECT = 1600 / 675;

/** The pictorial mark: a checked document, a broom, a sparkle and a leaf. */
function LogoMark({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn('shrink-0', className)}
    >
      {/* document */}
      <path
        d="M7 4.5h9.5L21 9v14.5a1.5 1.5 0 0 1-1.5 1.5H7a1.5 1.5 0 0 1-1.5-1.5v-17A1.5 1.5 0 0 1 7 4.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* checkbox + tick, in the accent */}
      <path
        d="M8.5 9.5h4v4h-4z"
        stroke="var(--color-accent)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="m9.3 11.6 1.3 1.3 2.2-2.6"
        stroke="var(--color-accent)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* ruled lines */}
      <path
        d="M8.5 16.5h9M8.5 19.5h6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* broom: handle, then the head fanning out */}
      <path d="M25.5 3.5 20 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M17.2 15.6 21 10.2l3.4 2.4-2.2 6a1 1 0 0 1-1.3.6l-3.3-1.2a1 1 0 0 1-.4-1.6Z"
        fill="currentColor"
      />
      {/* sparkle */}
      <path
        d="M27 15.5c0 1.4.9 2.3 2.3 2.3-1.4 0-2.3.9-2.3 2.3 0-1.4-.9-2.3-2.3-2.3 1.4 0 2.3-.9 2.3-2.3Z"
        fill="var(--color-accent)"
      />
      {/* leaf */}
      <path
        d="M23.5 24.5c-2.6 1-5 .2-5.6-1.7 2.3-1.9 5-2 6.4-.4.3.4.1 1.4-.8 2.1Z"
        fill="currentColor"
        opacity="0.55"
      />
    </svg>
  );
}

export interface LogoProps {
  /** `asset` is the client's own file; `compact` / `full` are drawn and survive
   *  a dark surface. `full` adds the descriptor and the slogan. */
  variant?: 'asset' | 'compact' | 'full';
  className?: string;
  markSize?: number;
  /** Rendered height in px for `asset`. Width follows the intrinsic aspect. */
  height?: number;
  /** Above the fold. `priority` is deprecated in Next 16. */
  eager?: boolean;
}

export function Logo({ variant = 'compact', className, markSize, height, eager }: LogoProps) {
  if (variant === 'asset') {
    const h = height ?? 52;
    return (
      <Image
        src="/logo-lockup.png"
        // The link that wraps this in the header has no other text, so this
        // alt IS the link's accessible name. It must stay the brand name.
        alt="Zukunft Service"
        width={Math.round(h * LOCKUP_ASPECT)}
        height={h}
        className={cn('w-auto', className)}
        style={{ height: h }}
        {...(eager === true
          ? { loading: 'eager' as const, fetchPriority: 'high' as const }
          : {})}
      />
    );
  }

  const size = markSize ?? (variant === 'full' ? 44 : 30);

  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <LogoMark size={size} className="text-brand" />

      {/* The brand name is Latin in both locales and never transliterated, so it
          is pinned LTR even inside the Arabic layout. */}
      <span dir="ltr" className="flex flex-col leading-none">
        <span
          className={cn(
            'font-heading tracking-tight text-text-heading',
            variant === 'full' ? 'text-display-sm' : 'text-title',
          )}
        >
          Zukunft Service
        </span>

        {variant === 'full' ? (
          <>
            <span className="mt-1.5 text-caption font-semibold uppercase tracking-[0.18em] text-text-secondary">
              Dienstleistungen &amp; Reinigung
            </span>
            <span className="mt-1.5 font-heading text-body-sm italic text-accent-text">
              Alles aus einer Hand
            </span>
          </>
        ) : null}
      </span>
    </span>
  );
}

export { LogoMark };
