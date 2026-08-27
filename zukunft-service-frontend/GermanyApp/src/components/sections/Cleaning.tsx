/**
 * SC5: the cleaning arm on the home page.
 *
 * Renders the same eight types as the cleaning service page, from the same
 * array (`content.cleaning.types`). Before that array existed the two lists had
 * already drifted apart in both languages.
 *
 * SC13: every card carries its photo. Paths come from the locale-invariant
 * `CLEANING_PHOTOS` map, alt text from the per-locale content, so the two
 * languages cannot end up showing different pictures for the same type.
 *
 * The lucide icon that used to head each card is gone: with a photograph above
 * the title it was a second, weaker picture of the same idea. SC13 specifies
 * image, title, one line - and that is now literally the card.
 *
 * A type whose file has not landed shows a tinted plate of the same size, so
 * the grid keeps its rhythm instead of reflowing when the last photos arrive.
 */

import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Photo } from '@/components/ui/Photo';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SERVICE_PHOTOS, cleaningPhoto } from '@/content/shared/photos';
import { cn } from '@/lib/cn';
import { photoExists } from '@/lib/photo';
import { routePath } from '@/lib/routes';
import type { Locale, SiteContent } from '@/types/content';

export function Cleaning({ locale, content }: { locale: Locale; content: SiteContent }) {
  const { cleaning } = content;

  // SC5 asks for a photograph beside the intro. It only earns the space if it
  // exists: without the file the heading and trust bar run full width, which is
  // a finished layout in its own right rather than a column with a hole in it.
  const introPhoto = photoExists(SERVICE_PHOTOS.cleaning) ? SERVICE_PHOTOS.cleaning : undefined;

  return (
    <section id="reinigungsservice" className="bg-brand-mint-100 section">
      <div className="mx-auto max-w-content">
        <div
          className={cn(
            introPhoto !== undefined && 'grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center',
          )}
        >
          <div>
            <SectionHeading heading={cleaning.heading} />

            <ul className="mt-8 flex flex-wrap gap-x-3 gap-y-2">
              {cleaning.trustBar.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-2 rounded-pill border border-border-default bg-surface-raised px-4 py-1.5 text-body-sm text-text-secondary"
                >
                  <Icon name="Check" size={15} className="text-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {introPhoto === undefined ? null : (
            <Photo
              src={introPhoto}
              alt={cleaning.imageAlt}
              className="aspect-[4/3] rounded-xl shadow-md"
              sizes="(min-width: 1024px) 500px, 100vw"
            />
          )}
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cleaning.types.map((type) => {
            const photo = cleaningPhoto(type.id);
            return (
              <li
                key={type.id}
                className="flex flex-col overflow-hidden rounded-lg border border-border-subtle bg-surface-raised"
              >
                {photo === undefined ? null : (
                  <Photo
                    src={photo}
                    alt={type.imageAlt}
                    className="aspect-video"
                    // Four across at lg inside the 1088px column, two at sm.
                    // Without this the browser fetches a full-viewport asset
                    // for a card barely 257px wide.
                    sizes="(min-width: 1024px) 257px, (min-width: 640px) 50vw, 100vw"
                  />
                )}
                <div className="flex flex-col gap-2 p-6">
                  <h3 className="text-title text-text-heading">{type.title}</h3>
                  <p className="text-body-sm text-text-secondary">{type.description}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-8 max-w-prose text-body text-text-secondary">{cleaning.closing}</p>

        <div className="mt-10 flex flex-col gap-4 rounded-xl border border-border-accent bg-surface-raised p-7">
          <h3 className="text-display-sm text-balance text-text-heading">{cleaning.ctaTitle}</h3>
          <p className="max-w-prose text-body text-text-secondary">{cleaning.ctaBody}</p>
          <ButtonLink
            href={routePath(locale, 'contact')}
            variant="primary"
            size="lg"
            className="w-fit"
          >
            {cleaning.cta.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
