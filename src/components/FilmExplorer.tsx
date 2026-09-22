import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, Filter, ArrowUpDown, Star, Film as FilmIcon, Plus, Check, RotateCcw, ChevronLeft, ChevronRight, SlidersHorizontal, Eye, X } from 'lucide-react';
import { Film } from '../types';
import { filmsData } from '../data/filmsData';
import { availableDecades, availableStyles, availableStudios, availableEras } from '../data/facetsData';

interface FilmExplorerProps {
  onSelectFilm: (film: Film) => void;
  selectedForCompare: Film[];
  onToggleCompare: (film: Film) => void;
}

export const FilmExplorer: React.FC<FilmExplorerProps> = ({
  onSelectFilm,
  selectedForCompare,
  onToggleCompare,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDecade, setSelectedDecade] = useState('All');
  const [selectedStyle, setSelectedStyle] = useState('All');
  const [selectedStudio, setSelectedStudio] = useState('All');
  const [selectedEra, setSelectedEra] = useState('All');
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'year-asc' | 'year-desc' | 'rating-desc' | 'title-asc'>('year-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(16);
  const [showFiltersDrawer, setShowFiltersDrawer] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: '/' to focus search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
        document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter & Sort Logic
  const filteredFilms = useMemo(() => {
    return filmsData
      .filter((film) => {
        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = film.title.toLowerCase().includes(q);
          const matchDirector = film.director?.toLowerCase().includes(q);
          const matchStudio = film.studio?.toLowerCase().includes(q);
          if (!matchTitle && !matchDirector && !matchStudio) return false;
        }

        // Decade
        if (selectedDecade !== 'All' && film.decade !== selectedDecade) {
          return false;
        }

        // Style
        if (selectedStyle !== 'All' && film.animationStyle !== selectedStyle) {
          return false;
        }

        // Studio
        if (selectedStudio !== 'All') {
          if (!film.studio || !film.studio.toLowerCase().includes(selectedStudio.toLowerCase())) {
            return false;
          }
        }

        // Era
        if (selectedEra !== 'All' && film.era !== selectedEra) {
          return false;
        }

        // Min Rating
        if (minRating > 0 && (film.rating || 0) < minRating) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'year-asc') return a.releaseYear - b.releaseYear;
        if (sortBy === 'year-desc') return b.releaseYear - a.releaseYear;
        if (sortBy === 'rating-desc') return (b.rating || 0) - (a.rating || 0);
        if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
        return 0;
      });
  }, [searchQuery, selectedDecade, selectedStyle, selectedStudio, selectedEra, minRating, sortBy]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedDecade, selectedStyle, selectedStudio, selectedEra, minRating, sortBy, pageSize]);

  // Pagination calculation
  const totalItems = filteredFilms.length;
  const totalPages = pageSize === 0 ? 1 : Math.ceil(totalItems / pageSize);
  const paginatedFilms = useMemo(() => {
    if (pageSize === 0) return filteredFilms;
    const start = (currentPage - 1) * pageSize;
    return filteredFilms.slice(start, start + pageSize);
  }, [filteredFilms, currentPage, pageSize]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedDecade !== 'All' ||
    selectedStyle !== 'All' ||
    selectedStudio !== 'All' ||
    selectedEra !== 'All' ||
    minRating > 0;

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDecade('All');
    setSelectedStyle('All');
    setSelectedStudio('All');
    setSelectedEra('All');
    setMinRating(0);
    setSortBy('year-asc');
  };

  const quickStyles = [
    { label: 'All Styles', value: 'All' },
    { label: '2D Traditional', value: '2D Traditional' },
    { label: '3D CGI', value: '3D CGI' },
    { label: 'Stop-Motion', value: 'Stop-Motion' },
  ];

  return (
    <section id="explore" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Editorial Section Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-stone-300/80 pb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE9DC] text-xs font-mono font-medium text-stone-800 mb-3 tracking-wide">
            <FilmIcon className="w-3.5 h-3.5 text-[#E84D3C]" />
            <span>SECTION 02 • CURATED CANON</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif-display font-extrabold text-[#171717] tracking-tight">
            THE 117 MASTERWORKS
          </h2>
          <p className="text-base sm:text-lg text-stone-600 font-editorial italic mt-2 max-w-2xl leading-relaxed">
            117 films that help trace the evolution of animated cinema.
          </p>
        </div>

        {/* Dynamic Gallery Counter */}
        <div className="flex items-center gap-4 text-xs font-mono text-stone-600 shrink-0">
          <div className="text-right">
            <span className="font-bold text-stone-900 text-sm">{filteredFilms.length}</span> of {filmsData.length} records
            {hasActiveFilters && (
              <span className="text-[#E84D3C] ml-2 block sm:inline font-semibold">(Filtered)</span>
            )}
          </div>
        </div>
      </div>

      {/* Primary Search & Filter Bar */}
      <div className="mb-10 space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
          {/* Instant Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search films, directors, studios... (Press '/' to focus)"
              className="w-full pl-11 pr-10 py-3.5 bg-white border border-stone-300 rounded-2xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#E84D3C]/40 focus:border-[#E84D3C] transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Style Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {quickStyles.map((style) => (
              <button
                key={style.value}
                onClick={() => setSelectedStyle(style.value)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  selectedStyle === style.value
                    ? 'bg-[#171717] text-[#F7F2E8] shadow-sm'
                    : 'bg-white hover:bg-stone-100 border border-stone-300 text-stone-700'
                }`}
              >
                {style.label}
              </button>
            ))}
          </div>

          {/* Filter Refinement Drawer Toggle */}
          <button
            onClick={() => setShowFiltersDrawer(!showFiltersDrawer)}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs font-medium border transition-all ${
              showFiltersDrawer || hasActiveFilters
                ? 'bg-[#EFE9DC] border-stone-400 text-stone-900 font-semibold'
                : 'bg-white hover:bg-stone-100 border-stone-300 text-stone-700'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Refine</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[#E84D3C]" />
            )}
          </button>
        </div>

        {/* Expandable Advanced Filters Tray */}
        {showFiltersDrawer && (
          <div className="bg-white border border-stone-300/80 rounded-2xl p-5 shadow-sm space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
              {/* Decade Filter */}
              <div>
                <label className="block font-mono text-stone-500 mb-1.5 uppercase tracking-wider text-[11px]">
                  Decade
                </label>
                <select
                  value={selectedDecade}
                  onChange={(e) => setSelectedDecade(e.target.value)}
                  className="w-full bg-[#F7F2E8] border border-stone-300 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:border-[#E84D3C]"
                >
                  <option value="All">All Decades (1890s–2020s)</option>
                  {availableDecades.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Studio Filter */}
              <div>
                <label className="block font-mono text-stone-500 mb-1.5 uppercase tracking-wider text-[11px]">
                  Studio
                </label>
                <select
                  value={selectedStudio}
                  onChange={(e) => setSelectedStudio(e.target.value)}
                  className="w-full bg-[#F7F2E8] border border-stone-300 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:border-[#E84D3C]"
                >
                  <option value="All">All Studios</option>
                  {availableStudios.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Historical Era Filter */}
              <div>
                <label className="block font-mono text-stone-500 mb-1.5 uppercase tracking-wider text-[11px]">
                  Historical Era
                </label>
                <select
                  value={selectedEra}
                  onChange={(e) => setSelectedEra(e.target.value)}
                  className="w-full bg-[#F7F2E8] border border-stone-300 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:border-[#E84D3C]"
                >
                  <option value="All">All Historical Eras</option>
                  {availableEras.map((era) => (
                    <option key={era} value={era}>
                      {era}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Order */}
              <div>
                <label className="block font-mono text-stone-500 mb-1.5 uppercase tracking-wider text-[11px]">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full bg-[#F7F2E8] border border-stone-300 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:border-[#E84D3C]"
                >
                  <option value="year-asc">Release Year: Oldest First</option>
                  <option value="year-desc">Release Year: Newest First</option>
                  <option value="rating-desc">Rating: Highest Rated</option>
                  <option value="title-asc">Title: Alphabetical</option>
                </select>
              </div>

              {/* Min Rating */}
              <div>
                <label className="block font-mono text-stone-500 mb-1.5 uppercase tracking-wider text-[11px] flex justify-between">
                  <span>Min Rating</span>
                  <span className="font-bold text-stone-800">{minRating > 0 ? `${minRating.toFixed(1)}+` : 'Any'}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="9.0"
                  step="0.5"
                  value={minRating}
                  onChange={(e) => setMinRating(parseFloat(e.target.value))}
                  className="w-full accent-[#E84D3C] cursor-pointer mt-2"
                />
              </div>
            </div>

            {/* Action Footnote inside Drawer */}
            <div className="flex items-center justify-between pt-3 border-t border-stone-200">
              <span className="text-stone-500 text-[11px] font-mono">
                Real-time multi-facet filtering across 117 landmark productions
              </span>
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-1.5 text-xs text-[#E84D3C] hover:underline font-mono font-medium"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset All Filters</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Film Poster Gallery Grid */}
      {paginatedFilms.length === 0 ? (
        <div className="text-center py-20 bg-white border border-stone-300 rounded-3xl p-8 max-w-md mx-auto">
          <FilmIcon className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <h3 className="font-serif-display font-bold text-lg text-stone-900 mb-1">
            No Films Found
          </h3>
          <p className="text-stone-500 text-xs mb-4">
            No masterworks matched your active search query or filter combination.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-[#171717] text-white text-xs rounded-xl font-medium"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {paginatedFilms.map((film) => {
            const isCompared = selectedForCompare.some((f) => f.id === film.id);

            return (
              <div
                key={film.id}
                onClick={() => onSelectFilm(film)}
                className="group relative cursor-pointer flex flex-col transition-all duration-300 transform hover:-translate-y-1.5"
              >
                {/* Poster Canvas */}
                <div className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden bg-stone-900 shadow-[0_8px_24px_rgba(23,23,23,0.08)] border border-stone-300/80 group-hover:shadow-[0_16px_36px_rgba(23,23,23,0.18)] transition-all duration-500">
                  <img
                    src={film.posterUrl}
                    alt={film.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Gradient Overlay for Editorial Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

                  {/* Quick Compare Action Pill */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleCompare(film);
                    }}
                    title={isCompared ? 'Remove from comparison' : 'Add to side-by-side compare'}
                    className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isCompared
                        ? 'bg-[#4F8FE8] text-white shadow-md'
                        : 'bg-black/50 text-white/90 hover:bg-black/80 hover:text-white backdrop-blur-sm border border-white/20'
                    }`}
                  >
                    {isCompared ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </button>

                  {/* Year & Style Badge */}
                  <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-[#171717]/80 text-[#F4C95D] backdrop-blur-sm border border-white/10">
                      {film.releaseYear}
                    </span>
                  </div>

                  {/* Overlay Metadata Reveal on Hover */}
                  <div className="absolute bottom-3 left-3 right-3 z-10 text-white">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#F4C95D] mb-0.5">
                      {film.animationStyle}
                    </div>
                    <h3 className="font-serif-display font-bold text-sm sm:text-base leading-snug line-clamp-2 text-white group-hover:text-[#F4C95D] transition-colors">
                      {film.title}
                    </h3>
                    <div className="flex items-center justify-between text-[11px] text-stone-300 mt-1.5 pt-1.5 border-t border-white/20">
                      <span className="truncate max-w-[65%]">{film.director || film.studio || 'Archival'}</span>
                      {film.rating ? (
                        <span className="flex items-center gap-1 font-mono font-semibold text-white">
                          <Star className="w-3 h-3 text-[#F4C95D] fill-[#F4C95D]" />
                          {film.rating.toFixed(1)}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* Subtitle Caption Beneath Poster */}
                <div className="mt-2.5 px-1 flex items-baseline justify-between text-xs">
                  <span className="font-medium text-stone-900 truncate pr-2 group-hover:text-[#E84D3C] transition-colors">
                    {film.title}
                  </span>
                  <span className="font-mono text-stone-500 text-[11px] shrink-0">
                    {film.releaseYear}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls & Records per Page */}
      {totalItems > 0 && (
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-stone-300/80 text-xs font-mono text-stone-600">
          {/* Page Size Selector */}
          <div className="flex items-center gap-2">
            <span>Show:</span>
            {[16, 24, 48, 0].map((size) => (
              <button
                key={size}
                onClick={() => setPageSize(size)}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  pageSize === size
                    ? 'bg-[#171717] text-[#F7F2E8] font-bold'
                    : 'bg-white hover:bg-stone-100 border border-stone-300 text-stone-700'
                }`}
              >
                {size === 0 ? 'All 117' : size}
              </button>
            ))}
          </div>

          {/* Navigation Buttons */}
          {pageSize > 0 && totalPages > 1 && (
            <div className="flex items-center gap-3">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-stone-300 text-stone-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-50 transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>

              <span className="font-semibold text-stone-900">
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-stone-300 text-stone-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-50 transition-colors"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
