'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const WATCHES = [
  { id: 1, name: "Submariner Date", price: 10250, image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2080&auto=format&fit=crop" },
  { id: 2, name: "Sea-Dweller", price: 13200, image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=1974&auto=format&fit=crop" },
  { id: 3, name: "Deepsea", price: 15400, image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1887&auto=format&fit=crop" },
  { id: 4, name: "Yacht-Master", price: 28500, image: "https://images.unsplash.com/photo-1587836374828-4dbaba94cf0e?q=80&w=2070&auto=format&fit=crop" }
];

function WatchCard({ watch }: { watch: typeof WATCHES[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative h-[500px] w-full bg-obsidian border border-white/5 rounded-sm overflow-hidden perspective-1000"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
      
      <motion.img
        src={watch.image}
        alt={watch.name}
        className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        style={{ transform: "translateZ(50px)" }}
      />

      <div className="absolute bottom-0 left-0 w-full p-8 z-20" style={{ transform: "translateZ(80px)" }}>
        <p className="text-gold font-mono text-[8px] tracking-extra uppercase mb-2">Rolex Collection</p>
        <h3 className="text-white text-3xl font-serif tracking-widest uppercase mb-4">{watch.name}</h3>
        <div className="flex justify-between items-center border-t border-white/10 pt-4">
          <span className="text-white/40 font-mono text-xs italic">${watch.price.toLocaleString()}</span>
          <button className="text-[10px] text-gold uppercase tracking-[0.3em] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
            Explore Details
          </button>
        </div>
      </div>

      {/* Animated Border */}
      <div className="absolute inset-0 border border-gold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      <div className="absolute top-0 left-0 h-[2px] w-0 bg-gold group-hover:w-full transition-all duration-700 delay-100" />
    </motion.div>
  );
}

export default function Collection() {
  return (
    <section className="bg-black py-40 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="max-w-2xl">
            <h2 className="text-gold text-[10px] tracking-extra uppercase mb-4">Official Catalog</h2>
            <h3 className="text-white text-5xl md:text-7xl font-playfair uppercase leading-none">The Spirit of the Sea</h3>
          </div>
          <p className="text-white/40 text-xs tracking-widest uppercase max-w-sm leading-loose">
            Exploration, technical achievement and aesthetic excellence. Each watch is a masterpiece of precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          {WATCHES.map((watch) => (
            <WatchCard key={watch.id} watch={watch} />
          ))}
        </div>
      </div>
    </section>
  );
}
