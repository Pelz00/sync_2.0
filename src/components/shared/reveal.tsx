/**
 * Reveal - scroll-triggered fade-up wrapper (framer-motion `whileInView`).
 * A small client island so the surrounding page can stay a Server Component.
 * Honours prefers-reduced-motion (renders a plain div, no animation).
 *
 * Shared version used by the About page and landing teaser.
 */
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

interface RevealProps {
  children: ReactNode;
  /** Stagger helper - delay in seconds before this block animates. */
  delay?: number;
  className?: string;
  /** Render as a different element (e.g. 'li', 'section'). Defaults to div. */
  as?: 'div' | 'section' | 'li';
}

export function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}
