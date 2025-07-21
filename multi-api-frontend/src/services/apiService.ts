import axios, { type AxiosResponse } from "axios";
import type { MovieData, NewsData, TrendData, WeatherData } from "../types/api.types";

const BASE_URL = 'http://localhost:5277/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  getTrends: (): Promise<AxiosResponse<TrendData>> => 
    apiClient.get<TrendData>('/XTrend'),
  
  getNews: (): Promise<AxiosResponse<NewsData>> => 
    apiClient.get<NewsData>('/GoogleNews'),

  getMovies: (genre: string = 'action', cursor?: string): Promise<AxiosResponse<MovieData>> => {
    let url = `/MovieSuggestion/${genre}`;
    if (cursor) {
      url += `?cursor=${cursor}`;
    }
    return apiClient.get<MovieData>(url);
  },
  
  getWeather: (city: string = 'Istanbul'): Promise<AxiosResponse<WeatherData>> => 
    apiClient.get<WeatherData>(`/Weather/${city}`),
};