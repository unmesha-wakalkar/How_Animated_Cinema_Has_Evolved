import React from 'react';
import { Film, BookOpen, Sparkles, Scale, ArrowUp } from 'lucide-react';

interface SourcesFooterProps {
  onOpenSources: () => void;
  onOpenVideo: () => void;
  onOpenCompare: () => void;
}

export const SourcesFooter: React.FC<SourcesFooterProps> = ({
  onOpenSources,
  onOpenVideo,
  onOpenCompare,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-stone-300 bg-[#EFE9DC] text-stone-600 text-xs py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-stone-300/80">
        <div>
          <div className="flex items-center gap-2.5 text-stone-900 font-serif-display font-extrabold text-lg mb-2">
            <div className="w-7 h-7 rounded-xl bg-[#171717] flex items-center justify-center text-[#F7F2E8]">
              <Film className="w-4 h-4 text-[#F4C95D]" />
            </div>
            <span>From Storytelling to Industry</span>
          </div>
          <p className="text-stone-600 max-w-md font-editorial text-sm leading-relaxed">
            An empirical investigation into 140 years of animated cinema: tracking the convergence of handmade artistic technique, digital computation, narrative archetypes, and transnational economics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono">
          <button
            onClick={onOpenSources}
            className="text-stone-700 hover:text-stone-950 transition-colors flex items-center gap-1.5 font-medium"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#E84D3C]" />
            <span>Sources & Methodology</span>
          </button>
          <button
            onClick={onOpenVideo}
            className="text-stone-700 hover:text-stone-950 transition-colors flex items-center gap-1.5 font-medium"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#4F8FE8]" />
            <span>Archival Clips</span>
          </button>
          <button
            onClick={onOpenCompare}
            className="text-stone-700 hover:text-stone-950 transition-colors flex items-center gap-1.5 font-medium"
          >
            <Scale className="w-3.5 h-3.5 text-[#A98BE8]" />
            <span>Compare Matrix</span>
          </button>
          <button
            onClick={scrollToTop}
            className="text-stone-700 hover:text-stone-950 transition-colors flex items-center gap-1.5 ml-2 font-medium"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Top</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-stone-500">
        <div>
          Data Curated from TMDB, BFI, ASIFA, and Complete-Case Academic Publications
        </div>
        <div className="flex items-center gap-4">
          <span>Non-Commercial Educational Research</span>
          <span>•</span>
          <span>Single-Page Editorial Experience</span>
        </div>
      </div>
    </footer>
  );
};
