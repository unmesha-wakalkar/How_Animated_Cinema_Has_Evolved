import React, { useState } from 'react';
import { DollarSign, AlertTriangle, TrendingUp, Info, BarChart2, Eye } from 'lucide-react';
import { storyMetrics } from '../data/storyMetrics';

interface CompleteCaseFilm {
  id: string;
  title: string;
  year: number;
  studio: string;
  budget: number;
  gross: number;
  roi: number;
  style: '2D Traditional' | '3D CGI' | 'Stop-Motion';
}

const verifiedDataset: CompleteCaseFilm[] = [
  { id: '1', title: 'The Lion King', year: 1994, studio: 'Disney', budget: 45, gross: 968.5, roi: 21.5, style: '2D Traditional' },
  { id: '2', title: 'Spirited Away', year: 2001, studio: 'Studio Ghibli', budget: 19, gross: 395.8, roi: 20.8, style: '2D Traditional' },
  { id: '3', title: 'Toy Story', year: 1995, studio: 'Pixar', budget: 30, gross: 362.0, roi: 12.1, style: '3D CGI' },
  { id: '4', title: 'Finding Nemo', year: 2003, studio: 'Pixar', budget: 94, gross: 895.6, roi: 9.5, style: '3D CGI' },
  { id: '5', title: 'Shrek 2', year: 2004, studio: 'DreamWorks', budget: 150, gross: 935.3, roi: 6.2, style: '3D CGI' },
  { id: '6', title: 'Frozen', year: 2013, studio: 'Disney', budget: 150, gross: 1284.5, roi: 8.6, style: '3D CGI' },
  { id: '7', title: 'Inside Out 2', year: 2024, studio: 'Pixar', budget: 200, gross: 1698.0, roi: 8.5, style: '3D CGI' },
  { id: '8', title: 'Chicken Run', year: 2000, studio: 'Aardman', budget: 45, gross: 227.8, roi: 5.1, style: 'Stop-Motion' },
  { id: '9', title: 'Toy Story 2', year: 1999, studio: 'Pixar', budget: 90, gross: 485.0, roi: 5.4, style: '3D CGI' },
  { id: '10', title: 'Monsters, Inc.', year: 2001, studio: 'Pixar', budget: 115, gross: 528.8, roi: 4.6, style: '3D CGI' },
  { id: '11', title: 'The Incredibles', year: 2004, studio: 'Pixar', budget: 92, gross: 631.4, roi: 6.9, style: '3D CGI' },
  { id: '12', title: 'WALL-E', year: 2008, studio: 'Pixar', budget: 180, gross: 521.3, roi: 2.9, style: '3D CGI' },
  { id: '13', title: 'Up', year: 2009, studio: 'Pixar', budget: 175, gross: 735.1, roi: 4.2, style: '3D CGI' },
  { id: '14', title: 'Toy Story 3', year: 2010, studio: 'Pixar', budget: 200, gross: 1067.0, roi: 5.3, style: '3D CGI' },
  { id: '15', title: 'Beauty and the Beast', year: 1991, studio: 'Disney', budget: 25, gross: 425.0, roi: 17.0, style: '2D Traditional' },
  { id: '16', title: 'Aladdin', year: 1992, studio: 'Disney', budget: 28, gross: 504.1, roi: 18.0, style: '2D Traditional' },
  { id: '17', title: 'Princess Mononoke', year: 1997, studio: 'Studio Ghibli', budget: 23.5, gross: 170.0, roi: 7.2, style: '2D Traditional' },
  { id: '18', title: 'Spider-Man: Into the Spider-Verse', year: 2018, studio: 'Sony Pictures', budget: 90, gross: 384.3, roi: 4.3, style: '3D CGI' },
  { id: '19', title: 'Coraline', year: 2009, studio: 'Laika', budget: 60, gross: 124.6, roi: 2.1, style: 'Stop-Motion' },
  { id: '20', title: 'The Nightmare Before Christmas', year: 1993, studio: 'Touchstone/Skellington', budget: 18, gross: 91.5, roi: 5.1, style: 'Stop-Motion' },
];

