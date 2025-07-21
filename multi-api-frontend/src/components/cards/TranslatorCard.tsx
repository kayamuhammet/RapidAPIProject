import React, { useState } from 'react';
import { apiService } from '../../services/apiService';

import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';
import type { TranslatorData } from '../../types/api.types';

const TranslatorCard: React.FC = () => {
  const [wordToTranslate, setWordToTranslate] = useState<string>('');
  const [translatedData, setTranslatedData] = useState<TranslatorData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const translateWord = async () => {
    if (!wordToTranslate) {
      setError('Lütfen çevirmek istediğiniz kelimeyi girin.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.translateWord(wordToTranslate);
      setTranslatedData(response.data);
    } catch (err) {
      setError('Kelime çevrilemedi.');
    } finally {
      setLoading(false);
    }
  };

  const turkishTranslation = translatedData?.translations?.find(
    (t) => t.posTag === 'NOUN' && t.translation !== translatedData.word
  )?.translation;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition duration-300 ease-in-out flex flex-col">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-blue-300 pb-2">Kelime Çevirici</h2>
      <div className="flex items-center space-x-3 mb-4">
        <input
          type="text"
          value={wordToTranslate}
          onChange={(e) => setWordToTranslate(e.target.value)}
          placeholder="İngilizce kelime giriniz"
          className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={translateWord}
          className="bg-indigo-600 text-white px-5 py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-md transform hover:scale-105 transition duration-300"
        >
          Çevir
        </button>
      </div>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}

      {translatedData && (
        <div className="flex flex-col items-center justify-center flex-grow mt-4"> 
          <div className="text-4xl font-extrabold text-indigo-700 mb-2 text-center">
            "{translatedData.word}"
          </div>
          {turkishTranslation && (
            <div className="text-4xl font-extrabold text-green-600 mb-4 text-center">
              "{turkishTranslation}"
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 w-full mt-4"> 
            {translatedData.language && (
              <div className="flex items-center justify-center p-2 bg-gray-100 rounded-md shadow-sm">
                <i className="fas fa-language text-gray-500 mr-2"></i>
                <p className="text-lg">Hedef Dil: <span className="font-semibold uppercase">{translatedData.language}</span></p>
              </div>
            )}
            {translatedData.proficiency && (
              <div className="flex items-center justify-center p-2 bg-gray-100 rounded-md shadow-sm">
                <i className="fas fa-chart-line text-gray-500 mr-2"></i>
                <p className="text-lg">Yeterlilik: <span className="font-semibold">{translatedData.proficiency}</span></p>
              </div>
            )}
          </div>

          {translatedData.pronunciations && translatedData.pronunciations.length > 0 && (
            <div className="mt-6 w-full text-center">
              <p className="text-xl font-semibold text-gray-800 mb-2">Telaffuzlar:</p>
              <ul className="list-none space-y-2 text-md">
                {translatedData.pronunciations.map((p, i) => (
                  <li key={i} className="bg-gray-50 p-2 rounded-md shadow-sm">
                    "{p.pronunciation}" ({p.accent})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TranslatorCard;