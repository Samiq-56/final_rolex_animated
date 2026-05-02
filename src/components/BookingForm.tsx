'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Watch, User, ArrowRight, Check } from 'lucide-react';

const STEPS = ["Model", "Date", "Location", "Details"];

export default function BookingForm() {
  const [step, setStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nextStep = () => setStep(s => Math.min(s + 1, STEPS.length - 1));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));

  if (isSubmitted) {
    return (
      <div className="bg-obsidian border border-gold/20 p-20 text-center max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-10">
          <Check className="text-black" size={40} />
        </div>
        <h3 className="text-3xl font-serif text-white uppercase tracking-widest mb-6">Your Journey Begins</h3>
        <p className="text-white/40 uppercase text-xs tracking-extra leading-loose">
          A dedicated advisor will contact you within 24 hours to confirm your private appointment at the Maison.
        </p>
      </div>
    );
  }

  return (
    <section className="bg-black py-40 px-6">
      <div className="max-w-4xl mx-auto bg-obsidian border border-white/5 p-8 md:p-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
          <motion.div 
            className="h-full bg-gold"
            initial={{ width: "0%" }}
            animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        <div className="mb-16 flex justify-between items-center">
          <div>
            <span className="text-gold text-[10px] tracking-extra uppercase mb-4 block">Concierge Service</span>
            <h2 className="text-white text-3xl font-serif uppercase">Private Appointment</h2>
          </div>
          <span className="text-white/20 font-mono text-sm">Step {step + 1} / 4</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="min-h-[300px]"
          >
            {step === 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['Submariner', 'Sea-Dweller', 'Deepsea'].map(watch => (
                  <button key={watch} onClick={nextStep} className="p-10 border border-white/10 hover:border-gold/50 transition-colors text-center group">
                    <Watch className="mx-auto mb-6 text-white/40 group-hover:text-gold" size={32} />
                    <span className="text-[10px] text-white uppercase tracking-widest">{watch}</span>
                  </button>
                ))}
              </div>
            )}
            {step === 1 && (
              <div className="flex flex-col items-center">
                <Calendar className="text-gold mb-8" size={64} />
                <p className="text-white uppercase tracking-extra text-xs mb-10">Select your preferred date</p>
                <div className="grid grid-cols-7 gap-4 w-full max-w-sm">
                  {[...Array(28)].map((_, i) => (
                    <button key={i} onClick={nextStep} className="aspect-square flex items-center justify-center text-[10px] border border-white/5 hover:border-gold text-white/40 hover:text-white">
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-6">
                {['Geneva HQ', 'London Mayfair', 'New York 5th Ave'].map(loc => (
                  <button key={loc} onClick={nextStep} className="w-full p-8 border border-white/10 hover:border-gold flex items-center justify-between group">
                    <div className="flex items-center gap-6">
                      <MapPin className="text-gold" />
                      <span className="text-white uppercase tracking-widest text-xs">{loc}</span>
                    </div>
                    <ArrowRight size={16} className="text-white/20 group-hover:text-gold" />
                  </button>
                ))}
              </div>
            )}
            {step === 3 && (
              <div className="grid gap-8">
                <input type="text" placeholder="FULL NAME" className="bg-transparent border-b border-white/20 p-6 text-[10px] tracking-widest text-white outline-none focus:border-gold" />
                <input type="email" placeholder="EMAIL ADDRESS" className="bg-transparent border-b border-white/20 p-6 text-[10px] tracking-widest text-white outline-none focus:border-gold" />
                <button 
                  onClick={() => setIsSubmitted(true)}
                  className="bg-gold text-black p-6 text-[10px] font-bold uppercase tracking-extra mt-8"
                >
                  Confirm Request
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {step > 0 && (
          <button onClick={prevStep} className="mt-12 text-[8px] text-white/40 uppercase tracking-widest hover:text-white">
            ← Go Back
          </button>
        )}
      </div>
    </section>
  );
}
