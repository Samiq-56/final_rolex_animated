'use client';

import { animate, useInView, useMotionValue, useTransform, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

function Counter({ from, to, suffix, label }: { from: number; to: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const count = useMotionValue(from);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, { duration: 2, ease: "easeOut" });
      return controls.stop;
    }
  }, [isInView, count, to]);

  return (
    <div ref={ref} className="flex flex-col mb-8">
      <div className="flex items-baseline gap-1">
        <motion.span className="text-5xl md:text-6xl font-black text-blue-500">
          {rounded}
        </motion.span>
        <span className="text-4xl md:text-5xl font-black text-blue-500">{suffix}</span>
      </div>
      <span className="text-sm md:text-base font-semibold tracking-wider text-slate-500 uppercase mt-2">
        {label}
      </span>
    </div>
  );
}

export default function AboutMeSplit() {
  return (
    <section className="bg-slate-50 py-[80px] lg:py-[120px] px-8 md:px-16">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Side: Image & Stats (40%) */}
        <div className="lg:w-[40%] flex flex-col justify-center">
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl mb-12">
             <Image src="/pu.jpg" alt="PUCIT Lahore" fill className="object-cover" />
          </div>
          <div className="grid grid-cols-2 gap-x-8">
            <Counter from={0} to={542} suffix="" label="QS World Rank" />
            <Counter from={0} to={2} suffix="nd" label="All Pakistan Rank" />
          </div>
        </div>

        {/* Right Side: Story (60%) */}
        <div className="lg:w-[60%] flex flex-col justify-center">
          <h3 className="text-3xl md:text-5xl font-bold text-slate-800 mb-8 tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">My University</span> & Me
          </h3>
          <div className="space-y-6 text-slate-600 text-lg md:text-xl leading-relaxed">
            <p>
              Hello! I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 font-extrabold">Syed Samiq Abbas Bukhari</span>, a passionate student pursuing a degree in Data Sciences at <span className="text-blue-500 font-semibold">Punjab University (PUCIT) Lahore</span>, Pakistan.
            </p>
            <p>
              I&apos;m dedicated to learning and applying cutting-edge technologies to solve real-world problems. My interests span Artificial Intelligence, Web Development, and Data Science.
            </p>
            <p>
              <span className="text-blue-500 font-semibold italic">Punjab University College of Information Technology (PUCIT)</span> is one of the leading institutions for computer science and information technology education in Pakistan. Located in Lahore, it operates under the historic University of the Punjab, the oldest and one of the most prestigious public universities in the country.
            </p>
            
            <div className="mt-8">
               <h4 className="text-xl font-semibold mb-4 text-slate-800">My Journey at PUCIT</h4>
               <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">2024-2028</span>
                  <span className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">Lahore</span>
                  <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">Data Science</span>
                  <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">Artificial Intelligence</span>
                  <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">Web Development</span>
               </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
