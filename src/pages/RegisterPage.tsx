import { useState } from 'react';
import { AlertCircle, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

type RegisterPageProps = {
  onNavigate: (page: string) => void;
};

export function RegisterPage({ onNavigate }: RegisterPageProps) {
  const { signUp } = useAuth();
  const [step, setStep] = useState<'info' | 'verify'>('info');
  const [formData, setFormData] = useState({
    fullName: '',
    emailOrPhone: '',
    password: '',
    confirmPassword: '',
  });
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendVerificationEmail = async (email: string, code: string) => {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          type: 'email_verification',
          to: email,
          data: { code },
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Échec de l\'envoi de l\'email de vérification');
    }
  };

  const isEmail = (input: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    const isEmailInput = isEmail(formData.emailOrPhone);

    if (!isEmailInput) {
      setError('Veuillez entrer une adresse email valide. L\'inscription par téléphone n\'est pas encore disponible.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const code = generateVerificationCode();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

      const { error: dbError } = await supabase
        .from('email_verification_codes')
        .insert({
          email: formData.emailOrPhone,
          code,
          expires_at: expiresAt,
          verified: false,
        });

      if (dbError) throw dbError;

      await sendVerificationEmail(formData.emailOrPhone, code);

      setStep('verify');
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue lors de l\'envoi du code');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (verificationCode.length !== 6) {
      setError('Le code doit contenir 6 chiffres');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data: codes, error: fetchError } = await supabase
        .from('email_verification_codes')
        .select('*')
        .eq('email', formData.emailOrPhone)
        .eq('code', verificationCode)
        .eq('verified', false)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false })
        .limit(1);

      if (fetchError) throw fetchError;

      if (!codes || codes.length === 0) {
        setError('Code invalide ou expiré');
        setLoading(false);
        return;
      }

      const { error: updateError } = await supabase
        .from('email_verification_codes')
        .update({ verified: true })
        .eq('id', codes[0].id);

      if (updateError) throw updateError;

      const phone = isEmail(formData.emailOrPhone) ? '' : formData.emailOrPhone;
      const email = isEmail(formData.emailOrPhone) ? formData.emailOrPhone : '';

      await signUp(email, formData.password, formData.fullName, phone);

      if (isEmail(formData.emailOrPhone)) {
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({
              type: 'registration',
              to: formData.emailOrPhone,
              data: {
                name: formData.fullName,
                siteUrl: window.location.origin,
              },
            }),
          }
        );
      }

      onNavigate('home');
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue lors de la vérification');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'verify') {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Mail className="h-8 w-8 text-[#156D3E]" />
            </div>
            <h1 className="text-3xl font-bold mb-2 text-gray-900">Vérifiez votre email</h1>
            <p className="text-gray-600">
              Nous avons envoyé un code à 6 chiffres à<br />
              <strong>{formData.emailOrPhone}</strong>
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleVerifyEmail} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 text-center">
                Code de vérification
              </label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => {
                  setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6));
                  setError('');
                }}
                maxLength={6}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E] text-center text-2xl tracking-widest font-mono"
                placeholder="000000"
              />
              <p className="text-xs text-gray-500 text-center mt-2">
                Le code expire dans 10 minutes
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || verificationCode.length !== 6}
              className="w-full bg-[#156D3E] text-white px-6 py-3 rounded-md hover:bg-[#0f5630] disabled:bg-gray-300 transition-colors font-semibold"
            >
              {loading ? 'Vérification...' : 'Vérifier et créer mon compte'}
            </button>

            <button
              type="button"
              onClick={() => setStep('info')}
              className="w-full text-gray-600 hover:text-gray-900 text-sm"
            >
              Modifier mon email
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-2 text-center text-gray-900">Inscription</h1>
        <p className="text-gray-600 text-center mb-8">
          Créez votre compte pour publier vos annonces
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
                Nom complet <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E]"
                placeholder="Mohammed Alami"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Email ou téléphone <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.emailOrPhone}
                onChange={(e) => handleChange('emailOrPhone', e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E]"
                placeholder="votre@email.com ou +212 6XX XXX XXX"
              />
              <p className="text-xs text-gray-500 mt-1">
                Utilisez votre email pour recevoir le code de vérification
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Mot de passe <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E]"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Confirmer le mot de passe <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E]"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#156D3E] text-white px-6 py-3 rounded-md hover:bg-[#0f5630] disabled:bg-gray-300 transition-colors font-semibold"
            >
              {loading ? 'Envoi du code...' : 'Continuer'}
            </button>
          </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Vous avez déjà un compte ?{' '}
            <button
              onClick={() => onNavigate('login')}
              className="text-[#156D3E] font-semibold hover:underline"
            >
              Se connecter
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
