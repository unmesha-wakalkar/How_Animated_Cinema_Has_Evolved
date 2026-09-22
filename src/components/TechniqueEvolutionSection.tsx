import React, { useState } from 'react';
import { Cpu, Layers, Sparkles, TrendingUp } from 'lucide-react';
import { storyMetrics } from '../data/storyMetrics';

export const TechniqueEvolutionSection: React.FC = () => {
  const [activeDecade, setActiveDecade] = useState<string>('2000s');

  const styleByDecade = storyMetrics.style_by_decade;
  const decades = Object.keys(styleByDecade)
    .filter((d) => d !== 'Unknown Era' && d >= '1920s')
    .sort();

  const currentData = styleByDecade[activeDecade] || {
    '2D Traditional': 0,
    '3D CGI': 0,
    'Stop-Motion': 0,
    'Motion Capture': 0,
  };

  const totalCurrent =
    (currentData['2D Traditional'] || 0) +
    (currentData['3D CGI'] || 0) +
    (currentData['Stop-Motion'] || 0) +
    (currentData['Motion Capture'] || 0);

  const getPercent = (count: number) => {
    if (!totalCurrent) return '0%';
    return `${((count / totalCurrent) * 100).toFixed(1)}%`;
  };

  const keyTechTransitions = [
    {
      era: '1910s–1930s',
      tech: 'The Cel & Multiplane Camera',
      desc: 'Transparent celluloid sheets allowed background reuse; the vertical multiplane camera created unprecedented optical depth of field.',
      color: '#F4C95D',
    },
    {
      era: '1960s–1980s',
      tech: 'Xerography & Synthetic Sound',
      desc: 'Ub Iwerks adapted Xerox electrostatic photocopying directly onto cels, cutting ink tracing costs and introducing bold graphic pencil lines.',
      color: '#6B655C',
    },
    {
      era: '1989–1999',
      tech: 'CAPS & RenderMan Revolution',
      desc: 'Pixar and Disney co-developed the Computer Animation Production System to digitize ink and paint, while RenderMan pioneered cinematic 3D surfaces.',
      color: '#A98BE8',
    },
    {
      era: '2000s–Present',
      tech: 'Non-Photorealistic Rendering (NPR) & Hybrids',
      desc: 'Rejection of pure photorealism: combining stepped framerates, 2D line art, Ben-Day dot shading, and hand-sculpted CGI geometry.',
      color: '#4F8FE8',
    },
  ];

  // Prepare points for Stacked Stream/Area Chart
  const svgWidth = 720;
  const svgHeight = 220;
  const padLeft = 40;
  const padRight = 30;
  const padTop = 20;
  const padBottom = 40;
  const chartW = svgWidth - padLeft - padRight;
  const chartH = svgHeight - padTop - padBottom;

  const decadePoints = decades.map((dec, idx) => {
    const data = styleByDecade[dec] || { '2D Traditional': 0, '3D CGI': 0, 'Stop-Motion': 0 };
    const tot = (data['2D Traditional'] || 0) + (data['3D CGI'] || 0) + (data['Stop-Motion'] || 0) || 1;
    const p2D = (data['2D Traditional'] || 0) / tot;
    const p3D = (data['3D CGI'] || 0) / tot;
    const pStop = (data['Stop-Motion'] || 0) / tot;
    const x = padLeft + (idx / (decades.length - 1)) * chartW;
    return {
      decade: dec,
      x,
      p2D,
      p3D,
      pStop,
      yBase: padTop + chartH,
      y2DTop: padTop + chartH - p2D * chartH,
      y3DTop: padTop + chartH - (p2D + p3D) * chartH,
      yStopTop: padTop + chartH - (p2D + p3D + pStop) * chartH,
    };
  });

  const path2D = `M ${decadePoints[0].x} ${decadePoints[0].yBase} ` +
    decadePoints.map(p => `L ${p.x} ${p.y2DTop}`).join(' ') +
    ` L ${decadePoints[decadePoints.length - 1].x} ${decadePoints[decadePoints.length - 1].yBase} Z`;

  const path3D = `M ${decadePoints[0].x} ${decadePoints[0].y2DTop} ` +
    decadePoints.map(p => `L ${p.x} ${p.y3DTop}`).join(' ') +
    ` L ${decadePoints[decadePoints.length - 1].x} ${decadePoints[decadePoints.length - 1].y2DTop} ` +
    decadePoints.slice().reverse().map(p => `L ${p.x} ${p.y2DTop}`).join(' ') + ' Z';

  const pathStop = `M ${decadePoints[0].x} ${decadePoints[0].y3DTop} ` +
    decadePoints.map(p => `L ${p.x} ${p.yStopTop}`).join(' ') +
    ` L ${decadePoints[decadePoints.length - 1].x} ${decadePoints[decadePoints.length - 1].y3DTop} ` +
    decadePoints.slice().reverse().map(p => `L ${p.x} ${p.y3DTop}`).join(' ') + ' Z';

  return (
    <section id="technology" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-stone-300/80 relative scroll-mt-20">
      {/* Anchor for backward compatibility */}
      <span id="technique" className="absolute -top-20" />

      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4F8FE8]/15 text-[#4F8FE8] border border-[#4F8FE8]/30 text-xs font-mono font-medium mb-3 tracking-wide">
          <Cpu className="w-3.5 h-3.5 text-[#4F8FE8]" />
          <span>SECTION 04 • TECHNOLOGY & CRAFT</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif-display font-extrabold text-[#171717] tracking-tight mb-4">
          The Great Stylistic Inversion
        </h2>
        <p className="text-base sm:text-lg text-stone-600 font-editorial italic leading-relaxed">
          From the mid-1990s to the 2000s, commercial animated cinema experienced the most rapid medium replacement in film history: the hand-drawn cel was fundamentally supplanted by polygonal 3D rendering.
        </p>
      </div>

      {/* 100-Year Continuous Stream Graph Card */}
      <div className="bg-white border border-stone-200 shadow-sm rounded-3xl p-6 sm:p-8 mb-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-mono text-[#4F8FE8] uppercase tracking-wider font-bold">
              100-Year Medium Transition Stream (1920s – 2020s)
            </span>
            <h3 className="text-lg font-serif-display font-bold text-stone-900 mt-0.5">
              Proportion of Global Releases by Technique
            </h3>
          </div>

          {/* Decade quick selector pill bar */}
          <div className="flex items-center gap-1 bg-[#F7F2E8] p-1 rounded-xl border border-stone-300 overflow-x-auto max-w-full">
            {decades.map((dec) => (
              <button
                key={dec}
                onClick={() => setActiveDecade(dec)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                  activeDecade === dec
                    ? 'bg-[#171717] text-white font-bold shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {dec}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive SVG Area Stream */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[680px]">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-auto overflow-visible select-none"
            >
              {/* Grid Lines */}
              {[0.25, 0.5, 0.75, 1.0].map((frac) => {
                const y = padTop + chartH * (1 - frac);
                return (
                  <g key={frac}>
                    <line
                      x1={padLeft}
                      y1={y}
                      x2={padLeft + chartW}
                      y2={y}
                      stroke="#E5DDD0"
                      strokeDasharray="4 4"
                      strokeWidth="1"
                    />
                    <text
                      x={padLeft - 8}
                      y={y + 3}
                      fill="#8C857B"
                      fontSize="9"
                      fontFamily="monospace"
                      textAnchor="end"
                    >
                      {Math.round(frac * 100)}%
                    </text>
                  </g>
                );
              })}

              {/* Area 1: 2D Traditional Cel */}
              <path
                d={path2D}
                fill="#F4C95D"
                fillOpacity="0.85"
                stroke="#E5BA4B"
                strokeWidth="1.5"
                className="transition-all duration-300"
              />

              {/* Area 2: 3D CGI */}
              <path
                d={path3D}
                fill="#4F8FE8"
                fillOpacity="0.85"
                stroke="#3E7ED7"
                strokeWidth="1.5"
                className="transition-all duration-300"
              />

              {/* Area 3: Stop-Motion */}
              <path
                d={pathStop}
                fill="#A98BE8"
                fillOpacity="0.85"
                stroke="#987AD7"
                strokeWidth="1.5"
                className="transition-all duration-300"
              />

              {/* Decade Marker Columns */}
              {decadePoints.map((p) => {
                const isActive = p.decade === activeDecade;
                return (
                  <g
                    key={p.decade}
                    onClick={() => setActiveDecade(p.decade)}
                    className="cursor-pointer group"
                  >
                    {isActive && (
                      <line
                        x1={p.x}
                        y1={padTop}
                        x2={p.x}
                        y2={padTop + chartH}
                        stroke="#171717"
                        strokeWidth="2"
                        strokeDasharray="2 2"
                      />
                    )}
                    <text
                      x={p.x}
                      y={svgHeight - 12}
                      fill={isActive ? '#171717' : '#8C857B'}
                      fontSize={isActive ? '11' : '10'}
                      fontWeight={isActive ? 'bold' : 'normal'}
                      textAnchor="middle"
                      fontFamily="monospace"
                    >
                      {p.decade}
                    </text>
                    {isActive && (
                      <circle cx={p.x} cy={padTop + 4} r="4" fill="#171717" />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Stream Graph Legend */}
            <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-stone-200 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-stone-700 font-medium">
                <span className="w-3 h-3 rounded-md bg-[#F4C95D]" /> 2D Traditional Hand-drawn Cel
              </span>
              <span className="flex items-center gap-1.5 text-stone-700 font-medium">
                <span className="w-3 h-3 rounded-md bg-[#4F8FE8]" /> 3D CGI Computer Generated
              </span>
              <span className="flex items-center gap-1.5 text-stone-700 font-medium">
                <span className="w-3 h-3 rounded-md bg-[#A98BE8]" /> Stop-Motion / Claymation
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Proportion Bar for Active Decade */}
        <div className="mt-8 mb-6">
          <div className="text-xs font-mono text-stone-600 mb-2 flex items-center justify-between">
            <span className="font-semibold text-stone-900">
              Output Proportions in the {activeDecade}
            </span>
            <span className="text-stone-500 font-mono">Empirical TMDB & BFI canon</span>
          </div>

          <div className="h-10 w-full rounded-xl overflow-hidden flex bg-stone-100 border border-stone-300 p-1">
            <div
              style={{ width: getPercent(currentData['2D Traditional'] || 0) }}
              className="h-full bg-[#F4C95D] rounded-l-lg transition-all duration-500 relative flex items-center justify-center overflow-hidden"
              title={`2D: ${getPercent(currentData['2D Traditional'])}`}
            >
              {(currentData['2D Traditional'] || 0) > 0 && (
                <span className="text-[11px] font-bold text-stone-900 px-1 truncate font-mono">
                  2D {getPercent(currentData['2D Traditional'])}
                </span>
              )}
            </div>

            <div
              style={{ width: getPercent(currentData['3D CGI'] || 0) }}
              className="h-full bg-[#4F8FE8] transition-all duration-500 relative flex items-center justify-center overflow-hidden"
              title={`3D: ${getPercent(currentData['3D CGI'])}`}
            >
              {(currentData['3D CGI'] || 0) > 0 && (
                <span className="text-[11px] font-bold text-white px-1 truncate font-mono">
                  3D {getPercent(currentData['3D CGI'])}
                </span>
              )}
            </div>

            <div
              style={{ width: getPercent(currentData['Stop-Motion'] || 0) }}
              className="h-full bg-[#A98BE8] transition-all duration-500 relative flex items-center justify-center overflow-hidden"
              title={`Stop-Motion: ${getPercent(currentData['Stop-Motion'])}`}
            >
              {(currentData['Stop-Motion'] || 0) > 0 && (
                <span className="text-[10px] font-bold text-white px-1 truncate font-mono">
                  Stop-Mo {getPercent(currentData['Stop-Motion'])}
                </span>
              )}
            </div>

            <div
              style={{ width: getPercent(currentData['Motion Capture'] || 0) }}
              className="h-full bg-[#E84D3C] rounded-r-lg transition-all duration-500 relative flex items-center justify-center overflow-hidden"
              title={`MoCap: ${currentData['Motion Capture']}`}
            />
          </div>
        </div>

        {/* Real Counts Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="bg-[#F7F2E8] border border-stone-200 p-4 rounded-2xl">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F4C95D]" />
              <span className="text-xs font-semibold text-stone-700">2D Traditional</span>
            </div>
            <div className="text-2xl font-serif-display font-bold text-stone-900">
              {(currentData['2D Traditional'] || 0).toLocaleString()}
            </div>
            <div className="text-[11px] font-mono text-stone-500 mt-1">
              {getPercent(currentData['2D Traditional'])} of decade output
            </div>
          </div>

          <div className="bg-[#F7F2E8] border border-stone-200 p-4 rounded-2xl">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4F8FE8]" />
              <span className="text-xs font-semibold text-stone-700">3D CGI</span>
            </div>
            <div className="text-2xl font-serif-display font-bold text-stone-900">
              {(currentData['3D CGI'] || 0).toLocaleString()}
            </div>
            <div className="text-[11px] font-mono text-stone-500 mt-1">
              {getPercent(currentData['3D CGI'])} of decade output
            </div>
          </div>

          <div className="bg-[#F7F2E8] border border-stone-200 p-4 rounded-2xl">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#A98BE8]" />
              <span className="text-xs font-semibold text-stone-700">Stop-Motion</span>
            </div>
            <div className="text-2xl font-serif-display font-bold text-stone-900">
              {(currentData['Stop-Motion'] || 0).toLocaleString()}
            </div>
            <div className="text-[11px] font-mono text-stone-500 mt-1">
              {getPercent(currentData['Stop-Motion'])} tactile puppet craft
            </div>
          </div>

          <div className="bg-[#F7F2E8] border border-stone-200 p-4 rounded-2xl">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E84D3C]" />
              <span className="text-xs font-semibold text-stone-700">Hybrid / MoCap</span>
            </div>
            <div className="text-2xl font-serif-display font-bold text-stone-900">
              {(currentData['Motion Capture'] || 0).toLocaleString()}
            </div>
            <div className="text-[11px] font-mono text-stone-500 mt-1">
              {getPercent(currentData['Motion Capture'])} experimental
            </div>
          </div>
        </div>
      </div>

      {/* 4 Landmark Technological Epochs Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {keyTechTransitions.map((item) => (
          <div
            key={item.tech}
            className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <span
                style={{ color: item.color }}
                className="text-xs font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#F7F2E8]"
              >
                {item.era}
              </span>
              <Cpu className="w-4 h-4 text-stone-400" />
            </div>

            <h3 className="text-lg font-serif-display font-bold text-stone-900 mb-2">{item.tech}</h3>
            <p className="text-sm text-stone-600 font-editorial text-base leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
