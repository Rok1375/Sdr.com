import type { RefObject } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { socialLinks } from './content';

type HeroSectionProps = {
  portalRef: RefObject<HTMLDivElement | null>;
};

export function HeroSection({ portalRef }: HeroSectionProps) {
  return (
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
          <p className="text-sm md:text-base text-white/60 max-w-[250px] md:max-w-xs leading-relaxed pointer-events-none">
            Digital Designer &amp; Creative Director — crafting cinematic experiences for ambitious brands.
          </p>
          <nav className="flex md:flex-col gap-4 md:gap-6 pointer-events-auto" aria-label="Social media links">
            {socialLinks.map((link) => {
              const Icon = link.icon;

              return (
                <a
                  key={link.id}
                  href={link.href}
                  id={`social-${link.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                  aria-label={link.ariaLabel}
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </nav>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 opacity-40 pointer-events-none animate-bounce" aria-hidden="true">
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown size={18} />
      </div>
    </section>
  );
}
