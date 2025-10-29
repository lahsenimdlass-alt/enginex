import { useState, useEffect } from 'react';
import { Upload, X, AlertCircle, CheckCircle, Image as ImageIcon, User, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, Category, EquipmentType, Profile } from '../lib/supabase';
import { uploadListingImage } from '../lib/storage';

type AdminCreateListingPageProps = {
  onNavigate: (page: string) => void;
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

export function AdminCreateListingPage({ onNavigate }: AdminCreateListingPageProps) {
  const { user, profile } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [equipmentTypes, setEquipmentTypes] = useState<EquipmentType[]>([]);
  const [allUsers, setAllUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [useCustomType, setUseCustomType] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const [formData, setFormData] = useState({
    userId: '',
    userName: '',
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
    badge: 'none' as 'none' | 'urgent' | 'top' | 'exclusive',
    status: 'approved' as 'pending' | 'approved' | 'rejected',
  });

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (!user || !profile?.is_admin) {
      onNavigate('home');
      return;
    }
    loadCategories();
    loadEquipmentTypes();
    loadUsers();
  }, [user, profile]);

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

  const loadUsers = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .order('full_name');
    if (data) setAllUsers(data);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const selectUser = (userId: string, userName: string, phone: string, email: string) => {
    setFormData((prev) => ({
      ...prev,
      userId,
      userName,
      contactPhone: phone || '',
      contactEmail: email || '',
    }));
    setShowUserDropdown(false);
    setSearchQuery(userName);
  };

  const filteredUsers = allUsers.filter(u =>
    u.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.phone?.includes(searchQuery)
  );

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
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setLoading(true);
    setError('');

    try {
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

      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 90);

      const listingData: any = {
        category_id: formData.categoryId,
        equipment_type_id: equipmentTypeId,
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        year: formData.year ? parseInt(formData.year) : null,
        region: formData.region,
        city: formData.city,
        brand: formData.brand || null,
        model: formData.model || null,
        condition: formData.condition,
        contact_phone: formData.contactPhone,
        contact_email: formData.contactEmail || null,
        images: imageUrls,
        status: formData.status,
        expires_at: expiresAt.toISOString(),
      };

      if (formData.userId) {
        listingData.user_id = formData.userId;
      }

      if (formData.badge !== 'none') {
        listingData.badge = formData.badge;
      }

      const { data: listing, error: insertError } = await supabase
        .from('listings')
        .insert(listingData)
        .select()
        .single();

      if (insertError) throw insertError;

      setSuccess(true);
      setTimeout(() => {
        onNavigate('admin');
      }, 2000);
    } catch (err: any) {
      console.error('Submit error:', err);
      setError(err.message || 'Une erreur est survenue lors de la création de l\'annonce');
    } finally {
      setLoading(false);
    }
  };

  if (!profile?.is_admin) {
    return null;
  }

  const filteredTypes = equipmentTypes.filter(
    (type) => type.category_id === formData.categoryId
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Créer une annonce (Admin)</h1>
              <p className="text-gray-600 mt-2">Créer une annonce au nom d'un utilisateur sans limites</p>
            </div>
            <button
              onClick={() => onNavigate('admin')}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              Retour
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-green-800 text-sm">Annonce créée avec succès ! Redirection...</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Selection */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <User className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">Utilisateur (Optionnel)</h2>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Sélectionnez un utilisateur ou laissez vide pour une annonce sans compte
              </p>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher un utilisateur par nom, email ou téléphone..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowUserDropdown(true);
                  }}
                  onFocus={() => setShowUserDropdown(true)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156D3E] focus:border-transparent"
                />
                {showUserDropdown && searchQuery && filteredUsers.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {filteredUsers.slice(0, 10).map((user) => (
                      <button
                        key={user.id}
                        type="button"
                        onClick={() => selectUser(user.id, user.full_name || 'Utilisateur', user.phone || '', user.email || '')}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-0"
                      >
                        <div className="font-medium text-gray-900">{user.full_name}</div>
                        <div className="text-sm text-gray-600">{user.email}</div>
                        {user.phone && <div className="text-sm text-gray-500">{user.phone}</div>}
                        <div className="mt-1">
                          <span className={`text-xs px-2 py-1 rounded ${
                            user.account_type === 'premium' ? 'bg-yellow-100 text-yellow-800' :
                            user.account_type === 'pro' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {user.account_type?.toUpperCase() || 'INDIVIDUAL'}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {formData.userId && (
                <div className="mt-4 p-3 bg-white rounded-md border border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Sélectionné : {formData.userName}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, userId: '', userName: '', contactPhone: '', contactEmail: '' }));
                        setSearchQuery('');
                      }}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Badge Selection */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Award className="h-5 w-5 text-yellow-600" />
                <h2 className="text-lg font-semibold text-gray-900">Badge</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <label className="relative flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer hover:bg-white transition-colors">
                  <input
                    type="radio"
                    name="badge"
                    value="none"
                    checked={formData.badge === 'none'}
                    onChange={(e) => handleInputChange('badge', e.target.value)}
                    className="sr-only"
                  />
                  <span className={`text-center ${formData.badge === 'none' ? 'text-[#156D3E] font-semibold' : 'text-gray-600'}`}>
                    Aucun badge
                  </span>
                  {formData.badge === 'none' && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-[#156D3E] rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                  )}
                </label>
                <label className="relative flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer hover:bg-white transition-colors">
                  <input
                    type="radio"
                    name="badge"
                    value="urgent"
                    checked={formData.badge === 'urgent'}
                    onChange={(e) => handleInputChange('badge', e.target.value)}
                    className="sr-only"
                  />
                  <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full mb-2">URGENT</span>
                  <span className={`text-sm text-center ${formData.badge === 'urgent' ? 'text-[#156D3E] font-semibold' : 'text-gray-600'}`}>
                    Urgent
                  </span>
                  {formData.badge === 'urgent' && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-[#156D3E] rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                  )}
                </label>
                <label className="relative flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer hover:bg-white transition-colors">
                  <input
                    type="radio"
                    name="badge"
                    value="top"
                    checked={formData.badge === 'top'}
                    onChange={(e) => handleInputChange('badge', e.target.value)}
                    className="sr-only"
                  />
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-2">TOP</span>
                  <span className={`text-sm text-center ${formData.badge === 'top' ? 'text-[#156D3E] font-semibold' : 'text-gray-600'}`}>
                    Top
                  </span>
                  {formData.badge === 'top' && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-[#156D3E] rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                  )}
                </label>
                <label className="relative flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer hover:bg-white transition-colors">
                  <input
                    type="radio"
                    name="badge"
                    value="exclusive"
                    checked={formData.badge === 'exclusive'}
                    onChange={(e) => handleInputChange('badge', e.target.value)}
                    className="sr-only"
                  />
                  <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full mb-2">EXCLUSIF</span>
                  <span className={`text-sm text-center ${formData.badge === 'exclusive' ? 'text-[#156D3E] font-semibold' : 'text-gray-600'}`}>
                    Exclusif
                  </span>
                  {formData.badge === 'exclusive' && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-[#156D3E] rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Status Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Statut de l'annonce *
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156D3E] focus:border-transparent"
                required
              >
                <option value="approved">Approuvée</option>
                <option value="pending">En attente</option>
                <option value="rejected">Rejetée</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Catégorie *
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) => {
                  handleInputChange('categoryId', e.target.value);
                  handleInputChange('equipmentTypeId', '');
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156D3E] focus:border-transparent"
                required
              >
                <option value="">Sélectionnez une catégorie</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Equipment Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type d'équipement *
              </label>
              {!useCustomType ? (
                <>
                  <select
                    value={formData.equipmentTypeId}
                    onChange={(e) => handleInputChange('equipmentTypeId', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156D3E] focus:border-transparent"
                    required
                    disabled={!formData.categoryId}
                  >
                    <option value="">Sélectionnez un type</option>
                    {filteredTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setUseCustomType(true)}
                    className="mt-2 text-sm text-[#156D3E] hover:underline"
                  >
                    Ou créer un nouveau type
                  </button>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    value={formData.customEquipmentType}
                    onChange={(e) => handleInputChange('customEquipmentType', e.target.value)}
                    placeholder="Nom du nouveau type d'équipement"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156D3E] focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setUseCustomType(false);
                      handleInputChange('customEquipmentType', '');
                    }}
                    className="mt-2 text-sm text-[#156D3E] hover:underline"
                  >
                    Retour à la liste
                  </button>
                </>
              )}
            </div>

            {/* Rest of the form fields (title, description, etc.) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Titre de l'annonce *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Ex: Tracteur John Deere 6130R - Excellent état"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156D3E] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={6}
                placeholder="Décrivez votre équipement en détail..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156D3E] focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prix (MAD) *</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="150000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156D3E] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Année</label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => handleInputChange('year', e.target.value)}
                  placeholder="2020"
                  min="1950"
                  max={new Date().getFullYear() + 1}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156D3E] focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Région *</label>
                <select
                  value={formData.region}
                  onChange={(e) => handleInputChange('region', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156D3E] focus:border-transparent"
                  required
                >
                  <option value="">Sélectionnez une région</option>
                  {moroccanRegions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ville *</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Ex: Casablanca"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156D3E] focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Marque</label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => handleInputChange('brand', e.target.value)}
                  placeholder="Ex: John Deere"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156D3E] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Modèle</label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => handleInputChange('model', e.target.value)}
                  placeholder="Ex: 6130R"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156D3E] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">État *</label>
              <select
                value={formData.condition}
                onChange={(e) => handleInputChange('condition', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156D3E] focus:border-transparent"
                required
              >
                <option value="new">Neuf</option>
                <option value="good">Bon état</option>
                <option value="used">Occasion</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone de contact *</label>
                <input
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                  placeholder="+212 6XX XXX XXX"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156D3E] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email de contact</label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  placeholder="contact@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156D3E] focus:border-transparent"
                />
              </div>
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Images (Max 6)
              </label>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="flex-1 flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-md hover:border-[#156D3E] cursor-pointer transition-colors">
                    <Upload className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">
                      {uploadingImage ? 'Upload en cours...' : 'Uploader des fichiers'}
                    </span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="sr-only"
                      disabled={uploadingImage || imageUrls.length >= 6}
                    />
                  </label>
                </div>

                {imageUrls.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                          className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#156D3E] text-white py-3 rounded-md hover:bg-[#0f5630] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? 'Création en cours...' : 'Créer l\'annonce'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
