'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const subjects = [
  {
    title: 'Fundamentals of Programming',
    badge: 'C++ & Basics',
    desc: 'Key programming principles in C++, including loops, conditions, and arrays.',
    image: '/pf.jpeg',
  },
  {
    title: 'Modern OOP Practices',
    badge: 'Encapsulation & Inheritance',
    desc: 'Implemented advanced OOP concepts through C++ class-based real-world examples.',
    image: '/oop.png',
  },
  {
    title: 'Data Structures Overview',
    badge: 'Trees & Sorting',
    desc: 'Practical implementation of stacks, queues, trees and sorting algorithms.',
    image: '/dsa.jpg',
  },
  {
    title: 'Digital Logic Design',
    badge: 'Logisim & Digital Design',
    desc: 'Simulated combinational and sequential circuits using Logisim, including gates, flip-flops, and counters.',
    image: '/dld.jpg',
  },
  {
    title: 'Probability & Statistics',
    badge: 'Excel & Statistics',
    desc: 'Built statistical visualizations and probability models using Excel and descriptive analysis techniques.',
    image: '/prob.jpg',
  },
  {
    title: 'Applications for Computer & IT',
    badge: 'MS Word & Google Docs',
    desc: 'Worked on MS Office tools, digital literacy, file management, and cloud-based applications.',
    image: '/ict.jpg',
  },
];

export default function Courses() {
  return (
    <section className="bg-slate-50 py-[80px] lg:py-[120px] px-8 md:px-16 border-t border-slate-200">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-16 text-center">
          <h3
            className="text-3xl md:text-5xl text-slate-800 mb-4"
            style={{ fontWeight: 700, letterSpacing: '-0.03em' }}
          >
            Studied <span className="text-blue-500">Subjects</span>
          </h3>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            A diverse range of foundational and advanced coursework.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group block bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48 overflow-hidden bg-slate-200">
                <Image 
                  src={subject.image} 
                  alt={subject.title} 
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <span className="inline-block text-xs font-bold tracking-widest text-blue-500 uppercase mb-4">
                  {subject.badge}
                </span>
                <h4 className="text-xl font-bold text-slate-800 mb-3 leading-snug">
                  {subject.title}
                </h4>
                <p className="text-slate-600 leading-relaxed mb-6">{subject.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-block px-8 py-4 rounded-full pill-cta font-bold tracking-tight"
          >
            Discuss My Projects →
          </a>
        </div>
      </div>
    </section>
  );
}
