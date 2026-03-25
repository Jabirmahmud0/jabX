export const metadata = {
  title: '404 — Page Not Found | jabx_fx',
  description: 'The page you are looking for does not exist. Return to Jabir Mahmud\'s creative developer portfolio.',
  robots: {
    index: false,
    follow: false,
  },
};

import MagneticButton from '@/components/ui/MagneticButton';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center text-center p-6 bg-bg-primary relative z-10">
      <h1 className="text-accent-cyan text-9xl font-display font-black mb-4 tracking-tighter">404</h1>
      <h2 className="text-text-h2 font-display font-bold text-text-primary mb-6">Lost in the void.</h2>
      <Link href="/">
        <MagneticButton variant="primary" as="div">
          Go home &rarr;
        </MagneticButton>
      </Link>
    </div>
  );
}
