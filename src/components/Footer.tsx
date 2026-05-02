'use client';

export default function Footer() {
  return (
    <footer className="bg-black py-40 px-6 relative overflow-hidden border-t border-white/5">
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-serif text-white opacity-[0.02] pointer-events-none select-none">
        ROLEX
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-40">
          <div className="col-span-1 md:col-span-1">
            <h4 className="text-gold text-4xl font-serif tracking-[0.4em] mb-12">ROLEX</h4>
            <p className="text-white/40 text-[10px] tracking-extra leading-loose uppercase">
              Official Retailer of the Maison. Every timepiece is a promise of quality and heritage.
            </p>
          </div>

          <div>
            <h5 className="text-white text-[10px] tracking-extra uppercase mb-10 font-bold">Collections</h5>
            <ul className="space-y-6 text-[10px] tracking-widest text-white/40 uppercase">
              <li><a href="#" className="hover:text-gold transition-colors">The Submariner</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Sea-Dweller</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Deepsea</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Yacht-Master</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white text-[10px] tracking-extra uppercase mb-10 font-bold">Services</h5>
            <ul className="space-y-6 text-[10px] tracking-widest text-white/40 uppercase">
              <li><a href="#" className="hover:text-gold transition-colors">Store Locator</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Watch Care</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Service Center</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white text-[10px] tracking-extra uppercase mb-10 font-bold">Newsletter</h5>
            <p className="text-white/40 text-[10px] tracking-widest uppercase mb-8">Enter the world of Rolex</p>
            <div className="flex border-b border-white/20 pb-4 group focus-within:border-gold transition-colors">
              <input type="email" placeholder="EMAIL ADDRESS" className="bg-transparent text-[10px] tracking-extra text-white outline-none w-full" />
              <button className="text-gold text-[10px] font-bold tracking-extra">JOIN</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-10 border-t border-white/5 pt-20">
          <div className="flex gap-12 text-[8px] tracking-extra text-white/20 uppercase">
            <span>© {new Date().getFullYear()} Rolex. All Rights Reserved.</span>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
          </div>
          <div className="text-gold text-sm tracking-extra font-serif italic opacity-40">Genève</div>
        </div>
      </div>
    </footer>
  );
}
