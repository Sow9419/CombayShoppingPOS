import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { useAuth } from '../hooks/useAuth';

const VerifyOtpPage: React.FC = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { verifyOtp } = useAuth();

  useEffect(() => {
    // Récupérer l'email depuis les paramètres URL ou localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email') || localStorage.getItem('verification_email') || '';
    setEmail(emailParam);
  }, []);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus sur le champ suivant
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    
    if (otpCode.length !== 6) {
      setError('Veuillez entrer le code complet à 6 chiffres');
      return;
    }

    setLoading(true);
    setError('');

    const { error } = await verifyOtp(email, otpCode, 'signup');
    
    if (error) {
      setError('Code de vérification invalide ou expiré');
    } else {
      setSuccess(true);
      localStorage.removeItem('verification_email');
    }
    
    setLoading(false);
  };

  const handleBackToLogin = () => {
    window.location.href = '/';
  };

  const handleResendCode = async () => {
    // Logique pour renvoyer le code
    setError('');
    // Ici vous pourriez appeler une fonction pour renvoyer le code
    alert('Code renvoyé ! Vérifiez votre email.');
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">Compte vérifié !</h1>
            <p className="text-gray-400 mb-6">
              Votre compte a été vérifié avec succès. Vous pouvez maintenant vous connecter.
            </p>
            <Button onClick={handleBackToLogin} fullWidth>
              Se connecter
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <button
          onClick={handleBackToLogin}
          className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </button>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Vérification du compte</h1>
          <p className="text-gray-400">
            Nous avons envoyé un code de vérification à 6 chiffres à{' '}
            <span className="text-white font-medium">{email}</span>
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-700 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-4 text-center">
              Entrez le code de vérification
            </label>
            <div className="flex justify-center space-x-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-xl font-bold bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ))}
            </div>
          </div>

          <Button
            type="submit"
            fullWidth
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold"
          >
            {loading ? 'Vérification...' : 'Vérifier le code'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm mb-2">Vous n'avez pas reçu le code ?</p>
          <button
            onClick={handleResendCode}
            className="text-blue-400 hover:text-blue-300 font-medium text-sm"
          >
            Renvoyer le code
          </button>
        </div>

        <div className="mt-4 text-center">
          <span className="text-gray-400 text-sm">Mauvaise adresse email ? </span>
          <button
            onClick={handleBackToLogin}
            className="text-blue-400 hover:text-blue-300 font-medium text-sm"
          >
            Modifier
          </button>
        </div>
      </Card>
    </div>
  );
};

export default VerifyOtpPage;