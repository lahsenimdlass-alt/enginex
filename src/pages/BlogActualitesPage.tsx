import { ArrowLeft, Newspaper, Calendar, Clock } from 'lucide-react';

type BlogActualitesPageProps = {
  onNavigate: (page: string, params?: any) => void;
};

export function BlogActualitesPage({ onNavigate }: BlogActualitesPageProps) {
  const articles = [
    {
      id: 'foires-agricoles-2025',
      title: 'Les foires agricoles à ne pas manquer en 2025 au Maroc',
      excerpt: 'Calendrier complet des événements majeurs : SIAM, salons régionaux et démonstrations de matériel',
      date: '20 Janvier 2025',
      readTime: '7 min',
      image: 'https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg',
    },
    {
      id: 'innovations-btp-maroc',
      title: 'Les innovations technologiques qui transforment le BTP au Maroc',
      excerpt: 'Drones, engins autonomes et digitalisation : découvrez les technologies qui révolutionnent le secteur',
      date: '17 Janvier 2025',
      readTime: '10 min',
      image: 'https://images.pexels.com/photos/1094767/pexels-photo-1094767.jpeg',
    },
    {
      id: 'partenariats-enginex',
      title: 'EngineX Maroc annonce de nouveaux partenariats stratégiques',
      excerpt: 'Collaboration avec les principales marques d\'engins pour offrir le meilleur service à nos utilisateurs',
      date: '13 Janvier 2025',
      readTime: '5 min',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate('blog')}
            className="flex items-center space-x-2 text-white hover:text-blue-100 mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Retour au blog</span>
          </button>
          <div className="flex items-center space-x-3 mb-4">
            <Newspaper className="h-10 w-10" />
            <h1 className="text-4xl font-bold">Actualités</h1>
          </div>
          <p className="text-xl text-blue-100">
            Les dernières nouvelles du secteur agricole et BTP
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div
              key={article.id}
              onClick={() => onNavigate('blog-article', { category: 'actualites', id: article.id })}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#156D3E] transition-colors line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
