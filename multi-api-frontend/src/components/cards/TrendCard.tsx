import React, { useState } from 'react';
import { apiService } from '../../services/apiService';

import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';
import type { TrendData } from '../../types/api.types';

const TrendCard: React.FC = () => {
  const [trendData, setTrendData] = useState<TrendData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTrends = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getTrends();
      setTrendData(response.data);
    } catch (err) {
      setError('Trendler alınamadı.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition duration-300 ease-in-out">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-blue-300 pb-2">Twitter Trendleri</h2>
      <div className="flex justify-center mb-4">
        <button
          onClick={fetchTrends}
          className="bg-blue-500 text-white px-5 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Trendleri Getir
        </button>
      </div>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}

      {trendData && Array.isArray(trendData.trends) && trendData.trends.length > 0 && (
        <div className="mt-4">
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {trendData.trends.slice(0, 10).map((trend, index) => (
              <li key={index} className="text-lg">
                {trend.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      {trendData && (!Array.isArray(trendData.trends) || trendData.trends.length === 0) && !loading && !error && (
        <p className="text-gray-600 text-center mt-4">Gösterilecek trend bulunamadı.</p>
      )}
    </div>
  );
};

export default TrendCard;