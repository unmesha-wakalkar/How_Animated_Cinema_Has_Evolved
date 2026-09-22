export type AnimationStyle = '2D Traditional' | '3D CGI' | 'Stop-Motion' | 'Motion Capture';

export type Era =
  | 'Pre-Cinema & Silent'
  | 'Golden Age'
  | 'Post-War Era'
  | 'Dark Age / Bronze'
  | 'Disney Renaissance'
  | 'Early Digital / CGI Dawn'
  | 'Modern CG Hegemony'
  | 'Streaming & Hybrid Renaissance';

export interface Film {
  id: number;
  title: string;
  releaseYear: number;
  decade: string;
  era: Era;
  studio: string | null;
  animationStyle: AnimationStyle;
  posterUrl: string;
  backdropUrl: string | null;
  tmdbUrl: string | null;
  imdbUrl: string | null;
  director?: string;
  runtimeMinutes?: number;
  rating?: number;
  voteCount?: number;
  budgetMusd?: number | null;
  boxOfficeMusd?: number | null;
  genres?: string[];
  overview?: string;
  audience?: string;
  criticScore?: string;
  audienceScore?: string;
  oscarsNominated?: number | null;
  oscarsWon?: number | null;
  country?: string;
  landmarkNote?: string;
}

export interface HistoricalMilestone {
  year: number;
  title: string;
  type: string;
  description: string;
  source: string;
  url: string;
  keyFigure?: string;
  significance?: string;
}

export interface StoryMetrics {
  dataset_scale: {
    all_records: number;
    usable_released: number;
  };
  decade_counts: Record<string, number>;
  style_by_decade: Record<string, Record<string, number>>;
  top_studios_all: Array<{ studio: string; count: number }>;
  top_countries: Array<{ country: string; count: number }>;
  top_languages: Array<{ language: string; count: number }>;
  top_genre_strings: Array<{ genre: string; count: number }>;
  budget_boxoffice: {
    budget_count: number;
    box_office_count: number;
    both_count: number;
    median_budget_musd: number;
    median_boxoffice_musd: number;
  };
  reception: {
    rating_count: number;
    median_rating: number;
    median_votes: number;
  };
  notable_anomalies: string[];
}

export interface VideoSource {
  id: string;
  title: string;
  provider: string;
  url: string;
  embed: boolean;
  note: string;
  embedId?: string;
}

export interface SourceDocument {
  id: string;
  kind: string;
  title: string;
  publisher: string;
  url: string;
  use: string;
}

export type NarrativeLens = 'all' | 'story' | 'technology' | 'industry' | 'world';
