import React, { useState } from 'react';
import { Globe, MapPin, Languages, Compass } from 'lucide-react';
import { storyMetrics } from '../data/storyMetrics';

export const GlobalSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'countries' | 'languages' | 'traditions'>('traditions');

  const topCountries = storyMetrics.top_countries;
  const topLanguages = storyMetrics.top_languages;

  const animationTraditions = [
    {
      region: 'Japan (Anime)',
      hallmark: 'Cinematic Camera Framing & Adult Emotional Complexity',
      desc: 'Originating from Osamu Tezuka’s Mushi Pro and Toei, anime developed a rich aesthetic of limited animation: expressive stills, dramatic angles, and expansive narrative arcs covering science fiction, existential philosophy, and historical tragedy.',
      share: '3,908 Titles',
      color: '#E84D3C',
    },
    {
      region: 'Eastern Europe & USSR',
      hallmark: 'Philosophical Allegory & Handcrafted Multi-Mediums',
      desc: 'Supported by state funding through Soyuzmultfilm (Russia), Animafilm (Romania), and Se-Ma-For (Poland), Eastern European animation excelled in stop-motion, cut-outs, and metaphoric literature free from commercial toy-tie-in pressure.',
      share: '1,860 Titles',
      color: '#9FD8C1',
    },
    {
      region: 'France & Western Europe',
      hallmark: 'Auteur Graphic Elegance & Bande Dessinée Realism',
      desc: 'Tracing from Émile Reynaud and Émile Cohl to modern masters (The Triplets of Belleville, I Lost My Body), French animation combines Franco-Belgian graphic illustration with poetic, non-formulaic narratives.',
      share: '1,023 Titles',
      color: '#4F8FE8',
    },
    {
      region: 'United Kingdom',
      hallmark: 'Plasticine Tactility & Character Eccentricity',
      desc: 'Spearheaded by Aardman Animations (Nick Park, Peter Lord), Halas and Batchelor, and modern TV studios, British animation balances physical clay modeling with dry observational satire.',
      share: '680 Titles',
      color: '#A98BE8',
    },
  ];

  return (
    <section id="global" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-stone-300/80 relative scroll-mt-20">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9FD8C1]/20 text-[#2B7558] border border-[#9FD8C1]/40 text-xs font-mono font-medium mb-3 tracking-wide">
          <Globe className="w-3.5 h-3.5 text-[#2B7558]" />
          <span>SECTION 07 • TRANSNATIONAL CINEMA GEOGRAPHY</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif-display font-extrabold text-[#171717] tracking-tight mb-4">
          A Worldwide Moving Canvas
        </h2>
        <p className="text-base sm:text-lg text-stone-600 font-editorial italic leading-relaxed">
          Animation is not the exclusive invention or property of a single nation. Over 70 countries have contributed distinct artistic grammars, philosophical motifs, and production pipelines.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex bg-white p-1.5 rounded-2xl border border-stone-300 shadow-sm">
          <button
            onClick={() => setActiveTab('traditions')}
            className={`px-5 py-2.5 rounded-xl text-xs font-medium transition-all ${
              activeTab === 'traditions'
                ? 'bg-[#171717] text-[#F7F2E8] font-bold shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Regional Traditions & Auteurs
          </button>
          <button
            onClick={() => setActiveTab('countries')}
            className={`px-5 py-2.5 rounded-xl text-xs font-medium transition-all ${
              activeTab === 'countries'
                ? 'bg-[#171717] text-[#F7F2E8] font-bold shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Output by Origin Country
          </button>
          <button
            onClick={() => setActiveTab('languages')}
            className={`px-5 py-2.5 rounded-xl text-xs font-medium transition-all ${
              activeTab === 'languages'
                ? 'bg-[#171717] text-[#F7F2E8] font-bold shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Original Language Distribution
          </button>
        </div>
      </div>

      {/* Traditions Tab */}
      {activeTab === 'traditions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
          {animationTraditions.map((trad) => (
            <div
              key={trad.region}
              className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    style={{ borderColor: `${trad.color}60`, backgroundColor: `${trad.color}15`, color: '#171717' }}
                    className="px-3 py-1 rounded-full text-xs font-mono font-bold border"
                  >
                    {trad.region}
                  </span>
                  <span className="text-xs font-mono text-stone-500 font-medium">
                    {trad.share}
                  </span>
                </div>

                <h3 className="text-xl font-serif-display font-bold text-stone-900 mb-2">
                  {trad.hallmark}
                </h3>

                <p className="text-sm sm:text-base text-stone-600 font-editorial leading-relaxed">
                  {trad.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-mono">
                <span>Transnational Heritage</span>
                <span className="font-semibold text-stone-800">Primary Archive Canon</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Countries Tab */}
      {activeTab === 'countries' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 animate-in fade-in duration-300">
          {topCountries.map((c, idx) => (
            <div
              key={c.country}
              className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm hover:border-[#9FD8C1] transition-all"
            >
              <div className="flex items-center justify-between text-xs font-mono text-stone-500 mb-1">
                <span>Rank #{idx + 1}</span>
                <MapPin className="w-3.5 h-3.5 text-[#2B7558]" />
              </div>
              <h3 className="font-serif-display font-bold text-base text-stone-900 truncate">
                {c.country}
              </h3>
              <div className="text-xl font-serif-display font-bold text-[#2B7558] mt-1">
                {c.count.toLocaleString()}
              </div>
              <div className="text-[11px] font-mono text-stone-500">
                {((c.count / 25390) * 100).toFixed(1)}% of recorded titles
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Languages Tab */}
      {activeTab === 'languages' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 animate-in fade-in duration-300">
          {topLanguages.map((l, idx) => (
            <div
              key={l.language}
              className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm hover:border-[#4F8FE8] transition-all"
            >
              <div className="flex items-center justify-between text-xs font-mono text-stone-500 mb-1">
                <span>Rank #{idx + 1}</span>
                <Languages className="w-3.5 h-3.5 text-[#4F8FE8]" />
              </div>
              <h3 className="font-serif-display font-bold text-base text-stone-900 truncate">
                {l.language}
              </h3>
              <div className="text-xl font-serif-display font-bold text-[#4F8FE8] mt-1">
                {l.count.toLocaleString()}
              </div>
              <div className="text-[11px] font-mono text-stone-500">
                Primary audio track record
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
