import { useState, useEffect } from 'react';
import { Search, Tractor, Construction, ArrowRight } from 'lucide-react';
import { supabase, Category, Listing } from '../lib/supabase';

type HomePageProps = {
  onNavigate: (page: string, params?: any) => void;
};

const moroccanRegions = [
  'Casablanca-Settat',
  'Rabat-Salé-Kénitra',
  'Fès-Meknès',
  'Marrakech-Safi',
  'Tanger-Tétouan-Al Hoceïma',
  'Souss-Massa',
  'Béni Mellal-Khénifra',
  'Oriental',
  'Drâa-Tafilalet',
  'Laâyoune-Sakia El Hamra',
  'Guelmim-Oued Noun',
  'Dakhla-Oued Ed-Dahab',
];

export function HomePage({ onNavigate }: HomePageProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [latestListings, setLatestListings] = useState<Listing[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  useEffect(() => {
    loadCategories();
    loadLatestListings();
  }, []);

  const loadCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    if (data) setCategories(data);
  };

  const loadLatestListings = async () => {
    const { data } = await supabase
      .from('listings')
      .select('*')
      .eq('status', 'approved')
      .eq('is_active', true)
      .order('priority_score', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(6);
    if (data) setLatestListings(data);
  };

  const handleSearch = () => {
    const params = {
      keyword: searchKeyword,
      category: selectedCategory,
      region: selectedRegion,
    };
    onNavigate('listings', params);
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-[#156D3E] to-[#0f5630] text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Trouvez ou vendez vos engins agricoles & BTP au Maroc
            </h1>
            <p className="text-xl md:text-2xl text-gray-100">
              La plus grande plateforme d'annonces professionnelles dans les domaines agricole et construction
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Mot-clé (ex: tracteur)"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E] text-gray-900"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E] text-gray-900"
              >
                <option value="">Toutes catégories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E] text-gray-900"
              >
                <option value="">Toutes régions</option>
                {moroccanRegions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              <button
                onClick={handleSearch}
                className="bg-[#156D3E] text-white px-6 py-3 rounded-md hover:bg-[#0f5630] transition-colors flex items-center justify-center font-medium"
              >
                <Search className="h-5 w-5 mr-2" />
                Rechercher
              </button>
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => onNavigate('subscription-selection')}
              className="bg-white text-[#156D3E] px-8 py-4 rounded-md hover:bg-gray-100 transition-colors font-semibold text-lg inline-flex items-center shadow-lg"
            >
              Publier une annonce
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Catégories principales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              onClick={() => onNavigate('listings', { category: categories.find(c => c.slug === 'agricole')?.id })}
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer group"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="bg-[#156D3E] bg-opacity-10 p-6 rounded-full group-hover:bg-opacity-20 transition-colors">
                  <Tractor className="h-16 w-16 text-[#156D3E]" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-center mb-3 text-gray-900">
                Engins Agricoles
              </h3>
              <p className="text-gray-600 text-center">
                Tracteurs, moissonneuses, charrues, semoirs et tout l'équipement agricole
              </p>
              <div className="text-center mt-6">
                <span className="text-[#156D3E] font-medium inline-flex items-center group-hover:underline">
                  Voir les annonces
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              </div>
            </div>

            <div
              onClick={() => onNavigate('listings', { category: categories.find(c => c.slug === 'btp')?.id })}
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer group"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="bg-[#156D3E] bg-opacity-10 p-6 rounded-full group-hover:bg-opacity-20 transition-colors">
                  <Construction className="h-16 w-16 text-[#156D3E]" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-center mb-3 text-gray-900">
                Engins BTP
              </h3>
              <p className="text-gray-600 text-center">
                Bulldozers, pelleteuses, camions, grues et matériel de construction
              </p>
              <div className="text-center mt-6">
                <span className="text-[#156D3E] font-medium inline-flex items-center group-hover:underline">
                  Voir les annonces
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Dernières annonces publiées
            </h2>
            <button
              onClick={() => onNavigate('listings')}
              className="text-[#156D3E] font-medium hover:underline inline-flex items-center"
            >
              Voir plus
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestListings.map((listing) => (
              <div
                key={listing.id}
                onClick={() => onNavigate('listing-detail', { id: listing.id })}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              >
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  {listing.images && listing.images.length > 0 ? (
                    <img
                      src={listing.images[0]}
                      alt={listing.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Tractor className="h-16 w-16 text-gray-400" />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-gray-900 truncate">
                    {listing.title}
                  </h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-2xl font-bold text-[#156D3E]">
                      {listing.price.toLocaleString()} MAD
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>📍 {listing.region}</p>
                    {listing.year && <p>📅 {listing.year}</p>}
                    <p>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        listing.condition === 'new' ? 'bg-green-100 text-green-800' :
                        listing.condition === 'good' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {listing.condition === 'new' ? 'Neuf' :
                         listing.condition === 'good' ? 'Bon état' : 'Occasion'}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {latestListings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Aucune annonce disponible pour le moment</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Comment ça marche ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[#156D3E] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Créez un compte</h3>
              <p className="text-gray-600">
                Inscrivez-vous gratuitement en quelques secondes
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#156D3E] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Publiez votre annonce</h3>
              <p className="text-gray-600">
                Ajoutez photos et détails de votre engin
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#156D3E] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Recevez des offres</h3>
              <p className="text-gray-600">
                Les acheteurs vous contactent directement
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#156D3E] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Vendez votre engin dès aujourd'hui sur Enginex 🚜
          </h2>
          <p className="text-xl mb-8 text-gray-100">
            Rejoignez des milliers de professionnels qui font confiance à notre plateforme
          </p>
          <button
            onClick={() => onNavigate('publish')}
            className="bg-white text-[#156D3E] px-8 py-4 rounded-md hover:bg-gray-100 transition-colors font-semibold text-lg inline-flex items-center shadow-lg"
          >
            Publier une annonce maintenant
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
