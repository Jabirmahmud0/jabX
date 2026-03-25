'use client';

import { useEffect, useRef, useState } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';

export default function GoogleAnalytics() {
  const { trackEvent } = useAnalytics();
  const trackedDepths = useRef(new Set());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Inject GA4 Script — async deferred for LCP safety
  useEffect(() => {
    const gaId = process.env.NEXT_PUBLIC_GA_ID;
    if (!gaId) return;

    const script1 = document.createElement('script');
    script1.async = true;
    script1.defer = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}', { send_page_view: true });
    `;
    document.head.appendChild(script2);

    return () => {
      if (document.head.contains(script1)) document.head.removeChild(script1);
      if (document.head.contains(script2)) document.head.removeChild(script2);
    };
  }, []);

  // Scroll Depth Tracking — correct formula per prompt spec
  useEffect(() => {
    const milestones = [25, 50, 75, 100];

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const pct = Math.round((scrolled / total) * 100);

      milestones.forEach((m) => {
        if (pct >= m && !trackedDepths.current.has(m)) {
          trackedDepths.current.add(m);
          trackEvent('scroll_depth', { depth: m });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [trackEvent]);

  if (!isMounted) return null;

  return null;
}
