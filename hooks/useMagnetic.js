import { useEffect, useRef } from 'react';
import { useDeviceCapability } from './useDeviceCapability';

export function useMagnetic(options = { radius: 80, displacement: 20 }) {
  const ref = useRef(null);
  const capability = useDeviceCapability();

  useEffect(() => {
    if (capability === 'low') return;
    
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = element.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < options.radius) {
        const x = (distanceX / options.radius) * options.displacement;
        const y = (distanceY / options.radius) * options.displacement;
        element.style.transform = `translate(${x}px, ${y}px)`;
      } else {
        element.style.transform = 'translate(0px, 0px)';
      }
    };

    const handleMouseLeave = () => {
      element.style.transform = 'translate(0px, 0px)';
    };

    window.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [options.radius, options.displacement, capability]);

  return ref;
}
