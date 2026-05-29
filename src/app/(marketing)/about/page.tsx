/**
 * ROUTE: /about
 * ACCESS: public
 * PURPOSE: The Sync brand essay - who built it, why, and the verified-vendor
 *          moat. Reads like a magazine spread, not a SaaS landing page.
 * BUILT HERE: 9 stacked sections, composed from `components/about/`:
 *   1. AboutHero        - "Stop walking. Start Syncing." opener
 *   2. OriginStory      - 01 the week-of-walking problem
 *   3. WhatWeBuilt      - 02 one platform, 7 module chips
 *   4. NumbersStrip     - the 4 headline stats
 *   5. Mission          - 03 three "by the time you..." stanzas
 *   6. SoftLifeCallout  - the single dark-inverted contrast moment
 *   7. Promise          - 04 the three non-negotiables (cards)
 *   8. Roadmap          - 05 campus expansion stepper
 *   9. AboutCta         - closing echo of the hero + CTAs
 *
 * All sections are Server Components; only the framer-motion <Reveal> wrappers
 * are client islands. Cream surface throughout, save the inverted soft-life band.
 */
import type { Metadata } from 'next';
import { AboutHero } from '@/components/about/about-hero';
import { OriginStory } from '@/components/about/origin-story';
import { WhatWeBuilt } from '@/components/about/what-we-built';
import { NumbersStrip } from '@/components/about/numbers-strip';
import { Mission } from '@/components/about/mission';
import { SoftLifeCallout } from '@/components/about/soft-life-callout';
import { Promise as PromiseSection } from '@/components/about/promise';
import { Roadmap } from '@/components/about/roadmap';
import { AboutCta } from '@/components/about/about-cta';
import { SITE } from '@/config/site';

export const metadata: Metadata = {
  title: 'About Sync — Stop walking. Start Syncing.',
  // Brand summary / tagline doubles as the meta + OG description.
  description: SITE.summary,
  openGraph: {
    title: 'About Sync — Stop walking. Start Syncing.',
    description: SITE.summary,
    // TODO: add the OG asset at /public/og/about.png (does not exist yet).
    images: ['/og/about.png'],
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <OriginStory />
      <WhatWeBuilt />
      <NumbersStrip />
      <Mission />
      <SoftLifeCallout />
      <PromiseSection />
      <Roadmap />
      <AboutCta />
    </>
  );
}
