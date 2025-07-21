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
