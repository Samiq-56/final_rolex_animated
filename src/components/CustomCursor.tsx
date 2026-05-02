'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<'default' | 'link' | 'explore' | 'button'>('default');
  const cursorRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.closest('a')) setCursorType('link');
      else if (target.tagName === 'BUTTON' || target.closest('button')) setCursorType('button');
      else if (target.dataset.cursor === 'explore') setCursorType('explore');
      else setCursorType('default');
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center justify-center rounded-full border border-gold mix-blend-difference"
        style={{
          x: x,
          y: y,
          translateX: '-50%',
          translateY: '-50%',
          width: cursorType === 'default' ? 12 : cursorType === 'link' ? 60 : 80,
          height: cursorType === 'default' ? 12 : cursorType === 'link' ? 60 : 80,
          backgroundColor: cursorType === 'button' ? '#C9A84C' : 'transparent',
        }}
        transition={{ type: 'spring', ...springConfig }}
      >
        <span className="text-[8px] font-mono tracking-widest text-white uppercase">
          {cursorType === 'link' ? 'View' : cursorType === 'explore' ? 'Explore' : ''}
        </span>
      </motion.div>
      
      {/* Background grain texture */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.06] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </>
  );
}
