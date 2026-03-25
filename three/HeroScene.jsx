'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import WaveLines from './WaveLines';
import { useDeviceCapability } from '../hooks/useDeviceCapability';

export default function HeroScene() {
  const capability = useDeviceCapability();

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 2]}>
        <WaveLines lineCount={capability === 'low' ? 10 : (capability === 'high' ? 40 : 20)} />
        <Suspense fallback={null}>
          <EffectComposer disableNormalPass>
            <Bloom 
              luminanceThreshold={0.05} 
              luminanceSmoothing={0.9} 
              height={300} 
              intensity={0.8} 
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
