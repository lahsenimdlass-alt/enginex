import { Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

type SubscriptionsPageProps = {
  onNavigate: (page: string) => void;
};

export function SubscriptionsPage({ onNavigate }: SubscriptionsPageProps) {
  const { user, profile } = useAuth();

  const handleSubscribe = async (planId: string) => {
    if (!user) {
      onNavigate('login');
      return;
    }

    if (planId === 'free') {
      return;
    }

    const confirmMessage = planId === 'pro'
      ? 'Souhaitez-vous activer l\'abonnement Pro (99 MAD/mois) ?'
      : 'Souhaitez-vous activer l\'abonnement Premium (199 MAD/mois) ?';

    if (!confirm(confirmMessage)) {
      return;
    }

    try {
      const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

      const { error } = await supabase
        .from('profiles')
        .update({
          account_type: planId,
          subscription_expires_at: expiresAt.toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;

      alert(`Abonnement ${planId === 'pro' ? 'Pro' : 'Premium'} activé avec succès ! Vous pouvez maintenant profiter de tous les avantages.`);
      window.location.reload();
    } catch (error: any) {
      alert('Erreur lors de l\'activation de l\'abonnement. Veuillez réessayer.');
    }
  };

  const plans = [
    {
      id: 'free',
      name: 'Gratuit',
      price: '0 MAD',
      duration: '',
      features: [
        '1 annonce active',
        'Durée de 15 jours',
        'Photos limitées',
        'Support par email',
      ],
      highlight: false,
      badge: null,
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '99 MAD',
      duration: 'par mois',
      features: [
        '10 annonces actives',
        'Badge "PRO" sur vos annonces',
        'Durée de 30 jours',
        'Mise en avant des annonces',
        'Photos illimitées',
        'Support prioritaire',
      ],
      highlight: true,
      badge: 'PRO',
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '199 MAD',
      duration: 'par mois',
      features: [
        'Annonces illimitées',
        'Badge doré "PREMIUM"',
        'Durée illimitée',
        'Position prioritaire',
        'Photos et vidéos illimitées',
        'Support VIP 24/7',
        'Statistiques avancées',
        'Manager de compte dédié',
      ],
      highlight: false,
      badge: 'PREMIUM',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          Choisissez votre abonnement
        </h1>
        <p className="text-xl text-gray-600">
          Augmentez la visibilité de vos annonces et vendez plus rapidement
        </p>
      </div>

      {profile && (
        <div className="mb-8 text-center">
          <p className="text-lg text-gray-700">
            Votre abonnement actuel:{' '}
            <span className="font-semibold">
              {profile.account_type === 'individual' && 'Gratuit'}
              {profile.account_type === 'pro' && 'Pro'}
              {profile.account_type === 'premium' && 'Premium'}
            </span>
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white rounded-lg shadow-lg overflow-hidden ${
              plan.highlight ? 'ring-4 ring-[#156D3E] scale-105' : ''
            }`}
          >
            {plan.highlight && (
              <div className="bg-[#156D3E] text-white text-center py-2 font-semibold">
                Le plus populaire
              </div>
            )}
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-2 text-gray-900">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                {plan.duration && (
                  <span className="text-gray-600 ml-2">{plan.duration}</span>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#156D3E] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.badge && (
                <div className="mb-4 text-center">
                  <span
                    className={`inline-block px-4 py-2 rounded font-bold text-white ${
                      plan.badge === 'PRO'
                        ? 'bg-[#156D3E]'
                        : 'bg-gradient-to-r from-yellow-500 to-yellow-600'
                    }`}
                  >
                    Badge {plan.badge}
                  </span>
                </div>
              )}

              <button
                onClick={() => handleSubscribe(plan.name)}
                disabled={profile?.account_type === plan.id}
                className={`w-full py-3 rounded-md font-semibold transition-colors ${
                  plan.highlight
                    ? 'bg-[#156D3E] text-white hover:bg-[#0f5630]'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                } disabled:bg-gray-300 disabled:cursor-not-allowed`}
              >
                {profile?.account_type === plan.id
                  ? 'Abonnement actuel'
                  : plan.id === 'free'
                  ? 'Commencer gratuitement'
                  : `Passer à ${plan.name}`}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-100 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 text-center">
          Questions fréquentes
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          <div>
            <h3 className="font-semibold mb-2 text-gray-900">
              Comment fonctionne le badge PRO ?
            </h3>
            <p className="text-gray-600">
              Le badge PRO apparaît sur toutes vos annonces et votre profil, indiquant aux acheteurs que vous êtes un vendeur professionnel vérifié.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-gray-900">
              Puis-je annuler mon abonnement ?
            </h3>
            <p className="text-gray-600">
              Oui, vous pouvez annuler votre abonnement à tout moment. Vos annonces resteront actives jusqu'à la fin de la période payée.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-gray-900">
              Quels sont les moyens de paiement acceptés ?
            </h3>
            <p className="text-gray-600">
              Nous acceptons les cartes bancaires, les virements bancaires, et d'autres méthodes de paiement locales marocaines.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-600 mb-4">
          Besoin d'aide pour choisir ? Contactez-nous
        </p>
        <button
          onClick={() => onNavigate('contact')}
          className="text-[#156D3E] font-semibold hover:underline"
        >
          Nous contacter
        </button>
      </div>
    </div>
  );
}
