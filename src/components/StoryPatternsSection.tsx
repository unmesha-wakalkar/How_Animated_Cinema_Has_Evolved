import React, { useState } from 'react';
import { BookOpen, Users, Compass, Sparkles, Heart, Smile, Rocket, Shield } from 'lucide-react';
import { storyMetrics } from '../data/storyMetrics';

export const StoryPatternsSection: React.FC = () => {
  const [selectedLens, setSelectedLens] = useState<'genre' | 'audience' | 'theme'>('genre');

  const genres = storyMetrics.top_genre_strings;

  const audienceCategories = [
    {
      group: 'Family & All Ages',
      percent: '68.2%',
      count: 16397,
      note: 'The dominant commercial baseline: engineered with dual-layer humor to entertain children while providing narrative depth for adults.',
    },
    {
      group: 'Children / Kids Primary',
      percent: '24.1%',
      count: 5780,
      note: 'Dedicated early-childhood and youth programming; heavily prevalent in TV-to-film adaptations and educational shorts.',
    },
    {
      group: 'Teens & Young Adults',
      percent: '4.8%',
      count: 1150,
      note: 'Dominated by Japanese Shonen anime theatrical releases, coming-of-age allegories, and heightened action fantasy.',
    },
    {
      group: 'Mature / Adult (R/NC-17)',
      percent: '2.9%',
      count: 747,
      note: 'Auteur political allegories (Persepolis, Waltz with Bashir, Anomalisa, Heavy Metal) resisting the children-only stigma.',
    },
  ];

  const thematicEras = [
    {
      period: '1937 – 1959',
      title: 'Folklore, Fairytale & Moral Order',
      examples: 'Snow White, Pinocchio, Cinderella',
      pattern: 'External villains defeated by pure moral virtue, wish-fulfillment songs, and clear triumph of innocence.',
    },
    {
      period: '1989 – 1999',
      title: 'The Broadway Musical & "I Want" Song',
      examples: 'The Little Mermaid, Beauty and the Beast, The Lion King',
      pattern: 'Howard Ashman musical dramaturgy: protagonists defined by personal longing and boundary transgression.',
    },
    {
      period: '2001 – 2010',
      title: 'Meta-Comedy, Found Families & Deconstruction',
      examples: 'Shrek, Monsters Inc., Finding Nemo, The Incredibles',
      pattern: 'Satirizing traditional fairy tales, exploring workplace bureaucracies, parenting anxieties, and anti-heroes.',
    },
    {
      period: '2015 – Present',
      title: 'Generational Trauma & Interior Metaphor',
      examples: 'Inside Out, Coco, Encanto, Turning Red, The Boy and the Heron',
      pattern: 'Villain-less narratives where the antagonist is ancestral expectation, grief, or internal mental fragmentation.',
    },
  ];

  return (
    <section id="narrative" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-stone-300/80 relative scroll-mt-20">
      {/* Anchor for backward compatibility */}
      <span id="patterns" className="absolute -top-20" />

      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#A98BE8]/15 text-[#7351BA] border border-[#A98BE8]/30 text-xs font-mono font-medium mb-3 tracking-wide">
          <BookOpen className="w-3.5 h-3.5 text-[#7351BA]" />
          <span>SECTION 05 • NARRATIVE & STORY PATTERNS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif-display font-extrabold text-[#171717] tracking-tight mb-4">
          The Anatomy of Animation Storytelling
        </h2>
        <p className="text-base sm:text-lg text-stone-600 font-editorial italic leading-relaxed">
          How narrative formulas evolved from simple moral allegories and musical hero quests to psychological metaphors and generational deconstructions.
        </p>
      </div>

      {/* Lens Selection Pills */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-white p-1.5 rounded-2xl border border-stone-300 shadow-sm">
          <button
            onClick={() => setSelectedLens('genre')}
            className={`px-5 py-2.5 rounded-xl text-xs font-medium transition-all ${
              selectedLens === 'genre'
                ? 'bg-[#171717] text-[#F7F2E8] font-bold shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Genre Constellations
          </button>
          <button
            onClick={() => setSelectedLens('audience')}
            className={`px-5 py-2.5 rounded-xl text-xs font-medium transition-all ${
              selectedLens === 'audience'
                ? 'bg-[#171717] text-[#F7F2E8] font-bold shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Audience Demographics
          </button>
          <button
            onClick={() => setSelectedLens('theme')}
            className={`px-5 py-2.5 rounded-xl text-xs font-medium transition-all ${
              selectedLens === 'theme'
                ? 'bg-[#171717] text-[#F7F2E8] font-bold shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Thematic Archetypes
          </button>
        </div>
      </div>

      {/* Content Displays */}
      {selectedLens === 'genre' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {genres.map((g) => (
              <div
                key={g.genre}
                className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm hover:border-[#A98BE8]/60 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif-display font-bold text-base text-stone-900">
                    {g.genre}
                  </h3>
                  <span className="font-mono text-xs text-[#7351BA] font-bold bg-[#A98BE8]/15 px-2 py-0.5 rounded-full">
                    {g.count.toLocaleString()} films
                  </span>
                </div>
                <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden mt-3">
                  <div
                    style={{ width: `${Math.min(100, (g.count / 8500) * 100)}%` }}
                    className="h-full bg-[#A98BE8] rounded-full"
                  />
                </div>
                <div className="text-[11px] font-mono text-stone-500 mt-2">
                  Representing {((g.count / 25390) * 100).toFixed(1)}% of all historical catalog entries
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedLens === 'audience' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
          {audienceCategories.map((aud) => (
            <div
              key={aud.group}
              className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#7351BA] bg-[#A98BE8]/15 px-2.5 py-0.5 rounded-full">
                  {aud.percent} Market Share
                </span>
                <span className="text-xs font-mono text-stone-500">
                  {aud.count.toLocaleString()} titles
                </span>
              </div>
              <h3 className="text-xl font-serif-display font-bold text-stone-900 mb-2">
                {aud.group}
              </h3>
              <p className="text-sm text-stone-600 font-editorial text-base leading-relaxed">
                {aud.note}
              </p>
            </div>
          ))}
        </div>
      )}

      {selectedLens === 'theme' && (
        <div className="space-y-4 animate-in fade-in duration-300">
          {thematicEras.map((era) => (
            <div
              key={era.period}
              className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm hover:border-[#A98BE8]/60 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="md:w-1/4 shrink-0">
                <span className="text-xs font-mono font-bold text-[#7351BA] bg-[#A98BE8]/15 px-2.5 py-1 rounded-full inline-block mb-1.5">
                  {era.period}
                </span>
                <h3 className="text-lg font-serif-display font-bold text-stone-900">
                  {era.title}
                </h3>
                <div className="text-xs text-stone-500 font-editorial italic mt-1">
                  Ex: {era.examples}
                </div>
              </div>

              <div className="md:w-3/4 border-t md:border-t-0 md:border-l border-stone-200 pt-4 md:pt-0 md:pl-6">
                <p className="text-sm sm:text-base text-stone-700 font-editorial leading-relaxed">
                  {era.pattern}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
