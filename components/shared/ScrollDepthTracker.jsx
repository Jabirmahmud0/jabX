'use client';
import { useScrollDepth } from '@/hooks/useScrollDepth';

/**
 * Client component that mounts the scroll depth tracker.
 * Placed in layout.jsx (Server Component) as a client island.
 */
export default function ScrollDepthTracker() {
  useScrollDepth();
  return null;
}
