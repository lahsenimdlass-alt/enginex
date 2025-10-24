import { Check, Star, Zap, HelpCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

type SubscriptionsPageProps = {
  onNavigate: (page: string) => void;
};

export function SubscriptionsPage({ onNavigate }: SubscriptionsPageProps) {
  const { user, profile } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubscribe = async (planId: string) => {
    if (!user) {
      onNavigate('login');
      return;
    }

    if (planId === 'free') {
      return;
    }

    const confirmMessage = planId === 'pro'
      ? 'Souhaitez-vous activer l\'abonnement Pro (99 MAD/mois) avec 60 jours gratuits ?'
      : 'Souhaitez-vous activer l\'abonnement Premium (199 MAD/mois) avec 60 jours gratuits ?';

    if (!confirm(confirmMessage)) {
      return;
    }

    try {
      const expiresAt = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000);

      const { error } = await supabase
        .from('profiles')
        .update({
          account_type: planId,
          subscription_expires_at: expiresAt.toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;

      alert(`Abonnement ${planId === 'pro' ? 'Pro' : 'Premium'} activé avec succès ! Vous bénéficiez de 60 jours gratuits.`);
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
      icon: Check,
      color: 'gray',
      features: [
        '2 annonces par 30 jours',
        'Durée de 30 jours',
        'Jusqu\'à 6 photos',
        'Support par email',
      ],
      highlight: false,
      cta: 'Commencer gratuitement',
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

  const faqs = [
    {
      question: 'Comment fonctionne la période d\'essai de 60 jours ?',
      answer: 'Vous pouvez tester l\'abonnement Pro ou Premium gratuitement pendant 60 jours sans carte bancaire. Après cette période, vous décidez si vous souhaitez continuer avec l\'abonnement payant.',
    },
    {
      question: 'Puis-je annuler mon abonnement à tout moment ?',
      answer: 'Oui, vous pouvez annuler votre abonnement à tout moment depuis votre espace personnel. Aucun frais d\'annulation n\'est appliqué.',
    },
    {
      question: 'Quelle est la différence entre Pro et Premium ?',
      answer: 'L\'abonnement Pro vous permet de publier des annonces illimitées avec un badge PRO. L\'abonnement Premium offre tous les avantages Pro plus une durée illimitée et une position prioritaire en tête de liste.',
    },
    {
      question: 'Est-ce que je garde mes annonces si je change d\'abonnement ?',
      answer: 'Oui, toutes vos annonces restent actives lorsque vous changez d\'abonnement. Seules les fonctionnalités disponibles changent selon votre nouvelle formule.',
    },
    {
      question: 'Comment mettre à niveau mon abonnement ?',
      answer: 'Vous pouvez mettre à niveau votre abonnement à tout moment depuis cette page. Le nouveau tarif sera appliqué immédiatement et vous bénéficiez de toutes les nouvelles fonctionnalités.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          Choisissez votre formule
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Profitez de 60 jours gratuits pour tester les abonnements Pro et Premium
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
                    <span className="text-gray-700">{feature}</span>
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
                onClick={() => handleSubscribe(plan.id)}
                disabled={profile?.account_type === plan.id}
                className={`w-full py-4 rounded-lg font-semibold text-lg transition-all ${
                  plan.highlight
                    ? 'bg-[#156D3E] text-white hover:bg-[#0f5630] shadow-lg hover:shadow-xl'
                    : plan.color === 'yellow'
                    ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:from-yellow-600 hover:to-yellow-700 shadow-lg hover:shadow-xl'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                } disabled:bg-gray-300 disabled:cursor-not-allowed`}
              >
                {profile?.account_type === plan.id
                  ? 'Abonnement actuel'
                  : plan.cta}
              </button>

              {plan.id !== 'free' && profile?.account_type !== plan.id && (
                <p className="text-center text-xs text-gray-500 mt-3">
                  Résiliable à tout moment
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-xl p-8 mb-12">
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

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="h-8 w-8 text-[#156D3E]" />
          <h2 className="text-2xl font-bold text-gray-900">Questions fréquentes</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full flex items-center justify-between text-left py-3 hover:text-[#156D3E] transition-colors"
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform ${
                    openFaq === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === index && (
                <div className="mt-2 text-gray-600 pl-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-600 mb-4">
          Besoin d'aide pour choisir ? Notre équipe est là pour vous conseiller.
        </p>
        <button
          onClick={() => onNavigate('contact')}
          className="text-[#156D3E] font-semibold hover:underline text-lg"
        >
          Contactez-nous
        </button>
      </div>
    </div>
  );
}
