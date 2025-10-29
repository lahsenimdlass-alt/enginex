import { BookOpen, Tractor, HardHat, Newspaper } from 'lucide-react';

type BlogPageProps = {
  onNavigate: (page: string, params?: any) => void;
};

export function BlogPage({ onNavigate }: BlogPageProps) {
  const categories = [
    {
      id: 'agricole',
      title: 'Agricole',
      icon: Tractor,
      description: 'Guides et conseils pour les engins agricoles',
      color: 'bg-green-100 text-green-700',
      borderColor: 'border-green-200',
      articles: 3,
    },
    {
      id: 'btp',
      title: 'BTP',
      icon: HardHat,
      description: 'Tout savoir sur les engins de construction',
      color: 'bg-orange-100 text-orange-700',
      borderColor: 'border-orange-200',
      articles: 3,
    },
    {
      id: 'actualites',
      title: 'Actualités',
      icon: Newspaper,
      description: 'Les dernières nouvelles du secteur',
      color: 'bg-blue-100 text-blue-700',
      borderColor: 'border-blue-200',
      articles: 3,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#156D3E] to-[#0f5630] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-12 w-12" />
          </div>
          <h1 className="text-4xl font-bold text-center mb-4">Blog EngineX Maroc</h1>
          <p className="text-xl text-center text-green-100 max-w-2xl mx-auto">
            Guides, conseils et actualités sur les engins agricoles et BTP au Maroc
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                onClick={() => onNavigate(`blog-${category.id}`)}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-[#156D3E] overflow-hidden group"
              >
                <div className={`${category.color} p-8 flex items-center justify-center`}>
                  <Icon className="h-16 w-16" />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#156D3E] transition-colors">
                    {category.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{category.articles} articles</span>
                    <span className="text-[#156D3E] font-medium group-hover:translate-x-2 transition-transform">
                      Découvrir →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pourquoi suivre notre blog ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-[#156D3E] text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Conseils d'experts</h3>
                <p className="text-gray-600 text-sm">
                  Des guides rédigés par des professionnels du secteur agricole et BTP
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-[#156D3E] text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Actualités locales</h3>
                <p className="text-gray-600 text-sm">
                  Suivez les tendances et innovations du marché marocain
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-[#156D3E] text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Comparatifs détaillés</h3>
                <p className="text-gray-600 text-sm">
                  Comparez les marques et modèles pour faire le bon choix
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-[#156D3E] text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Astuces pratiques</h3>
                <p className="text-gray-600 text-sm">
                  Conseils d'entretien et optimisation de vos investissements
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
