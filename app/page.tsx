'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import {
  Instagram,
  Twitter,
  Linkedin,
  ChevronDown,
  LayoutTemplate,
  Fingerprint,
  Film,
  Code2,
  Smartphone,
  Compass,
  Cuboid,
  Lightbulb,
  Sparkles,
  PenTool,
  Quote,
  Mail,
  Phone,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Spline from '@splinetool/react-spline';
import { ShinyText } from './components/ShinyText';
import { PressureText } from './components/PressureText';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Portfolio() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: targetId, offsetY: 0 },
      ease: 'power3.inOut',
    });
  };

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canUseHoverCursor = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (reduceMotion) {
      document.documentElement.style.scrollBehavior = 'auto';
    }

    // Custom Cursor
    let rafId: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(() => {
        const { clientX: x, clientY: y } = e;
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate(${x - 10}px,${y - 10}px)`;
        }
        if (portalRef.current) {
          const rect = portalRef.current.getBoundingClientRect();
          portalRef.current.style.setProperty('--x', `${x - rect.left}px`);
          portalRef.current.style.setProperty('--y', `${y - rect.top}px`);
        }
      });
    };

    if (canUseHoverCursor) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    // Exploded View Assembly (Services)
    const expCards = gsap.utils.toArray('.explode-card') as HTMLElement[];
    if (expCards.length) {
      ScrollTrigger.create({
        trigger: '#exploded-assembly',
        start: 'top top',
        end: 'bottom bottom',
        pin: '#assembly-pin',
        pinSpacing: false,
      });

      const explosionTL = gsap.timeline({
        scrollTrigger: {
          trigger: '#exploded-assembly',
          start: '5% top',
          end: '50% top',
          scrub: 4,
          invalidateOnRefresh: true,
        },
      });

      expCards.forEach((card, i) => {
        const ex = parseFloat(card.dataset.explodeX || '0');
        const ey = parseFloat(card.dataset.explodeY || '0');
        const er = parseFloat(card.dataset.explodeRotate || '0');
        const sm = isMobile ? 0.4 : isTablet ? 0.6 : 1;
        explosionTL.to(
          card,
          {
            x: ex * sm,
            y: ey * sm,
            rotation: er,
            scale: 0.7,
            opacity: 0,
            filter: reduceMotion ? 'none' : 'blur(8px)',
            duration: 4,
            ease: 'power3.inOut',
          },
          i * 0.12
        );
      });

      explosionTL.to('#assembly-header', { opacity: 0, y: -40, duration: 0.6, ease: 'power2.in' }, 0);
      explosionTL.to('#bg-glow', { opacity: 1, duration: 0.8, ease: 'power2.inOut' }, 0.3);

      const reassemblyTL = gsap.timeline({
        scrollTrigger: {
          trigger: '#exploded-assembly',
          start: '50% top',
          end: '90% top',
          scrub: 4,
          invalidateOnRefresh: true,
        },
      });

      expCards.forEach((card, i) => {
        reassemblyTL.to(
          card,
          {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 4,
            ease: 'power3.out',
          },
          i * 0.12
        );
      });

      reassemblyTL.to('#bg-glow', { opacity: 0.6, scale: 1.3, duration: 4, ease: 'power2.out' }, 0);
    }

    // Ticker Horizontal Scroll
    const tickerContent = document.getElementById('ticker-content');
    if (tickerContent) {
      gsap.to('#ticker-content', {
        x: () => -(tickerContent.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: '#ticker',
          pin: true,
          scrub: 1,
          start: 'center center',
          end: '+=2000',
          invalidateOnRefresh: true,
        },
      });
    }

    // Generic Section Fade-in
    gsap.utils.toArray('section').forEach((s: any) => {
      if (s.id === 'exploded-assembly' || s.id === 'contact' || s.id === 'hero') return;
      gsap.from(s, {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: s,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    // Parallax Backgrounds
    if (!reduceMotion) {
      // Hero image parallax
      gsap.to('#hero-base', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to('#hero-portal', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    // Contact Section — Exploded View Assembly
    // (Removed as the new form doesn't use it)

    return () => {
      if (canUseHoverCursor) {
        window.removeEventListener('mousemove', handleMouseMove);
        if (rafId) cancelAnimationFrame(rafId);
      }
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

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

      {/* Fixed Navigation Header */}
      <header className="fixed top-0 left-0 w-full z-[100] px-6 py-6 md:px-16 md:py-8 flex justify-between items-center mix-blend-difference pointer-events-none">
        <div className="text-lg md:text-xl font-serif tracking-widest uppercase pointer-events-auto">Soren</div>
        <nav className="flex gap-4 md:gap-8 pointer-events-auto">
          <a href="#hero" onClick={(e) => handleScroll(e, '#hero')} className="text-[10px] md:text-xs tracking-[0.2em] uppercase hover:text-white/60 focus-visible:text-white active:text-white/70 transition-colors">Home</a>
          <a href="#exploded-assembly" onClick={(e) => handleScroll(e, '#exploded-assembly')} className="text-[10px] md:text-xs tracking-[0.2em] uppercase hover:text-white/60 focus-visible:text-white active:text-white/70 transition-colors">Projects</a>
          <a href="#testimonials" onClick={(e) => handleScroll(e, '#testimonials')} className="text-[10px] md:text-xs tracking-[0.2em] uppercase hover:text-white/60 focus-visible:text-white active:text-white/70 transition-colors">About</a>
          <a href="#contact" onClick={(e) => handleScroll(e, '#contact')} className="text-[10px] md:text-xs tracking-[0.2em] uppercase hover:text-white/60 focus-visible:text-white active:text-white/70 transition-colors">Contact</a>
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
          // @ts-ignore
          if (window.UnicornStudio && window.UnicornStudio.init) {
            // @ts-ignore
            window.UnicornStudio.init();
          }
        }}
      />

      {/* ========== HERO SECTION ========== */}
      <section id="hero" className="relative w-full h-screen overflow-hidden cursor-none" role="banner" aria-label="Hero introduction">
        <div className="absolute inset-0 bg-black/40 z-10" aria-hidden="true"></div>
        <div id="hero-base" className="absolute -top-[15%] -left-[5%] w-[110%] h-[130%]">
          <Image
            src="https://i.postimg.cc/JnSRnNNz/image-1.jpg"
            alt="Atmospheric dark studio environment with dramatic lighting"
            className="w-full h-full object-cover"
            priority
            width={1920}
            height={1080}
            referrerPolicy="no-referrer"
          />
        </div>
        <div id="hero-portal" ref={portalRef} className="absolute -top-[10%] -left-[5%] w-[110%] h-[120%] blob-mask z-20" aria-hidden="true">
          <Image
            src="https://i.postimg.cc/h4194TtY/Create-a-cinematic-portrait-of-a-modern-digital-de-delpmaspu.jpg"
            alt="Cinematic portrait of Soren, digital designer"
            className="w-full h-full object-cover scale-105"
            priority
            width={1920}
            height={1080}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/40 to-transparent mix-blend-multiply"></div>
        </div>
        <div className="absolute inset-0 z-30 p-6 md:p-16 flex flex-col justify-end mix-blend-difference pointer-events-none">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-8 md:gap-0">
            <p className="text-sm md:text-base text-white/60 max-w-[250px] md:max-w-xs leading-relaxed pointer-events-none">Digital Designer &amp; Creative Director — crafting cinematic experiences for ambitious brands.</p>
            <nav className="flex md:flex-col gap-4 md:gap-6 pointer-events-auto" aria-label="Social media links">
              <a href="https://instagram.com/sorensdr" id="social-ig" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black active:bg-white/80 active:text-black transition-all" aria-label="Follow on Instagram"><Instagram size={20} /></a>
              <a href="https://twitter.com/sorensdr" id="social-tw" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black active:bg-white/80 active:text-black transition-all" aria-label="Follow on Twitter"><Twitter size={20} /></a>
              <a href="https://linkedin.com/in/sorensdr" id="social-li" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black active:bg-white/80 active:text-black transition-all" aria-label="Connect on LinkedIn"><Linkedin size={20} /></a>
            </nav>
          </div>
        </div>
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 opacity-40 pointer-events-none animate-bounce" aria-hidden="true">
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <ChevronDown size={18} />
        </div>
      </section>

      {/* ========== EXPLODED VIEW ASSEMBLY (Services) ========== */}
      <section id="exploded-assembly" className="relative h-[400vh]" role="region" aria-label="Services and expertise">
        <div id="assembly-pin" className="w-full h-screen overflow-hidden flex items-center justify-center">
          {/* Background glow */}
          <div id="bg-glow" className="absolute inset-0 pointer-events-none opacity-0" aria-hidden="true">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial rounded-full" style={{ background: 'radial-gradient(circle,rgba(99,102,241,0.15) 0%,rgba(168,85,247,0.08) 40%,transparent 70%)', filter: 'blur(60px)' }}></div>
          </div>
          {/* Section header */}
          <div id="assembly-header" className="absolute top-6 left-0 w-full px-4 md:px-24 z-30 pointer-events-none">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-3 md:gap-8">
              <div className="space-y-2 md:space-y-4 pointer-events-auto">
                <p className="relative -mt-2 md:-mt-4 text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/50">What I Do</p>
                <h2 className="text-4xl md:text-7xl font-serif italic tracking-tight">Expertise</h2>
              </div>
              <p className="max-w-md text-white/50 leading-relaxed pointer-events-auto text-xs md:text-base">Comprehensive digital solutions crafted for modern brands and ambitious projects.</p>
            </div>
          </div>
          {/* Cards Grid */}
          <div id="cards-container" className="relative w-full max-w-7xl mx-auto px-4 md:px-24 z-10 mt-24 md:mt-32" role="list" aria-label="Service offerings">
            <div id="cards-grid" className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-5">

              <div className="explode-card group p-3 md:p-8 matte-card rounded-2xl border-l-2 border-l-blue-500 relative overflow-hidden cursor-default" data-explode-x="-320" data-explode-y="-280" data-explode-rotate="-12" role="listitem" aria-label="UI/UX Design service">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500" aria-hidden="true"></div>
                <div className="relative z-10 space-y-2 md:space-y-4">
                  <LayoutTemplate className="w-5 h-5 md:w-8 md:h-8 text-blue-500" aria-hidden="true" />
                  <PressureText text="UI/UX Design" className="text-sm md:text-xl text-white tracking-tight" />
                  <p className="text-white/50 leading-relaxed text-[9px] md:text-xs">Intuitive interfaces that blend aesthetics with seamless functionality. Every interaction is purposeful and refined.</p>
                </div>
              </div>

              <div className="explode-card group p-3 md:p-8 matte-card rounded-2xl border-l-2 border-l-purple-500 relative overflow-hidden cursor-default" data-explode-x="150" data-explode-y="-340" data-explode-rotate="8" role="listitem" aria-label="Brand Identity service">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500" aria-hidden="true"></div>
                <div className="relative z-10 space-y-2 md:space-y-4">
                  <Fingerprint className="w-5 h-5 md:w-8 md:h-8 text-purple-500" aria-hidden="true" />
                  <PressureText text="Brand Identity" className="text-sm md:text-xl text-white tracking-tight" />
                  <p className="text-white/50 leading-relaxed text-[9px] md:text-xs">Cohesive brand ecosystems that resonate deeply with your audience and stand the test of time.</p>
                </div>
              </div>

              <div className="explode-card group p-3 md:p-8 matte-card rounded-2xl border-l-2 border-l-cyan-400 relative overflow-hidden cursor-default" data-explode-x="350" data-explode-y="-120" data-explode-rotate="15" role="listitem" aria-label="Motion Design service">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500" aria-hidden="true"></div>
                <div className="relative z-10 space-y-2 md:space-y-4">
                  <Film className="w-5 h-5 md:w-8 md:h-8 text-cyan-400" aria-hidden="true" />
                  <PressureText text="Motion Design" className="text-sm md:text-xl text-white tracking-tight" />
                  <p className="text-white/50 leading-relaxed text-[9px] md:text-xs">Cinematic animations and fluid micro-interactions that breathe life into every digital touchpoint.</p>
                </div>
              </div>

              <div className="explode-card group p-3 md:p-8 matte-card rounded-2xl border-l-2 border-l-pink-500 relative overflow-hidden cursor-default" data-explode-x="380" data-explode-y="200" data-explode-rotate="-18" role="listitem" aria-label="Web Development service">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500" aria-hidden="true"></div>
                <div className="relative z-10 space-y-2 md:space-y-4">
                  <Code2 className="w-5 h-5 md:w-8 md:h-8 text-pink-500" aria-hidden="true" />
                  <PressureText text="Web Development" className="text-sm md:text-xl text-white tracking-tight" />
                  <p className="text-white/50 leading-relaxed text-[9px] md:text-xs">High-performance platforms built with modern architectures and pixel-perfect attention to detail.</p>
                </div>
              </div>

              <div className="explode-card group p-3 md:p-8 matte-card rounded-2xl border-l-2 border-l-fuchsia-500 relative overflow-hidden cursor-default" data-explode-x="-380" data-explode-y="160" data-explode-rotate="20" role="listitem" aria-label="Digital Product service">
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500" aria-hidden="true"></div>
                <div className="relative z-10 space-y-2 md:space-y-4">
                  <Smartphone className="w-5 h-5 md:w-8 md:h-8 text-fuchsia-500" aria-hidden="true" />
                  <PressureText text="Digital Product" className="text-sm md:text-xl text-white tracking-tight" />
                  <p className="text-white/50 leading-relaxed text-[9px] md:text-xs">End-to-end product design from concept to delivery, ensuring every feature serves the user.</p>
                </div>
              </div>

              <div className="explode-card group p-3 md:p-8 matte-card rounded-2xl border-l-2 border-l-indigo-500 relative overflow-hidden cursor-default" data-explode-x="-200" data-explode-y="340" data-explode-rotate="-10" role="listitem" aria-label="Creative Direction service">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500" aria-hidden="true"></div>
                <div className="relative z-10 space-y-2 md:space-y-4">
                  <Compass className="w-5 h-5 md:w-8 md:h-8 text-indigo-500" aria-hidden="true" />
                  <PressureText text="Creative Direction" className="text-sm md:text-xl text-white tracking-tight" />
                  <p className="text-white/50 leading-relaxed text-[9px] md:text-xs">Guiding visual narratives across all touchpoints with a unified creative vision.</p>
                </div>
              </div>

              <div className="explode-card group p-3 md:p-8 matte-card rounded-2xl border-l-2 border-l-teal-400 relative overflow-hidden cursor-default" data-explode-x="200" data-explode-y="300" data-explode-rotate="14" role="listitem" aria-label="Animation & 3D service">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-400/10 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500" aria-hidden="true"></div>
                <div className="relative z-10 space-y-2 md:space-y-4">
                  <Cuboid className="w-5 h-5 md:w-8 md:h-8 text-teal-400" aria-hidden="true" />
                  <PressureText text="Animation & 3D" className="text-sm md:text-xl text-white tracking-tight" />
                  <p className="text-white/50 leading-relaxed text-[9px] md:text-xs">Immersive 3D environments and motion sequences that push creative boundaries.</p>
                </div>
              </div>

              <div className="explode-card group p-3 md:p-8 matte-card rounded-2xl border-l-2 border-l-orange-500 relative overflow-hidden cursor-default" data-explode-x="-100" data-explode-y="-360" data-explode-rotate="6" role="listitem" aria-label="Strategic Consulting service">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500" aria-hidden="true"></div>
                <div className="relative z-10 space-y-2 md:space-y-4">
                  <Lightbulb className="w-5 h-5 md:w-8 md:h-8 text-orange-500" aria-hidden="true" />
                  <PressureText text="Strategic Consulting" className="text-sm md:text-xl text-white tracking-tight" />
                  <p className="text-white/50 leading-relaxed text-[9px] md:text-xs">Digital transformation and creative positioning strategies that drive measurable growth.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ========== TICKER SECTION ========== */}
      <section id="ticker" className="h-[30vh] md:h-screen flex items-center bg-[#050507] overflow-hidden border-y border-white/5" role="marquee" aria-label="Brand statement ticker">
        <div id="ticker-content" className="flex items-center whitespace-nowrap px-[50vw]">
          <span className="text-6xl md:text-[10rem] font-medium tracking-tighter opacity-90">Crafting cinematic</span>
          <Sparkles className="text-cyan-400 w-16 h-16 md:w-32 md:h-32 mx-12" aria-hidden="true" />
          <span className="text-6xl md:text-[10rem] font-light italic opacity-60">digital experiences that</span>
          <span className="text-6xl md:text-[10rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mx-12">Elevate Brands</span>
          <PenTool className="text-purple-400 w-16 h-16 md:w-32 md:h-32 mx-12" aria-hidden="true" />
          <span className="text-6xl md:text-[10rem] font-serif italic text-cyan-300">Precision in Every Pixel</span>
        </div>
      </section>

      {/* ========== TESTIMONIALS SECTION ========== */}
      <section id="testimonials" className="py-20 md:py-32 px-6 md:px-8 bg-gradient-to-b from-[#050507] to-[#0a0a0f]" role="region" aria-label="Client testimonials">
        <div className="max-w-5xl mx-auto space-y-16 md:space-y-24">
          {/* Featured Testimonial */}
          <div className="space-y-8 md:space-y-12" role="article" aria-label="Testimonial from Elena Vostova, Creative Director at LUMA">
            <Quote className="w-12 h-12 md:w-16 md:h-16 text-white/20" aria-hidden="true" />
            <h2 className="text-3xl md:text-6xl font-serif leading-tight">
              <ShinyText text="&ldquo;Soren doesn&rsquo;t just design interfaces; they architect digital atmospheres that feel living and breathing.&rdquo;" />
            </h2>
            <div className="flex items-center gap-4">
              <div className="testimonial-avatar w-10 h-10 md:w-12 md:h-12 text-sm md:text-base" style={{ background: 'linear-gradient(135deg,#06b6d4,#a855f7)' }} aria-hidden="true">EV</div>
              <div>
                <p className="font-medium text-sm md:text-base">Elena Vostova</p>
                <p className="text-xs md:text-sm text-white/50">Creative Director, LUMA</p>
              </div>
            </div>
          </div>
          {/* Supporting Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="p-6 md:p-12 matte-card rounded-3xl space-y-6 border-l-2 border-l-blue-500" role="article" aria-label="Testimonial from Marcus Reed, NexTech">
              <p className="text-base md:text-lg text-white/70 italic">
                <ShinyText text="&ldquo;Precision in every pixel. The transition quality is unmatched in the industry.&rdquo;" />
              </p>
              <div className="flex items-center gap-3">
                <div className="testimonial-avatar w-9 h-9 text-sm" style={{ background: 'linear-gradient(135deg,#3b82f6,#6366f1)' }} aria-hidden="true">MR</div>
                <p className="text-xs md:text-sm uppercase tracking-widest text-white/60">Marcus Reed, NexTech</p>
              </div>
            </div>
            <div className="p-6 md:p-12 matte-card rounded-3xl space-y-6 border-l-2 border-l-purple-500" role="article" aria-label="Testimonial from Sarah Chen, VOID">
              <p className="text-base md:text-lg text-white/70 italic">
                <ShinyText text="&ldquo;An absolute pioneer in cinematic web experiences. High-impact results every time.&rdquo;" />
              </p>
              <div className="flex items-center gap-3">
                <div className="testimonial-avatar w-9 h-9 text-sm" style={{ background: 'linear-gradient(135deg,#a855f7,#ec4899)' }} aria-hidden="true">SC</div>
                <p className="text-xs md:text-sm uppercase tracking-widest text-white/60">Sarah Chen, VOID</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CONTACT SECTION ========== */}
      <section id="contact" className="relative py-20 md:py-32 px-6 border-t border-white/5" role="region" aria-label="Contact information">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
          <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/50 mb-4 md:mb-6">Reach Out</p>
          <h2 className="text-4xl md:text-7xl font-serif italic tracking-tighter mb-12 md:mb-16">Let&rsquo;s Connect</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 w-full">
            <a href="tel:3027636707" className="group flex flex-col items-center gap-4 active:opacity-90 focus-visible:opacity-100">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-active:bg-white/10 transition-colors">
                <Phone className="w-6 h-6 text-white/70 group-hover:text-white group-active:text-white transition-colors" />
              </div>
              <div className="space-y-1">
                <p className="text-xs tracking-[0.2em] uppercase text-white/50">Phone</p>
                <p className="text-lg text-white/90 group-hover:text-white group-active:text-white transition-colors">(302) 763-6707</p>
              </div>
            </a>

            <a href="mailto:sorensadr@gmail.com" className="group flex flex-col items-center gap-4 active:opacity-90 focus-visible:opacity-100">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-active:bg-white/10 transition-colors">
                <Mail className="w-6 h-6 text-white/70 group-hover:text-white group-active:text-white transition-colors" />
              </div>
              <div className="space-y-1">
                <p className="text-xs tracking-[0.2em] uppercase text-white/50">Email</p>
                <p className="text-lg text-white/90 group-hover:text-white group-active:text-white transition-colors">sorensadr@gmail.com</p>
              </div>
            </a>

            <a href="https://instagram.com/sorensdr" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-4 active:opacity-90 focus-visible:opacity-100">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-active:bg-white/10 transition-colors">
                <Instagram className="w-6 h-6 text-white/70 group-hover:text-white group-active:text-white transition-colors" />
              </div>
              <div className="space-y-1">
                <p className="text-xs tracking-[0.2em] uppercase text-white/50">Instagram</p>
                <p className="text-lg text-white/90 group-hover:text-white group-active:text-white transition-colors">@sorensdr</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ========== MOBILE CONTACT FALLBACK ========== */}
      {/* Removed mobile contact fallback as the new form is responsive */}

      {/* ========== FOOTER ========== */}
      <footer className="py-12 md:py-16 px-6 md:px-8 border-t border-white/5" role="contentinfo">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12 mb-12">
            <div className="space-y-4">
              <p className="text-2xl font-serif italic tracking-tight">Soren Studio</p>
              <p className="text-white/50 text-sm max-w-xs leading-relaxed">Crafting cinematic digital experiences for ambitious brands worldwide.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-8 md:gap-12">
              <div className="space-y-3">
                <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/50">Contact</p>
                <a href="mailto:sorensadr@gmail.com" id="footer-email-link" className="block text-sm text-white/60 hover:text-white focus-visible:text-white active:text-white/80 transition-colors">sorensadr@gmail.com</a>
                <a href="tel:3027636707" id="footer-phone-link" className="block text-sm text-white/60 hover:text-white focus-visible:text-white active:text-white/80 transition-colors">(302) 763-6707</a>
              </div>
              <div className="space-y-3">
                <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/50">Social</p>
                <a href="https://instagram.com/sorensdr" id="footer-ig-link" target="_blank" rel="noopener noreferrer" className="block text-sm text-white/60 hover:text-white focus-visible:text-white active:text-white/80 transition-colors">Instagram</a>
                <a href="https://twitter.com/sorensdr" id="footer-tw-link" target="_blank" rel="noopener noreferrer" className="block text-sm text-white/60 hover:text-white focus-visible:text-white active:text-white/80 transition-colors">Twitter</a>
                <a href="https://linkedin.com/in/sorensdr" id="footer-li-link" target="_blank" rel="noopener noreferrer" className="block text-sm text-white/60 hover:text-white focus-visible:text-white active:text-white/80 transition-colors">LinkedIn</a>
              </div>
              <div className="space-y-3">
                <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/50">Legal</p>
                <a href="/privacy" id="footer-privacy" className="block text-sm text-white/60 hover:text-white focus-visible:text-white active:text-white/80 transition-colors" aria-label="Privacy Policy">Privacy</a>
                <a href="/terms" id="footer-terms" className="block text-sm text-white/60 hover:text-white focus-visible:text-white active:text-white/80 transition-colors" aria-label="Terms of Service">Terms</a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center md:items-start gap-4 text-white/30 text-[10px] md:text-xs tracking-widest uppercase text-center md:text-left">
            <p>&copy; 2024 Soren Studio. All rights reserved.</p>
            <p>Designed in Berlin</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
