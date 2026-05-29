/**
 * HeroHeadline - the landing headline with a single restrained flourish:
 * the whole block fades up on load, then a lime marker stroke wipes across
 * "Start syncing." left-to-right. Minimalist - one motion, slow and clean.
 * Honours prefers-reduced-motion (renders static, stroke already drawn).
 */
'use client';

import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

export function HeroHeadline() {
  const reduce = useReducedMotion();

  return (
    <motion.h1
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="font-display text-foreground mt-4 text-[44px] font-bold leading-[0.98] tracking-[-0.035em] md:text-[60px] md:leading-[0.96] md:tracking-[-0.04em] lg:text-[68px]"
    >
      Stop walking.
      <br />
      {/* Full lime highlight with ink text - constant in light & dark (no
          clash), matching the /around "your radius" treatment. */}
      <span className="text-ink relative isolate inline-block px-1.5">
        <motion.span
          aria-hidden="true"
          initial={reduce ? false : { scaleX: 0 }}
          animate={reduce ? undefined : { scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.65, ease: EASE }}
          style={{ originX: 0 }}
          className="bg-lime absolute inset-0 -z-10 rounded-[3px]"
        />
        Start syncing.
      </span>
    </motion.h1>
  );
}
