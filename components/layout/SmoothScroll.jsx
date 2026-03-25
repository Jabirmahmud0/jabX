'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { useAnalytics } from '../../hooks/useAnalytics';

export default function SmoothScroll() {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    const milestones = [25, 50, 75, 100];
    const tracked = new Set();

    lenis.on('scroll', (e) => {
      if (e.limit > 0) {
        const pct = Math.round((e.scroll / e.limit) * 100);
        milestones.forEach((m) => {
          if (pct >= m && !tracked.has(m)) {
            tracked.add(m);
            trackEvent('scroll_depth', { depth: m });
          }
        });
      }
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [trackEvent]);

  return null;
}
