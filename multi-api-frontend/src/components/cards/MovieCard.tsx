// ... existing code ...
import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/apiService';

import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';
import type { MovieData } from '../../types/api.types';

const genres = [
  'Drama', 'Comedy', 'Documentary', 'Action', 'Romance', 'Thriller', 'Crime',
  'Horror', 'Adventure', 'Family', 'Animation', 'Reality-TV', 'Mystery',
  'Music', 'Talk-Show', 'Fantasy', 'History', 'Biography', 'Sci-Fi', 'Sport',
  'Musical', 'Adult', 'War', 'News', 'Game-Show', 'Western', 'Short', 'Film-Noir'
];

const MovieCard: React.FC = () => {
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [movieData, setMovieData] = useState<MovieData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentMovieIndex, setCurrentMovieIndex] = useState<number>(0);
  const [nextCursor, setNextCursor] = useState<string | undefined>(undefined);

  
  useEffect(() => {
    setNextCursor(undefined);
    setMovieData(null); 
    setCurrentMovieIndex(0); 
  }, [selectedGenre]);

  const fetchMovieSuggestion = async () => {
    if (!selectedGenre) {
      setError('Lütfen bir film türü seçin.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // nextCursor'ı apiService.getMovies'e gönder
      const response = await apiService.getMovies(selectedGenre, nextCursor);
      
      if (response.data && Array.isArray(response.data.results) && response.data.results.length > 0) {
        // Description ve primaryImage'ı null olmayan ve spokenLanguages 'tr' veya 'en' olan filmleri filtrele
        const filteredMovies = response.data.results.filter(movie => 
          movie.description && 
          movie.primaryImage && 
          movie.spokenLanguages && 
          (movie.spokenLanguages.includes('tr') || movie.spokenLanguages.includes('en'))
        );
        
        if (filteredMovies.length > 0) {
          setMovieData({ ...response.data, results: filteredMovies });
          // Her sorguda farklı film önerisi için rastgele bir index belirle
          const randomIndex = Math.floor(Math.random() * filteredMovies.length);
          setCurrentMovieIndex(randomIndex);
          // Bir sonraki sayfa için nextCursorMark'ı kaydet
          setNextCursor(response.data.nextCursorMark); 
        } else {
          setMovieData(null);
          setError('Belirtilen türde, açıklaması, resmi ve Türkçe/İngilizce dilinde film bulunamadı.');
          setNextCursor(undefined);
        }
      } else {
        setMovieData(null);
        setError('Belirtilen türde film bulunamadı.');
        setNextCursor(undefined);
      }
    } catch (err) {
      setError('Film önerisi alınamadı.');
      setNextCursor(undefined); 
    } finally {
      setLoading(false);
    }
  };

  const handleNextMovie = () => {
    if (movieData && movieData.results && currentMovieIndex < movieData.results.length - 1) {
      setCurrentMovieIndex(prevIndex => prevIndex + 1);
    } else if (nextCursor) { 
      setCurrentMovieIndex(0); 
      fetchMovieSuggestion(); 
    }
  };

  const handlePrevMovie = () => {
    if (movieData && currentMovieIndex > 0) {
      setCurrentMovieIndex(prevIndex => prevIndex - 1);
    }
  };

  const currentMovie = movieData && movieData.results && movieData.results.length > 0
    ? movieData.results[currentMovieIndex]
    : null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition duration-300 ease-in-out">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-blue-300 pb-2">Film Önerisi</h2>
      <div className="flex items-center space-x-3 mb-4">
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Film türü seçin</option>
          {genres.map(genreOption => (
            <option key={genreOption} value={genreOption}>
              {genreOption}
            </option>
          ))}
        </select>
        <button
          onClick={fetchMovieSuggestion}
          className="bg-red-600 text-white px-5 py-3 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Film Önerisi Getir
        </button>
      </div>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}

      {currentMovie && (
        <div className="text-gray-700 mt-4">
          {currentMovie.primaryImage && (
            <img 
              src={currentMovie.primaryImage} 
              alt={currentMovie.originalTitle || 'Film Resmi'} 
              className="w-full h-64 object-cover rounded-md mb-4 shadow-md"
            />
          )}
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{currentMovie.originalTitle}</h3>
          {currentMovie.description && (
            <p className="text-gray-700 text-sm mb-2 line-clamp-3">{currentMovie.description}</p>
          )}
          {currentMovie.releaseDate && (
            <p className="text-md mb-1">
              <i className="fas fa-calendar-alt text-gray-500 mr-2"></i>Çıkış Tarihi: {currentMovie.releaseDate}
            </p>
          )}
          {currentMovie.runtimeMinutes && (
            <p className="text-md mb-1">
              <i className="fas fa-clock text-gray-500 mr-2"></i>Süre: {currentMovie.runtimeMinutes} dakika
            </p>
          )}
          {currentMovie.averageRating && (
            <p className="text-md mb-1">
              <i className="fas fa-star text-yellow-500 mr-2"></i>Ortalama Derecelendirme: {currentMovie.averageRating}
            </p>
          )}

          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevMovie}
              disabled={currentMovieIndex === 0}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &lt; Önceki
            </button>
            <span className="text-gray-600 text-sm flex items-center">
              {currentMovieIndex + 1} / {movieData?.results?.length || 0}
            </span>
            <button
              onClick={handleNextMovie}
              disabled={(!movieData || !movieData.results || currentMovieIndex === movieData.results.length - 1) && !nextCursor}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sonraki &gt;
            </button>
          </div>
        </div>
      )}
      {movieData && (!movieData.results || movieData.results.length === 0) && !loading && !error && (
        <p className="text-gray-600 text-center mt-4">Gösterilecek film bulunamadı.</p>
      )}
    </div>
  );
};

export default MovieCard;