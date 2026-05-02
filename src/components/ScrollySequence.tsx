'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 266;
const FRAME_BASE_URL = '/sequence/frame_';
const FRAME_SUFFIX = '_delay-0.041s.webp';

const OVERLAYS = [
  { frame: 30, text: "OYSTERSTEEL", align: "left" },
  { frame: 70, text: "CERAMIC BEZEL", align: "right" },
  { frame: 110, text: "SUPERLATIVE CHRONOMETER", align: "left" },
  { frame: 150, text: "300M WATER RESISTANT", align: "center", glitch: true },
  { frame: 190, text: "$10,250", align: "right", luxury: true },
  { frame: 230, text: "SINCE 1953", align: "center" }
];

export default function ScrollySequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let loadedImages = 0;
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `${FRAME_BASE_URL}${i.toString().padStart(3, '0')}${FRAME_SUFFIX}`;
      img.onload = () => {
        loadedImages++;
        if (loadedImages === FRAME_COUNT) setIsLoaded(true);
      };
      imagesRef.current[i] = img;
    }
  }, []);

  useEffect(() => {
    if (!isLoaded || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = (index: number) => {
      const img = imagesRef.current[index];
      if (!img) return;
      
      const ratio = Math.max(canvas.width / img.width, canvas.height / img.height);
      const w = img.width * ratio;
      const h = img.height * ratio;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render(currentFrame);
    };

    window.addEventListener('resize', resize);
    resize();

    const scrollObj = { frame: 0 };
    gsap.to(scrollObj, {
      frame: FRAME_COUNT - 1,
      snap: 'frame',
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          const frame = Math.floor(scrollObj.frame);
          setCurrentFrame(frame);
          render(frame);
        },
      },
    });

    return () => {
      window.removeEventListener('resize', resize);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isLoaded]);

  const activeOverlay = OVERLAYS.find(o => Math.abs(currentFrame - o.frame) < 15);

  return (
    <section ref={containerRef} className="relative w-full h-[500vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full object-cover grayscale-[0.2]" />
        
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="w-full h-[12vh] bg-black/80 backdrop-blur-sm absolute top-0 border-b border-gold/10" />
          <div className="w-full h-[12vh] bg-black/80 backdrop-blur-sm absolute bottom-0 border-t border-gold/10" />
          
          <AnimatePresence mode="wait">
            {activeOverlay && (
              <motion.div
                key={activeOverlay.frame}
                initial={{ opacity: 0, x: activeOverlay.align === 'left' ? -50 : activeOverlay.align === 'right' ? 50 : 0, y: activeOverlay.align === 'center' ? 20 : 0 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0 }}
                className={cn(
                  "absolute inset-0 flex items-center p-20 md:p-40",
                  activeOverlay.align === 'left' ? 'justify-start text-left' : 
                  activeOverlay.align === 'right' ? 'justify-end text-right' : 'justify-center text-center'
                )}
              >
                <h2 className={cn(
                  "text-3xl md:text-6xl lg:text-7xl font-serif tracking-widest text-white uppercase",
                  activeOverlay.luxury && "text-gold italic font-garamond",
                  activeOverlay.glitch && "animate-pulse"
                )}>
                  {activeOverlay.text}
                </h2>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Vertical Progress */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 h-1/2 w-[1px] bg-white/10 z-20 hidden md:block">
          <motion.div 
            className="w-full bg-gold shadow-[0_0_10px_rgba(201,168,76,0.5)]"
            style={{ height: `${(currentFrame / FRAME_COUNT) * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
