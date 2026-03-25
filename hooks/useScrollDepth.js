'use client';
import { useEffect, useRef } from 'react';
import { useAnalytics } from './useAnalytics';

/**
 * Tracks scroll depth milestones (25%, 50%, 75%, 100%) and fires GA4 events.
 * Call this once in the root layout or a global client component.
 */
export function useScrollDepth() {
  const { trackEvent } = useAnalytics();
  const tracked = useRef(new Set());

  useEffect(() => {
    const milestones = [25, 50, 75, 100];

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const pct = Math.round((scrolled / total) * 100);

      milestones.forEach((m) => {
        if (pct >= m && !tracked.current.has(m)) {
          tracked.current.add(m);
          trackEvent('scroll_depth', { depth: m });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [trackEvent]);
}
