import { useState, useEffect } from 'react';
import { User, Mail, Phone, Camera, Crown, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

type ProfilePageProps = {
  onNavigate: (page: string) => void;
};

export function ProfilePage({ onNavigate }: ProfilePageProps) {
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    fullName: profile?.full_name || '',
    phone: profile?.phone || '',
    accountTypeLabel: profile?.account_type_label || 'Particulier',
    profileImageUrl: profile?.profile_image_url || '',
  });

  useEffect(() => {
    if (!user) {
      onNavigate('login');
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          full_name: formData.fullName,
          phone: formData.phone || null,
          account_type_label: formData.accountTypeLabel,
          profile_image_url: formData.profileImageUrl || null,
        })
        .eq('id', user!.id);

      if (updateError) throw updateError;

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  const subscriptionStatus = profile?.subscription_expires_at
    ? new Date(profile.subscription_expires_at) > new Date()
    : false;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">Mon profil</h1>
        <p className="text-gray-600">Gérez vos informations personnelles et votre compte</p>
      </div>

      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
          <p className="text-green-800">Profil mis à jour avec succès !</p>
        </div>
      )}

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="relative inline-block mb-4">
              {formData.profileImageUrl ? (
                <img
                  src={formData.profileImageUrl}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover mx-auto"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-[#156D3E] flex items-center justify-center mx-auto">
                  <User className="h-16 w-16 text-white" />
                </div>
              )}
              <button className="absolute bottom-0 right-0 bg-[#156D3E] text-white p-2 rounded-full hover:bg-[#0f5630] transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>

            <h3 className="text-xl font-bold mb-1 text-gray-900">{profile?.full_name}</h3>
            <p className="text-gray-600 text-sm mb-4">{profile?.email}</p>

            <div className="flex items-center justify-center gap-2 mb-4">
              <Crown className={`h-5 w-5 ${
                profile?.account_type === 'premium' ? 'text-yellow-500' :
                profile?.account_type === 'pro' ? 'text-[#156D3E]' :
                'text-gray-400'
              }`} />
              <span className={`px-3 py-1 rounded text-sm font-semibold ${
                profile?.account_type === 'premium' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white' :
                profile?.account_type === 'pro' ? 'bg-[#156D3E] text-white' :
                'bg-gray-200 text-gray-700'
              }`}>
                {profile?.account_type === 'premium' ? 'PREMIUM' :
                 profile?.account_type === 'pro' ? 'PRO' : 'GRATUIT'}
              </span>
            </div>

            {profile?.account_type !== 'individual' && subscriptionStatus && (
              <p className="text-sm text-gray-600 mb-4">
                Expire le : {new Date(profile.subscription_expires_at!).toLocaleDateString('fr-MA')}
              </p>
            )}

            <button
              onClick={() => onNavigate('subscriptions')}
              className="w-full bg-[#156D3E] text-white px-4 py-2 rounded-md hover:bg-[#0f5630] transition-colors font-medium"
            >
              {profile?.account_type === 'individual' ? 'Mettre à niveau' : 'Gérer l\'abonnement'}
            </button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Informations personnelles</h2>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Nom complet <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={profile?.email}
                  disabled
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                L'email ne peut pas être modifié
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Téléphone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+212 6XX XXX XXX"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Type de compte
              </label>
              <select
                value={formData.accountTypeLabel}
                onChange={(e) => setFormData({ ...formData, accountTypeLabel: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E]"
              >
                <option value="Particulier">Particulier</option>
                <option value="Professionnel">Professionnel</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Photo de profil (URL)
              </label>
              <input
                type="url"
                value={formData.profileImageUrl}
                onChange={(e) => setFormData({ ...formData, profileImageUrl: e.target.value })}
                placeholder="https://exemple.com/photo.jpg"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E]"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#156D3E] text-white px-6 py-3 rounded-md hover:bg-[#0f5630] disabled:bg-gray-300 transition-colors font-semibold"
              >
                {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('dashboard')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
