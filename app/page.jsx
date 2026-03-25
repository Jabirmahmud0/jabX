import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Portfolio from '@/components/sections/Portfolio';
import Contact from '@/components/sections/Contact';
import SectionErrorBoundary from '@/components/shared/SectionErrorBoundary';

export default function Home() {
  return (
    <>
      <SectionErrorBoundary>
        <Hero />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <About />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <Services />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <Portfolio />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <Contact />
      </SectionErrorBoundary>
    </>
  );
}
