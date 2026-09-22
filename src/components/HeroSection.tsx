import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, Film, Sparkles, Play, Compass } from 'lucide-react';

interface HeroSectionProps {
  onBeginStory: () => void;
  onOpenVideo?: () => void;
}

// Curated selection of landmark visuals across animation history
const heroFrames = [
  {
    title: 'Spirited Away',
    year: '2001',
    style: 'Hand-Drawn 2D',
    url: 'https://image.tmdb.org/t/p/w1280/mSDsSDwaP3E7dEfUPWy4J0djt4O.jpg',
    position: 'top-8 left-4 sm:left-12 lg:left-16 w-36 sm:w-48 lg:w-56 h-24 sm:h-32 lg:h-36',
    depth: 25,
    rotate: -3,
  },
  {
    title: 'Toy Story',
    year: '1995',
    style: 'Pioneering 3D CGI',
    url: 'https://image.tmdb.org/t/p/w1280/lxD5ak7BOAoBh88AJOTF9v8w1Y3.jpg',
    position: 'bottom-16 left-6 sm:left-20 lg:left-24 w-40 sm:w-52 lg:w-60 h-24 sm:h-32 lg:h-36',
    depth: 35,
    rotate: 2.5,
  },
  {
    title: 'The Lion King',
    year: '1994',
    style: 'Renaissance 2D',
    url: 'https://image.tmdb.org/t/p/w1280/wXsQvli6tWqja51PYxXNG1LFIGV.jpg',
    position: 'top-12 right-4 sm:right-16 lg:right-20 w-40 sm:w-52 lg:w-64 h-24 sm:h-32 lg:h-40',
    depth: 20,
    rotate: 3,
  },
  {
    title: 'Spider-Man: Spider-Verse',
    year: '2018',
    style: 'Hybrid Stylized',
    url: 'https://image.tmdb.org/t/p/w1280/7d6o00Suu4p6k2X4iMmtU68qa.jpg',
    position: 'bottom-12 right-6 sm:right-20 lg:right-28 w-36 sm:w-48 lg:w-56 h-24 sm:h-32 lg:h-36',
    depth: 40,
    rotate: -2,
  },
  {
    title: 'Akira',
    year: '1988',
    style: 'Cel Masterwork',
    url: 'https://image.tmdb.org/t/p/w1280/5nqyTls3qYk31iW531x64gTjD5a.jpg',
    position: 'top-1/2 -translate-y-1/2 left-2 sm:left-4 hidden xl:block w-44 h-28',
    depth: 15,
    rotate: -4,
  },
  {
    title: 'Princess Mononoke',
    year: '1997',
    style: 'Epic Drama',
    url: 'https://image.tmdb.org/t/p/w1280/eEamz6mFvQ6635xS2W3sRk3iK94.jpg',
    position: 'top-1/2 -translate-y-1/2 right-2 sm:right-4 hidden xl:block w-44 h-28',
    depth: 15,
    rotate: 4,
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBeginStory,
  onOpenVideo,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hasEntered, setHasEntered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || prefersReducedMotion) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion]);

  const spotlightX = (mousePos.x + 0.5) * 100;
  const spotlightY = (mousePos.y + 0.5) * 100;

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseEnter={() => setHasEntered(true)}
      className="relative min-h-[95vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-20 sm:py-28 overflow-hidden bg-[#F7F2E8] paper-grain select-none"
    >
      {/* Dynamic Cursor Spotlight Effect */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700 ease-out"
        style={{
          background: `radial-gradient(650px circle at ${spotlightX}% ${spotlightY}%, rgba(244, 201, 93, 0.16), rgba(232, 77, 60, 0.06) 40%, transparent 80%)`,
          opacity: hasEntered ? 1 : 0.6,
        }}
      />

      {/* Subtle Archival Film Strip Perforations Along Sides */}
      <div className="absolute left-3 top-0 bottom-0 w-3 flex flex-col justify-between py-6 opacity-20 pointer-events-none hidden md:flex">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="w-2.5 h-3.5 rounded-[2px] border border-stone-800 bg-stone-300" />
        ))}
      </div>
      <div className="absolute right-3 top-0 bottom-0 w-3 flex flex-col justify-between py-6 opacity-20 pointer-events-none hidden md:flex">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="w-2.5 h-3.5 rounded-[2px] border border-stone-800 bg-stone-300" />
        ))}
      </div>

      {/* Floating Animated Film Stills / Worlds (Layered Parallax) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden max-w-7xl mx-auto">
        {heroFrames.map((frame, index) => {
          const parallaxX = prefersReducedMotion ? 0 : mousePos.x * frame.depth;
          const parallaxY = prefersReducedMotion ? 0 : mousePos.y * frame.depth;

          return (
            <motion.div
              key={frame.title}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15 * index, ease: 'easeOut' }}
              style={{
                transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0) rotate(${frame.rotate}deg)`,
                transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
              }}
              className={`absolute ${frame.position} z-0 rounded-2xl overflow-hidden shadow-[0_12px_32px_rgba(23,23,23,0.12)] border-2 border-white/80 bg-stone-900 group`}
            >
              <img
                src={frame.url}
                alt={frame.title}
                referrerPolicy="no-referrer"
                loading="eager"
                className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white">
                <span className="font-semibold truncate">{frame.title}</span>
                <span className="text-stone-300 opacity-80">{frame.year}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Center Stage: Hero Editorial Master Title */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Subtle Archival Tagline */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EFE9DC] border border-[#E0D7C6] text-xs font-mono font-medium text-stone-800 mb-6 shadow-sm tracking-wide"
        >
          <span className="w-2 h-2 rounded-full bg-[#E84D3C] animate-pulse" />
          <span>AN INTERACTIVE DIGITAL EXHIBITION • 1892 – 2024</span>
        </motion.div>

        {/* Major Editorial Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif-display font-extrabold tracking-tight text-[#171717] leading-[0.98] mb-5"
        >
          FROM STORYTELLING
          <br />
          <span className="italic font-editorial font-normal text-[#E84D3C] mr-2">
            to
          </span>
          INDUSTRY
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.2 }}
          className="text-xl sm:text-2xl lg:text-3xl font-editorial italic text-stone-700 max-w-2xl leading-relaxed mb-6"
        >
          How animated cinema evolved.
        </motion.p>

        {/* Curatorial Context Premise */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.3 }}
          className="text-sm sm:text-base text-stone-600 font-normal max-w-2xl leading-relaxed mb-10 px-4"
        >
          Step inside a hundred-year visual metamorphosis. Trace how solitary frame-by-frame drawings on paper transformed into a global cinematic artform, revolutionary CGI craft, and a multibillion-dollar cultural phenomenon.
        </motion.p>

        {/* Primary Call to Action Controls */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-3.5 mb-14"
        >
          <button
            onClick={onBeginStory}
            className="group flex items-center gap-3 px-8 py-4 rounded-full bg-[#171717] text-[#F7F2E8] font-medium text-sm hover:bg-[#E84D3C] transition-all duration-300 transform hover:scale-[1.03] shadow-[0_8px_24px_rgba(23,23,23,0.18)]"
          >
            <span>Explore the 117 Masterworks</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>

          {onOpenVideo && (
            <button
              onClick={onOpenVideo}
              className="flex items-center gap-2.5 px-6 py-4 rounded-full bg-[#FFFFFF]/80 hover:bg-[#FFFFFF] border border-[#E0D7C6] text-stone-800 font-medium text-sm transition-all shadow-sm"
            >
              <Play className="w-4 h-4 text-[#E84D3C] fill-[#E84D3C]" />
              <span>Watch 2-Min Exhibition Intro</span>
            </button>
          )}
        </motion.div>

        {/* Archival Evidence Matrix Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.55 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full max-w-3xl border-t border-stone-300/80 pt-8"
        >
          <div className="text-left px-3 py-2">
            <div className="text-2xl sm:text-3xl font-serif-display font-bold text-stone-900">117</div>
            <div className="text-xs font-mono text-stone-500 mt-0.5">Masterwork Canon</div>
          </div>
          <div className="text-left px-3 py-2">
            <div className="text-2xl sm:text-3xl font-serif-display font-bold text-[#E84D3C]">140+</div>
            <div className="text-xs font-mono text-stone-500 mt-0.5">Years of Craft (1880s–2020s)</div>
          </div>
          <div className="text-left px-3 py-2">
            <div className="text-2xl sm:text-3xl font-serif-display font-bold text-[#4F8FE8]">777</div>
            <div className="text-xs font-mono text-stone-500 mt-0.5">Verified Financials</div>
          </div>
          <div className="text-left px-3 py-2">
            <div className="text-2xl sm:text-3xl font-serif-display font-bold text-stone-900">70+</div>
            <div className="text-xs font-mono text-stone-500 mt-0.5">Global Studios & Nations</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
