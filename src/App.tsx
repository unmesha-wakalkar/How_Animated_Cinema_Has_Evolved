import React, { useState, useEffect } from 'react';
import { Film, HistoricalMilestone, NarrativeLens } from './types';
import { StickyNav } from './components/StickyNav';
import { HeroSection } from './components/HeroSection';
import { FilmExplorer } from './components/FilmExplorer';
import { TimelineSection } from './components/TimelineSection';
import { TechniqueEvolutionSection } from './components/TechniqueEvolutionSection';
import { StoryPatternsSection } from './components/StoryPatternsSection';
import { IndustrySection } from './components/IndustrySection';
import { GlobalSection } from './components/GlobalSection';
import { FilmDossierModal } from './components/FilmDossierModal';
import { CompareModal } from './components/CompareModal';
import { MilestoneModal } from './components/MilestoneModal';
import { VideoModal } from './components/VideoModal';
import { SourcesModal } from './components/SourcesModal';
import { SourcesFooter } from './components/SourcesFooter';

export function App() {
  const [currentLens, setCurrentLens] = useState<NarrativeLens>('all');
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);
  const [selectedMilestone, setSelectedMilestone] = useState<HistoricalMilestone | null>(null);
  const [selectedForCompare, setSelectedForCompare] = useState<Film[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isSourcesOpen, setIsSourcesOpen] = useState(false);

  // Global Keyboard Navigation (Escape to close modals)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedFilm(null);
        setSelectedMilestone(null);
        setIsCompareOpen(false);
        setIsVideoOpen(false);
        setIsSourcesOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleCompare = (film: Film) => {
    setSelectedForCompare((prev) => {
      const exists = prev.some((f) => f.id === film.id);
      if (exists) {
        return prev.filter((f) => f.id !== film.id);
      }
      if (prev.length >= 3) {
        // limit to 3 items, replacing the oldest
        return [...prev.slice(1), film];
      }
      return [...prev, film];
    });
  };

  const handleRemoveCompareFilm = (filmId: number) => {
    setSelectedForCompare((prev) => prev.filter((f) => f.id !== filmId));
  };

  const handleClearCompare = () => {
    setSelectedForCompare([]);
  };

  const scrollToExplore = () => {
    const el = document.getElementById('explore');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F2E8] text-[#171717] flex flex-col selection:bg-[#E84D3C]/20 selection:text-[#E84D3C]">
      {/* Sticky Editorial Navigation Bar */}
      <StickyNav
        selectedForCompare={selectedForCompare}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenSources={() => setIsSourcesOpen(true)}
        onOpenVideo={() => setIsVideoOpen(true)}
      />

      {/* Main Story Flow */}
      <main className="flex-1 paper-grain">
        {/* Section 1: Hero Section */}
        <HeroSection
          onBeginStory={scrollToExplore}
          onOpenVideo={() => setIsVideoOpen(true)}
        />

        {/* Section 2: The 117 Masterworks (Moved to Section 2 as requested) */}
        <FilmExplorer
          onSelectFilm={setSelectedFilm}
          selectedForCompare={selectedForCompare}
          onToggleCompare={handleToggleCompare}
        />

        {/* Section 3: Chronological Continuum (Story & Early Animation) */}
        {(currentLens === 'all' || currentLens === 'technology' || currentLens === 'story') && (
          <TimelineSection
            onSelectMilestone={setSelectedMilestone}
            onSelectFilm={setSelectedFilm}
          />
        )}

        {/* Section 4: Technique Evolution (Technology & Stylistic Inversion) */}
        {(currentLens === 'all' || currentLens === 'technology') && (
          <TechniqueEvolutionSection />
        )}

        {/* Section 5: Narrative & Story Patterns */}
        {(currentLens === 'all' || currentLens === 'story') && (
          <StoryPatternsSection />
        )}

        {/* Section 6: Industry Ecosystem & Complete-Case Economics */}
        {(currentLens === 'all' || currentLens === 'industry') && (
          <IndustrySection />
        )}

        {/* Section 7: Transnational Cinema Geography (Global) */}
        {(currentLens === 'all' || currentLens === 'world') && (
          <GlobalSection />
        )}
      </main>

      {/* Modals & Inspection Drawers */}
      <FilmDossierModal
        film={selectedFilm}
        onClose={() => setSelectedFilm(null)}
        selectedForCompare={selectedForCompare}
        onToggleCompare={handleToggleCompare}
      />

      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        selectedFilms={selectedForCompare}
        onRemoveFilm={handleRemoveCompareFilm}
        onClearAll={handleClearCompare}
      />

      <MilestoneModal
        milestone={selectedMilestone}
        onClose={() => setSelectedMilestone(null)}
      />

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />

      <SourcesModal
        isOpen={isSourcesOpen}
        onClose={() => setIsSourcesOpen(false)}
      />

      {/* Persistent Editorial Footer */}
      <SourcesFooter
        onOpenSources={() => setIsSourcesOpen(true)}
        onOpenVideo={() => setIsVideoOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
      />
    </div>
  );
}

export default App;
