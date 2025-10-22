import { Check, Star, Zap } from 'lucide-react';

type SubscriptionSelectionPageProps = {
  onNavigate: (page: string, params?: any) => void;
};

export function SubscriptionSelectionPage({ onNavigate }: SubscriptionSelectionPageProps) {
  const handleSelectPlan = (accountType: 'individual' | 'pro' | 'premium') => {
    onNavigate('publish', { selectedPlan: accountType });
  };

  const plans = [
    {
      id: 'individual',
      name: 'Gratuit',
      price: '0 MAD',
      icon: Check,
      color: 'gray',
      features: [
        '2 annonces par 30 jours',
        'Durée de 30 jours',
        'Jusqu\'à 6 photos',
        'Support par email',
      ],
      highlight: false,
      cta: 'Publier gratuitement',
      trial: false,
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '99 MAD/mois',
      icon: Star,
      color: 'green',
      features: [
        'Annonces illimitées',
        'Badge "PRO" visible',
        'Durée de 30 jours',
        'Mise en avant des annonces',
        'Photos illimitées',
        'Support prioritaire',
        'Statistiques détaillées',
      ],
      highlight: true,
      cta: 'Essayer 60 jours gratuits',
      badge: 'Recommandé',
      trial: true,
      trialText: '60 jours gratuits - Sans carte bancaire',
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '199 MAD/mois',
      icon: Zap,
      color: 'yellow',
      features: [
        'Annonces illimitées',
        'Badge doré "PREMIUM"',
        'Durée illimitée',
        'Publication prioritaire',
        'Toujours en première position',
        'Photos et vidéos illimitées',
        'Support VIP 24/7',
        'Statistiques avancées',
      ],
      highlight: false,
      cta: 'Essayer 60 jours gratuits',
      badge: 'Meilleure visibilité',
      trial: true,
      trialText: '60 jours gratuits - Sans carte bancaire',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          Choisissez votre formule
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Sélectionnez la formule qui correspond le mieux à vos besoins pour publier votre annonce
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-2xl ${
              plan.highlight ? 'ring-4 ring-[#156D3E] scale-105 relative' : ''
            }`}
          >
            {plan.badge && (
              <div className={`${
                plan.highlight ? 'bg-[#156D3E]' : 'bg-gradient-to-r from-yellow-500 to-yellow-600'
              } text-white text-center py-2 font-semibold text-sm`}>
                {plan.badge}
              </div>
            )}

            <div className="p-8">
              <div className="flex items-center justify-center mb-4">
                <div className={`${
                  plan.color === 'green' ? 'bg-[#156D3E]' :
                  plan.color === 'yellow' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                  'bg-gray-400'
                } p-4 rounded-full`}>
                  <plan.icon className="h-8 w-8 text-white" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-center mb-2 text-gray-900">
                {plan.name}
              </h3>

              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-gray-900">{plan.price.split('/')[0]}</span>
                {plan.price.includes('/') && (
                  <span className="text-gray-600 text-lg">/{plan.price.split('/')[1]}</span>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
                      plan.color === 'green' ? 'text-[#156D3E]' :
                      plan.color === 'yellow' ? 'text-yellow-500' :
                      'text-gray-400'
                    }`} />
                    <span className={`text-gray-700 ${feature.includes('🔥') ? 'font-semibold text-orange-600' : ''}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {plan.trial && (
                <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                  <p className="text-green-800 font-semibold text-sm">
                    Essayez gratuitement pendant 60 jours — sans carte bancaire requise.
                  </p>
                  <p className="text-green-700 text-xs mt-1">
                    Publiez, testez, vendez — puis décidez !
                  </p>
                </div>
              )}

              <button
                onClick={() => handleSelectPlan(plan.id as any)}
                className={`w-full py-4 rounded-lg font-semibold text-lg transition-all ${
                  plan.highlight
                    ? 'bg-[#156D3E] text-white hover:bg-[#0f5630] shadow-lg hover:shadow-xl'
                    : plan.color === 'yellow'
                    ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:from-yellow-600 hover:to-yellow-700 shadow-lg hover:shadow-xl'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.cta}
              </button>

              {plan.id !== 'individual' && (
                <p className="text-center text-xs text-gray-500 mt-3">
                  Résiliable à tout moment
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-xl p-8 mb-8">
        <div className="flex items-start gap-4">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-3 rounded-lg flex-shrink-0">
            <Zap className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">
              Avantage Premium : Visibilité maximale garantie
            </h3>
            <p className="text-lg text-gray-700 mb-4">
              Avec l'abonnement Premium, vos annonces sont <strong>automatiquement publiées en première position</strong> et restent toujours visibles avant toutes les autres annonces.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-3 text-gray-700">
                <span className="text-orange-500 font-bold">✓</span>
                <span>Votre annonce apparaît <strong>en tête de liste</strong> dans les résultats de recherche</span>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="text-orange-500 font-bold">✓</span>
                <span><strong>3x plus de visibilité</strong> que les annonces gratuites</span>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="text-orange-500 font-bold">✓</span>
                <span>Vendez <strong>jusqu'à 5x plus vite</strong> grâce au badge doré Premium</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-gray-600 mb-4">
          Des questions sur les abonnements ?
        </p>
        <button
          onClick={() => onNavigate('contact')}
          className="text-[#156D3E] font-semibold hover:underline"
        >
          Contactez notre équipe
        </button>
      </div>
    </div>
  );
}
