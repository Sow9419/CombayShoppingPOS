import React, { useState } from 'react';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { useAuth } from '../hooks/useAuth';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await resetPassword(email);
    
    if (error) {
      setError('Erreur lors de l\'envoi de l\'email de réinitialisation');
    } else {
      setSuccess(true);
    }
    
    setLoading(false);
  };

  const handleBackToLogin = () => {
    // Navigation vers la page principale sera gérée par le routeur
    window.location.href = '/';
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">Email envoyé !</h1>
            <p className="text-gray-400 mb-6">
              Nous avons envoyé un lien de réinitialisation à <strong>{email}</strong>. 
              Vérifiez votre boîte de réception et suivez les instructions.
            </p>
            <Button onClick={handleBackToLogin} fullWidth>
              Retour à la connexion
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
          <h1 className="text-2xl font-bold text-white mb-2">Mot de passe oublié ?</h1>
          <p className="text-gray-400">
            Entrez votre email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-700 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Adresse email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="votre@email.com"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            fullWidth
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold"
          >
            {loading ? 'Envoi en cours...' : 'Envoyer le lien de réinitialisation'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-gray-400">Vous vous souvenez de votre mot de passe ? </span>
          <button
            onClick={handleBackToLogin}
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Se connecter
          </button>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;