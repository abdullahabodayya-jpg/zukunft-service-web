/**
 * Transparency: what we provide (SC6) and who provides the rest (SC7).
 *
 * The referral list is phrased positively on purpose. The same five facts, as a
 * "we don't do this" list, read as a disclaimer; as "here is who may lawfully
 * do it", they read as competence and are more useful to someone who actually
 * needs a lawyer. The legal effect is identical.
 *
 * Every string comes from content, never hard-coded here, so the German and
 * Arabic disclaimers for regulated activity cannot drift apart.
 */

import { Icon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { SiteContent } from '@/types/content';

export function Scope({ content }: { content: SiteContent }) {
  const { scope } = content;

  return (
    <section className="bg-surface section">
      <div className="mx-auto max-w-content">
        <SectionHeading heading={scope.heading} id="leistungsumfang" />

        {/* What we actually do */}
        <div className="mt-12 flex flex-col gap-5 rounded-xl border border-border-subtle bg-surface-raised p-7">
          <h3 className="text-title text-text-heading">{scope.supportTitle}</h3>
          <ul className="flex flex-col gap-2.5">
            {scope.supportPoints.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <Icon name="Check" size={19} className="mt-0.5 text-brand" />
                <span className="text-body-sm text-text-body">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cleaning sits on its own strip, never inside the office list. */}
        <p className="mt-4 flex items-start gap-3 rounded-lg border border-border-subtle bg-brand-mint-100 p-5 text-body-sm text-text-body">
          <Icon name="CleaningCart" size={19} className="mt-0.5 text-brand" />
          <span>{scope.cleaningStrip}</span>
        </p>

        {/* Who does the rest */}
        <div className="mt-14 flex flex-col gap-3">
          <h3 className="text-display-sm text-text-heading">{scope.referralTitle}</h3>
          <p className="max-w-prose text-body text-text-secondary">{scope.referralIntro}</p>
        </div>

        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {scope.referralCategories.map((category) => (
            <li
              key={category}
              className="flex items-start gap-3 rounded-lg border border-border-subtle bg-surface-sunken p-5"
            >
              <Icon name="Info" size={19} className="mt-0.5 text-text-muted" />
              <span className="text-body-sm text-text-secondary">{category}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-start gap-3 rounded-lg border border-border-accent bg-brand-gold-50 p-5">
          <Icon name="ShieldCheck" size={20} className="mt-0.5 text-brand-gold-700" />
          <div className="flex flex-col gap-1">
            <p className="text-label text-text-heading">{scope.trustTitle}</p>
            <p className="text-body-sm text-text-body">{scope.trustBody}</p>
          </div>
        </div>

        <p className="mt-6 max-w-prose text-caption text-text-muted">{scope.notice}</p>
      </div>
    </section>
  );
}
