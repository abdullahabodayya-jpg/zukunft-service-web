/**
 * Icon registry.
 *
 * The map is typed `Record<IconName, LucideIcon>`, so a typo or an upstream
 * rename in lucide-react fails the build instead of rendering an empty box.
 *
 * Icons here are always decorative: they sit next to a real text label, so they
 * are `aria-hidden` and contribute nothing to the accessibility tree.
 */

import {
  Building2,
  Check,
  Clock,
  FileText,
  GraduationCap,
  HandHeart,
  Info,
  Landmark,
  Languages,
  Layers,
  Mail,
  MapPin,
  MessagesSquare,
  Network,
  Phone,
  Route,
  ShieldCheck,
  Sparkles,
  Stamp,
  type LucideIcon,
} from 'lucide-react';

import type { IconName } from '@/types/content';
import { cn } from '@/lib/cn';

/** CleaningCart is drawn below, not sourced from lucide. */
const ICONS: Record<Exclude<IconName, 'CleaningCart'>, LucideIcon> = {
  Stamp,
  Languages,
  GraduationCap,
  Landmark,
  Building2,
  HandHeart,
  Layers,
  MessagesSquare,
  Network,
  Route,
  Check,
  Phone,
  Mail,
  Clock,
  MapPin,
  Sparkles,
  FileText,
  ShieldCheck,
  Info,
};

export interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
}

/**
 * SC12 asks for a line-art cleaning trolley instead of a spray can. lucide has
 * no such glyph, so it is drawn here to the same 24px grid and 1.75 stroke as
 * every lucide icon on the site - a bucket and mop on a wheeled frame.
 */
function CleaningCart({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M4 4v13a2 2 0 0 0 2 2h9" />
      <path d="M8 19a1.6 1.6 0 1 0 0 3 1.6 1.6 0 0 0 0-3" />
      <path d="M14 19a1.6 1.6 0 1 0 0 3 1.6 1.6 0 0 0 0-3" />
      <path d="M7 9h8l-1 6H8z" />
      <path d="M17 3v9" />
      <path d="M15 12h4l-1 4h-2z" />
    </svg>
  );
}

export function Icon({ name, className, size = 24 }: IconProps) {
  if (name === 'CleaningCart') {
    return <CleaningCart size={size} className={cn('shrink-0', className)} />;
  }

  const Glyph = ICONS[name];
  return (
    <Glyph
      size={size}
      strokeWidth={1.75}
      aria-hidden="true"
      focusable="false"
      className={cn('shrink-0', className)}
    />
  );
}
