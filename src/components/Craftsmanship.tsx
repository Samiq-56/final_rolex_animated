'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setDisplayValue(Math.floor(progress * end));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [value]);

  return <span>{displayValue.toLocaleString()}{suffix}</span>;
}

export default function Craftsmanship() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const splitRatio = useTransform(scrollYProgress, [0, 0.5, 1], ["50%", "70%", "50%"]);

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-black">
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row overflow-hidden">
        {/* Left Side: Macro Image/Video */}
        <motion.div 
          style={{ width: splitRatio }}
          className="relative h-1/2 md:h-full bg-obsidian border-r border-white/5 overflow-hidden"
        >
          <img 
            src="https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover grayscale opacity-50 scale-125"
            alt="Craftsmanship"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h4 className="text-gold text-9xl font-playfair italic opacity-5 pointer-events-none select-none">Maison</h4>
          </div>
        </motion.div>

        {/* Right Side: Content */}
        <div className="flex-1 h-1/2 md:h-full bg-[#FAFAFA] text-black p-10 md:p-32 flex flex-col justify-center">
          <span className="text-gold text-[10px] tracking-extra uppercase mb-8 font-bold">Art of Movement</span>
          <h2 className="text-5xl md:text-8xl font-serif uppercase mb-12 leading-none">The Calibre <br/>of Perfection</h2>
          
          <div className="grid grid-cols-2 gap-12 mt-12 border-t border-black/10 pt-12">
            <div>
              <p className="text-3xl font-serif"><Counter value={220} /> parts</p>
              <p className="text-[8px] uppercase tracking-widest mt-4 text-black/40 font-bold">Component precision</p>
            </div>
            <div>
              <p className="text-3xl font-serif"><Counter value={28800} suffix=" vph" /></p>
              <p className="text-[8px] uppercase tracking-widest mt-4 text-black/40 font-bold">Oscillation rate</p>
            </div>
          </div>

          <p className="text-sm md:text-lg text-black/60 uppercase tracking-widest leading-loose mt-20 max-w-lg">
            Every movement is certified as a Superlative Chronometer, a designation that ensures twice the precision of an officially certified chronometer.
          </p>
        </div>
      </div>
    </section>
  );
}
