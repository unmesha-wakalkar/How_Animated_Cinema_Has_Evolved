import React from 'react';
import { X, Scale, Trash2, Star, Building2, User, Clock, DollarSign, Plus } from 'lucide-react';
import { Film } from '../types';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFilms: Film[];
  onRemoveFilm: (filmId: number) => void;
  onClearAll: () => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  selectedFilms,
  onRemoveFilm,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 backdrop-blur-md bg-stone-950/75 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#FBF8F2] text-[#171717] border border-stone-300 rounded-3xl overflow-hidden shadow-2xl my-6 max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between gap-4 shrink-0 bg-[#F7F2E8]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#4F8FE8]/15 border border-[#4F8FE8]/30 flex items-center justify-center text-[#4F8FE8]">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-serif-display font-bold text-stone-900">
                Comparative Film Matrix
              </h2>
              <p className="text-xs text-stone-500 font-mono">
                Cross-era technical, economic, and aesthetic divergence ({selectedFilms.length} of 3 selected)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {selectedFilms.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-stone-600 hover:text-stone-900 font-mono px-3 py-1.5 rounded-xl border border-stone-300 hover:bg-white transition-colors"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {selectedFilms.length === 0 ? (
            <div className="py-20 text-center max-w-md mx-auto">
              <Scale className="w-12 h-12 text-stone-300 mx-auto mb-4" />
              <h3 className="text-lg font-serif-display font-bold text-stone-900 mb-2">
                No Films in Compare Tray
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed mb-6 font-editorial text-sm">
                Click "+ Compare" on any masterwork in the gallery or within a film dossier to evaluate their pipelines, eras, and economics side by side.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-[#171717] text-white text-xs font-semibold hover:bg-stone-800 transition-all"
              >
                Browse Masterworks
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {selectedFilms.map((film) => (
                <div
                  key={film.id}
                  className="bg-white border border-stone-200 rounded-3xl p-5 flex flex-col justify-between relative shadow-sm"
                >
                  {/* Remove control */}
                  <button
                    onClick={() => onRemoveFilm(film.id)}
                    title="Remove from comparison"
                    className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-stone-100 hover:bg-red-50 text-stone-500 hover:text-red-600 border border-stone-200 flex items-center justify-center transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div>
                    {/* Poster thumbnail */}
                    <div className="aspect-[2/3] w-full rounded-2xl overflow-hidden bg-stone-900 mb-4 border border-stone-200 shadow-sm">
                      <img
                        src={film.posterUrl}
                        alt={film.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-mono text-xs font-bold text-[#E84D3C]">
                        {film.releaseYear}
                      </span>
                      <span className="text-stone-300">•</span>
                      <span className="font-mono text-xs text-stone-500">{film.decade}</span>
                    </div>

                    <h3 className="text-lg font-serif-display font-bold text-stone-900 mb-3">
                      {film.title}
                    </h3>

                    {/* Comparison Attributes */}
                    <div className="space-y-3 text-xs border-t border-stone-200 pt-3">
                      <div>
                        <span className="text-stone-400 font-mono block text-[10px] uppercase">
                          Animation Medium
                        </span>
                        <span className="font-semibold text-stone-800">
                          {film.animationStyle}
                        </span>
                      </div>

                      <div>
                        <span className="text-stone-400 font-mono block text-[10px] uppercase">
                          Historical Era
                        </span>
                        <span className="text-stone-700">{film.era}</span>
                      </div>

                      <div>
                        <span className="text-stone-400 font-mono block text-[10px] uppercase">
                          Studio & Unit
                        </span>
                        <span className="text-stone-700">{film.studio || 'Independent'}</span>
                      </div>

                      <div>
                        <span className="text-stone-400 font-mono block text-[10px] uppercase">
                          Director
                        </span>
                        <span className="text-stone-700">{film.director || 'Historical Record'}</span>
                      </div>

                      <div>
                        <span className="text-stone-400 font-mono block text-[10px] uppercase">
                          Consensus Rating
                        </span>
                        <span className="font-mono font-bold text-stone-900">
                          {film.rating ? `${film.rating.toFixed(1)} / 10` : 'N/A'}
                        </span>
                      </div>

                      <div>
                        <span className="text-stone-400 font-mono block text-[10px] uppercase">
                          Budget & Box Office
                        </span>
                        <div className="font-mono text-[11px] text-stone-700">
                          {film.budgetMusd ? `$${film.budgetMusd}M Budget` : 'Archival Budget'}
                          <br />
                          {film.boxOfficeMusd ? `$${film.boxOfficeMusd}M Gross` : 'Archival Gross'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Placeholder slots if less than 3 */}
              {Array.from({ length: 3 - selectedFilms.length }).map((_, idx) => (
                <div
                  key={idx}
                  className="border-2 border-dashed border-stone-300 rounded-3xl p-8 flex flex-col items-center justify-center text-center text-stone-400 min-h-[400px]"
                >
                  <Plus className="w-8 h-8 mb-2 opacity-50 text-stone-400" />
                  <span className="text-xs font-mono">
                    Select another film to compare
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
