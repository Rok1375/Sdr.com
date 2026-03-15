import { footerLinkGroups } from './content';

export function SiteFooter() {
  return (
    <footer className="py-12 md:py-16 px-6 md:px-8 border-t border-white/5" role="contentinfo">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12 mb-12">
          <div className="space-y-4">
            <p className="text-2xl font-serif italic tracking-tight">Soren Studio</p>
            <p className="text-white/50 text-sm max-w-xs leading-relaxed">Crafting cinematic digital experiences for ambitious brands worldwide.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-8 md:gap-12">
            {footerLinkGroups.map((group) => (
              <div key={group.title} className="space-y-3">
                <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/50">{group.title}</p>
                {group.links.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    id={`footer-${link.id}`}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    aria-label={link.ariaLabel}
                    className="block text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center md:items-start gap-4 text-white/30 text-[10px] md:text-xs tracking-widest uppercase text-center md:text-left">
          <p>&copy; 2024 Soren Studio. All rights reserved.</p>
          <p>Designed in Berlin</p>
        </div>
      </div>
    </footer>
  );
}
