import { useState } from 'react';
import { AlertCircle, Phone } from 'lucide-react';

type PhoneLoginPageProps = {
  onNavigate: (page: string) => void;
};

export function PhoneLoginPage({ onNavigate }: PhoneLoginPageProps) {
  const [error] = useState('La connexion par téléphone n\'est pas encore disponible.');

  const handleRedirect = () => {
    onNavigate('login');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <Phone className="h-16 w-16 text-[#156D3E] mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2 text-gray-900">
            Connexion par téléphone
          </h1>
          <p className="text-gray-600">
            Fonctionnalité bientôt disponible
          </p>
        </div>

        <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <p className="text-yellow-800">{error}</p>
        </div>

        <button
          onClick={handleRedirect}
          className="w-full bg-[#156D3E] text-white py-3 rounded-lg font-semibold hover:bg-[#124d2e] transition"
        >
          Se connecter avec email
        </button>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Pas encore de compte ?{' '}
            <button
              onClick={() => onNavigate('register')}
              className="text-[#156D3E] font-semibold hover:underline"
            >
              S'inscrire
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
