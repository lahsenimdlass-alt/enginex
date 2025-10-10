import { useState, useEffect } from 'react';
import { BarChart3, FileText, Eye, Crown, PlusCircle, Settings, Bell } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

type DashboardPageProps = {
  onNavigate: (page: string) => void;
};

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const { user, profile } = useAuth();
  const [stats, setStats] = useState({
    totalListings: 0,
    activeListings: 0,
    totalViews: 0,
    pendingListings: 0,
  });
  const [loading, setLoading] = useState(true);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  useEffect(() => {
    if (!user) {
      onNavigate('login');
      return;
    }
    loadDashboardData();
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;

    const { data: listings } = await supabase
      .from('listings')
      .select('id, status, views_count')
      .eq('user_id', user.id);

    const { count: notifCount } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('is_read', false);

    if (listings) {
      const totalViews = listings.reduce((sum, listing) => sum + (listing.views_count || 0), 0);
      const activeListings = listings.filter(l => l.status === 'approved').length;
      const pendingListings = listings.filter(l => l.status === 'pending').length;

      setStats({
        totalListings: listings.length,
        activeListings,
        totalViews,
        pendingListings,
      });
    }

    setUnreadNotifications(notifCount || 0);
    setLoading(false);
  };

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
          Tableau de bord
        </h1>
        <p className="text-gray-600">
          Bienvenue, <strong>{profile?.full_name}</strong>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <FileText className="h-10 w-10 text-[#156D3E]" />
            <span className="text-3xl font-bold text-gray-900">{stats.totalListings}</span>
          </div>
          <h3 className="text-gray-600 font-medium">Total annonces</h3>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <BarChart3 className="h-10 w-10 text-blue-600" />
            <span className="text-3xl font-bold text-gray-900">{stats.activeListings}</span>
          </div>
          <h3 className="text-gray-600 font-medium">Annonces actives</h3>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <Eye className="h-10 w-10 text-purple-600" />
            <span className="text-3xl font-bold text-gray-900">{stats.totalViews}</span>
          </div>
          <h3 className="text-gray-600 font-medium">Vues totales</h3>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <Crown className={`h-10 w-10 ${
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
          <h3 className="text-gray-600 font-medium">Type de compte</h3>
        </div>
      </div>

      {stats.pendingListings > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <p className="text-yellow-800">
            <strong>{stats.pendingListings}</strong> annonce{stats.pendingListings > 1 ? 's' : ''} en attente de validation
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <button
          onClick={() => onNavigate('subscription-selection')}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow text-left"
        >
          <PlusCircle className="h-12 w-12 text-[#156D3E] mb-4" />
          <h3 className="text-xl font-bold mb-2 text-gray-900">Publier une annonce</h3>
          <p className="text-gray-600">Créez une nouvelle annonce pour vendre votre équipement</p>
        </button>

        <button
          onClick={() => onNavigate('my-listings')}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow text-left"
        >
          <FileText className="h-12 w-12 text-blue-600 mb-4" />
          <h3 className="text-xl font-bold mb-2 text-gray-900">Gérer mes annonces</h3>
          <p className="text-gray-600">Voir, modifier ou supprimer vos annonces existantes</p>
        </button>

        <button
          onClick={() => onNavigate('profile')}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow text-left"
        >
          <Settings className="h-12 w-12 text-purple-600 mb-4" />
          <h3 className="text-xl font-bold mb-2 text-gray-900">Mon profil</h3>
          <p className="text-gray-600">Gérez vos informations personnelles et abonnement</p>
        </button>
      </div>

      {unreadNotifications > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-6 w-6 text-[#156D3E]" />
              <div>
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                <p className="text-sm text-gray-600">
                  Vous avez <strong>{unreadNotifications}</strong> notification{unreadNotifications > 1 ? 's' : ''} non lue{unreadNotifications > 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('notifications')}
              className="px-4 py-2 bg-[#156D3E] text-white rounded-md hover:bg-[#0f5630] transition-colors"
            >
              Voir
            </button>
          </div>
        </div>
      )}

      {profile?.account_type === 'individual' && (
        <div className="mt-8 bg-gradient-to-br from-[#156D3E] to-[#0f5630] text-white rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-4">Passez à un compte Pro ou Premium</h3>
          <p className="text-gray-100 mb-6">
            Augmentez la visibilité de vos annonces et vendez plus rapidement avec un abonnement payant
          </p>
          <button
            onClick={() => onNavigate('subscriptions')}
            className="bg-white text-[#156D3E] px-6 py-3 rounded-md hover:bg-gray-100 transition-colors font-semibold"
          >
            Voir les formules
          </button>
        </div>
      )}
    </div>
  );
}
