import React from 'react';
import { X, ExternalLink, Calendar, User, Sparkles, BookOpen } from 'lucide-react';
import { HistoricalMilestone } from '../types';

interface MilestoneModalProps {
  milestone: HistoricalMilestone | null;
  onClose: () => void;
}

export const MilestoneModal: React.FC<MilestoneModalProps> = ({ milestone, onClose }) => {
  if (!milestone) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 backdrop-blur-md bg-stone-950/75 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#FBF8F2] text-[#171717] border border-stone-300 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Milestone Header */}
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#E84D3C] text-white">
            {milestone.year}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-stone-200 text-stone-800 border border-stone-300">
            {milestone.type}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-serif-display font-extrabold text-stone-900 mb-4">
          {milestone.title}
        </h2>

        {/* Description */}
        <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-editorial mb-6">
          {milestone.description}
        </p>

        {/* Significance */}
        {milestone.significance && (
          <div className="bg-[#F4C95D]/20 border-l-2 border-[#E84D3C] p-4 rounded-r-2xl mb-6 text-sm text-stone-800">
            <span className="font-mono text-xs text-[#E84D3C] font-bold block mb-1 uppercase tracking-wider">
              Historical & Technical Impact
            </span>
            <p className="font-editorial text-sm leading-relaxed">
              {milestone.significance}
            </p>
          </div>
        )}

        {/* Key figures and source */}
        <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          {milestone.keyFigure && (
            <div className="flex items-center gap-1.5 text-stone-800">
              <User className="w-3.5 h-3.5 text-[#4F8FE8]" />
              <span>Pioneer / Inventor: <strong>{milestone.keyFigure}</strong></span>
            </div>
          )}

          <div className="flex items-center gap-3">
            <span className="text-stone-500">Source: {milestone.source}</span>
            {milestone.url && (
              <a
                href={milestone.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#4F8FE8] hover:underline font-medium"
              >
                <span>Reference</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
