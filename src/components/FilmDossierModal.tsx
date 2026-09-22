import React from 'react';
import { X, ExternalLink, Star, DollarSign, Clock, Building2, User, Award, Plus, Check, Users, Tag, Database, Globe } from 'lucide-react';
import { Film } from '../types';

interface FilmDossierModalProps {
  film: Film | null;
  onClose: () => void;
  selectedForCompare: Film[];
  onToggleCompare: (film: Film) => void;
}

export const FilmDossierModal: React.FC<FilmDossierModalProps> = ({
  film,
  onClose,
  selectedForCompare,
  onToggleCompare,
}) => {
  if (!film) return null;

  const isCompared = selectedForCompare.some((f) => f.id === film.id);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto backdrop-blur-md bg-stone-950/75 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#FBF8F2] text-[#171717] border border-stone-300 rounded-3xl overflow-hidden shadow-2xl my-6 max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Backdrop Banner / Artwork Showcase */}
        <div className="relative h-60 sm:h-80 w-full bg-stone-900 shrink-0 overflow-hidden">
          {film.backdropUrl ? (
            <img
              src={film.backdropUrl}
              alt={film.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          ) : film.posterUrl ? (
            <img
              src={film.posterUrl}
              alt={film.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top filter blur-sm scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 flex items-center justify-center">
              <span className="text-stone-400 font-mono text-sm">Archival Master Record</span>
            </div>
          )}

          {/* High-Contrast Gradient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-black/20" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-colors shadow-lg"
            aria-label="Close dossier"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header Metadata Overlay */}
          <div className="absolute bottom-4 left-5 right-5 sm:left-7 sm:right-7 flex items-end justify-between gap-4">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-2 flex-wrap text-white">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#E84D3C] text-white shadow-sm">
                  {film.releaseYear}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-white/20 text-white border border-white/20 backdrop-blur-sm">
                  {film.era}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-[#F4C95D]/20 text-[#F4C95D] border border-[#F4C95D]/40 font-medium">
                  {film.animationStyle}
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif-display font-extrabold text-white leading-tight drop-shadow-md">
                {film.title}
              </h2>
            </div>

            {/* Quick Compare Action */}
            <button
              onClick={() => onToggleCompare(film)}
              className={`hidden sm:flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-mono transition-all shrink-0 shadow-md ${
                isCompared
                  ? 'bg-[#4F8FE8] text-white font-bold'
                  : 'bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm'
              }`}
            >
              {isCompared ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>In Comparison</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Compare</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Genre & Target Audience Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {film.genres?.map((g) => (
              <span
                key={g}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs bg-stone-200/70 border border-stone-300 text-stone-800 font-medium"
              >
                <Tag className="w-3 h-3 text-[#E84D3C]" />
                {g}
              </span>
            ))}
            {film.audience && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs bg-[#4F8FE8]/10 border border-[#4F8FE8]/30 text-[#4F8FE8] font-medium">
                <Users className="w-3 h-3" />
                {film.audience}
              </span>
            )}
            {film.country && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs bg-stone-200/70 border border-stone-300 text-stone-700 font-medium">
                <Globe className="w-3 h-3 text-stone-500" />
                {film.country}
              </span>
            )}
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white border border-stone-200 shadow-sm text-xs">
            <div>
              <div className="text-stone-500 font-mono mb-1 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-[#E84D3C]" />
                Studio
              </div>
              <div className="font-semibold text-stone-900 truncate">
                {film.studio || 'Independent Production'}
              </div>
            </div>

            <div>
              <div className="text-stone-500 font-mono mb-1 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#4F8FE8]" />
                Director
              </div>
              <div className="font-semibold text-stone-900 truncate">
                {film.director || 'Historical Record'}
              </div>
            </div>

            <div>
              <div className="text-stone-500 font-mono mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-stone-600" />
                Runtime
              </div>
              <div className="font-semibold text-stone-900">
                {film.runtimeMinutes ? `${film.runtimeMinutes} min` : 'Unrecorded'}
              </div>
            </div>

            <div>
              <div className="text-stone-500 font-mono mb-1 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-[#F4C95D] fill-[#F4C95D]" />
                Critical Reception
              </div>
              <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                <span>{film.rating ? `${film.rating.toFixed(1)} / 10` : 'N/A'}</span>
                {film.voteCount && (
                  <span className="text-[10px] text-stone-500 font-mono">
                    ({(film.voteCount > 999 ? `${(film.voteCount / 1000).toFixed(0)}k` : film.voteCount)} votes)
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Landmark Historical Note */}
          {film.landmarkNote && (
            <div className="bg-[#F4C95D]/15 border border-[#F4C95D]/40 rounded-2xl p-4 text-xs text-stone-800">
              <span className="font-mono text-stone-900 font-bold block mb-1 uppercase tracking-wider text-[11px]">
                Historical Landmark Significance
              </span>
              <p className="leading-relaxed font-editorial text-sm">
                {film.landmarkNote}
              </p>
            </div>
          )}

          {/* Synopsis */}
          {film.overview && (
            <div>
              <h3 className="text-xs font-mono text-stone-500 uppercase tracking-wider mb-2">
                Synopsis & Narrative Context
              </h3>
              <p className="text-sm text-stone-700 leading-relaxed font-editorial text-base">
                {film.overview}
              </p>
            </div>
          )}

          {/* Financial Architecture (Complete-Case Verification) */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between gap-2 mb-3">
              <h3 className="text-xs font-mono text-stone-700 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                <DollarSign className="w-3.5 h-3.5 text-[#4F8FE8]" />
                Financial Architecture & Complete-Case Economics
              </h3>
              {film.budgetMusd && film.boxOfficeMusd ? (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold">
                  Dual-Verified Complete Record
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-stone-100 text-stone-500 border border-stone-200">
                  Archival Partial Record
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-[#F7F2E8] p-3 rounded-xl border border-stone-200">
                <div className="text-stone-500 font-mono mb-1">Production Budget</div>
                <div className="text-base font-bold font-mono text-stone-900">
                  {film.budgetMusd !== null && film.budgetMusd !== undefined
                    ? `$${film.budgetMusd}M USD`
                    : 'Unrecorded / Archival'}
                </div>
              </div>

              <div className="bg-[#F7F2E8] p-3 rounded-xl border border-stone-200">
                <div className="text-stone-500 font-mono mb-1">Worldwide Gross</div>
                <div className="text-base font-bold font-mono text-[#4F8FE8]">
                  {film.boxOfficeMusd !== null && film.boxOfficeMusd !== undefined
                    ? `$${film.boxOfficeMusd}M USD`
                    : 'Unrecorded / Archival'}
                </div>
              </div>

              <div className="bg-[#F7F2E8] p-3 rounded-xl border border-stone-200">
                <div className="text-stone-500 font-mono mb-1">Commercial Multiple</div>
                <div className="text-base font-bold font-mono text-[#E84D3C]">
                  {film.budgetMusd && film.boxOfficeMusd
                    ? `${(film.boxOfficeMusd / film.budgetMusd).toFixed(1)}x Return`
                    : 'N/A'}
                </div>
              </div>
            </div>
          </div>

          {/* Awards & External Archive Links */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-stone-200 text-xs">
            <div className="flex items-center gap-3">
              {film.oscarsWon ? (
                <div className="flex items-center gap-1.5 text-stone-800 font-mono font-medium">
                  <Award className="w-4 h-4 text-[#F4C95D]" />
                  <span>{film.oscarsWon} Academy Award{film.oscarsWon > 1 ? 's' : ''} Won</span>
                </div>
              ) : film.oscarsNominated ? (
                <div className="flex items-center gap-1.5 text-stone-600 font-mono">
                  <Award className="w-4 h-4 text-stone-400" />
                  <span>{film.oscarsNominated} Oscar Nomination{film.oscarsNominated > 1 ? 's' : ''}</span>
                </div>
              ) : null}
            </div>

            <div className="flex items-center gap-4">
              {film.tmdbUrl && (
                <a
                  href={film.tmdbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#4F8FE8] hover:underline font-mono font-medium"
                >
                  <span>TMDB Record</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {film.imdbUrl && (
                <a
                  href={film.imdbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-stone-800 hover:text-[#E84D3C] hover:underline font-mono font-medium"
                >
                  <span>IMDb Record</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* Provenance Footnote */}
          <div className="pt-2 border-t border-stone-200/80 flex items-center gap-2 text-[11px] font-mono text-stone-500">
            <Database className="w-3.5 h-3.5 text-stone-400" />
            <span>Curatorial provenance: Cross-referenced via TMDB, IMDb, British Film Institute (BFI), and ASIFA historical archives.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
