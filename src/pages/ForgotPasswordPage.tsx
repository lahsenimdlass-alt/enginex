import { useState } from 'react';
import { AlertCircle, Mail, Lock } from 'lucide-react';
import { supabase } from '../lib/supabase';

type ForgotPasswordPageProps = {
  onNavigate: (page: string) => void;
};

export function ForgotPasswordPage({ onNavigate }: ForgotPasswordPageProps) {
  const [step, setStep] = useState<'email' | 'code' | 'newPassword'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const generateResetCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendResetEmail = async (email: string, code: string) => {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          type: 'password_reset',
          to: email,
          data: { code },
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Échec de l\'envoi de l\'email de réinitialisation');
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data: users, error: fetchError } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', email)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (!users) {
        setError('Aucun compte trouvé avec cet email');
        setLoading(false);
        return;
      }

      const resetCode = generateResetCode();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

      const { error: dbError } = await supabase
        .from('password_reset_codes')
        .insert({
          email,
          code: resetCode,
          expires_at: expiresAt,
          used: false,
        });

      if (dbError) throw dbError;

      await sendResetEmail(email, resetCode);

      setStep('code');
      setSuccess('Un code de réinitialisation a été envoyé à votre email');
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (code.length !== 6) {
      setError('Le code doit contenir 6 chiffres');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data: codes, error: fetchError } = await supabase
        .from('password_reset_codes')
        .select('*')
        .eq('email', email)
        .eq('code', code)
        .eq('used', false)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false })
        .limit(1);

      if (fetchError) throw fetchError;

      if (!codes || codes.length === 0) {
        setError('Code invalide ou expiré');
        setLoading(false);
        return;
      }

      setStep('newPassword');
      setSuccess('Code vérifié ! Créez votre nouveau mot de passe');
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (newPassword.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data: codes, error: fetchError } = await supabase
        .from('password_reset_codes')
        .select('*')
        .eq('email', email)
        .eq('code', code)
        .eq('used', false)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false })
        .limit(1);

      if (fetchError) throw fetchError;

      if (!codes || codes.length === 0) {
        setError('Session expirée. Veuillez recommencer');
        setLoading(false);
        return;
      }

      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password: newPassword,
      });

      if (authError && authError.message !== 'Invalid login credentials') {
        const { error: updateError } = await supabase.auth.updateUser({
          password: newPassword,
        });

        if (updateError) throw updateError;
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password: 'temporary',
        });

        const { error: updateError } = await supabase.auth.updateUser({
          password: newPassword,
        });

        if (updateError) throw updateError;
      }

      const { error: updateError } = await supabase
        .from('password_reset_codes')
        .update({ used: true })
        .eq('id', codes[0].id);

      if (updateError) throw updateError;

      setSuccess('Mot de passe réinitialisé avec succès !');
      setTimeout(() => {
        onNavigate('login');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'code') {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <Mail className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2 text-gray-900">Vérifiez votre email</h1>
            <p className="text-gray-600">
              Nous avons envoyé un code à 6 chiffres à<br />
              <strong>{email}</strong>
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800">{success}</p>
            </div>
          )}

          <form onSubmit={handleCodeSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 text-center">
                Code de réinitialisation
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.replace(/\D/g, '').slice(0, 6));
                  setError('');
                }}
                maxLength={6}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-center text-2xl tracking-widest font-mono"
                placeholder="000000"
              />
              <p className="text-xs text-gray-500 text-center mt-2">
                Le code expire dans 10 minutes
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || code.length !== 6}
              className="w-full bg-[#156D3E] text-white px-6 py-3 rounded-md hover:bg-[#0f5630] disabled:bg-gray-300 transition-colors font-semibold"
            >
              {loading ? 'Vérification...' : 'Vérifier le code'}
            </button>

            <button
              type="button"
              onClick={() => {
                setStep('email');
                setCode('');
                setError('');
              }}
              className="w-full text-gray-600 hover:text-gray-900 text-sm"
            >
              Utiliser un autre email
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (step === 'newPassword') {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Lock className="h-8 w-8 text-[#156D3E]" />
            </div>
            <h1 className="text-3xl font-bold mb-2 text-gray-900">Nouveau mot de passe</h1>
            <p className="text-gray-600">
              Créez un nouveau mot de passe sécurisé
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800">{success}</p>
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Nouveau mot de passe <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setError('');
                }}
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
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError('');
                }}
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
              {loading ? 'Réinitialisation...' : 'Réinitialiser le mot de passe'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Lock className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-gray-900">Mot de passe oublié ?</h1>
          <p className="text-gray-600">
            Entrez votre email pour recevoir un code de réinitialisation
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800">{success}</p>
          </div>
        )}

        <form onSubmit={handleEmailSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Adresse email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156D3E]"
              placeholder="votre@email.com"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#156D3E] text-white px-6 py-3 rounded-md hover:bg-[#0f5630] disabled:bg-gray-300 transition-colors font-semibold"
          >
            {loading ? 'Envoi en cours...' : 'Envoyer le code'}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="text-[#156D3E] font-semibold hover:underline"
            >
              Retour à la connexion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
