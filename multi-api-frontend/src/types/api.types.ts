export interface TrendData {
  trends: Array<{
    name: string;
    description: string | null;
    context: string;
  }>;
}

export interface NewsData {
  success: boolean;
  total: number;
  data: Array<{ 
    title: string;
    url: string;
    date?: string;
    thumbnail?: string;
    description: string;
    source: {
      name: string;
      url?: string;
      favicon?: string;
    };
    keywords?: string[];
    authors?: string[];
  }>;
}

export interface MovieData {
  rows: number;
  numFound: number;
  results: Array<{
    id: string;
    url?: string;
    primaryTitle?: string;
    originalTitle?: string;
    type?: string;
    description?: string;
    primaryImage?: string;
    releaseDate?: string;
    startYear?: number;
    endYear?: number;
    runtimeMinutes?: number;
    genres?: string[];
    averageRating?: number;
    numVotes?: number;
    spokenLanguages?: string[]; 
  }>;
  nextCursorMark?: string;
}

export interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    description: string;
  }>;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  name: string;
}

export interface TranslatorData {
  word: string;
  language: string;
  proficiency?: string;
  pronunciations?: Array<{
    id: string;
    pronunciation: string;
    accent: string;
    hasAudio: boolean;
  }>;
  translations: Array<{
    translation: string;
    confidence: number;
    posTag: string;
  }>;
}

export interface ExchangeData {
  base_code: string;
  rates: {
    [key: string]: number;
  };
}