'use client';

import { motion } from 'framer-motion';

const MATERIALS = [
  { name: "Oystersteel", color: "#1a1a1a", desc: "A high-performance alloy used in aerospace and chemical industries." },
  { name: "Cerachrom", color: "#0d0d0d", desc: "Virtually scratchproof ceramic bezel insert of exceptional hardness." },
  { name: "Sapphire", color: "#141414", desc: "Scratch-resistant crystal ensuring total clarity and protection." }
];

export default function Materials() {
  return (
    <section className="bg-black">
      {MATERIALS.map((material, i) => (
        <div 
          key={i} 
          className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden border-t border-white/5"
          style={{ backgroundColor: material.color }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <h2 className="text-[20vw] font-playfair font-black uppercase text-transparent bg-clip-text bg-[url('https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1974&auto=format&fit=crop')] bg-fixed bg-center opacity-30 select-none">
              {material.name}
            </h2>
            
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
              <div className="max-w-xl">
                <span className="text-gold text-[10px] tracking-extra uppercase mb-6 block">Materials</span>
                <h3 className="text-white text-4xl md:text-7xl font-serif uppercase mb-8">{material.name}</h3>
                <p className="text-white/40 text-sm md:text-lg tracking-widest uppercase leading-loose">
                  {material.desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
