'use client';

import { useRef } from 'react';
import Script from 'next/script';
import { HeroSection } from './components/sections/HeroSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { ContactSection } from './components/sections/ContactSection';
import { SiteFooter } from './components/sections/SiteFooter';
import { scrollToSection, usePortfolioAnimations } from './hooks/usePortfolioAnimations';

export default function Portfolio() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  usePortfolioAnimations(cursorRef, portalRef);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    scrollToSection(targetId);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <a
        href="#exploded-assembly"
        id="skip-nav-link"
        onClick={(e) => handleScroll(e, '#exploded-assembly')}
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:bg-cyan-500 focus:text-black focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>

      <header className="fixed top-0 left-0 w-full z-[100] px-6 py-6 md:px-16 md:py-8 flex justify-between items-center mix-blend-difference pointer-events-none">
        <div className="text-lg md:text-xl font-serif tracking-widest uppercase pointer-events-auto">Soren</div>
        <nav className="flex gap-4 md:gap-8 pointer-events-auto">
          <a href="#hero" onClick={(e) => handleScroll(e, '#hero')} className="text-[10px] md:text-xs tracking-[0.2em] uppercase hover:text-white/60 transition-colors">Home</a>
          <a href="#exploded-assembly" onClick={(e) => handleScroll(e, '#exploded-assembly')} className="text-[10px] md:text-xs tracking-[0.2em] uppercase hover:text-white/60 transition-colors">Projects</a>
          <a href="#testimonials" onClick={(e) => handleScroll(e, '#testimonials')} className="text-[10px] md:text-xs tracking-[0.2em] uppercase hover:text-white/60 transition-colors">About</a>
          <a href="#contact" onClick={(e) => handleScroll(e, '#contact')} className="text-[10px] md:text-xs tracking-[0.2em] uppercase hover:text-white/60 transition-colors">Contact</a>
        </nav>
      </header>

      <div className="noise-overlay" aria-hidden="true"></div>
      <div id="cursor" ref={cursorRef} className="custom-cursor" aria-hidden="true"></div>

      <div className="fixed w-full h-full left-0 top-0 -z-10" data-us-project="aH0ZsntZ1TcKHIyweEA8"></div>
      <Script
        id="unicorn-studio"
        src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.1/dist/unicornStudio.umd.js"
        strategy="lazyOnload"
        integrity="sha384-OLBgp1GsljhM2TJ+sbHjaiH9txEUvgdDTAzHv2P24donTt6/529l+9Ua0vFImLlb"
        crossOrigin="anonymous"
        onReady={() => {
          window.UnicornStudio?.init();
        }}
      />

      <HeroSection portalRef={portalRef} />
      <ServicesSection />
      <TestimonialsSection />
      <ContactSection />
      <SiteFooter />
    </div>
  );
}
