'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];
    const particleCount = 60;

    const createParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          speed: Math.random() * 0.5 + 0.1,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < -10) p.y = canvas.height + 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${p.opacity})`;
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    };

    window.addEventListener('resize', resize);
    resize();
    animate();
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="w-16 h-16 border border-gold/40 rounded-full flex items-center justify-center animate-pulse">
            <div className="w-8 h-8 bg-gold rounded-full blur-md opacity-20" />
            <span className="text-gold text-2xl absolute">👑</span>
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="liquid-metal text-5xl md:text-8xl lg:text-9xl font-playfair uppercase tracking-[0.2em] font-bold leading-tight"
        >
          Born to Perform
        </motion.h1>

        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
          className="w-32 h-[1px] bg-gold my-12"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-white text-xs md:text-sm uppercase tracking-[0.5em] max-w-lg leading-relaxed"
        >
          The Reference Among Divers' Watches Since 1953
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="flex flex-col md:flex-row gap-6 mt-16"
        >
          <button className="bg-gold text-black px-10 py-5 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-gold-light transition-all transform hover:scale-105">
            Explore Collection
          </button>
          <button className="border border-white/20 text-white px-10 py-5 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white/5 transition-all">
            Book Appointment
          </button>
        </motion.div>
      </div>

      {/* Decorative letterbox bars */}
      <div className="absolute top-0 left-0 w-full h-[8vh] bg-black z-20" />
      <div className="absolute bottom-0 left-0 w-full h-[8vh] bg-black z-20" />
      
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30"
      >
        <span className="text-[8px] uppercase tracking-widest font-mono">Scroll</span>
        <div className="w-[1px] h-10 bg-gold/50" />
      </motion.div>
    </section>
  );
}
