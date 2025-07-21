import React, { useState } from 'react';
import { apiService } from '../../services/apiService';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';
import type { ExchangeData } from '../../types/api.types';

const ExchangeCard: React.FC = () => {
  const [exchangeData, setExchangeData] = useState<ExchangeData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExchangeRate = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getExchange('USD');
      setExchangeData(response.data);
    } catch (err) {
      setError('Döviz kuru bilgileri alınamadı.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition duration-300 ease-in-out flex flex-col"> 
      
      <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-blue-300">
        <div className="flex items-center">
          <span role="img" aria-label="Para" className="text-4xl mr-3">💱</span>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Döviz Kurları</h2>
            <p className="text-gray-600 text-base">Güncel kurlar</p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-center justify-center flex-grow py-4"> 
        <div className="flex justify-center mb-6 w-full"> 
          <button
            onClick={fetchExchangeRate}
            className="bg-green-600 text-white px-5 py-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-md transform hover:scale-105 transition duration-300"
          >
            1 Dolar Kaç TL ?
          </button>
        </div>

        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}

        {exchangeData && !loading && !error && (
          <div className="flex flex-col items-center mt-4 w-full"> 
            {exchangeData.rates?.TRY ? (
              <>
                <div className="text-5xl font-extrabold text-blue-700 mb-2"> 
                  {exchangeData.rates.TRY.toFixed(4)} TL
                </div>
                <div className="text-lg text-gray-600 text-center"> 
                  1 {exchangeData.base_code} = {exchangeData.rates.TRY.toFixed(4)} TRY
                </div>
              </>
            ) : (
              <p className="text-gray-600 text-center mt-4 text-lg">TL kuru bulunamadı.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExchangeCard;