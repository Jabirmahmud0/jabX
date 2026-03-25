'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function WaveLines({ lineCount = 12 }) {
  const linesRef = useRef([]);
  const pointsPerLine = 120;

  const linesData = useMemo(() => {
    const lines = [];
    for (let i = 0; i < lineCount; i++) {
      const points = [];
      const z = (i / lineCount - 0.5) * 8; // Spread across Z
      const yBase = (i / lineCount - 0.5) * 2; // Slight vertical spread
      
      for (let j = 0; j < pointsPerLine; j++) {
        const x = (j / pointsPerLine - 0.5) * 35; // Wider horizontal spread
        points.push(new THREE.Vector3(x, yBase, z));
      }
      lines.push({ points, z, yBase });
    }
    return lines;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    linesRef.current.forEach((line, i) => {
      if (!line) return;
      const positions = line.geometry.attributes.position.array;
      const { yBase, z } = linesData[i];

      for (let j = 0; j < pointsPerLine; j++) {
        const x = (j / pointsPerLine - 0.5) * 35;
        
        // Horizontal waving motion
        // We use sine waves that combine X and Z with Time
        const wave1 = Math.sin(x * 0.2 + time * 0.5 + i * 0.2) * 1.5;
        const wave2 = Math.cos(z * 0.5 + time * 0.3) * 0.8;
        
        positions[j * 3 + 1] = yBase + wave1 + wave2; // Update Y
      }
      line.geometry.attributes.position.needsUpdate = true;
    });
  });

  return (
    <>
      {linesData.map((data, i) => (
        <line key={i} ref={(el) => (linesRef.current[i] = el)}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={data.points.length}
              array={new Float32Array(data.points.flatMap(p => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#00F5D4"
            transparent
            opacity={0.25 + (1 - i / lineCount) * 0.5}
            linewidth={2}
            blending={THREE.AdditiveBlending}
          />
        </line>
      ))}
    </>
  );
}
