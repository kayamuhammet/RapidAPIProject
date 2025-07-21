import axios, { type AxiosResponse } from "axios";
import type { NewsData,  TrendData } from "../types/api.types";

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
  
};