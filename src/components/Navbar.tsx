'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    setClickCount(prev => prev + 1);
    if (clickCount + 1 >= 5) {
      // Trigger confetti (could be a state or effect)
      setClickCount(0);
      alert('👑 The Crown of Excellence');
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] flex justify-center p-6 md:p-10 pointer-events-none">
      <motion.div
        animate={{
          width: isScrolled ? 'fit-content' : '100%',
          padding: isScrolled ? '0.75rem 2rem' : '0rem 2rem',
          backgroundColor: isScrolled ? 'rgba(10, 10, 10, 0.8)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'blur(0px)',
          borderRadius: isScrolled ? '100px' : '0px',
          border: isScrolled ? '1px solid rgba(201, 168, 76, 0.2)' : '1px solid transparent',
        }}
        className="flex items-center justify-between gap-12 pointer-events-auto transition-all duration-500"
      >
        <div 
          onClick={handleLogoClick}
          className="text-2xl font-serif tracking-[0.4em] text-white cursor-pointer select-none"
        >
          ROLEX
        </div>

        <div className="hidden md:flex gap-10">
          {['Collections', 'Maison', 'Retailers'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-[10px] text-white/60 hover:text-gold uppercase tracking-[0.3em] font-medium transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 text-white hover:text-gold transition-colors md:hidden"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center p-12"
          >
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-10 right-10 text-white"><X size={32} /></button>
            <div className="flex flex-col gap-8 text-center">
              {['The Submariner', 'Craftsmanship', 'Heritage', 'Book Appointment'].map((item, i) => (
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={item}
                  href="#"
                  className="text-3xl font-garamond italic text-white hover:text-gold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
