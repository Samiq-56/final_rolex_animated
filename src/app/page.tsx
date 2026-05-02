'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

const FRAME_COUNT = 265;
const FRAME_BASE_URL = '/sequence/frame_';
const FRAME_SUFFIX = '_delay-0.041s.webp';

const SECTIONS = [
  { id: 'hero', start: 0, end: 45, title: 'SUBMARINER DATE', subtitle: 'THE REFERENCE AMONG DIVERS’ WATCHES', description: 'Launched in 1953, the Submariner was the first divers’ wristwatch waterproof to a depth of 100 metres.', align: 'center' },
  { id: 'bezel', start: 46, end: 90, title: 'CERACHROM BEZEL', subtitle: 'UNIDIRECTIONAL ROTATABLE', description: 'The 60-minute graduated bezel allows a diver to accurately and safely monitor diving time and decompression stops.', align: 'right' },
  { id: 'dial', start: 91, end: 135, title: 'CHROMALIGHT', subtitle: 'LONG-LASTING LUMINESCENCE', description: 'The broad hands and hour markers in simple shapes enable instant and reliable reading.', align: 'left' },
  { id: 'movement', start: 136, end: 185, title: 'CALIBRE 3235', subtitle: 'SUPERLATIVE CHRONOMETER', description: 'A new-generation movement entirely developed and manufactured by Rolex for a superlative performance.', align: 'right' },
  { id: 'bracelet', start: 186, end: 230, title: 'OYSTER BRACELET', subtitle: 'FORM AND FUNCTION', description: 'A perfect alchemy of form and function, designed to be both robust and comfortable.', align: 'center' },
  { id: 'finale', start: 231, end: 265, title: 'ROLEX', subtitle: 'A CROWN FOR EVERY ACHIEVEMENT', description: 'The ultimate symbol of excellence, performance, prestige and innovation.', align: 'center' }
];

