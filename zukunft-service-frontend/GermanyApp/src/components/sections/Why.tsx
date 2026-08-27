/**
 * "Warum Zukunft Service?"
 *
 * SC14 fixes the arrangement: the first point carries the headline promise and
 * runs full width, the remaining four sit in a 2x2 grid. That is a content
 * decision, not decoration - "Persönliche Betreuung und klare Kommunikation" is
 * the claim the rest of the section supports, so it should not compete with the
 * others for attention in an even grid.
 *
 * The Arabic bodies run roughly twice the German length, so nothing here fixes
 * a card height; `items-start` lets each cell size to its own copy.
 */

import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/cn';
import type { SiteContent, WhyPoint } from '@/types/content';

function Point({ point, wide }: { point: WhyPoint; wide?: boolean }) {
  return (
    <div className={cn('flex flex-col gap-3', wide && 'sm:flex-row sm:items-start sm:gap-6')}>
      <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-brand-green-50">
        <Icon name={point.icon} size={20} className="text-brand" />
      </span>
      <div className="flex flex-col gap-2">
        <h3 className={cn('text-text-heading', wide ? 'text-display-sm' : 'text-title')}>
          {point.title}
        </h3>
        <p className={cn('max-w-prose text-text-secondary', wide ? 'text-body' : 'text-body-sm')}>
          {point.body}
        </p>
      </div>
    </div>
  );
}

export function Why({ content }: { content: SiteContent }) {
  const { why } = content;
  const [headline, ...rest] = why.points;

  return (
    <section className="bg-surface section">
      <div className="mx-auto max-w-content">
        <SectionHeading heading={why.heading} id="warum-wir" />

        {headline === undefined ? null : (
          <Reveal className="mt-12 rounded-xl border border-border-subtle bg-surface-raised p-7">
            <Point point={headline} wide />
          </Reveal>
        )}

        <ul className="mt-6 grid items-start gap-6 sm:grid-cols-2">
          {rest.map((point, index) => (
            <li key={point.id}>
              <Reveal delayMs={index * 70}>
                <Point point={point} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
