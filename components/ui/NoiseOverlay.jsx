'use client';

import { useEffect, useState } from 'react';
import { useDeviceCapability } from '../../hooks/useDeviceCapability';

export default function NoiseOverlay() {
  const capability = useDeviceCapability();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (capability === 'low' || !isMounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-40 h-full w-full opacity-[var(--noise-opacity)] mix-blend-overlay">
      <svg className="absolute inset-0 h-full w-full">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}
