import React, { useState } from 'react';
import { Calendar, ChevronRight, Filter, Film as FilmIcon } from 'lucide-react';
import { HistoricalMilestone, Film } from '../types';
import { historicalMilestones } from '../data/historicalTimeline';
import { filmsData } from '../data/filmsData';

interface TimelineSectionProps {
  onSelectMilestone: (milestone: HistoricalMilestone) => void;
  onSelectFilm: (film: Film) => void;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({
  onSelectMilestone,
  onSelectFilm,
}) => {
  const [selectedStyleFilter, setSelectedStyleFilter] = useState<string>('All');
  const [selectedDecadeSpan, setSelectedDecadeSpan] = useState<string>('All');

  const decades = [
    { label: 'All Eras', value: 'All' },
    { label: '1830s–1920s (Pioneering & Silent)', value: 'early' },
    { label: '1930s–1950s (Golden Age)', value: 'golden' },
    { label: '1960s–1980s (Post-War & Bronze)', value: 'mid' },
    { label: '1990s–2000s (Renaissance & CGI Dawn)', value: 'cgi' },
    { label: '2010s–2020s (Modern & Hybrid)', value: 'modern' },
  ];

  const filteredMilestones = historicalMilestones.filter((m) => {
    if (selectedDecadeSpan === 'early') return m.year <= 1929;
    if (selectedDecadeSpan === 'golden') return m.year >= 1930 && m.year <= 1959;
    if (selectedDecadeSpan === 'mid') return m.year >= 1960 && m.year <= 1989;
    if (selectedDecadeSpan === 'cgi') return m.year >= 1990 && m.year <= 2009;
    if (selectedDecadeSpan === 'modern') return m.year >= 2010;
    return true;
  });

  const landmarkFilms = filmsData.filter((f) => {
    const matchStyle = selectedStyleFilter === 'All' || f.animationStyle === selectedStyleFilter;
    let matchEra = true;
    if (selectedDecadeSpan === 'early') matchEra = f.releaseYear <= 1929;
    if (selectedDecadeSpan === 'golden') matchEra = f.releaseYear >= 1930 && f.releaseYear <= 1959;
    if (selectedDecadeSpan === 'mid') matchEra = f.releaseYear >= 1960 && f.releaseYear <= 1989;
    if (selectedDecadeSpan === 'cgi') matchEra = f.releaseYear >= 1990 && f.releaseYear <= 2009;
    if (selectedDecadeSpan === 'modern') matchEra = f.releaseYear >= 2010;
    return matchStyle && matchEra && (f.landmarkNote || (f.rating ?? 0) >= 8.0 || f.releaseYear < 1930);
  });

  return (
    <section id="story" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-stone-300/80 relative scroll-mt-20">
      {/* Anchor for backward compatibility */}
      <span id="timeline" className="absolute -top-20" />

      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE9DC] text-xs font-mono font-medium text-stone-800 mb-3 tracking-wide">
          <Calendar className="w-3.5 h-3.5 text-[#E84D3C]" />
          <span>SECTION 03 • THE HISTORICAL CONTINUUM (1832 – 2024)</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif-display font-extrabold text-[#171717] tracking-tight mb-4">
          From Illusion to Global Language
        </h2>
        <p className="text-base sm:text-lg text-stone-600 font-editorial italic leading-relaxed">
          Traverse 19 foundational breakthroughs in optical physics, cel layering, sound synthesis, and digital computing alongside contemporaneous landmark releases.
        </p>
      </div>

      {/* Filter Toolbar (Editorial Paper Styling) */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-stone-200 shadow-sm rounded-2xl p-4 mb-14">
        {/* Era Selector */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-stone-500 font-mono flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3 text-[#E84D3C]" />
            Epoch:
          </span>
          {decades.map((d) => (
            <button
              key={d.value}
              onClick={() => setSelectedDecadeSpan(d.value)}
              className={`px-3 py-1.5 rounded-xl text-xs transition-all ${
                selectedDecadeSpan === d.value
                  ? 'bg-[#171717] text-[#F7F2E8] font-semibold shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Style Selector */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-stone-500 font-mono mr-1">Style:</span>
          {['All', '2D Traditional', '3D CGI', 'Stop-Motion'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStyleFilter(st)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                selectedStyleFilter === st
                  ? 'bg-[#4F8FE8] text-white font-medium shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 bg-stone-100'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="relative">
        {/* Central Vertical Spine Line */}
        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#F4C95D] via-[#E84D3C] to-[#4F8FE8] -translate-x-1/2 opacity-35 pointer-events-none" />

        <div className="space-y-12 relative">
          {filteredMilestones.map((m, idx) => {
            const isEven = idx % 2 === 0;
            const relatedFilms = landmarkFilms.filter(
              (f) => Math.abs(f.releaseYear - m.year) <= (m.year < 1920 ? 6 : m.year < 1980 ? 4 : 2)
            );

            return (
              <div
                key={m.title}
                className={`relative flex flex-col sm:flex-row items-start gap-8 ${
                  isEven ? 'sm:flex-row-reverse' : ''
                }`}
              >
                {/* Year Marker on Central Spine */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-0 z-20 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#171717] border-2 border-[#E84D3C] shadow-md flex items-center justify-center font-mono text-xs font-bold text-[#F7F2E8]">
                    {m.year.toString().slice(2)}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#E84D3C] mt-1 bg-white px-1.5 py-0.5 rounded shadow-sm border border-stone-200">
                    {m.year}
                  </span>
                </div>

                {/* Milestone Card */}
                <div className="w-full sm:w-[calc(50%-2.5rem)] pl-12 sm:pl-0">
                  <div
                    onClick={() => onSelectMilestone(m)}
                    className="group bg-white hover:bg-[#FFFDF9] border border-stone-200 hover:border-[#E84D3C]/60 rounded-3xl p-6 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-xl"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#EFE9DC] text-stone-800 font-medium">
                        {m.type}
                      </span>
                      <span className="text-xs text-stone-400 font-mono flex items-center gap-1 group-hover:text-[#E84D3C] transition-colors">
                        Details
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    <h3 className="text-xl font-serif-display font-bold text-[#171717] mb-2 group-hover:text-[#E84D3C] transition-colors">
                      {m.title}
                    </h3>

                    <p className="text-sm text-stone-600 font-editorial text-base leading-relaxed mb-4 line-clamp-3">
                      {m.description}
                    </p>

                    {m.significance && (
                      <div className="bg-[#F7F2E8] border-l-2 border-[#E84D3C] pl-3 py-2 text-xs text-stone-700 italic font-editorial">
                        "{m.significance}"
                      </div>
                    )}

                    <div className="mt-4 pt-3 border-t border-stone-200/80 flex items-center justify-between text-xs text-stone-500 font-mono">
                      <span>Source: {m.source}</span>
                      {m.keyFigure && <span className="text-stone-800 font-medium">Pioneer: {m.keyFigure}</span>}
                    </div>
                  </div>
                </div>

                {/* Contemporaneous Landmark Film Chips */}
                <div className="w-full sm:w-[calc(50%-2.5rem)] pl-12 sm:pl-0 sm:pt-2">
                  {relatedFilms.length > 0 ? (
                    <div className="space-y-3">
                      <div className="text-[11px] font-mono text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                        <FilmIcon className="w-3 h-3 text-[#4F8FE8]" />
                        Contemporaneous Works ({relatedFilms.length})
                      </div>
                      <div className="grid grid-cols-1 gap-2.5">
                        {relatedFilms.slice(0, 2).map((film) => (
                          <div
                            key={film.id}
                            onClick={() => onSelectFilm(film)}
                            className="flex items-center gap-3 bg-white hover:bg-stone-50 border border-stone-200 rounded-2xl p-2.5 transition-all cursor-pointer group shadow-sm"
                          >
                            <img
                              src={film.posterUrl}
                              alt={film.title}
                              referrerPolicy="no-referrer"
                              className="w-10 h-14 object-cover rounded-lg bg-stone-200 shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-1">
                                <h4 className="text-sm font-semibold text-stone-900 truncate group-hover:text-[#E84D3C] transition-colors">
                                  {film.title}
                                </h4>
                                <span className="text-xs font-mono font-bold text-[#E84D3C] shrink-0">
                                  {film.releaseYear}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5 font-mono">
                                <span>{film.studio || 'Independent'}</span>
                                <span>•</span>
                                <span className="text-stone-600">{film.animationStyle}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex items-center">
                      <div className="text-xs text-stone-400 font-mono pl-4 italic">
                        Archival technical milestone without direct contemporaneous feature release
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
