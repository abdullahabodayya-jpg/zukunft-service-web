/**
 * Renders a service's body blocks.
 *
 * The switch is exhaustive with a `never` default: adding a block kind to
 * ServiceBlock without handling it here is a compile error, not a section that
 * silently fails to render.
 *
 * List layouts are content decisions, not styling whims. `checks` is for
 * "things we do for you" (each item earns a tick), `columns` is for short
 * enumerations like visa types or cleaning premises, and `plain` is the
 * fallback. `columns` goes 1 -> 2 -> 3 across breakpoints, per SC13.
 *
 * SC11 additionally asks the Einbuergerung page to set its three groups side by
 * side rather than down the page. That is opt-in per service (`blockLayout`),
 * never inferred from the block count: study-visa also has three blocks, but one
 * of them is a highlight that needs the full measure to stay readable.
 */

import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/cn';
import type { ServiceBlock } from '@/types/content';

function ListItems({
  items,
  layout,
}: {
  items: readonly string[];
  layout: 'checks' | 'columns' | 'plain';
}) {
  if (layout === 'checks') {
    return (
      <ul className="flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <Icon name="Check" size={19} className="mt-0.5 text-brand" />
            <span className="text-body text-text-body">{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul
      className={cn(
        'flex flex-col gap-2',
        // SC13: one column on mobile, two on tablet, three on desktop.
        layout === 'columns' && 'sm:grid sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3',
      )}
    >
      {items.map((item) => (
        <li
          key={item}
          className="border-b border-border-subtle py-2 text-body text-text-body last:border-b-0"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function Block({ block }: { block: ServiceBlock }) {
  switch (block.kind) {
    case 'list':
      return (
        <div className="flex flex-col gap-4">
          {block.title === undefined ? null : (
            <h2 className="text-display-sm text-text-heading">{block.title}</h2>
          )}
          {block.intro === undefined ? null : (
            <p className="max-w-prose text-body text-text-secondary">{block.intro}</p>
          )}
          <ListItems items={block.items} layout={block.layout ?? 'plain'} />
        </div>
      );

    case 'highlight':
      return (
        <div className="flex flex-col gap-4 rounded-xl border border-border-accent bg-brand-gold-50 p-7">
          <h2 className="text-display-sm text-text-heading">{block.title}</h2>
          <p className="max-w-prose text-body text-text-secondary">{block.intro}</p>
          <ListItems items={block.items} layout="checks" />
          {block.closing === undefined ? null : (
            <p className="text-body font-semibold text-text-heading">{block.closing}</p>
          )}
        </div>
      );

    case 'prose':
      return (
        <div className="flex flex-col gap-3">
          {block.title === undefined ? null : (
            <h2 className="text-display-sm text-text-heading">{block.title}</h2>
          )}
          <p className="max-w-prose text-body text-text-secondary">{block.body}</p>
        </div>
      );

    case 'notice':
      return (
        <p
          className={cn(
            'flex max-w-prose items-start gap-3 rounded-lg border p-5 text-body-sm',
            block.tone === 'legal'
              ? 'border-border-accent bg-brand-gold-50 text-text-body'
              : 'border-border-default bg-surface-sunken text-text-secondary',
          )}
        >
          <Icon
            name={block.tone === 'legal' ? 'ShieldCheck' : 'Info'}
            size={20}
            className="mt-0.5 text-brand-gold-700"
          />
          <span>
            {block.title === undefined ? null : <strong className="block">{block.title}</strong>}
            {block.body}
          </span>
        </p>
      );

    default: {
      const exhaustive: never = block;
      return exhaustive;
    }
  }
}

export function ServiceBlocks({
  blocks,
  layout = 'stack',
}: {
  blocks: readonly ServiceBlock[];
  layout?: 'stack' | 'grid';
}) {
  if (layout === 'stack') {
    return (
      <div className="flex flex-col gap-10">
        {blocks.map((block) => (
          <Block key={block.id} block={block} />
        ))}
      </div>
    );
  }

  // SC11: three columns on desktop, two on tablet with a full-width remainder
  // so the odd group never sits alone in a half-width column, stacked on
  // mobile. The span is computed from the count, so a fourth group added later
  // still falls into a tidy 2x2 on tablet without touching this file.
  const isOdd = blocks.length % 2 === 1;

  return (
    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
      {blocks.map((block, index) => (
        <div
          key={block.id}
          className={cn(
            isOdd && index === blocks.length - 1 && 'md:col-span-2 lg:col-span-1',
          )}
        >
          <Block block={block} />
        </div>
      ))}
    </div>
  );
}
