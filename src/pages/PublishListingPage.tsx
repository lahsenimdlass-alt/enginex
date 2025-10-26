import { useState, useEffect } from 'react';
import { Upload, X, AlertCircle, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, Category, EquipmentType } from '../lib/supabase';
import { uploadListingImage } from '../lib/storage';

type PublishListingPageProps = {
  onNavigate: (page: string) => void;
  selectedPlan?: 'individual' | 'pro' | 'premium';
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

export function PublishListingPage({ onNavigate, selectedPlan }: PublishListingPageProps) {
  const { user, profile, signUp, signIn } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [equipmentTypes, setEquipmentTypes] = useState<EquipmentType[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
  const [useCustomType, setUseCustomType] = useState(false);

  const [authData, setAuthData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
  });

  const [formData, setFormData] = useState({
    categoryId: '',
    equipmentTypeId: '',
    customEquipmentType: '',
    title: '',
    description: '',
    price: '',
    year: '',
    region: '',
    city: '',
    brand: '',
    model: '',
    condition: 'used' as 'new' | 'good' | 'used',
    contactPhone: '',
    contactEmail: '',
  });

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imageInput, setImageInput] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  const needsAuth = selectedPlan === 'pro' || selectedPlan === 'premium';

  useEffect(() => {
    if (needsAuth && !user) {
      setShowAuthForm(true);
    }
    loadCategories();
    loadEquipmentTypes();
  }, [needsAuth, user]);

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

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleAuthDataChange = (field: string, value: string) => {
    setAuthData((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (authMode === 'register') {
        if (!authData.fullName) {
          setError('Veuillez entrer votre nom complet');
          setLoading(false);
          return;
        }
        await signUp(authData.email, authData.password, authData.fullName, authData.phone);
      } else {
        await signIn(authData.email, authData.password);
      }

      setShowAuthForm(false);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const addImageUrl = () => {
    if (imageInput.trim() && imageUrls.length < 6) {
      setImageUrls([...imageUrls, imageInput.trim()]);
      setImageInput('');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    setError('');

    try {
      for (let i = 0; i < files.length && imageUrls.length + i < 6; i++) {
        const file = files[i];

        if (file.size > 5 * 1024 * 1024) {
          setError(`Le fichier ${file.name} est trop volumineux (max 5MB)`);
          continue;
        }

        if (!file.type.startsWith('image/')) {
          setError(`Le fichier ${file.name} n'est pas une image`);
          continue;
        }

        const url = await uploadListingImage(file);
        if (url) {
          setImageUrls(prev => [...prev, url]);
        } else {
          setError(`Erreur lors de l'upload de ${file.name}`);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'upload des images');
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  const removeImage = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.categoryId || (!formData.equipmentTypeId && !formData.customEquipmentType) || !formData.title || !formData.description || !formData.price || !formData.region || !formData.city || !formData.contactPhone) {
      setError('Veuillez remplir tous les champs obligatoires (y compris le téléphone)');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (selectedPlan === 'individual' || !selectedPlan) {
        let query = supabase
          .from('listings')
          .select('id, contact_phone, contact_email')
          .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

        if (formData.contactEmail) {
          query = query.or(`contact_phone.eq.${formData.contactPhone},contact_email.eq.${formData.contactEmail}`);
        } else {
          query = query.eq('contact_phone', formData.contactPhone);
        }

        const { data: existingListings, error: checkError } = await query;

        if (checkError) {
          console.error('Check error:', checkError);
          throw new Error('Erreur lors de la vérification des annonces existantes');
        }

        if (existingListings && existingListings.length >= 2) {
          setError('Limite atteinte : Vous avez déjà publié 2 annonces gratuites dans les 30 derniers jours. Passez à un abonnement Pro ou Premium pour publier plus d\'annonces.');
          setLoading(false);
          return;
        }
      }

      let equipmentTypeId = formData.equipmentTypeId;

      if (useCustomType && formData.customEquipmentType) {
        const { data: existingType } = await supabase
          .from('equipment_types')
          .select('id')
          .eq('category_id', formData.categoryId)
          .ilike('name', formData.customEquipmentType)
          .maybeSingle();

        if (existingType) {
          equipmentTypeId = existingType.id;
        } else {
          const { data: newType, error: typeError } = await supabase
            .from('equipment_types')
            .insert({
              category_id: formData.categoryId,
              name: formData.customEquipmentType,
              slug: formData.customEquipmentType.toLowerCase().replace(/\s+/g, '-'),
            })
            .select()
            .single();

          if (typeError) throw typeError;
          equipmentTypeId = newType.id;
        }
      }

      const accountType = selectedPlan || 'individual';
      const expiresAt = new Date();

      if (accountType === 'individual') {
        expiresAt.setDate(expiresAt.getDate() + 15);
      } else if (accountType === 'pro') {
        expiresAt.setDate(expiresAt.getDate() + 30);
      } else {
        expiresAt.setDate(expiresAt.getDate() + 90);
      }

      const listingData: any = {
        user_id: null,
        category_id: formData.categoryId,
        equipment_type_id: equipmentTypeId,
        title: formData.title,
        description: formData.description,
        price: parseInt(formData.price),
        year: formData.year ? parseInt(formData.year) : null,
        region: formData.region,
        city: formData.city,
        brand: formData.brand || null,
        model: formData.model || null,
        condition: formData.condition,
        images: imageUrls,
        status: 'pending',
        is_active: true,
        contact_phone: formData.contactPhone,
        contact_email: formData.contactEmail || null,
        expires_at: expiresAt.toISOString(),
      };

      if (user) {
        listingData.user_id = user.id;

        if (selectedPlan && selectedPlan !== 'individual' && profile?.account_type === 'individual') {
          const { error: profileError } = await supabase
            .from('profiles')
            .update({
              account_type: selectedPlan,
              subscription_expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            })
            .eq('id', user.id);

          if (profileError) throw profileError;
        }
      }

      const { error: insertError } = await supabase.from('listings').insert(listingData);

      if (insertError) throw insertError;

      try {
        await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'new_listing',
            to: formData.contactEmail || formData.contactPhone + '@temp.enginex.ma',
            data: {
              userName: user ? profile?.full_name : 'Utilisateur',
              listingTitle: formData.title,
              listingPrice: formData.price,
              listingRegion: formData.region
            }
          })
        });
      } catch (emailError) {
        console.error('Failed to send listing notification email:', emailError);
      }

      setSuccess(true);
      setTimeout(() => {
        if (user) {
          onNavigate('my-listings');
        } else {
          onNavigate('home');
        }
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const filteredEquipmentTypes = formData.categoryId
    ? equipmentTypes.filter(et => et.category_id === formData.categoryId)
    : [];

  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-gray-900">
            {selectedPlan === 'pro' || selectedPlan === 'premium'
              ? 'Abonnement activé et annonce publiée !'
              : 'Annonce publiée avec succès !'}
          </h2>
          <p className="text-gray-600 mb-4">
            Votre annonce sera visible après validation par notre équipe.
          </p>
          {selectedPlan === 'premium' && (
            <p className="text-orange-600 font-semibold mb-4">
              Votre annonce bénéficie de la priorité Premium et sera publiée en premier !
            </p>
          )}
          <p className="text-sm text-gray-500">
            Redirection...
          </p>
        </div>
      </div>
    );
  }

  if (showAuthForm && needsAuth) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-2 text-center text-gray-900">
            {authMode === 'register' ? 'Créer un compte' : 'Se connecter'}
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Un compte est requis pour l'abonnement {selectedPlan === 'pro' ? 'Pro' : 'Premium'}
          </p>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            {authMode === 'register' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Nom complet <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={authData.fullName}
                    onChange={(e) => handleAuthDataChange('fullName', e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={authData.phone}
                    onChange={(e) => handleAuthDataChange('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E]"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={authData.email}
                onChange={(e) => handleAuthDataChange('email', e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Mot de passe <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={authData.password}
                onChange={(e) => handleAuthDataChange('password', e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#156D3E] text-white px-6 py-3 rounded-md hover:bg-[#0f5630] disabled:bg-gray-300 transition-colors font-semibold"
            >
              {loading ? 'Chargement...' : authMode === 'register' ? 'Créer mon compte' : 'Se connecter'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => setAuthMode(authMode === 'register' ? 'login' : 'register')}
              className="text-[#156D3E] hover:underline text-sm"
            >
              {authMode === 'register'
                ? 'Vous avez déjà un compte ? Se connecter'
                : 'Pas de compte ? S\'inscrire'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">Publier une annonce</h1>
        <p className="text-gray-600">
          Formule sélectionnée : <strong>
            {selectedPlan === 'pro' ? 'Pro' : selectedPlan === 'premium' ? 'Premium' : 'Gratuit'}
          </strong>
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Catégorie <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.categoryId}
              onChange={(e) => {
                handleInputChange('categoryId', e.target.value);
                handleInputChange('equipmentTypeId', '');
                setUseCustomType(false);
              }}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E]"
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Type d'engin <span className="text-red-500">*</span>
            </label>
            {useCustomType ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.customEquipmentType}
                  onChange={(e) => handleInputChange('customEquipmentType', e.target.value)}
                  required
                  placeholder="Ex: Chargeuse compacte"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E]"
                />
                <button
                  type="button"
                  onClick={() => {
                    setUseCustomType(false);
                    handleInputChange('customEquipmentType', '');
                  }}
                  className="px-4 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  Liste
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <select
                  value={formData.equipmentTypeId}
                  onChange={(e) => handleInputChange('equipmentTypeId', e.target.value)}
                  required={!useCustomType}
                  disabled={!formData.categoryId}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E] disabled:bg-gray-100"
                >
                  <option value="">Sélectionner un type</option>
                  {filteredEquipmentTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setUseCustomType(true)}
                  disabled={!formData.categoryId}
                  className="px-4 py-3 bg-[#156D3E] text-white rounded-md hover:bg-[#0f5630] disabled:bg-gray-300"
                  title="Saisir un type personnalisé"
                >
                  Autre
                </button>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Titre de l'annonce <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            required
            placeholder="Ex: Tracteur John Deere 6120 en excellent état"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            required
            rows={5}
            placeholder="Décrivez votre engin en détail..."
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Prix (MAD) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              required
              min="0"
              placeholder="150000"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Année
            </label>
            <input
              type="number"
              value={formData.year}
              onChange={(e) => handleInputChange('year', e.target.value)}
              min="1900"
              max={new Date().getFullYear()}
              placeholder="2020"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Région <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.region}
              onChange={(e) => handleInputChange('region', e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E]"
            >
              <option value="">Sélectionner une région</option>
              {moroccanRegions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Ville <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              required
              placeholder="Ex: Casablanca"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Marque
            </label>
            <input
              type="text"
              value={formData.brand}
              onChange={(e) => handleInputChange('brand', e.target.value)}
              placeholder="Ex: John Deere"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Modèle
            </label>
            <input
              type="text"
              value={formData.model}
              onChange={(e) => handleInputChange('model', e.target.value)}
              placeholder="Ex: 6120"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E]"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            État <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.condition}
            onChange={(e) => handleInputChange('condition', e.target.value as any)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E]"
          >
            <option value="new">Neuf</option>
            <option value="good">Bon état</option>
            <option value="used">Occasion</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Téléphone de contact <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={formData.contactPhone}
              onChange={(e) => handleInputChange('contactPhone', e.target.value)}
              required
              placeholder="06XXXXXXXX"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E]"
            />
            <p className="text-xs text-gray-500 mt-1">
              Les acheteurs vous contacteront sur ce numéro
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Email de contact {selectedPlan === 'individual' && <span className="text-gray-500">(Facultatif)</span>}
              {(selectedPlan === 'pro' || selectedPlan === 'premium') && <span className="text-red-500">*</span>}
            </label>
            <input
              type="email"
              value={formData.contactEmail}
              onChange={(e) => handleInputChange('contactEmail', e.target.value)}
              required={selectedPlan === 'pro' || selectedPlan === 'premium'}
              placeholder="votre@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E]"
            />
            <p className="text-xs text-gray-500 mt-1">
              {selectedPlan === 'individual'
                ? 'Facultatif pour les annonces gratuites'
                : 'Obligatoire pour les comptes Pro et Premium'}
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Images (jusqu'à 6)
          </label>

          <div className="mb-4">
            <label
              htmlFor="file-upload"
              className={`flex items-center justify-center gap-3 px-6 py-4 border-2 border-dashed rounded-md cursor-pointer transition-colors ${
                uploadingImage || imageUrls.length >= 6
                  ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
                  : 'border-[#156D3E] bg-[#156D3E] bg-opacity-5 hover:bg-opacity-10'
              }`}
            >
              <ImageIcon className="h-6 w-6 text-[#156D3E]" />
              <span className="font-medium text-gray-700">
                {uploadingImage
                  ? 'Upload en cours...'
                  : imageUrls.length >= 6
                  ? 'Limite de 6 images atteinte'
                  : 'Cliquez pour ajouter des images depuis vos fichiers'}
              </span>
              <Upload className="h-5 w-5 text-[#156D3E]" />
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              multiple
              onChange={handleFileUpload}
              disabled={uploadingImage || imageUrls.length >= 6}
              className="hidden"
            />
            <p className="text-xs text-gray-500 mt-2">
              Formats acceptés : JPG, PNG, WEBP (max 5MB par image)
            </p>
          </div>

          <div className="mb-3">
            <p className="text-sm text-gray-600 mb-2">Ou ajoutez une URL d'image :</p>
            <div className="flex gap-2">
              <input
                type="url"
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addImageUrl())}
                placeholder="https://exemple.com/image.jpg"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E]"
              />
              <button
                type="button"
                onClick={addImageUrl}
                disabled={imageUrls.length >= 6}
                className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:bg-gray-300 transition-colors flex items-center gap-2"
              >
                <Upload className="h-5 w-5" />
                Ajouter URL
              </button>
            </div>
          </div>

          {imageUrls.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {imageUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold mb-2 text-gray-900">Formule sélectionnée</h3>
          <div className="flex items-center gap-2">
            <span className="text-gray-700">
              {selectedPlan === 'individual' && 'Gratuit (15 jours)'}
              {selectedPlan === 'pro' && 'Pro (30 jours)'}
              {selectedPlan === 'premium' && 'Premium (Priorité maximale)'}
            </span>
            {selectedPlan === 'pro' && (
              <span className="px-2 py-1 bg-[#156D3E] text-white text-xs font-semibold rounded">
                PRO
              </span>
            )}
            {selectedPlan === 'premium' && (
              <span className="px-2 py-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-xs font-semibold rounded">
                PREMIUM
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-[#156D3E] text-white px-6 py-3 rounded-md hover:bg-[#0f5630] disabled:bg-gray-300 transition-colors font-semibold"
          >
            {loading ? 'Publication...' : 'Publier mon annonce'}
          </button>
          <button
            type="button"
            onClick={() => onNavigate('subscription-selection')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Changer de formule
          </button>
        </div>
      </form>
    </div>
  );
}
