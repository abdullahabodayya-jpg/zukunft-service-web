/**
 * Does this photo actually exist in `public/` yet?
 *
 * The client supplies the photography in batches. Wiring a `src` for a file
 * that has not landed yet would render a browser's broken-image icon, which
 * looks like a bug to a visitor rather than like a gap.
 *
 * So every photo slot is declared up front in `content/shared/photos.ts` and
 * resolved here against the filesystem. A missing file degrades to a quiet
 * tinted plate; dropping the file into `public/` and rebuilding is the whole
 * activation step, with no content or component edit.
 *
 * SERVER ONLY, and that is safe: every page in this project is prerendered, so
 * this runs during `next build` in Node, never in a browser. Importing it from
 * a `'use client'` component would fail the build - which is the correct
 * outcome, not a limitation to work around.
 *
 * The Map memoises per build. Fifteen slots across twenty-seven prerendered
 * pages would otherwise be a few hundred redundant stat calls.
 */

import { existsSync } from 'node:fs';
import path from 'node:path';

const cache = new Map<string, boolean>();

/** `src` is a public-relative URL path, e.g. `/images/services/finance.jpg`. */
export function photoExists(src: string): boolean {
  const cached = cache.get(src);
  if (cached !== undefined) return cached;

  // Strip the leading slash: `public/` is the URL root, not a path segment.
  const absolute = path.join(process.cwd(), 'public', src.replace(/^\/+/, ''));
  const found = existsSync(absolute);

  cache.set(src, found);
  return found;
}
