import React, { useState } from 'react';
import { apiService } from '../../services/apiService';

import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';
import type { WeatherData } from '../../types/api.types';

const WeatherCard: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fahrenheit'tan Santigrat'a dönüşüm fonksiyonu
  const fahrenheitToCelsius = (fahrenheit: number): string => {
    return ((fahrenheit - 32) * 5 / 9).toFixed(1);
  };

  const fetchWeather = async () => {
    if (!city) {
      setError('Lütfen bir şehir girin.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getWeather(city); 
      setWeatherData(response.data);
    } catch (err) {
      setError('Hava durumu bilgileri alınamadı.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition duration-300 ease-in-out flex flex-col">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-blue-300 pb-2">Hava Durumu</h2>
      <div className="flex items-center space-x-3 mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Şehir adı girin (örn: İstanbul)"
          className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchWeather}
          className="bg-blue-600 text-white px-5 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md transform hover:scale-105 transition duration-300"
        >
          Sorgula
        </button>
      </div>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}

      {weatherData && (
        <div className="flex flex-col items-center justify-center flex-grow mt-4">
          <p className="text-2xl font-semibold text-gray-800 mb-2 flex items-center">
            <i className="fas fa-map-marker-alt text-red-500 mr-2"></i>{weatherData.name}
          </p>
          <div className="text-7xl font-extrabold text-yellow-500 mb-2">
            {fahrenheitToCelsius(weatherData.main.temp)}°C
          </div>
          <p className="text-2xl text-gray-700 mb-4">
            {weatherData.weather[0]?.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 w-full mt-4">
            <div className="flex items-center justify-center p-3 bg-gray-100 rounded-md shadow-sm">
              <i className="fas fa-arrow-down text-blue-500 mr-2"></i>
              <p className="text-base">Min: <span className="font-semibold">{fahrenheitToCelsius(weatherData.main.temp_min)}°C</span></p>
            </div>
            <div className="flex items-center justify-center p-3 bg-gray-100 rounded-md shadow-sm">
              <i className="fas fa-arrow-up text-red-500 mr-2"></i>
              <p className="text-base">Max: <span className="font-semibold">{fahrenheitToCelsius(weatherData.main.temp_max)}°C</span></p>
            </div>
            <div className="flex items-center justify-center p-3 bg-gray-100 rounded-md shadow-sm">
              <i className="fas fa-tint text-teal-500 mr-2"></i>
              <p className="text-base">Nem: <span className="font-semibold">{weatherData.main.humidity}%</span></p>
            </div>
            <div className="flex items-center justify-center p-3 bg-gray-100 rounded-md shadow-sm">
              <i className="fas fa-wind text-gray-500"></i>
              <p className="text-base">Rüzgar Hızı: <span className="font-semibold">{weatherData.wind.speed.toFixed(1)} m/s</span></p>
            </div>
          </div>
          <div className="text-sm text-gray-500 mt-6">
            Koordinatlar: ({weatherData.coord.lat}, {weatherData.coord.lon})
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;