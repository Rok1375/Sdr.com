'use client';

import { memo, useEffect, useState } from 'react';
import Script from 'next/script';
import { ArrowRight, ChevronDown } from 'lucide-react';

type HeroProps = {
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
};

const UNICORN_EMBED_SCRIPT = `!function(){var u=window.UnicornStudio;if(u&&u.init){if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",function(){u.init()})}else{u.init()}}else{window.UnicornStudio={isInitialized:!1};var i=document.createElement("script");i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.4/dist/unicornStudio.umd.js",i.onload=function(){if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",function(){UnicornStudio.init()})}else{UnicornStudio.init()}},(document.head||document.body).appendChild(i)}}();`;

function Hero({ onNavigate }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsVisible(true), 180);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[72vh] w-full items-center overflow-hidden bg-[#05070c] sm:min-h-[78vh] lg:min-h-screen"
      role="banner"
      aria-label="Hero introduction"
    >
      <Script id="unicorn-studio-hero" strategy="afterInteractive">
        {UNICORN_EMBED_SCRIPT}
      </Script>

      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div id="hero-portal" className="absolute inset-0">
          <div className="absolute inset-0 [&_[data-us-project]]:h-full [&_[data-us-project]]:w-full">
            <div style={{ width: '100%', height: '100%' }} data-us-project="Y5sRd6wCKFfubLmbMeXw"></div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.2),_transparent_32%),radial-gradient(circle_at_80%_20%,_rgba(168,85,247,0.18),_transparent_28%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(5,7,12,0.28)_0%,_rgba(5,7,12,0.72)_55%,_rgba(5,7,12,0.94)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,_rgba(5,7,12,0.9)_0%,_rgba(5,7,12,0.56)_38%,_rgba(5,7,12,0.4)_100%)]" />
      </div>

      <div
        className={`relative z-10 mx-auto flex w-full max-w-7xl flex-col px-6 py-24 transition-all duration-300 md:px-12 lg:px-16 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
        }`}
      >
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.32em] text-white/70 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.85)]" aria-hidden="true" />
            Premium digital experiences
          </div>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-white sm:text-6xl md:text-7xl lg:text-[5.75rem] lg:leading-[0.95]">
            Cinematic product storytelling for brands that want to feel inevitable.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/68 sm:text-lg md:text-xl">
            Soren Studio blends strategy, design, and motion to build launch-ready websites that look premium,
            move fluidly, and convert with confidence.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href="#exploded-assembly"
            onClick={(event) => onNavigate(event, '#exploded-assembly')}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-transform duration-200 hover:-translate-y-0.5 hover:bg-cyan-200"
          >
            View projects
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#contact"
            onClick={(event) => onNavigate(event, '#contact')}
            className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/6 px-6 py-3 text-sm font-medium text-white/88 backdrop-blur-xl transition-colors duration-200 hover:bg-white/12"
          >
            Book a discovery call
          </a>
        </div>

        <div className="mt-14 grid max-w-3xl grid-cols-1 gap-4 text-sm text-white/62 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-4 backdrop-blur-md">
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">Positioning</p>
            <p className="mt-2 text-base text-white/86">Clear product narratives with premium visual systems.</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-4 backdrop-blur-md">
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">Execution</p>
            <p className="mt-2 text-base text-white/86">Motion-forward UI crafted for speed, clarity, and polish.</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-4 backdrop-blur-md">
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">Delivery</p>
            <p className="mt-2 text-base text-white/86">Launch support that keeps the experience sharp in production.</p>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/42"
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-[0.35em]">Scroll</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </div>
    </section>
  );
}

export default memo(Hero);
