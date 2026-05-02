'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Specs() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const seconds = time.getSeconds() * 6;
  const minutes = time.getMinutes() * 6;
  const hours = (time.getHours() % 12) * 30 + time.getMinutes() * 0.5;

  return (
    <section className="bg-obsidian py-40 overflow-hidden relative">
      {/* Infinite Ticker */}
      <div className="absolute top-0 left-0 w-full bg-gold/5 py-4 flex whitespace-nowrap overflow-hidden border-y border-gold/10">
        <div className="animate-marquee flex gap-12">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-gold text-[10px] tracking-extra uppercase">
              Certified Superlative Chronometer • Waterproof 300M • Oystersteel • Perpetual Movement •
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-20 mt-12">
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-gold text-[10px] tracking-extra uppercase mb-6">Technical Engineering</h2>
          <h3 className="text-white text-5xl md:text-7xl font-serif uppercase mb-8">Precision in <br/>Every Second</h3>
          <p className="text-white/40 text-sm tracking-widest uppercase leading-loose max-w-xl">
            The heart of the Submariner is the Calibre 3235, a new-generation movement entirely developed and manufactured by Rolex for a superlative performance.
          </p>
        </div>

        <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
          <div className="absolute inset-0 rounded-full border-[10px] border-obsidian shadow-[0_0_100px_rgba(201,168,76,0.1)]" />
          
          {/* Watch Face */}
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
            <circle cx="50" cy="50" r="48" fill="#050505" stroke="#111" strokeWidth="0.5" />
            
            {/* Hour Markers */}
            {[...Array(12)].map((_, i) => (
              <line
                key={i}
                x1="50" y1="8" x2="50" y2="12"
                transform={`rotate(${i * 30} 50 50)`}
                stroke="white" strokeWidth="1"
              />
            ))}

            {/* Hands */}
            <motion.line
              x1="50" y1="50" x2="50" y2="25"
              stroke="white" strokeWidth="2" strokeLinecap="round"
              style={{ rotate: hours, originX: "50px", originY: "50px" }}
            />
            <motion.line
              x1="50" y1="50" x2="50" y2="15"
              stroke="white" strokeWidth="1.5" strokeLinecap="round"
              style={{ rotate: minutes, originX: "50px", originY: "50px" }}
            />
            <motion.line
              x1="50" y1="50" x2="50" y2="12"
              stroke="#C9A84C" strokeWidth="0.5" strokeLinecap="round"
              animate={{ rotate: seconds }}
              transition={{ type: "tween", ease: "linear", duration: 1 }}
              style={{ originX: "50px", originY: "50px" }}
            />
            
            <circle cx="50" cy="50" r="1.5" fill="#C9A84C" />
          </svg>

          {/* Hover Points */}
          <div className="absolute inset-0">
            <motion.div 
              whileHover={{ scale: 1.2 }}
              className="absolute top-[10%] left-1/2 -translate-x-1/2 w-4 h-4 bg-gold rounded-full cursor-pointer group"
            >
              <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 bg-black/90 p-4 border border-gold/20 backdrop-blur-md">
                <p className="text-gold text-[8px] uppercase tracking-widest mb-2">Bezel</p>
                <p className="text-white text-[10px] uppercase tracking-wider">Unidirectional rotatable 60-minute graduated</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
