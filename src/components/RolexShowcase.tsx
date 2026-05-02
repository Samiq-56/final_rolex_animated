'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

const WATCH_DATA = [
  {
    id: 'SUBMARINER',
    name: 'SUBMARINER DATE',
    subtitle: 'THE REFERENCE AMONG DIVERS’ WATCHES',
    price: '$10,250',
    frame: '001',
    specs: [
      'OYSTERSTEEL AND YELLOW GOLD',
      'UNIDIRECTIONAL ROTATABLE BEZEL',
      '300M WATERPROOF',
      'CALIBRE 3235 MOVEMENT'
    ],
    accent: '#006039' // Rolex Green
  },
  {
    id: 'DAYTONA',
    name: 'COSMOGRAPH DAYTONA',
    subtitle: 'BORN TO RACE',
    price: '$15,100',
    frame: '060',
    specs: [
      'CERACHROM BEZEL',
      'TACHYMETRIC SCALE',
      '72-HOUR POWER RESERVE',
      'CALIBRE 4131'
    ],
    accent: '#b81d24' // Ferrari Red
  },
  {
    id: 'GMT',
    name: 'GMT-MASTER II',
    subtitle: 'THE COSMOPOLITAN WATCH',
    price: '$10,700',
    frame: '120',
    specs: [
      'PEPSI BEZEL INSERT',
      'DUAL TIME ZONE',
      'JUBILEE BRACELET',
      '24-HOUR ROTATABLE BEZEL'
    ],
    accent: '#1d4ed8' // Pepsi Blue
  },
  {
    id: 'DAYDATE',
    name: 'DAY-DATE 40',
    subtitle: 'THE PRESIDENTS’ WATCH',
    price: '$38,500',
    frame: '180',
    specs: [
      '18CT YELLOW GOLD',
      'PRESIDENT BRACELET',
      'FLUTED BEZEL',
      'INSTANTANEOUS DAY AND DATE'
    ],
    accent: '#d4af37' // Gold
  }
];

export default function RolexShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    container: containerRef,
    axis: "x",
  });

  const smoothProgress = useSpring(scrollXProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      {/* Global Progress Bar */}
      <motion.div 
        className="fixed bottom-0 left-0 h-1 bg-gold z-50"
        style={{ width: useTransform(smoothProgress, [0, 1], ['0%', '100%']) }}
      />

      <div 
        ref={containerRef}
        className="horizontal-container w-full h-full flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory"
      >
        {WATCH_DATA.map((watch, index) => (
          <WatchSection key={watch.id} watch={watch} index={index} containerRef={containerRef} />
        ))}
      </div>
    </div>
  );
}

function WatchSection({ watch, index, containerRef }: { watch: typeof WATCH_DATA[0], index: number, containerRef: React.RefObject<HTMLDivElement> }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollXProgress } = useScroll({
    target: sectionRef,
    container: containerRef,
    offset: ["start end", "end start"],
    axis: "x"
  });

  // Center focus progress (0 at start/end, 1 at center)
  const focus = useTransform(scrollXProgress, [0, 0.5, 1], [0, 1, 0]);
  const springFocus = useSpring(focus, { stiffness: 60, damping: 20 });

  // Animations
  const watchScale = useTransform(springFocus, [0, 1], [0.7, 1.1]);
  const watchRotate = useTransform(scrollXProgress, [0, 1], [10, -10]);
  const watchX = useTransform(scrollXProgress, [0, 0.5, 1], ["60%", "0%", "-60%"]);
  
  const textOpacity = useTransform(springFocus, [0.4, 0.8], [0, 1]);
  const textY = useTransform(springFocus, [0.4, 1], [100, 0]);
  
  const specX = useTransform(springFocus, [0.6, 1], [50, 0]);
  const goldLineLength = useTransform(springFocus, [0.3, 0.7], [0, 1]);

  return (
    <section 
      ref={sectionRef}
      className="snap-section shrink-0 w-screen h-screen flex flex-col md:flex-row items-center justify-center px-12 md:px-32 gap-16 relative"
    >
      {/* Background Gradient */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{ 
          background: `radial-gradient(circle at center, ${watch.accent}44 0%, transparent 70%)`,
          scale: useTransform(springFocus, [0, 1], [1, 1.5]),
          opacity: useTransform(springFocus, [0, 1], [0, 0.3])
        }}
      />

      {/* Floating Background Text */}
      <motion.div
        style={{ 
          x: useTransform(scrollXProgress, [0, 1], [200, -200]),
          opacity: useTransform(springFocus, [0.2, 0.5, 0.8], [0, 0.03, 0])
        }}
        className="absolute inset-0 flex items-center justify-center text-[25vw] font-black text-white pointer-events-none select-none uppercase tracking-tighter"
      >
        {watch.id}
      </motion.div>

      {/* Watch Image Wrapper */}
      <div className="relative z-10 w-full md:w-1/2 flex justify-center items-center h-1/2 md:h-full">
        <motion.div
          style={{
            scale: watchScale,
            rotate: watchRotate,
            x: watchX,
            filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.8))',
            willChange: 'transform, opacity'
          }}
          className="relative group"
        >
          <img 
            src={`/sequence/frame_${watch.frame}_delay-0.041s.webp`} 
            alt={watch.name}
            className="w-full max-w-[550px] h-auto object-contain pointer-events-none transition-transform duration-700"
          />
          
          {/* Animated Gold Accents */}
          <svg className="absolute -inset-10 w-[calc(100%+80px)] h-[calc(100%+80px)] pointer-events-none opacity-40" viewBox="0 0 100 100">
            <motion.rect
              x="10" y="10" width="80" height="80"
              fill="none"
              stroke="#d4af37"
              strokeWidth="0.1"
              style={{ pathLength: goldLineLength }}
            />
            <motion.circle
              cx="50" cy="50" r="45"
              fill="none"
              stroke="#d4af37"
              strokeWidth="0.05"
              style={{ pathLength: goldLineLength }}
            />
          </svg>
        </motion.div>
      </div>

      {/* Content Side */}
      <div className="relative z-20 w-full md:w-1/2 flex flex-col items-start text-left max-w-xl">
        <motion.div style={{ opacity: textOpacity, y: textY }} className="w-full">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-gold" />
            <span className="text-gold text-xs tracking-[0.5em] font-bold uppercase">Rolex Genève</span>
          </div>
          
          <h2 className="text-white text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-6 uppercase">
            {watch.name.split(' ').map((word, i) => (
              <span key={i} className="block last:text-shimmer">{word}</span>
            ))}
          </h2>
          
          <p className="text-gray-400 text-sm md:text-xl font-light tracking-[0.1em] mb-10 max-w-md uppercase leading-relaxed">
            {watch.subtitle}
          </p>

          <div className="relative inline-block mb-12">
            <motion.div 
              className="absolute -inset-2 bg-gold/10 blur-xl rounded-full"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <span className="relative text-shimmer text-4xl md:text-5xl font-black tracking-tighter gold-price border-l-4 border-gold pl-6 py-2">
              {watch.price}
            </span>
          </div>
        </motion.div>

        {/* Specs List */}
        <motion.div 
          style={{ opacity: textOpacity, x: specX }}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 w-full"
        >
          {watch.specs.map((spec, i) => (
            <div key={i} className="flex flex-col gap-1 group">
              <span className="text-[10px] text-gold/50 tracking-widest font-bold uppercase mb-1">Spec {i+1}</span>
              <p className="text-white/80 text-xs md:text-sm font-light tracking-[0.15em] uppercase border-b border-white/10 pb-2 group-hover:border-gold transition-colors duration-500">
                {spec}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
