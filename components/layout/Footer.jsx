import { SEO } from '../../constants/seo';
import { NAV_LINKS } from '../../constants/nav';
import { RiGithubLine, RiLinkedinLine, RiTwitterXLine } from 'react-icons/ri';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="border-t border-border-subtle bg-bg-secondary py-12 mt-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-2xl font-display font-bold text-accent-cyan tracking-tighter mb-2">
              jabx_fx
            </span>
            <p className="text-text-secondary text-sm">
              Build interfaces people don't skip.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6" aria-label="Footer navigation">
            {NAV_LINKS.map((link) => (
              <a key={link.name} href={link.href} className="text-text-secondary hover:text-accent-cyan transition-colors text-sm font-medium">
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex gap-6">
            <a href={SEO.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-text-secondary hover:text-accent-cyan transition-colors">
              <RiGithubLine className="w-6 h-6" />
            </a>
            <a href={SEO.linkedIn} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-text-secondary hover:text-accent-cyan transition-colors">
              <RiLinkedinLine className="w-6 h-6" />
            </a>
            <a href={`https://twitter.com/${SEO.twitterHandle.replace('@', '')}`} target="_blank" rel="noreferrer" aria-label="Twitter" className="text-text-secondary hover:text-accent-cyan transition-colors">
              <RiTwitterXLine className="w-6 h-6" />
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted">
          <p>&copy; {currentYear} {SEO.author}. All rights reserved.</p>
          <div className="flex gap-4">
            <span>Bangladesh &mdash; Available Globally</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
