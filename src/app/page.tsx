'use client';

import { Suspense, useState } from 'react';
import Preloader from '@/components/Preloader';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ScrollySequence from '@/components/ScrollySequence';
import Collection from '@/components/Collection';
import Specs from '@/components/Specs';
import Timeline from '@/components/Timeline';
import Craftsmanship from '@/components/Craftsmanship';
import Materials from '@/components/Materials';
import BookingForm from '@/components/BookingForm';
import Footer from '@/components/Footer';
import { Volume2, VolumeX } from 'lucide-react';

export default function RolexLandingPage() {
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);

  return (
    <main className="relative bg-[#0A0A0A] selection:bg-gold selection:text-black min-h-screen font-sans">
      <Preloader />
      <CustomCursor />
      <Navbar />

      {/* Sections */}
      <Hero />
      <ScrollySequence />
      <Collection />
      <Specs />
      <Timeline />
      <Craftsmanship />
      <Materials />
      <BookingForm />
      <Footer />

      {/* Cinematic Grain */}
      <div className="grain pointer-events-none" />

      {/* Cinematic Grain */}
      <div className="grain pointer-events-none" />

      {/* Secret Confetti Easter Egg Target (Invisible) */}
      <div id="confetti-anchor" className="fixed top-0 left-1/2 -translate-x-1/2" />
    </main>
  );
}
