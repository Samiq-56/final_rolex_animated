import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 text-center">
      <div className="text-6xl md:text-8xl font-serif text-gold tracking-widest mb-4">404</div>
      <div className="h-px w-24 bg-gold/30 mb-8" />
      <h1 className="text-2xl md:text-4xl font-serif text-white uppercase tracking-[0.3em] mb-4">Timeless, but Lost</h1>
      <p className="text-white/40 max-w-md uppercase text-[10px] tracking-widest leading-loose mb-12">
        The page you are looking for has slipped through the gears of time. 
        Perhaps it never existed, or has been moved to our archives.
      </p>
      <Link 
        href="/" 
        className="bg-gold text-black text-[10px] font-bold tracking-[0.5em] uppercase px-12 py-6 hover:bg-[#b09440] transition-colors"
      >
        Return to Heritage
      </Link>
      <div className="mt-24 text-gold text-sm tracking-[0.6em] font-serif italic opacity-30">Rolex</div>
    </div>
  );
}
