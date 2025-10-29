import { ArrowLeft, Tractor, Calendar, Clock } from 'lucide-react';

type BlogAgricolePageProps = {
  onNavigate: (page: string, params?: any) => void;
};

export function BlogAgricolePage({ onNavigate }: BlogAgricolePageProps) {
  const articles = [
    {
      id: 'comment-choisir-un-tracteur',
      title: 'Comment choisir un tracteur adapté à votre exploitation',
      excerpt: 'Guide complet pour sélectionner le tracteur idéal selon la taille de votre exploitation et vos besoins',
      date: '15 Janvier 2025',
      readTime: '8 min',
      image: 'https://images.pexels.com/photos/164186/pexels-photo-164186.jpeg',
    },
    {
      id: 'marques-de-tracteurs-populaires',
      title: 'Les marques de tracteurs les plus populaires au Maroc',
      excerpt: 'Comparatif des principales marques disponibles sur le marché marocain : John Deere, New Holland, Massey Ferguson',
      date: '12 Janvier 2025',
      readTime: '10 min',
      image: 'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg',
    },
    {
      id: 'entretenir-son-moteur-agricole',
      title: 'Guide d\'entretien pour prolonger la vie de votre engin agricole',
      excerpt: 'Conseils pratiques et calendrier d\'entretien pour maintenir votre matériel en parfait état',
      date: '8 Janvier 2025',
      readTime: '12 min',
      image: 'https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate('blog')}
            className="flex items-center space-x-2 text-white hover:text-green-100 mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Retour au blog</span>
          </button>
          <div className="flex items-center space-x-3 mb-4">
            <Tractor className="h-10 w-10" />
            <h1 className="text-4xl font-bold">Blog Agricole</h1>
          </div>
          <p className="text-xl text-green-100">
            Guides et conseils pour optimiser votre exploitation agricole
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div
              key={article.id}
              onClick={() => onNavigate('blog-article', { category: 'agricole', id: article.id })}
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
