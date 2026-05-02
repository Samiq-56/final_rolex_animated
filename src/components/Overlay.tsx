'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { RefObject } from 'react';

interface Props {
  heroRef: RefObject<HTMLDivElement>;
}

const taglines = [
  { text: 'I study Data Sciences at PUCIT', emoji: '🎓' },
  { text: 'I build modern websites', emoji: '⚡' },
  { text: 'I am passionate about AI', emoji: '🤖' },
  { text: 'I solve real-world problems', emoji: '🚀' },
];

export default function Overlay({ heroRef }: Props) {
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  });

  // Phase 1 — Ghost watermark
  const opacity1 = useTransform(scrollYProgress, [0, 0.18, 0.22], [1, 1, 0]);
  const visibility1 = useTransform(opacity1, (v) => (v < 0.01 ? 'hidden' : 'visible'));

  // Phase 2 — Name block
  const opacity2 = useTransform(scrollYProgress, [0.22, 0.3, 0.36, 0.4], [0, 1, 1, 0]);

  // Phase 3 — Title block
  const opacity3 = useTransform(scrollYProgress, [0.4, 0.46, 0.5, 0.54], [0, 1, 1, 0]);

  // Phase 3.5 — Cycling taglines
  const tagline1Opacity = useTransform(scrollYProgress, [0.54, 0.57, 0.6, 0.62], [0, 1, 1, 0]);
  const tagline1X = useTransform(scrollYProgress, [0.54, 0.57], [-30, 0]);

  const tagline2Opacity = useTransform(scrollYProgress, [0.62, 0.65, 0.68, 0.7], [0, 1, 1, 0]);
  const tagline2X = useTransform(scrollYProgress, [0.62, 0.65], [-30, 0]);

  const tagline3Opacity = useTransform(scrollYProgress, [0.7, 0.73, 0.76, 0.78], [0, 1, 1, 0]);
  const tagline3X = useTransform(scrollYProgress, [0.7, 0.73], [-30, 0]);

  const tagline4Opacity = useTransform(scrollYProgress, [0.78, 0.81, 0.84, 0.86], [0, 1, 1, 0]);
  const tagline4X = useTransform(scrollYProgress, [0.78, 0.81], [-30, 0]);

  const taglineOpacities = [tagline1Opacity, tagline2Opacity, tagline3Opacity, tagline4Opacity];
  const taglineXs = [tagline1X, tagline2X, tagline3X, tagline4X];

  // Phase 4 — Final headline
  const opacity4 = useTransform(scrollYProgress, [0.86, 0.92, 1.0], [0, 1, 1]);

  const phaseClass =
    'absolute inset-0 flex flex-col justify-end items-start text-left pl-8 md:pl-16 lg:pl-24 pr-8 pb-[15vh] pointer-events-none';

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Phase 1 */}
        <motion.div
          style={{
            opacity: opacity1,
            visibility: visibility1,
            willChange: 'opacity, visibility',
          }}
          className="absolute inset-0 flex flex-col justify-end items-start text-left pl-8 md:pl-16 lg:pl-24 pr-8 pb-[15vh] pointer-events-none"
        >
          <h1
            className="text-4xl md:text-5xl font-bold tracking-tight select-none cursor-default"
            style={{ pointerEvents: 'auto' }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Samiq Bukhari.</span>
          </h1>
        </motion.div>

        {/* Phase 2 */}
        <motion.div
          style={{ opacity: opacity2, willChange: 'opacity' }}
          className={phaseClass}
        >
          <div className="max-w-[640px]">
            <p className="text-base md:text-xl text-blue-600 mb-3 font-semibold tracking-wide drop-shadow-sm">
              I study Data Sciences, AI &amp; Web Dev
            </p>
            <h2
              className="text-5xl md:text-7xl lg:text-8xl text-slate-800 drop-shadow-md mb-4"
              style={{ fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Samiq Bukhari.</span>
            </h2>
            <p className="text-xs md:text-sm text-blue-500 font-semibold tracking-widest uppercase drop-shadow-sm">
              Data Science Student &middot; PUCIT Lahore
            </p>
          </div>
        </motion.div>

        {/* Phase 3 */}
        <motion.div
          style={{ opacity: opacity3, willChange: 'opacity' }}
          className={phaseClass}
        >
          <h2
            className="text-4xl md:text-6xl lg:text-7xl text-slate-800 drop-shadow-md whitespace-pre-line max-w-[640px]"
            style={{ fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1 }}
          >
            {`Data Science Student &\nCreative Developer.`}
          </h2>
        </motion.div>

        {/* Phase 3.5 */}
        {taglines.map((tag, i) => (
          <motion.div
            key={i}
            style={{
              opacity: taglineOpacities[i],
              x: taglineXs[i],
              willChange: 'opacity, transform',
            }}
            className={phaseClass}
          >
            <h3
              className="text-3xl md:text-5xl lg:text-6xl text-slate-800 drop-shadow-md max-w-[640px]"
              style={{ fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.15 }}
            >
              <span className="text-blue-500">|</span> {tag.text}{' '}
              <span aria-hidden>{tag.emoji}</span>
            </h3>
          </motion.div>
        ))}

        {/* Phase 4 */}
        <motion.div
          style={{ opacity: opacity4, willChange: 'opacity' }}
          className={phaseClass}
        >
          <h2
            className="text-3xl md:text-5xl lg:text-6xl text-slate-800 drop-shadow-md max-w-[700px]"
            style={{ fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.15 }}
          >
            I combine AI &amp; Web Development —{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">
              To Build The Future.
            </span>
          </h2>
        </motion.div>

      </div>
    </div>
  );
}
