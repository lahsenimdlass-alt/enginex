import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Tractor } from 'lucide-react';
import { supabase, Listing, Category, EquipmentType } from '../lib/supabase';

type ListingsPageProps = {
  onNavigate: (page: string, params?: any) => void;
  filters?: {
    keyword?: string;
    category?: string;
    region?: string;
  };
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

export function ListingsPage({ onNavigate, filters }: ListingsPageProps) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [equipmentTypes, setEquipmentTypes] = useState<EquipmentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const [keyword, setKeyword] = useState(filters?.keyword || '');
  const [selectedCategory, setSelectedCategory] = useState(filters?.category || '');
  const [selectedEquipmentType, setSelectedEquipmentType] = useState('');
  const [selectedRegion, setSelectedRegion] = useState(filters?.region || '');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minYear, setMinYear] = useState('');
  const [maxYear, setMaxYear] = useState('');

  useEffect(() => {
    loadCategories();
    loadEquipmentTypes();
  }, []);

  useEffect(() => {
    loadListings();
  }, [selectedCategory, selectedEquipmentType, selectedRegion, selectedCondition, minPrice, maxPrice, minYear, maxYear]);

  const loadCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    if (data) setCategories(data);
  };

  const loadEquipmentTypes = async () => {
    const { data } = await supabase
      .from('equipment_types')
      .select('*')
      .order('name');
    if (data) setEquipmentTypes(data);
  };

  const loadListings = async () => {
    setLoading(true);
    let query = supabase
      .from('listings')
      .select('*')
      .eq('status', 'approved')
      .eq('is_active', true);

    if (selectedCategory) {
      query = query.eq('category_id', selectedCategory);
    }

    if (selectedEquipmentType) {
      query = query.eq('equipment_type_id', selectedEquipmentType);
    }

    if (selectedRegion) {
      query = query.eq('region', selectedRegion);
    }

    if (selectedCondition) {
      query = query.eq('condition', selectedCondition);
    }

    if (minPrice) {
      query = query.gte('price', parseInt(minPrice));
    }

    if (maxPrice) {
      query = query.lte('price', parseInt(maxPrice));
    }

    if (minYear) {
      query = query.gte('year', parseInt(minYear));
    }

    if (maxYear) {
      query = query.lte('year', parseInt(maxYear));
    }

    if (keyword) {
      query = query.or(`title.ilike.%${keyword}%,description.ilike.%${keyword}%`);
    }

    const { data } = await query
      .order('priority_score', { ascending: false })
      .order('created_at', { ascending: false });

    if (data) setListings(data);
    setLoading(false);
  };

  const handleSearch = () => {
    loadListings();
  };

  const resetFilters = () => {
    setKeyword('');
    setSelectedCategory('');
    setSelectedEquipmentType('');
    setSelectedRegion('');
    setSelectedCondition('');
    setMinPrice('');
    setMaxPrice('');
    setMinYear('');
    setMaxYear('');
  };

  const filteredEquipmentTypes = selectedCategory
    ? equipmentTypes.filter(et => et.category_id === selectedCategory)
    : equipmentTypes;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Toutes les annonces</h1>
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Rechercher une annonce..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E]"
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#156D3E] hover:bg-gray-100 rounded-md"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center gap-2 font-medium"
          >
            <SlidersHorizontal className="h-5 w-5" />
            Filtres
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg text-gray-900">Filtres</h2>
              <button
                onClick={resetFilters}
                className="text-sm text-[#156D3E] hover:underline"
              >
                Réinitialiser
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Catégorie</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSelectedEquipmentType('');
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E]"
                >
                  <option value="">Toutes</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Type d'engin</label>
                <select
                  value={selectedEquipmentType}
                  onChange={(e) => setSelectedEquipmentType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E]"
                  disabled={!selectedCategory}
                >
                  <option value="">Tous</option>
                  {filteredEquipmentTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Région</label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E]"
                >
                  <option value="">Toutes</option>
                  {moroccanRegions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">État</label>
                <select
                  value={selectedCondition}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E]"
                >
                  <option value="">Tous</option>
                  <option value="new">Neuf</option>
                  <option value="good">Bon état</option>
                  <option value="used">Occasion</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Prix (MAD)</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E]"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Année</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="De"
                    value={minYear}
                    onChange={(e) => setMinYear(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E]"
                  />
                  <input
                    type="number"
                    placeholder="À"
                    value={maxYear}
                    onChange={(e) => setMaxYear(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E]"
                  />
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className="lg:col-span-3">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Chargement des annonces...</p>
            </div>
          ) : listings.length > 0 ? (
            <>
              <div className="mb-6">
                <p className="text-gray-600">
                  {listings.length} annonce{listings.length > 1 ? 's' : ''} trouvée{listings.length > 1 ? 's' : ''}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {listings.map((listing) => (
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
            </>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <Tractor className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-4">Aucune annonce trouvée</p>
              <button
                onClick={resetFilters}
                className="text-[#156D3E] hover:underline font-medium"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