const GALLERY_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2080&auto=format&fit=crop', name: 'SUBMARINER', price: '$10,250' },
  { url: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=1974&auto=format&fit=crop', name: 'DAY-DATE 40', price: '$38,500' },
  { url: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1887&auto=format&fit=crop', name: 'DAYTONA', price: '$15,100' }
];

export default function ScrollyVideoPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollyRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<ImageBitmap[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function preload() {
      for (let i = 0; i < FRAME_COUNT; i++) {
        if (cancelled) break;
        const padded = (i + 1).toString().padStart(3, '0');
        const url = `${FRAME_BASE_URL}${padded}${FRAME_SUFFIX}`;
        try {
          const response = await fetch(url);
          const blob = await response.blob();
          const bitmap = await createImageBitmap(blob);
          imagesRef.current[i] = bitmap;
          setLoadedCount(prev => prev + 1);
        } catch (e) { console.error(e); }
      }
      setIsReady(true);
    }
    preload();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!isReady || !canvasRef.current || !scrollyRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    function render() {
      if (!scrollyRef.current) return;
      const rect = scrollyRef.current.getBoundingClientRect();
      const scrollY = -rect.top;
      const maxScroll = rect.height - window.innerHeight;
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      const frameIndex = Math.floor(progress * (FRAME_COUNT - 1));
      setCurrentFrame(frameIndex);

      const bitmap = imagesRef.current[frameIndex];
      if (bitmap && ctx) {
        const ratio = Math.max(canvas.width / bitmap.width, canvas.height / bitmap.height);
        const w = bitmap.width * ratio;
        const h = bitmap.height * ratio;
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bitmap, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
      }
      requestAnimationFrame(render);
    }

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    window.addEventListener('resize', resize);
    resize();
    render();
    return () => window.removeEventListener('resize', resize);
  }, [isReady]);

  const activeSection = SECTIONS.find(s => currentFrame >= s.start && currentFrame <= s.end);

  return (
    <main className="bg-black text-[#C9A84C]">
      {/* Custom Cursor */}
      <motion.div className="fixed top-0 left-0 w-8 h-8 border border-gold rounded-full pointer-events-none z-[100] mix-blend-difference hidden md:block" animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }} transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.5 }} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-40 p-8 md:p-12 flex justify-between items-center mix-blend-difference">
        <div className="text-xl font-serif tracking-[0.4em] text-white">ROLEX</div>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex flex-col gap-1.5 group pointer-events-auto">
          <motion.div animate={isMenuOpen ? { rotate: 45, y: 5 } : {}} className="w-6 h-px bg-white group-hover:bg-gold" />
          <motion.div animate={isMenuOpen ? { opacity: 0 } : {}} className="w-6 h-px bg-white group-hover:bg-gold" />
          <motion.div animate={isMenuOpen ? { rotate: -45, y: -5 } : {}} className="w-6 h-px bg-white group-hover:bg-gold" />
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} className="fixed inset-0 z-30 bg-[#0d0d0d] flex flex-col items-center justify-center gap-8 p-12">
            {['The Collection', 'Store Locator', 'Contact Us'].map((item, i) => (
              <motion.a key={item} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }} href="#" className="text-2xl md:text-5xl font-serif text-white hover:text-gold" onClick={() => setIsMenuOpen(false)}>{item}</motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scrolly Section */}
      <div ref={scrollyRef} className="relative w-full" style={{ height: `${FRAME_COUNT * 20}px` }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
          <canvas ref={canvasRef} className="w-full h-full object-cover" />
          <div className="absolute inset-0 pointer-events-none z-[1] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          <div className="absolute inset-0 pointer-events-none z-[2] bg-gradient-to-b from-black/60 via-transparent to-black/80" />

          <AnimatePresence mode="wait">
            {isReady && activeSection && (
              <motion.div key={activeSection.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.8 }} className={`absolute inset-0 flex flex-col p-12 md:p-32 pointer-events-none ${activeSection.align === 'center' ? 'items-center justify-center text-center' : activeSection.align === 'right' ? 'items-end justify-center text-right' : 'items-start justify-center text-left'}`}>
                <div className="max-w-xl md:max-w-2xl">
                  <span className="text-gold text-[10px] tracking-[0.6em] uppercase font-bold mb-4 block">{activeSection.subtitle}</span>
                  <h2 className="text-4xl md:text-8xl lg:text-9xl font-serif text-white mb-6 leading-none">{activeSection.title}</h2>
                  <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} className={`w-24 h-px bg-gold mb-8 ${activeSection.align === 'right' ? 'ml-auto' : activeSection.align === 'center' ? 'mx-auto' : ''}`} />
                  <p className="text-sm md:text-lg text-white/60 font-light tracking-wide uppercase">{activeSection.description}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Gallery Section */}
      <section className="relative z-10 bg-black py-24 md:py-48 px-8 md:px-32">
        <div className="mb-24 text-center">
          <span className="text-gold tracking-[0.4em] text-[10px] uppercase">The Collection</span>
          <h2 className="text-5xl md:text-7xl font-serif text-white mt-4 uppercase">Timeless Masterpieces</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          {GALLERY_IMAGES.map((watch, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-white/5">
                <img src={watch.url} alt={watch.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white tracking-[0.5em] text-[10px] uppercase border border-white px-6 py-2">Explore</span>
                </div>
              </div>
              <div className="mt-8 flex justify-between items-end border-b border-white/10 pb-6">
                <div>
                  <h3 className="text-2xl font-serif text-white">{watch.name}</h3>
                  <p className="text-gold text-[10px] tracking-widest uppercase mt-2">Certified Superlative</p>
                </div>
                <div className="text-xl font-light text-white/60">{watch.price}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-[#0a0a0a] py-24 md:py-48 px-8 md:px-32">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-24">
          <div className="md:w-1/2">
            <span className="text-gold tracking-[0.4em] text-[10px] uppercase">Contact Us</span>
            <h2 className="text-5xl md:text-6xl font-serif text-white mt-4 uppercase">Request a Private Appointment</h2>
            <p className="text-white/40 mt-8 leading-loose tracking-wide uppercase text-sm">Experience the world of Rolex in person with our authorized retailers across the globe.</p>
          </div>
          <div className="md:w-1/2 flex flex-col gap-8">
            <input type="text" placeholder="FULL NAME" className="bg-transparent border-b border-white/20 p-4 text-[10px] tracking-widest text-white focus:border-gold outline-none transition-colors" />
            <input type="email" placeholder="EMAIL ADDRESS" className="bg-transparent border-b border-white/20 p-4 text-[10px] tracking-widest text-white focus:border-gold outline-none transition-colors" />
            <textarea placeholder="MESSAGE" rows={4} className="bg-transparent border-b border-white/20 p-4 text-[10px] tracking-widest text-white focus:border-gold outline-none transition-colors" />
            <button className="bg-gold text-black text-[10px] font-bold tracking-[0.5em] uppercase p-6 mt-4 hover:bg-[#b09440] transition-colors">Send Request</button>
          </div>
        </div>
      </section>

      {/* Final Footer */}
      <footer className="bg-black py-24 px-8 md:px-32 border-t border-white/5">
        <div className="flex flex-col items-center gap-12">
          <div className="text-4xl md:text-6xl font-serif text-gold tracking-[0.4em]">ROLEX</div>
          <div className="flex flex-wrap justify-center gap-12 text-[10px] tracking-[0.3em] uppercase text-white/40">
            <a href="#" className="hover:text-gold">Watches</a>
            <a href="#" className="hover:text-gold">World of Rolex</a>
            <a href="#" className="hover:text-gold">Services</a>
            <a href="#" className="hover:text-gold">Newsroom</a>
          </div>
          <div className="h-px w-24 bg-gold/30" />
          <div className="text-[10px] tracking-[0.2em] text-white/20 uppercase text-center max-w-lg leading-loose">
            Rolex S.A. respects your right to privacy and is committed to maintaining your confidence and trust. <br /> © 2024 Rolex. All Rights Reserved.
          </div>
          <div className="text-gold text-sm tracking-[0.6em] font-serif italic mt-4">Genève</div>
        </div>
      </footer>

      {/* Loading Overlay */}
      {!isReady && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center gap-4">
          <div className="text-3xl font-serif tracking-[0.4em] text-gold mb-8">ROLEX</div>
          <div className="w-64 h-px bg-white/10 relative overflow-hidden">
            <motion.div className="absolute inset-0 bg-gold" animate={{ width: `${(loadedCount / FRAME_COUNT) * 100}%` }} />
          </div>
        </div>
      )}
    </main>
  );
}
