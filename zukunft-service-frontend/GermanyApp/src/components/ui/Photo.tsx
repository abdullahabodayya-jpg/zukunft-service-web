/**
 * One photo frame, used by every photographic surface on the site.
 *
 * It owns the frame itself rather than expecting a positioned parent, because
 * `next/image` with `fill` silently collapses to zero height unless its
 * container is positioned - a failure that renders as nothing at all and is
 * easy to ship. Callers set the aspect ratio and radius through `className`.
 *
 * MISSING FILES ARE A FIRST-CLASS STATE, not an error. The client supplies
 * photography in batches, so an unresolved slot renders as a quiet tinted plate
 * that reads as "space reserved" rather than as the browser's broken-image
 * icon, which reads as "this site is broken".
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WHY `focal` IS LOGICAL AND WHY THAT MATTERS HERE
 *
 * CSS has no logical `object-position`, so cropping a photo from "the reading
 * start" needs a physical value plus a direction variant. `scripts/
 * check-logical-props.mjs` does NOT flag `object-left` / `object-right` - its
 * inset rule requires a trailing `-`, and its longhand rule allowlists only
 * padding/margin/border/inset. So a photo cropped from the wrong edge in Arabic
 * passes every gate in this project and reaches the client.
 *
 * Confining the physical classes to this one table, keyed by a logical union,
 * is what stops that. Do not write `object-left` at a call site.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Next 16 notes: `priority` is deprecated, so above-the-fold images take
 * `eager` instead; and `quality` is clamped to the `images.qualities` array in
 * next.config.ts - a value outside it is coerced with no warning.
 */

import Image from 'next/image';

import { photoExists } from '@/lib/photo';
import { cn } from '@/lib/cn';
import type { ImageFocal } from '@/types/content';

/** rtl-ok: physical values are deliberate here and paired with a direction
 *  variant. This table is the only place in the codebase allowed to name them. */
const FOCAL_CLASS: Readonly<Record<ImageFocal, string>> = {
  center: 'object-center',
  top: 'object-top',
  start: 'object-left rtl:object-right',
  end: 'object-right rtl:object-left',
};

export interface PhotoProps {
  /** Public-relative path, from `content/shared/photos.ts`. */
  src: string;
  /** Per-locale prose from the content's `imageAlt`. Empty only if decorative. */
  alt: string;
  /** Frame styling: aspect ratio, radius, anything else. */
  className?: string;
  /** Rendered width at each breakpoint. Without it the browser fetches a
   *  full-viewport asset for a 250px card. */
  sizes: string;
  focal?: ImageFocal;
  /** Above the fold. Replaces the deprecated `priority` prop. */
  eager?: boolean;
}

export function Photo({ src, alt, className, sizes, focal = 'center', eager }: PhotoProps) {
  const frame = cn('relative overflow-hidden bg-brand-green-50', className);

  if (!photoExists(src)) {
    // Reserved space, not a failure. Hidden from assistive tech: there is no
    // image, so announcing its alt text would describe something absent.
    return <div aria-hidden="true" className={frame} />;
  }

  return (
    <div className={frame}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={80}
        className={cn('object-cover', FOCAL_CLASS[focal])}
        {...(eager === true
          ? { loading: 'eager' as const, fetchPriority: 'high' as const }
          : {})}
      />
    </div>
  );
}
