import { ThemeProvider } from './context/ThemeContext.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import PageLoader from './components/layout/PageLoader.jsx';
import LiquidCursor from './components/ui/LiquidCursor.jsx';
import NoiseOverlay from './components/ui/NoiseOverlay.jsx';
import Hero from './components/sections/Hero.jsx';
import About from './components/sections/About.jsx';
import Services from './components/sections/Services.jsx';
import Portfolio from './components/sections/Portfolio.jsx';
import Testimonials from './components/sections/Testimonials.jsx';
import Contact from './components/sections/Contact.jsx';
import StructuredData from './components/shared/StructuredData.jsx';
import GoogleAnalytics from './components/shared/GoogleAnalytics.jsx';
import SectionErrorBoundary from './components/shared/SectionErrorBoundary.jsx';
import { useEffect } from 'react';
import Lenis from 'lenis';

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <ThemeProvider>
      <GoogleAnalytics />
      <StructuredData />
      <PageLoader />
      <NoiseOverlay />
      <LiquidCursor />
      <Navbar />
      <main>
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
          <Testimonials />
        </SectionErrorBoundary>
        <SectionErrorBoundary>
          <Contact />
        </SectionErrorBoundary>
      </main>
      <Footer />
    </ThemeProvider>
  );
}
