import { Target, Users, Shield, TrendingUp } from 'lucide-react';

type AboutPageProps = {
  onNavigate: (page: string) => void;
};

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          À propos d'Enginex
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          La plateforme marocaine de référence pour les professionnels et particuliers du secteur agricole et du BTP
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Notre Mission</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Enginex est une plateforme marocaine dédiée aux professionnels et particuliers du secteur agricole et du BTP. Notre mission est de faciliter la mise en relation entre vendeurs et acheteurs d'engins, matériels et pièces de rechange dans tout le Royaume.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Nous croyons que chaque agriculteur et entrepreneur du BTP mérite un accès simple et sécurisé à un marché transparent d'équipements de qualité. C'est pourquoi nous avons créé Enginex : une plateforme moderne, fiable et 100% marocaine.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="bg-[#156D3E] bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="h-8 w-8 text-[#156D3E]" />
          </div>
          <h3 className="font-semibold text-xl mb-2 text-gray-900">Vision claire</h3>
          <p className="text-gray-600">
            Devenir la référence nationale pour l'achat et la vente d'équipements professionnels
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="bg-[#156D3E] bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-[#156D3E]" />
          </div>
          <h3 className="font-semibold text-xl mb-2 text-gray-900">Communauté active</h3>
          <p className="text-gray-600">
            Des milliers de professionnels nous font confiance chaque jour
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="bg-[#156D3E] bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-[#156D3E]" />
          </div>
          <h3 className="font-semibold text-xl mb-2 text-gray-900">Sécurité garantie</h3>
          <p className="text-gray-600">
            Toutes les annonces sont vérifiées pour votre tranquillité d'esprit
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="bg-[#156D3E] bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="h-8 w-8 text-[#156D3E]" />
          </div>
          <h3 className="font-semibold text-xl mb-2 text-gray-900">Croissance rapide</h3>
          <p className="text-gray-600">
            Une plateforme en constante évolution pour mieux vous servir
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#156D3E] to-[#0f5630] text-white rounded-lg p-8 md:p-12 mb-12">
        <h2 className="text-3xl font-bold mb-6">Nos Valeurs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-xl mb-2">Transparence</h3>
            <p className="text-gray-100">
              Nous croyons en un marché ouvert où chaque transaction est claire et équitable
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2">Qualité</h3>
            <p className="text-gray-100">
              Nous vérifions chaque annonce pour garantir la qualité de notre plateforme
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2">Innovation</h3>
            <p className="text-gray-100">
              Nous innovons constamment pour offrir la meilleure expérience utilisateur
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Pourquoi choisir Enginex ?</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="bg-[#156D3E] text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
              1
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1 text-gray-900">
                Plateforme 100% marocaine
              </h3>
              <p className="text-gray-600">
                Conçue spécialement pour le marché marocain avec une connaissance approfondie des besoins locaux
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-[#156D3E] text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
              2
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1 text-gray-900">
                Large sélection d'équipements
              </h3>
              <p className="text-gray-600">
                Des milliers d'annonces pour tous types d'engins agricoles et BTP
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-[#156D3E] text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
              3
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1 text-gray-900">
                Interface simple et intuitive
              </h3>
              <p className="text-gray-600">
                Une expérience utilisateur fluide pour publier et rechercher des annonces facilement
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-[#156D3E] text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
              4
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1 text-gray-900">
                Support client réactif
              </h3>
              <p className="text-gray-600">
                Notre équipe est disponible pour vous accompagner à chaque étape
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center bg-[#156D3E] bg-opacity-5 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">
          Rejoignez notre communauté dès aujourd'hui
        </h2>
        <p className="text-gray-600 mb-6">
          Que vous soyez acheteur ou vendeur, Enginex est fait pour vous
        </p>
        <button
          onClick={() => onNavigate('register')}
          className="bg-[#156D3E] text-white px-8 py-3 rounded-md hover:bg-[#0f5630] transition-colors font-semibold"
        >
          Créer un compte gratuit
        </button>
      </div>
    </div>
  );
}
