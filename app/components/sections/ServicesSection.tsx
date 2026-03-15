import { PenTool, Sparkles } from 'lucide-react';
import { PressureText } from '../PressureText';
import { serviceCards } from './content';

export function ServicesSection() {
  return (
    <>
      <section id="exploded-assembly" className="relative h-[400vh]" role="region" aria-label="Services and expertise">
        <div id="assembly-pin" className="w-full h-screen overflow-hidden flex items-center justify-center">
          <div id="bg-glow" className="absolute inset-0 pointer-events-none opacity-0" aria-hidden="true">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial rounded-full"
              style={{ background: 'radial-gradient(circle,rgba(99,102,241,0.15) 0%,rgba(168,85,247,0.08) 40%,transparent 70%)', filter: 'blur(60px)' }}
            ></div>
          </div>
          <div id="assembly-header" className="absolute top-6 left-0 w-full px-4 md:px-24 z-30 pointer-events-none">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-3 md:gap-8">
              <div className="space-y-2 md:space-y-4 pointer-events-auto">
                <p className="relative -mt-2 md:-mt-4 text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/50">What I Do</p>
                <h2 className="text-4xl md:text-7xl font-serif italic tracking-tight">Expertise</h2>
              </div>
              <p className="max-w-md text-white/50 leading-relaxed pointer-events-auto text-xs md:text-base">
                Comprehensive digital solutions crafted for modern brands and ambitious projects.
              </p>
            </div>
          </div>
          <div id="cards-container" className="relative w-full max-w-7xl mx-auto px-4 md:px-24 z-10 mt-24 md:mt-32" role="list" aria-label="Service offerings">
            <div id="cards-grid" className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-5">
              {serviceCards.map((card) => {
                const Icon = card.icon;

                return (
                  <div
                    key={card.title}
                    className={`explode-card group p-3 md:p-8 matte-card rounded-2xl border-l-2 ${card.borderClass} relative overflow-hidden cursor-default`}
                    data-explode-x={card.explodeX}
                    data-explode-y={card.explodeY}
                    data-explode-rotate={card.explodeRotate}
                    role="listitem"
                    aria-label={`${card.title} service`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.glowClass} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} aria-hidden="true"></div>
                    <div className="relative z-10 space-y-2 md:space-y-4">
                      <Icon className={`w-5 h-5 md:w-8 md:h-8 ${card.iconClass}`} aria-hidden="true" />
                      <PressureText text={card.title} className="text-sm md:text-xl text-white tracking-tight" />
                      <p className="text-white/50 leading-relaxed text-[9px] md:text-xs">{card.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

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
    </>
  );
}
