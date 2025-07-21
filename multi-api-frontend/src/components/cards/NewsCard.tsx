import React, { useState } from 'react';
import { apiService } from '../../services/apiService';

import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';
import type { NewsData } from '../../types/api.types';

const NewsCard: React.FC = () => {
  const [newsData, setNewsData] = useState<NewsData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentNewsIndex, setCurrentNewsIndex] = useState<number>(0);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getNews();
      setNewsData({ ...response.data, data: response.data.data.slice(0, 10) });
      setCurrentNewsIndex(0);
    } catch (err) {
      setError('Haberler alınamadı.');
    } finally {
      setLoading(false);
    }
  };

  const handleNextNews = () => {
    if (newsData && newsData.data && currentNewsIndex < newsData.data.length - 1) {
      setCurrentNewsIndex(prevIndex => prevIndex + 1);
    }
  };

  const handlePrevNews = () => {
    if (newsData && currentNewsIndex > 0) {
      setCurrentNewsIndex(prevIndex => prevIndex - 1);
    }
  };

  const currentArticle = newsData && newsData.data && newsData.data.length > 0
    ? newsData.data[currentNewsIndex]
    : null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition duration-300 ease-in-out flex flex-col">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-blue-300 pb-2">Son Haberler</h2>
      
      <div className="flex justify-center mb-6"> 
        <button
          onClick={fetchNews}
          className="bg-purple-600 text-white px-5 py-3 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 shadow-md transform hover:scale-105 transition duration-300"
        >
          Haberleri Getir
        </button>
      </div>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}

      {currentArticle && (
        <div className="flex flex-col flex-grow"> 
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner mb-4"> 
            <h3 className="text-xl font-semibold text-gray-900 mb-2 leading-tight">
              <a href={currentArticle.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {currentArticle.title}
              </a>
            </h3>
            <p className="text-gray-700 text-sm mb-3 line-clamp-4">
              {currentArticle.description}
            </p>
            {currentArticle.source && (
              <p className="text-gray-500 text-xs font-medium">Kaynak: {currentArticle.source.name}</p>
            )}
            {currentArticle.date && (
                <p className="text-gray-500 text-xs mt-1">Yayın Tarihi: {new Date(currentArticle.date).toLocaleDateString()}</p>
            )}
          </div>

          <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-200">
            <button
              onClick={handlePrevNews}
              disabled={currentNewsIndex === 0}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
            >
              &lt; Önceki
            </button>
            <span className="text-gray-600 text-sm font-medium">
              {currentNewsIndex + 1} / {newsData?.data?.length || 0}
            </span>
            <button
              onClick={handleNextNews}
              disabled={!newsData || !newsData.data || currentNewsIndex === newsData.data.length - 1}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
            >
              Sonraki &gt;
            </button>
          </div>
        </div>
      )}
      {newsData && (!newsData.data || newsData.data.length === 0) && !loading && !error && (
        <p className="text-gray-600 text-center mt-4">Gösterilecek haber bulunamadı.</p>
      )}
    </div>
  );
};

export default NewsCard;