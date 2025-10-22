import { useState, useEffect } from 'react';
import { MapPin, Calendar, Package, Tag, Phone, Mail, ArrowLeft } from 'lucide-react';
import { supabase, Listing, Profile } from '../lib/supabase';

type ListingDetailPageProps = {
  listingId: string;
  onNavigate: (page: string) => void;
};

export function ListingDetailPage({ listingId, onNavigate }: ListingDetailPageProps) {
  const [listing, setListing] = useState<Listing | null>(null);
  const [seller, setSeller] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    loadListing();
    recordView();
  }, [listingId]);

  const recordView = async () => {
    await supabase.from('listing_views').insert({
      listing_id: listingId,
      ip_address: 'web',
    });
  };

  const loadListing = async () => {
    setLoading(true);

    const { data: listingData } = await supabase
      .from('listings')
      .select('*')
      .eq('id', listingId)
      .maybeSingle();

    if (listingData) {
      setListing(listingData);

      if (listingData.user_id) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', listingData.user_id)
          .maybeSingle();

        if (profileData) {
          setSeller(profileData);
        }
      }
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <p className="text-center text-gray-500">Chargement...</p>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Annonce introuvable</h2>
          <button
            onClick={() => onNavigate('listings')}
            className="text-[#156D3E] hover:underline"
          >
            Retour aux annonces
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={() => onNavigate('listings')}
        className="flex items-center gap-2 text-gray-600 hover:text-[#156D3E] mb-6 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        Retour aux annonces
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="h-96 bg-gray-200 flex items-center justify-center">
              {listing.images && listing.images.length > 0 ? (
                <img
                  src={listing.images[selectedImage]}
                  alt={listing.title}
                  className="w-full h-full object-contain"
                />
              ) : (
                <Package className="h-24 w-24 text-gray-400" />
              )}
            </div>

            {listing.images && listing.images.length > 1 && (
              <div className="p-4 bg-gray-50 flex gap-2 overflow-x-auto">
                {listing.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 h-20 w-20 rounded border-2 overflow-hidden ${
                      selectedImage === index ? 'border-[#156D3E]' : 'border-gray-300'
                    }`}
                  >
                    <img src={img} alt={`Image ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold mb-4 text-gray-900">{listing.title}</h1>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl font-bold text-[#156D3E]">
                {listing.price.toLocaleString()} MAD
              </span>
              {seller?.account_type === 'pro' && (
                <span className="px-3 py-1 bg-[#156D3E] text-white text-sm font-semibold rounded">
                  PRO
                </span>
              )}
              {seller?.account_type === 'premium' && (
                <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-sm font-semibold rounded">
                  PREMIUM
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {listing.year && (
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Année</p>
                    <p className="font-medium">{listing.year}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Région</p>
                  <p className="font-medium">{listing.region}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <Package className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">État</p>
                  <p className="font-medium">
                    {listing.condition === 'new' ? 'Neuf' :
                     listing.condition === 'good' ? 'Bon état' : 'Occasion'}
                  </p>
                </div>
              </div>

              {listing.brand && (
                <div className="flex items-center gap-2 text-gray-700">
                  <Tag className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Marque</p>
                    <p className="font-medium">{listing.brand}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t pt-6">
              <h2 className="text-xl font-bold mb-3 text-gray-900">Description</h2>
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {listing.description}
              </p>
            </div>

            {(listing.model || listing.city) && (
              <div className="border-t pt-6 mt-6">
                <h2 className="text-xl font-bold mb-3 text-gray-900">Détails supplémentaires</h2>
                <div className="grid grid-cols-2 gap-4">
                  {listing.model && (
                    <div>
                      <p className="text-sm text-gray-500">Modèle</p>
                      <p className="font-medium text-gray-900">{listing.model}</p>
                    </div>
                  )}
                  {listing.city && (
                    <div>
                      <p className="text-sm text-gray-500">Ville</p>
                      <p className="font-medium text-gray-900">{listing.city}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Informations vendeur</h2>

            {seller ? (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Nom</p>
                  <p className="font-semibold text-gray-900">{seller.full_name}</p>
                </div>

                {seller.phone && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Téléphone</p>
                    <a
                      href={`tel:${seller.phone}`}
                      className="flex items-center gap-2 text-[#156D3E] hover:underline"
                    >
                      <Phone className="h-4 w-4" />
                      {seller.phone}
                    </a>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <a
                    href={`mailto:${seller.email}`}
                    className="flex items-center gap-2 text-[#156D3E] hover:underline break-all"
                  >
                    <Mail className="h-4 w-4 flex-shrink-0" />
                    {seller.email}
                  </a>
                </div>

                <div className="pt-4 border-t">
                  <button
                    onClick={() => alert(`Contactez ${seller.full_name} via téléphone ou email`)}
                    className="w-full bg-[#156D3E] text-white px-6 py-3 rounded-md hover:bg-[#0f5630] transition-colors font-semibold"
                  >
                    Contacter le vendeur
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-600">Informations du vendeur non disponibles pour cette annonce.</p>
                {listing.contact_phone && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Téléphone</p>
                    <a
                      href={`tel:${listing.contact_phone}`}
                      className="flex items-center gap-2 text-[#156D3E] hover:underline"
                    >
                      <Phone className="h-4 w-4" />
                      {listing.contact_phone}
                    </a>
                  </div>
                )}
                {listing.contact_email && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <a
                      href={`mailto:${listing.contact_email}`}
                      className="flex items-center gap-2 text-[#156D3E] hover:underline break-all"
                    >
                      <Mail className="h-4 w-4 flex-shrink-0" />
                      {listing.contact_email}
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
            <p className="text-sm text-yellow-800">
              <strong>Conseil de sécurité :</strong> Inspectez toujours l'équipement en personne avant l'achat. Ne transférez jamais d'argent sans avoir vérifié l'état de l'engin.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
