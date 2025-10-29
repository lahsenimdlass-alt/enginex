import { ArrowLeft, HardHat, Calendar, Clock } from 'lucide-react';

type BlogBTPPageProps = {
  onNavigate: (page: string, params?: any) => void;
};

export function BlogBTPPage({ onNavigate }: BlogBTPPageProps) {
  const articles = [
    {
      id: 'comparatif-bulldozer-pelle',
      title: 'Bulldozer vs Pelle mécanique : lequel choisir pour votre chantier ?',
      excerpt: 'Analyse comparative détaillée pour vous aider à choisir l\'engin le plus adapté à vos travaux',
      date: '18 Janvier 2025',
      readTime: '9 min',
      image: 'https://images.pexels.com/photos/1106468/pexels-photo-1106468.jpeg',
    },
    {
      id: 'prix-engins-btp-2025',
      title: 'Guide des prix des engins BTP au Maroc en 2025',
      excerpt: 'Prix du marché actuel pour les principaux engins de construction neufs et d\'occasion',
      date: '14 Janvier 2025',
      readTime: '15 min',
      image: 'https://images.pexels.com/photos/1153838/pexels-photo-1153838.jpeg',
    },
    {
      id: 'astuces-pour-acheter-occasion',
      title: 'Acheter un engin BTP d\'occasion : les points à vérifier',
      excerpt: 'Check-list complète pour éviter les pièges et faire une bonne affaire',
      date: '10 Janvier 2025',
      readTime: '11 min',
      image: 'https://images.pexels.com/photos/1249610/pexels-photo-1249610.jpeg',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate('blog')}
            className="flex items-center space-x-2 text-white hover:text-orange-100 mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Retour au blog</span>
          </button>
          <div className="flex items-center space-x-3 mb-4">
            <HardHat className="h-10 w-10" />
            <h1 className="text-4xl font-bold">Blog BTP</h1>
          </div>
          <p className="text-xl text-orange-100">
            Tout ce qu'il faut savoir sur les engins de construction
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div
              key={article.id}
              onClick={() => onNavigate('blog-article', { category: 'btp', id: article.id })}
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
