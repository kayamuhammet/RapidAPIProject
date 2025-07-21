import ExchangeCard from "../components/cards/ExchangeCard";
import MovieCard from "../components/cards/MovieCard";
import NewsCard from "../components/cards/NewsCard";
import TranslatorCard from "../components/cards/TranslatorCard";
import TrendCard from "../components/cards/TrendCard";
import WeatherCard from "../components/cards/WeatherCard";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100"> 
      <div className="container mx-auto px-4 py-12"> 
        <header className="text-center mb-16"> 
          <h1 className="text-6xl font-extrabold text-gray-800 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
            MULTİ API
          </h1>
          <p className="text-gray-700 text-xl max-w-3xl mx-auto leading-relaxed">
            Güncel kalmanın en kısa yolu. Modern, responsive ve kullanıcı dostu arayüz.
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <TrendCard />
          <NewsCard />
          <MovieCard />
          <WeatherCard />
          <TranslatorCard />
          <ExchangeCard />
        </div>
      </div>
    </div>
  );
};

export default HomePage;