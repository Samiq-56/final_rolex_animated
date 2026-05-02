'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const MILESTONES = [
  { year: "1953", title: "The Beginning", desc: "Rolex introduces the Submariner, the first divers' watch waterproof to 100 meters." },
  { year: "1969", title: "Submariner Date", desc: "The introduction of the date function marks a turning point in professional diving." },
  { year: "1983", title: "Oystersteel", desc: "Implementation of 904L steel, a high-performance alloy usually used in aerospace." },
  { year: "2003", title: "50th Anniversary", desc: "Launch of the Submariner with a green bezel, celebrating half a century of excellence." },
  { year: "2023", title: "The Modern Icon", desc: "A redefined case and movement, pushing the boundaries of precision and reliability." }
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollRef.current) return;

    const sections = gsap.utils.toArray('.timeline-card');
    
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => "+=" + scrollRef.current?.offsetWidth
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-black">
      {/* Parallax Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center animate-pulse" />
      </div>

      <div ref={scrollRef} className="flex h-screen items-center px-[10vw]">
        {MILESTONES.map((item, i) => (
          <div key={i} className="timeline-card min-w-[80vw] md:min-w-[40vw] px-10 flex flex-col items-start relative">
            <span className="text-[120px] md:text-[200px] font-playfair font-bold text-white/5 absolute -top-20 left-0 -z-10 select-none">
              {item.year}
            </span>
            <div className="pt-20">
              <span className="text-gold text-[10px] tracking-extra uppercase mb-4 block">Milestone</span>
              <h3 className="text-white text-4xl md:text-6xl font-serif uppercase mb-8">{item.title}</h3>
              <div className="w-20 h-px bg-gold mb-8" />
              <p className="text-white/40 text-sm md:text-lg tracking-widest uppercase leading-relaxed max-w-md">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Line */}
      <div className="absolute bottom-20 left-[10vw] right-[10vw] h-px bg-white/10">
        <div className="h-full bg-gold w-0" />
      </div>
    </section>
  );
}
