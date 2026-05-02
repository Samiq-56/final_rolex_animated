'use client';

import { useState, useEffect } from 'react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Subjects', href: '#courses' },
  { label: 'Journey', href: '#timeline' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Close mobile menu on resize-to-desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      {/* Floating pill — desktop & mobile share container */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-2 py-2 rounded-full glass-pill">
        <div className="flex items-center gap-1">
          {/* Logo */}
          <a
            href="#top"
            className="px-4 py-1.5 text-slate-800 font-bold text-sm md:text-base whitespace-nowrap"
            style={{ letterSpacing: '-0.02em' }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 font-extrabold">Samiq Bukhari</span><span className="text-blue-500">.</span>
          </a>

          {/* Vertical divider — hidden on small mobile */}
          <span className="hidden sm:block w-px h-5 bg-slate-300 mx-1" aria-hidden />

          {/* Desktop links */}
          <div className="hidden md:flex items-center">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-4 py-1.5 text-sm text-slate-600 hover:text-blue-500 rounded-full hover:bg-slate-200/50 transition-colors whitespace-nowrap font-medium"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger — show only when desktop links are hidden */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden w-9 h-9 flex items-center justify-center text-slate-800 rounded-full hover:bg-slate-200/50 transition-colors"
          >
            <span className="relative block w-4 h-px bg-slate-800 before:content-[''] before:absolute before:left-0 before:-top-[6px] before:w-4 before:h-px before:bg-slate-800 after:content-[''] after:absolute after:left-0 after:top-[6px] after:w-4 after:h-px after:bg-slate-800" />
          </button>

          {/* Vertical divider before CTA — desktop only */}
          <span className="hidden md:block w-px h-5 bg-slate-300 mx-1" aria-hidden />

          {/* CTA */}
          <a
            href="mailto:samiqbukhari51214@gmail.com"
            className="hidden sm:inline-block ml-1 px-4 md:px-5 py-2 rounded-full pill-cta font-bold text-[11px] md:text-xs tracking-[0.08em] uppercase whitespace-nowrap"
          >
            Contact Me
          </a>
        </div>
      </nav>

      {/* Mobile dropdown — separate floating pill underneath, only when open */}
      {open && (
        <div className="md:hidden fixed top-[72px] left-1/2 -translate-x-1/2 z-50 w-[min(92vw,420px)] rounded-3xl glass-pill p-3">
          <div className="flex flex-col">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-slate-600 hover:text-blue-500 hover:bg-slate-100 rounded-2xl text-base font-medium transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="mailto:samiqbukhari51214@gmail.com"
              onClick={() => setOpen(false)}
              className="mt-2 mx-1 px-5 py-3 rounded-full pill-cta font-bold text-xs tracking-[0.08em] uppercase text-center"
            >
              Contact Me
            </a>
          </div>
        </div>
      )}
    </>
  );
}
