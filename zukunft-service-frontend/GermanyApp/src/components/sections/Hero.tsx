/**
 * Hero - the split composition the brief asked for: copy on one side, a warm
 * panel on the other, meeting at the page's optical centre.
 *
 * The split is built with grid fractions rather than absolute positioning, so
 * it collapses to a single column on small screens and mirrors under `dir=rtl`
 * without a single directional override.
 */

import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Photo } from '@/components/ui/Photo';
import { HERO_PHOTO } from '@/content/shared/photos';
import { photoExists } from '@/lib/photo';
import { Logo } from '@/components/ui/Logo';
import { routePath } from '@/lib/routes';
import type { Locale, SiteContent } from '@/types/content';

export interface HeroProps {
  locale: Locale;
  content: SiteContent;
}

export function Hero({ locale, content }: HeroProps) {
  const { hero } = content;

  return (
    <section className="border-b border-border-subtle bg-surface">
      <div className="mx-auto grid max-w-page gap-12 px-gutter py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
        <div className="flex flex-col items-start gap-6">
          <p className="text-eyebrow text-accent-text">{hero.eyebrow}</p>

          <h1 className="text-display-xl text-balance text-text-heading">{hero.headline}</h1>

          <p className="max-w-prose text-lead text-text-secondary">{hero.lead}</p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={routePath(locale, 'contact')} variant="primary" size="lg">
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={routePath(locale, 'services')} variant="outline" size="lg">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>

          {hero.primaryCta.hint === undefined ? null : (
            <p className="text-body-sm text-text-muted">{hero.primaryCta.hint}</p>
          )}

          <ul className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-3">
            {hero.trust.map((item) => (
              <li key={item.id} className="flex items-center gap-2">
                <Icon name={item.icon} size={18} className="text-accent-text" />
                <span className="text-body-sm font-semibold text-text-secondary">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right panel. The photograph bleeds to the panel's top edge and the
            brand block sits beneath it.

            UNLIKE the cleaning grid, a missing file here renders NOTHING rather
            than a tinted plate: the plate is a light fixed-palette colour and
            this panel is dark, so an unresolved hero would read as a broken
            asset in the most prominent position on the site. Without the file
            the panel is exactly what it was before - a finished typographic
            panel, not a gap. */}
        {/* data-surface="dark" flips the whole token set for this subtree, so the
            SAME semantic classes used everywhere else resolve to their dark
            values here. Do not reach for bg-surface-inverse on this element:
            the attribute matches the element itself, so "inverse" inverts back
            to near-white and the panel turns white with white text on it. */}
        <div
          data-surface="dark"
          className="relative overflow-hidden rounded-2xl bg-surface shadow-lg"
        >
          {photoExists(HERO_PHOTO) ? (
            <Photo
              src={HERO_PHOTO}
              alt={hero.imageAlt}
              className="aspect-[16/10]"
              sizes="(min-width: 1024px) 45vw, 100vw"
              eager
            />
          ) : null}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 -end-16 size-56 rounded-full bg-accent/15"
          />
          <div className="relative flex flex-col gap-6 p-8 sm:p-10">
            {/* data-surface="dark" on the panel flips the tokens, so the mark
                and the gold pick up their dark-scope values automatically. */}
            <Logo variant="full" markSize={40} />
            <p className="text-lead text-text-secondary">{content.meta.slogan}</p>
            <ul className="flex flex-col gap-3 border-t border-border-subtle pt-6">
              {content.pillars.map((pillar) => (
                <li key={pillar.id} className="flex items-start gap-3">
                  <Icon name={pillar.icon} size={20} className="mt-0.5 text-accent-text" />
                  <span className="text-body font-semibold text-text-heading">
                    {pillar.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
