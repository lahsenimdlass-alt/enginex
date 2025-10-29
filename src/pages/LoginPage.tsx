import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

type LoginPageProps = {
  onNavigate: (page: string) => void;
};

export function LoginPage({ onNavigate }: LoginPageProps) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signIn(email, password);
      onNavigate('home');
    } catch (err: any) {
      setError(err.message || 'Email ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-2 text-center text-gray-900">Connexion</h1>
        <p className="text-gray-600 text-center mb-8">
          Connectez-vous à votre compte Enginex
        </p>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E]"
              placeholder="votre@email.com"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <button
                type="button"
                onClick={() => onNavigate('forgot-password')}
                className="text-sm text-[#156D3E] hover:underline font-medium"
              >
                Mot de passe oublié ?
              </button>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E]"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#156D3E] text-white px-6 py-3 rounded-md hover:bg-[#0f5630] disabled:bg-gray-300 transition-colors font-semibold"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="mt-6 text-center space-y-3">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">ou</span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('phone-login')}
            className="w-full bg-white border-2 border-[#156D3E] text-[#156D3E] px-6 py-3 rounded-md hover:bg-[#156D3E] hover:text-white transition-colors font-semibold"
          >
            Se connecter par SMS (gratuit)
          </button>

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
