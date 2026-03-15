import { useEffect } from 'react';
import type { RefObject } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export const scrollToSection = (targetId: string) => {
  gsap.to(window, {
    duration: 1.2,
    scrollTo: { y: targetId, offsetY: 0 },
    ease: 'power3.inOut',
  });
};

/**
 * Sets up cursor/parallax + section scroll animations.
 * Uses conservative trigger ranges (5%-90%) for the exploded assembly to keep the effect readable,
 * and scales offsets down on tablets/mobiles to prevent cards from leaving the viewport too aggressively.
 */
export function usePortfolioAnimations(
  cursorRef: RefObject<HTMLDivElement | null>,
  portalRef: RefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      document.documentElement.style.scrollBehavior = 'auto';
    }

    let rafId: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);

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

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

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
        const scaleMultiplier = isMobile ? 0.4 : isTablet ? 0.6 : 1;

        explosionTL.to(
          card,
          {
            x: ex * scaleMultiplier,
            y: ey * scaleMultiplier,
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

    gsap.utils.toArray('section').forEach((section) => {
      const s = section as HTMLElement;
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

    if (!reduceMotion) {
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

    return () => {
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
        if (rafId) cancelAnimationFrame(rafId);
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [cursorRef, portalRef]);
}
