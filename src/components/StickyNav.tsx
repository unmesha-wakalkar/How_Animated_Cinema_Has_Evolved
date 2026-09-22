import React, { useState, useEffect } from 'react';
import { Film as FilmIcon, Scale, Menu, X, Play, BookOpen } from 'lucide-react';
import { Film } from '../types';

interface StickyNavProps {
  selectedForCompare: Film[];
  onOpenCompare: () => void;
  onOpenSources: () => void;
  onOpenVideo: () => void;
}

export const StickyNav: React.FC<StickyNavProps> = ({
  selectedForCompare,
  onOpenCompare,
  onOpenSources,
  onOpenVideo,
}) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 30);
      const sections = ['hero', 'explore', 'story', 'technology', 'industry', 'world'];
      const scrollPosition = window.scrollY + 220;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'explore', label: '117 Masterworks' },
    { id: 'story', label: 'Story & History' },
    { id: 'technology', label: 'Technology' },
    { id: 'industry', label: 'Industry & Economics' },
    { id: 'world', label: 'World' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        hasScrolled
          ? 'bg-[#F7F2E8]/95 backdrop-blur-md border-b border-[#E5DDD0] shadow-[0_4px_20px_rgba(23,23,23,0.03)]'
          : 'bg-[#F7F2E8]/80 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-6">
        {/* Editorial Masthead / Logo */}
        <a
          href="#hero"
          className="group flex items-center gap-3 text-stone-900 hover:text-[#E84D3C] transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-[#171717] text-[#F7F2E8] flex items-center justify-center font-serif text-sm font-bold shadow-sm group-hover:bg-[#E84D3C] transition-colors">
            A
          </div>
          <div className="flex flex-col">
            <span className="font-serif-display font-bold text-sm sm:text-base tracking-tight leading-none text-stone-900">
              FROM STORYTELLING TO INDUSTRY
            </span>
            <span className="text-[10px] tracking-widest uppercase font-mono text-stone-500 mt-0.5">
              An Animated Cinema Exhibition
            </span>
          </div>
        </a>

        {/* Primary Editorial Navigation (Desktop) */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2 text-xs lg:text-sm font-medium">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`px-3 py-1.5 rounded-full transition-all duration-200 ${
                activeSection === item.id
                  ? 'bg-[#171717] text-[#F7F2E8] shadow-sm font-semibold'
                  : 'text-stone-600 hover:text-stone-950 hover:bg-[#EFE9DC]'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Utility Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Comparison Trigger if items added */}
          {selectedForCompare.length > 0 && (
            <button
              onClick={onOpenCompare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#4F8FE8] text-white text-xs font-mono font-semibold shadow-sm hover:bg-[#3d7ed6] transition-all transform hover:scale-105"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Compare ({selectedForCompare.length})</span>
            </button>
          )}

          {/* Video Prologue Pill */}
          <button
            onClick={onOpenVideo}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EFE9DC] hover:bg-[#E5DDD0] text-stone-800 text-xs font-mono transition-colors"
            title="Watch 2-Minute Exhibition Orientation"
          >
            <Play className="w-3 h-3 text-[#E84D3C] fill-[#E84D3C]" />
            <span>Orientation</span>
          </button>

          {/* Sources Link */}
          <button
            onClick={onOpenSources}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-stone-600 hover:text-stone-900 text-xs font-mono transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Sources</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-stone-800 hover:bg-[#EFE9DC] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F7F2E8] border-b border-[#E5DDD0] px-4 py-4 space-y-2 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
                activeSection === item.id
                  ? 'bg-[#171717] text-[#F7F2E8]'
                  : 'text-stone-700 hover:bg-[#EFE9DC]'
              }`}
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2 border-t border-[#E5DDD0] flex items-center justify-between text-xs font-mono text-stone-600">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVideo();
              }}
              className="flex items-center gap-1.5 py-1 text-[#E84D3C]"
            >
              <Play className="w-3.5 h-3.5 fill-[#E84D3C]" />
              Orientation Video
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSources();
              }}
              className="flex items-center gap-1.5 py-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Sources & Methodology
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
