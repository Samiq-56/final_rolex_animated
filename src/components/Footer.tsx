import React from 'react';

const socials = [
  { label: 'Instagram', url: 'https://www.instagram.com/syedsamiqabbas?igsh=eXZmczZkMHN4cjJr&utm_source=qr' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 px-8 md:px-16 py-[80px] lg:py-[100px]">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <h3
            className="text-3xl md:text-5xl text-slate-800 mb-6"
            style={{ fontWeight: 700, letterSpacing: '-0.03em' }}
          >
            Get In <span className="text-blue-500">Touch</span>
          </h3>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-8">
            Have a project in mind or want to discuss potential opportunities? I&apos;d love to hear from you!
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="mailto:samiqbukhari51214@gmail.com"
              className="inline-block px-8 py-4 bg-blue-500 text-white rounded-full font-bold tracking-tight hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30"
            >
              samiqbukhari51214@gmail.com
            </a>
            <a
              href="tel:0318-9669802"
              className="inline-block px-8 py-4 bg-slate-200 text-slate-800 rounded-full font-bold tracking-tight hover:bg-slate-300 transition-colors"
            >
              0318-9669802
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-12">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm md:text-base text-slate-600 hover:text-blue-500 transition-colors font-medium"
            >
              {s.label}
            </a>
          ))}
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <span>© {new Date().getFullYear()} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 font-extrabold">Syed Samiq Abbas Bukhari</span>. All rights reserved.</span>
          <span>Faisalabad, Pakistan</span>
        </div>
      </div>
    </footer>
  );
}
