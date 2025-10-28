import { useState, useEffect } from 'react';
import { AlertCircle, Phone, Key } from 'lucide-react';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { supabase } from '../lib/supabase';

type PhoneLoginPageProps = {
  onNavigate: (page: string) => void;
};

export function PhoneLoginPage({ onNavigate }: PhoneLoginPageProps) {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  useEffect(() => {
    // Initialiser reCAPTCHA
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          // reCAPTCHA résolu
        },
      });
    }
  }, []);

  // Étape 1 : Envoyer le code OTP
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Format : +212612345678 (Maroc)
      const formattedPhone = phone.startsWith('+') ? phone : `+212${phone}`;

      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);

      setConfirmationResult(confirmation);
      setOtpSent(true);
      alert('Code OTP envoyé par SMS !');
    } catch (err: any) {
      console.error('Erreur Firebase:', err);
      setError(err.message || 'Erreur lors de l\'envoi du code');

      // Réinitialiser reCAPTCHA en cas d'erreur
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    } finally {
      setLoading(false);
    }
  };

  // Étape 2 : Vérifier le code OTP et synchroniser avec Supabase
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!confirmationResult) {
        throw new Error('Aucune confirmation en attente');
      }

      // Vérifier le code OTP avec Firebase
      const result = await confirmationResult.confirm(otp);
      const firebaseUser = result.user;

      // Créer ou mettre à jour l'utilisateur dans Supabase
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('*')
        .eq('phone', firebaseUser.phoneNumber)
        .maybeSingle();

      if (!existingUser) {
        // Créer un nouvel utilisateur dans Supabase
        // Note: Vous devrez peut-être adapter cette partie selon votre schéma
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            phone: firebaseUser.phoneNumber,
            full_name: 'Utilisateur',
            account_type: 'individual',
          });

        if (insertError) throw insertError;
      }

      // Stocker le token Firebase dans localStorage pour les requêtes suivantes
      const token = await firebaseUser.getIdToken();
      localStorage.setItem('firebase_token', token);
      localStorage.setItem('user_phone', firebaseUser.phoneNumber || '');

      onNavigate('home');
    } catch (err: any) {
      console.error('Erreur vérification:', err);
      setError(err.message || 'Code OTP invalide');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-2 text-center text-gray-900">
          Connexion par téléphone
        </h1>
        <p className="text-gray-600 text-center mb-8">
          {otpSent ? 'Entrez le code reçu par SMS' : 'Entrez votre numéro de téléphone'}
        </p>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {!otpSent ? (
          <form onSubmit={handleSendOTP} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Numéro de téléphone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="612345678 ou +212612345678"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#156D3E] focus:border-transparent"
                  required
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Format : 612345678 (sans le +212) ou +212612345678
              </p>
            </div>

            <div id="recaptcha-container"></div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#156D3E] text-white py-3 rounded-lg font-semibold hover:bg-[#124d2e] transition disabled:opacity-50"
            >
              {loading ? 'Envoi en cours...' : 'Envoyer le code OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Code OTP (6 chiffres)
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  maxLength={6}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#156D3E] focus:border-transparent text-center text-2xl tracking-widest"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#156D3E] text-white py-3 rounded-lg font-semibold hover:bg-[#124d2e] transition disabled:opacity-50"
            >
              {loading ? 'Vérification...' : 'Vérifier le code'}
            </button>

            <button
              type="button"
              onClick={() => {
                setOtpSent(false);
                setOtp('');
                setError('');
                setConfirmationResult(null);
              }}
              className="w-full text-[#156D3E] py-2 font-semibold hover:underline"
            >
              Modifier le numéro
            </button>
          </form>
        )}

        <div className="mt-6 text-center space-y-2">
          <button
            onClick={() => onNavigate('login')}
            className="text-[#156D3E] font-semibold hover:underline"
          >
            Se connecter avec email
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

// Déclarer le type global pour window.recaptchaVerifier
declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier | null;
  }
}
