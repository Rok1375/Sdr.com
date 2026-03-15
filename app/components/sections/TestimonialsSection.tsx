import { Quote } from 'lucide-react';
import { ShinyText } from '../ShinyText';

const supportingTestimonials = [
  {
    quote: '&ldquo;Precision in every pixel. The transition quality is unmatched in the industry.&rdquo;',
    initials: 'MR',
    author: 'Marcus Reed, NexTech',
    borderClass: 'border-l-blue-500',
    avatarBackground: 'linear-gradient(135deg,#3b82f6,#6366f1)',
  },
  {
    quote: '&ldquo;An absolute pioneer in cinematic web experiences. High-impact results every time.&rdquo;',
    initials: 'SC',
    author: 'Sarah Chen, VOID',
    borderClass: 'border-l-purple-500',
    avatarBackground: 'linear-gradient(135deg,#a855f7,#ec4899)',
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 md:py-32 px-6 md:px-8 bg-gradient-to-b from-[#050507] to-[#0a0a0f]" role="region" aria-label="Client testimonials">
      <div className="max-w-5xl mx-auto space-y-16 md:space-y-24">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {supportingTestimonials.map((testimonial) => (
            <div key={testimonial.author} className={`p-6 md:p-12 matte-card rounded-3xl space-y-6 border-l-2 ${testimonial.borderClass}`} role="article" aria-label={`Testimonial from ${testimonial.author}`}>
              <p className="text-base md:text-lg text-white/70 italic">
                <ShinyText text={testimonial.quote} />
              </p>
              <div className="flex items-center gap-3">
                <div className="testimonial-avatar w-9 h-9 text-sm" style={{ background: testimonial.avatarBackground }} aria-hidden="true">
                  {testimonial.initials}
                </div>
                <p className="text-xs md:text-sm uppercase tracking-widest text-white/60">{testimonial.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