export const BusinessSection: React.FC = () => {
  const metrics = storyMetrics.budget_boxoffice;
  const [hoveredFilm, setHoveredFilm] = useState<CompleteCaseFilm | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filteredFilms = verifiedDataset.filter((f) => {
    if (activeFilter === 'All') return true;
    return f.style === activeFilter;
  });

  // Scatter plot coordinate helpers
  // Budget domain: 0 to 220
  // Gross domain: 0 to 1800
  const svgWidth = 640;
  const svgHeight = 360;
  const padding = { left: 60, right: 30, top: 30, bottom: 50 };

  const getX = (budget: number) => {
    const minB = 10;
    const maxB = 220;
    const ratio = (budget - minB) / (maxB - minB);
    return padding.left + ratio * (svgWidth - padding.left - padding.right);
  };

  const getY = (gross: number) => {
    const minG = 0;
    const maxG = 1800;
    const ratio = (gross - minG) / (maxG - minG);
    return svgHeight - padding.bottom - ratio * (svgHeight - padding.top - padding.bottom);
  };

  return (
    <section id="business" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10 relative">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#FF5E5E] mb-3">
          <DollarSign className="w-3.5 h-3.5" />
          <span>FINANCIAL ARCHITECTURE & COMPLETE-CASE ANALYSIS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight mb-4">
          The Business of Moving Drawings
        </h2>
        <p className="text-base text-zinc-400 font-light leading-relaxed">
          Animation transitioned from modest novelty shorts to the most capital-intensive, high-return segment of the global entertainment economy.
        </p>
      </div>

      {/* Non-Negotiable Data Discipline Banner */}
      <div className="bg-zinc-950/90 border border-[#FF5E5E]/30 rounded-2xl p-6 max-w-4xl mx-auto mb-12 shadow-xl">
        <div className="flex items-start gap-4">
          <AlertTriangle className="w-5 h-5 text-[#FF5E5E] shrink-0 mt-0.5" />
          <div className="text-xs text-zinc-300 leading-relaxed space-y-1.5">
            <strong className="text-white text-sm block">
              Methodological Discipline: Complete-Case Filtering Only
            </strong>
            <p>
              Commercial financial fields are sparse across historical records. Out of 25,390 cataloged titles, exactly{' '}
              <span className="font-mono text-[#FFB84D] font-bold">{metrics.both_count} titles</span> possess fully verified complete records for both Production Budget and Worldwide Box Office. Missing values are never imputed or displayed as zero, preserving historical integrity.
            </p>
            <div className="pt-2 text-[11px] font-mono text-zinc-400 flex flex-wrap gap-4 border-t border-white/10">
              <span>Budget Coverage: 1,458 / 25,390 (5.7%)</span>
              <span>•</span>
              <span>Box Office Coverage: 1,642 / 25,390 (6.5%)</span>
              <span>•</span>
              <span className="text-[#FFB84D]">Dual Complete Pairs: 777 / 25,390 (3.1%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Economic Macro Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="bg-zinc-950/70 border border-white/10 p-6 rounded-2xl">
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">
            Median Complete-Case Budget
          </div>
          <div className="text-3xl font-display font-extrabold text-white">
            ${metrics.median_budget_musd}M USD
          </div>
          <div className="text-xs text-zinc-400 mt-2 font-mono">
            {metrics.budget_count.toLocaleString()} verified budget reports
          </div>
        </div>

        <div className="bg-zinc-950/70 border border-white/10 p-6 rounded-2xl">
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">
            Median Complete-Case Box Office
          </div>
          <div className="text-3xl font-display font-extrabold text-[#6EA8FF]">
            ${metrics.median_boxoffice_musd}M USD
          </div>
          <div className="text-xs text-zinc-400 mt-2 font-mono">
            {metrics.box_office_count.toLocaleString()} verified box office receipts
          </div>
        </div>

        <div className="bg-zinc-950/70 border border-white/10 p-6 rounded-2xl">
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">
            Complete-Case Sample
          </div>
          <div className="text-3xl font-display font-extrabold text-[#FFB84D]">
            {metrics.both_count} Films
          </div>
          <div className="text-xs text-zinc-400 mt-2 font-mono">
            Dual budget + revenue confirmation
          </div>
        </div>
      </div>

      {/* Interactive Budget vs Box Office Scatter Plot */}
      <div className="bg-zinc-950/80 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl mb-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
          <div>
            <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-[#6EA8FF]" />
              Production Budget vs. Worldwide Box Office
            </h3>
            <p className="text-xs text-zinc-400 font-light mt-0.5">
              Verified complete-case sample (n={verifiedDataset.length} landmark masterworks). Hover points to inspect financial specifics.
            </p>
          </div>

          {/* Style Filter */}
          <div className="flex items-center gap-2">
            {['All', '2D Traditional', '3D CGI', 'Stop-Motion'].map((st) => (
              <button
                key={st}
                onClick={() => setActiveFilter(st)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  activeFilter === st
                    ? 'bg-white/20 text-white font-semibold border border-white/30'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {st === '2D Traditional' ? '2D' : st === '3D CGI' ? '3D' : st === 'Stop-Motion' ? 'Stop-Mo' : 'All'}
              </button>
            ))}
          </div>
        </div>

        {/* SVG Scatter Plot Graphic */}
        <div className="relative w-full overflow-x-auto">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-auto min-w-[560px] select-none"
          >
            {/* Grid Lines */}
            {[0, 400, 800, 1200, 1600].map((val) => {
              const y = getY(val);
              return (
                <g key={val}>
                  <line
                    x1={padding.left}
                    y1={y}
                    x2={svgWidth - padding.right}
                    y2={y}
                    stroke="rgba(255,255,255,0.06)"
                    strokeDasharray="3 3"
                  />
                  <text
                    x={padding.left - 10}
                    y={y + 4}
                    fill="#71717a"
                    fontSize="10"
                    textAnchor="end"
                    fontFamily="monospace"
                  >
                    ${val}M
                  </text>
                </g>
              );
            })}

            {[20, 60, 100, 140, 180, 220].map((val) => {
              const x = getX(val);
              return (
                <g key={val}>
                  <line
                    x1={x}
                    y1={padding.top}
                    x2={x}
                    y2={svgHeight - padding.bottom}
                    stroke="rgba(255,255,255,0.06)"
                    strokeDasharray="3 3"
                  />
                  <text
                    x={x}
                    y={svgHeight - padding.bottom + 18}
                    fill="#71717a"
                    fontSize="10"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    ${val}M
                  </text>
                </g>
              );
            })}

            {/* Axis Labels */}
            <text
              x={svgWidth / 2}
              y={svgHeight - 10}
              fill="#a1a1aa"
              fontSize="11"
              textAnchor="middle"
              fontFamily="monospace"
            >
              Production Budget (Millions USD)
            </text>

            <text
              transform={`rotate(-90) translate(-${svgHeight / 2}, 18)`}
              fill="#a1a1aa"
              fontSize="11"
              textAnchor="middle"
              fontFamily="monospace"
            >
              Worldwide Box Office (Millions USD)
            </text>

            {/* Benchmark 5x ROI Guide Line */}
            <line
              x1={getX(20)}
              y1={getY(100)}
              x2={getX(220)}
              y2={getY(1100)}
              stroke="rgba(255, 184, 77, 0.25)"
              strokeDasharray="4 4"
              strokeWidth="1.5"
            />
            <text
              x={getX(190)}
              y={getY(980)}
              fill="#FFB84D"
              fontSize="9"
              fontFamily="monospace"
              opacity="0.8"
            >
              5x ROI Trajectory
            </text>

            {/* Scatter Circles */}
            {filteredFilms.map((film) => {
              const cx = getX(film.budget);
              const cy = getY(film.gross);
              const isHovered = hoveredFilm?.id === film.id;
              const fillColor =
                film.style === '2D Traditional'
                  ? '#FFB84D'
                  : film.style === '3D CGI'
                  ? '#6EA8FF'
                  : '#9B7CFF';

              return (
                <g
                  key={film.id}
                  className="cursor-pointer transition-transform"
                  onMouseEnter={() => setHoveredFilm(film)}
                  onMouseLeave={() => setHoveredFilm(null)}
                >
                  {isHovered && (
                    <circle
                      cx={cx}
                      cy={cy}
                      r="14"
                      fill={fillColor}
                      opacity="0.25"
                      className="animate-pulse"
                    />
                  )}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isHovered ? 7 : 5}
                    fill={fillColor}
                    stroke="#070707"
                    strokeWidth="1.5"
                    className="transition-all duration-200"
                  />
                </g>
              );
            })}
          </svg>

          {/* Active Hover Floating Card */}
          {hoveredFilm && (
            <div className="absolute top-4 right-4 bg-zinc-950/95 border border-white/20 rounded-xl p-4 shadow-2xl backdrop-blur-md max-w-xs text-xs">
              <div className="flex items-center gap-2 mb-1 font-mono text-[11px]">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor:
                      hoveredFilm.style === '2D Traditional'
                        ? '#FFB84D'
                        : hoveredFilm.style === '3D CGI'
                        ? '#6EA8FF'
                        : '#9B7CFF',
                  }}
                />
                <span className="text-zinc-400">{hoveredFilm.year} • {hoveredFilm.style}</span>
              </div>
              <h4 className="font-display font-bold text-white text-sm mb-1">{hoveredFilm.title}</h4>
              <div className="text-zinc-400 font-mono text-[11px] mb-2">{hoveredFilm.studio}</div>
              <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-2 font-mono">
                <div>
                  <div className="text-zinc-500 text-[10px]">Budget</div>
                  <div className="font-bold text-white">${hoveredFilm.budget}M</div>
                </div>
                <div>
                  <div className="text-zinc-500 text-[10px]">Gross</div>
                  <div className="font-bold text-[#6EA8FF]">${hoveredFilm.gross}M</div>
                </div>
                <div>
                  <div className="text-zinc-500 text-[10px]">Return</div>
                  <div className="font-bold text-[#FFB84D]">{hoveredFilm.roi}x</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Verified Landmark Productions ROI Matrix */}
      <div className="bg-zinc-950/80 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
          <div>
            <h3 className="text-xl font-display font-bold text-white">
              Landmark Complete-Case ROI Multipliers
            </h3>
            <p className="text-xs text-zinc-400 font-light mt-0.5">
              Production budget vs worldwide theatrical gross across eras and animation mediums.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#FFB84D]" /> 2D</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#6EA8FF]" /> 3D</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#9B7CFF]" /> Stop-Motion</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {verifiedDataset.slice(0, 8).map((item) => (
            <div
              key={item.title}
              className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.style === '2D Traditional'
                        ? 'bg-[#FFB84D]'
                        : item.style === '3D CGI'
                        ? 'bg-[#6EA8FF]'
                        : 'bg-[#9B7CFF]'
                    }`}
                  />
                  <h4 className="text-xs font-semibold text-white truncate">{item.title}</h4>
                </div>
                <div className="text-[11px] text-zinc-400 font-mono">
                  {item.studio} ({item.year})
                </div>
                <div className="text-[11px] text-zinc-500 font-mono mt-0.5">
                  Budget: ${item.budget}M
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-white/5 flex items-baseline justify-between">
                <span className="text-xs font-mono text-zinc-400">Gross:</span>
                <span className="text-xs font-bold font-mono text-[#6EA8FF]">${item.gross}M</span>
                <span className="text-xs font-bold font-mono text-[#FFB84D]">{item.roi}x</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
