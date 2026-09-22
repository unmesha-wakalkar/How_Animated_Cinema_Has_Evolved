import React, { useState } from 'react';
import { Building2, DollarSign, AlertTriangle, TrendingUp, Award, Film, CheckCircle, Info } from 'lucide-react';
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

export const IndustrySection: React.FC = () => {
  const [selectedStudio, setSelectedStudio] = useState<string>('Walt Disney Productions');
  const [hoveredFilm, setHoveredFilm] = useState<CompleteCaseFilm | null>(null);
  const [activeFinanceFilter, setActiveFinanceFilter] = useState<string>('All');

  const topStudios = storyMetrics.top_studios_all.slice(0, 12);
  const metrics = storyMetrics.budget_boxoffice;

  const studioProfiles: Record<
    string,
    {
      country: string;
      founded: number;
      signature: string;
      breakthrough: string;
      notableFilms: string[];
    }
  > = {
    'Walt Disney Productions': {
      country: 'United States',
      founded: 1923,
      signature: 'Classical narrative animation, multiplane camera, musical dramaturgy',
      breakthrough: 'First synchronized sound cartoon (1928), first full-length cel feature (1937)',
      notableFilms: ['Snow White', 'Pinocchio', 'Fantasia', 'The Lion King'],
    },
    'Soyuzmultfilm (USSR)': {
      country: 'Soviet Union / Russia',
      founded: 1936,
      signature: 'Poetic folklore, stop-motion cutouts, avant-garde philosophical allegories',
      breakthrough: 'State-funded artistic auteur unit insulated from purely commercial box office mandates',
      notableFilms: ['The Snow Queen', 'Hedgehog in the Fog', 'Tale of Tales'],
    },
    'Warner Bros. Pictures': {
      country: 'United States',
      founded: 1930,
      signature: 'Anarchic slapstick, lightning comedic timing, irreverent satire',
      breakthrough: 'Looney Tunes & Merrie Melodies created by Tex Avery, Chuck Jones, and Bob Clampett',
      notableFilms: ['Duck Amuck', 'What’s Opera, Doc?', 'The Iron Giant'],
    },
    'Toei Animation (Japan)': {
      country: 'Japan',
      founded: 1948,
      signature: 'Pioneering Japanese anime theatrical pipeline and limited animation techniques',
      breakthrough: 'First full-color anime feature (The Tale of the White Serpent, 1958); early training ground for Miyazaki and Takahata',
      notableFilms: ['Hakujaden (White Serpent)', 'Dragon Ball Z', 'One Piece Film: Red'],
    },
    'National Film Board of Canada (ONF | NFB)': {
      country: 'Canada',
      founded: 1939,
      signature: 'Experimental avant-garde, direct-on-film scratching, pinscreen, and sand animation',
      breakthrough: 'Norman McLaren and international public funding for non-commercial animation innovation',
      notableFilms: ['Neighbours', 'The Street', 'The Cat Came Back'],
    },
    'Pixar Animation Studios': {
      country: 'United States',
      founded: 1986,
      signature: 'Cutting-edge 3D CGI, emotional character rigging, RenderMan software',
      breakthrough: 'First computer-animated feature film in history (Toy Story, 1995)',
      notableFilms: ['Toy Story', 'WALL-E', 'Finding Nemo', 'Coco', 'Up'],
    },
    'Studio Ghibli (Japan)': {
      country: 'Japan',
      founded: 1985,
      signature: 'Hand-drawn watercolor backgrounds, environmental philosophy, nuanced human psychology',
      breakthrough: 'Spirited Away wins Golden Bear and Oscar; unwavering insistence on hand-drawn fidelity',
      notableFilms: ['My Neighbor Totoro', 'Princess Mononoke', 'Spirited Away', 'The Boy and the Heron'],
    },
    'Aardman Animations (UK)': {
      country: 'United Kingdom',
      founded: 1972,
      signature: 'Claymation (Plasticine stop-motion), expressive tactile thumbprints, dry British wit',
      breakthrough: 'Wallace & Gromit and Chicken Run, the highest-grossing stop-motion film in history',
      notableFilms: ['The Wrong Trousers', 'Chicken Run', 'Curse of the Were-Rabbit'],
    },
  };

  const activeProfile =
    studioProfiles[selectedStudio] ||
    studioProfiles['Walt Disney Productions'];

  const filteredFinancialFilms = verifiedDataset.filter((f) => {
    if (activeFinanceFilter === 'All') return true;
    return f.style === activeFinanceFilter;
  });

  // Scatter plot SVG coordinates
  const svgWidth = 640;
  const svgHeight = 340;
  const padding = { left: 55, right: 30, top: 30, bottom: 45 };

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
    <section id="industry" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-stone-300/80 relative scroll-mt-20">
      {/* Anchor for backward compatibility with business */}
      <span id="business" className="absolute -top-20" />

      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E84D3C]/10 text-[#E84D3C] border border-[#E84D3C]/25 text-xs font-mono font-medium mb-3 tracking-wide">
          <Building2 className="w-3.5 h-3.5 text-[#E84D3C]" />
          <span>SECTION 06 • INDUSTRY ECOSYSTEM & ECONOMICS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif-display font-extrabold text-[#171717] tracking-tight mb-4">
          The Studio System & The Business of Moving Drawings
        </h2>
        <p className="text-base sm:text-lg text-stone-600 font-editorial italic leading-relaxed">
          How small artisanal workshops evolved into massive media conglomerates, and why animated cinema became the highest-leverage financial asset in global entertainment.
        </p>
      </div>

      {/* Studio Ecosystem Dossier Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Left: Studio Selector Grid */}
        <div className="lg:col-span-5 space-y-2">
          <h3 className="text-xs font-mono uppercase tracking-wider text-stone-500 mb-3 font-semibold">
            Landmark Production Studios
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 max-h-[460px] overflow-y-auto pr-1">
            {Object.keys(studioProfiles).map((sName) => {
              const count = topStudios.find((ts) => ts.studio.toLowerCase().includes(sName.split(' ')[0].toLowerCase()))?.count || 'Archival';
              const isSelected = selectedStudio === sName;

              return (
                <button
                  key={sName}
                  onClick={() => setSelectedStudio(sName)}
                  className={`text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#171717] text-white border-[#171717] shadow-sm'
                      : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800'
                  }`}
                >
                  <div className="truncate pr-2">
                    <div className="font-serif-display font-bold text-sm truncate">{sName}</div>
                    <div className={`text-[11px] font-mono ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                      {studioProfiles[sName]?.country}
                    </div>
                  </div>
                  <span className={`text-xs font-mono px-2 py-0.5 rounded-md shrink-0 ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
                  }`}>
                    {typeof count === 'number' ? `${count} films` : count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Active Studio Dossier Card */}
        <div className="lg:col-span-7 bg-white border border-stone-200 shadow-sm rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-mono font-bold text-[#E84D3C] uppercase tracking-wider bg-[#E84D3C]/10 px-3 py-1 rounded-full">
                Founded {activeProfile.founded} • {activeProfile.country}
              </span>
              <Building2 className="w-5 h-5 text-stone-400" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif-display font-extrabold text-stone-900 mb-4">
              {selectedStudio}
            </h3>

            <div className="space-y-4 text-sm text-stone-700">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-stone-500 block mb-1">
                  Artistic Signature & Technique
                </span>
                <p className="font-editorial text-base leading-relaxed text-stone-800">
                  {activeProfile.signature}
                </p>
              </div>

              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-stone-500 block mb-1">
                  Historical Breakthrough
                </span>
                <p className="font-editorial text-base leading-relaxed text-stone-800">
                  {activeProfile.breakthrough}
                </p>
              </div>

              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-stone-500 block mb-2">
                  Canon Productions
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeProfile.notableFilms.map((title) => (
                    <span
                      key={title}
                      className="px-3 py-1 rounded-xl text-xs bg-[#F7F2E8] border border-stone-200 text-stone-800 font-medium"
                    >
                      {title}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-200/80 flex items-center justify-between text-xs text-stone-500 font-mono">
            <span>Historical Studio Entity</span>
            <span className="text-stone-800 font-semibold">{activeProfile.country}</span>
          </div>
        </div>
      </div>

      {/* Complete-Case Financial Scatter Plot */}
      <div className="bg-white border border-stone-200 shadow-sm rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#E84D3C] uppercase tracking-wider mb-1">
              <DollarSign className="w-3.5 h-3.5" />
              Complete-Case Empirical Economics
            </div>
            <h3 className="text-lg font-serif-display font-bold text-stone-900">
              Production Budget vs. Worldwide Gross (USD Millions)
            </h3>
          </div>

          {/* Style Filter */}
          <div className="flex items-center gap-1.5 bg-[#F7F2E8] p-1 rounded-xl border border-stone-300">
            {['All', '2D Traditional', '3D CGI', 'Stop-Motion'].map((st) => (
              <button
                key={st}
                onClick={() => setActiveFinanceFilter(st)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  activeFinanceFilter === st
                    ? 'bg-[#171717] text-white font-bold shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Methodological Transparency Callout */}
        <div className="bg-[#F7F2E8] border-l-2 border-[#E84D3C] rounded-r-2xl p-4 text-xs text-stone-700 mb-6 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-[#E84D3C] shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-stone-900 block font-sans">
              Methodological Rigor: Complete-Case Coverage
            </strong>
            Commercial revenue figures are sparse in early archival records. Exactly{' '}
            <span className="font-mono font-bold text-[#E84D3C]">{metrics.both_count} titles</span> in the primary database possess dual-verified numbers for both budget and box office. Zero-imputation is strictly forbidden to prevent artificial skewing.
          </div>
        </div>

        {/* Scatter Plot */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[620px]">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-auto overflow-visible select-none"
            >
              {/* Y Grid Lines */}
              {[300, 600, 900, 1200, 1500, 1800].map((val) => {
                const y = getY(val);
                return (
                  <g key={val}>
                    <line
                      x1={padding.left}
                      y1={y}
                      x2={svgWidth - padding.right}
                      y2={y}
                      stroke="#E5DDD0"
                      strokeDasharray="4 4"
                      strokeWidth="1"
                    />
                    <text
                      x={padding.left - 8}
                      y={y + 3}
                      fill="#8C857B"
                      fontSize="9"
                      fontFamily="monospace"
                      textAnchor="end"
                    >
                      ${val}M
                    </text>
                  </g>
                );
              })}

              {/* X Grid Lines */}
              {[50, 100, 150, 200].map((val) => {
                const x = getX(val);
                return (
                  <g key={val}>
                    <line
                      x1={x}
                      y1={padding.top}
                      x2={x}
                      y2={svgHeight - padding.bottom}
                      stroke="#E5DDD0"
                      strokeDasharray="4 4"
                      strokeWidth="1"
                    />
                    <text
                      x={x}
                      y={svgHeight - padding.bottom + 16}
                      fill="#8C857B"
                      fontSize="9"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      ${val}M Budget
                    </text>
                  </g>
                );
              })}

              {/* Breakeven / 2.5x Reference Line */}
              <line
                x1={getX(10)}
                y1={getY(10 * 2.5)}
                x2={getX(220)}
                y2={getY(Math.min(1800, 220 * 2.5))}
                stroke="#E84D3C"
                strokeWidth="1.5"
                strokeDasharray="6 3"
                opacity="0.6"
              />
              <text
                x={getX(170)}
                y={getY(170 * 2.5) - 8}
                fill="#E84D3C"
                fontSize="9"
                fontFamily="monospace"
                fontWeight="bold"
              >
                2.5x Rule of Thumb Breakeven
              </text>

              {/* Data Points */}
              {filteredFinancialFilms.map((film) => {
                const cx = getX(film.budget);
                const cy = getY(film.gross);
                const isHovered = hoveredFilm?.id === film.id;
                const fillColor =
                  film.style === '2D Traditional'
                    ? '#F4C95D'
                    : film.style === '3D CGI'
                    ? '#4F8FE8'
                    : '#A98BE8';

                return (
                  <g
                    key={film.id}
                    onMouseEnter={() => setHoveredFilm(film)}
                    onMouseLeave={() => setHoveredFilm(null)}
                    className="cursor-pointer"
                  >
                    {isHovered && (
                      <circle
                        cx={cx}
                        cy={cy}
                        r="14"
                        fill={fillColor}
                        opacity="0.25"
                      />
                    )}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isHovered ? 8 : 6}
                      fill={fillColor}
                      stroke="#171717"
                      strokeWidth={isHovered ? 2 : 1}
                      className="transition-all duration-200"
                    />
                    {isHovered && (
                      <text
                        x={cx}
                        y={cy - 12}
                        textAnchor="middle"
                        fill="#171717"
                        fontSize="11"
                        fontFamily="serif"
                        fontWeight="bold"
                      >
                        {film.title} ({film.year})
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Hover Inspection Bar */}
        <div className="mt-4 p-4 rounded-2xl bg-[#F7F2E8] border border-stone-200 min-h-[58px] flex flex-col sm:flex-row items-center justify-between text-xs font-mono">
          {hoveredFilm ? (
            <>
              <div className="flex items-center gap-3">
                <span className="font-serif-display font-bold text-sm text-stone-900">
                  {hoveredFilm.title} ({hoveredFilm.year})
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-white border border-stone-300 text-stone-700">
                  {hoveredFilm.studio} • {hoveredFilm.style}
                </span>
              </div>
              <div className="flex items-center gap-4 text-stone-800 mt-2 sm:mt-0">
                <span>Budget: <strong>${hoveredFilm.budget}M</strong></span>
                <span>Gross: <strong className="text-[#4F8FE8]">${hoveredFilm.gross}M</strong></span>
                <span>Multiple: <strong className="text-[#E84D3C]">{hoveredFilm.roi.toFixed(1)}x</strong></span>
              </div>
            </>
          ) : (
            <div className="text-stone-500 italic font-editorial text-sm mx-auto">
              Hover over any circular plot point to inspect budget, worldwide gross, and commercial multiple.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
