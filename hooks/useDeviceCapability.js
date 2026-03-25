'use client';

import { useState, useEffect } from 'react';

export function useDeviceCapability() {
  const [capability, setCapability] = useState('high');

  useEffect(() => {
    const isMobile       = window.innerWidth < 768;
    const isSlowCPU      = navigator.hardwareConcurrency <= 4;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasLowMemory   = navigator.deviceMemory && navigator.deviceMemory <= 4;

    if (prefersReduced || (isMobile && (isSlowCPU || hasLowMemory))) {
      setCapability('low');
    } else if (isMobile) {
      setCapability('medium');
    } else {
      setCapability('high');
    }
  }, []);

  return capability;
}
