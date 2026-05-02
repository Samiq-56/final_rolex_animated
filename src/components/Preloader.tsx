'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsComplete(true), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden"
          exit={{ opacity: 1 }}
        >
          {/* Curtains */}
          <motion.div
            initial={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 1.2, ease: [0.87, 0, 0.13, 1], delay: 0.2 }}
            className="absolute inset-0 w-1/2 h-full bg-[#0A0A0A] left-0 border-r border-gold/10"
          />
          <motion.div
            initial={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 1.2, ease: [0.87, 0, 0.13, 1], delay: 0.2 }}
            className="absolute inset-0 w-1/2 h-full bg-[#0A0A0A] left-1/2 border-l border-gold/10"
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center">
            <svg
              width="80"
              height="80"
              viewBox="0 0 100 100"
              className="mb-8"
            >
              <motion.path
                d="M50 20 L60 40 L85 40 L65 55 L75 80 L50 65 L25 80 L35 55 L15 40 L40 40 Z"
                fill="none"
                stroke="#C9A84C"
                strokeWidth="1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>
            
            <div className="text-gold font-mono text-[10px] tracking-[0.5em] mb-4 uppercase">
              Rolex Precision {progress}%
            </div>
            
            <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
              <motion.div 
                className="absolute inset-0 bg-gold"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progress / 100 }}
                transition={{ type: "spring", stiffness: 50 }}
                style={{ originX: 0 }}
              />
            </div>

            <motion.div 
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mt-8 flex gap-1 items-center"
            >
              {[12, 18, 10, 22, 14].map((h, i) => (
                <div key={i} className="w-[1px] bg-gold/40" style={{ height: `${h}px` }} />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
