import { contactMethods } from './content';

export function ContactSection() {
  return (
    <section id="contact" className="relative py-20 md:py-32 px-6 border-t border-white/5" role="region" aria-label="Contact information">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
        <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/50 mb-4 md:mb-6">Reach Out</p>
        <h2 className="text-4xl md:text-7xl font-serif italic tracking-tighter mb-12 md:mb-16">Let&rsquo;s Connect</h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 w-full">
          {contactMethods.map((method) => {
            const Icon = method.icon;

            return (
              <a key={method.label} href={method.href} target={method.external ? '_blank' : undefined} rel={method.external ? 'noopener noreferrer' : undefined} className="group flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <Icon className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs tracking-[0.2em] uppercase text-white/50">{method.label}</p>
                  <p className="text-lg text-white/90 group-hover:text-white transition-colors">{method.value}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
