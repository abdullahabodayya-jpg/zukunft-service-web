/**
 * The two arms of the business, stated plainly.
 *
 * The 01/02 numerals were removed in SC1 along with every other service number.
 * Do not reintroduce them: the icon and the title carry the distinction, and a
 * numeral here implies an ordering the two arms of the business do not have.
 */

import { Icon } from '@/components/ui/Icon';
import { routePath } from '@/lib/routes';
import type { Locale, SiteContent } from '@/types/content';
import Link from 'next/link';

export function Pillars({ locale, content }: { locale: Locale; content: SiteContent }) {
  return (
    <section className="bg-surface-alt section">
      <div className="mx-auto grid max-w-content gap-6 md:grid-cols-2">
        {content.pillars.map((pillar) => (
          <article
            key={pillar.id}
            className="flex flex-col gap-4 rounded-2xl border border-border-subtle bg-surface-raised p-8"
          >
            <Icon name={pillar.icon} className="text-brand" />
            <h2 className="text-display-sm text-text-heading">{pillar.title}</h2>
            <p className="text-body text-text-secondary">{pillar.body}</p>
            <Link
              href={
                pillar.id === 'cleaning'
                  ? `${routePath(locale, 'home')}#reinigungsservice`
                  : routePath(locale, 'services')
              }
              className="focus-ring mt-auto inline-flex w-fit rounded-xs text-body-sm font-semibold text-accent-text hover:text-accent-text-strong"
            >
              {pillar.linkLabel}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
