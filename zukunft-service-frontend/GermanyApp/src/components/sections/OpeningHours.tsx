'use client';

/**
 * The opening-hours table, with today highlighted (SC8).
 *
 * WHY THIS IS A CLIENT COMPONENT: every page here is prerendered at build time.
 * Computing "today" on the server would freeze whichever day the build ran on
 * and be wrong for the next six days - a bug that looks fine in review and rots
 * silently in production.
 *
 * WHY Europe/Berlin: the hours describe when the Dortmund office is open, so
 * the day that matters is the day it currently is THERE. A visitor in Sydney
 * asking on their Saturday morning is asking about Berlin's Friday evening.
 *
 * Until the effect runs, no row is marked. That is deliberate: highlighting the
 * wrong day for a frame is worse than highlighting none.
 */

import { useEffect, useState } from 'react';

import { cn } from '@/lib/cn';
import type { FormattedOpeningHour } from '@/lib/format';

/** Intl weekday short names, in our DAY_KEYS order (0 = Monday). */
const ORDER = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function berlinDayIndex(): number | null {
  try {
    const label = new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      timeZone: 'Europe/Berlin',
    }).format(new Date());
    const index = ORDER.indexOf(label);
    return index === -1 ? null : index;
  } catch {
    // A runtime without full ICU data must not take the section down.
    return null;
  }
}

export interface OpeningHoursProps {
  hours: readonly FormattedOpeningHour[];
  closedLabel: string;
}

export function OpeningHours({ hours, closedLabel }: OpeningHoursProps) {
  const [today, setToday] = useState<number | null>(null);

  useEffect(() => {
    setToday(berlinDayIndex());
  }, []);

  return (
    <dl className="mt-3 flex flex-col gap-1.5">
      {hours.map((row) => {
        const isToday = today === row.dayIndex;
        return (
          <div
            key={row.day}
            {...(isToday ? { 'aria-current': 'date' as const } : {})}
            className={cn(
              'flex items-baseline justify-between gap-3 rounded-xs',
              isToday && 'bg-brand-green-50 px-2 py-0.5 font-semibold',
            )}
          >
            <dt className={cn('text-body-sm', isToday ? 'text-text-heading' : 'text-text-secondary')}>
              {row.dayLabel}
            </dt>
            <dd className="text-body-sm text-text-body tabular-nums">
              {row.isClosed ? closedLabel : <bdi dir="ltr">{row.range}</bdi>}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
