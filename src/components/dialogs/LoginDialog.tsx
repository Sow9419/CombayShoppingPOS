import React, { useState } from 'react';
import { X, Mail, Lock, Eye, EyeOff, Chrome } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToSignup: () => void;
}

export const LoginDialog: React.FC<LoginDialogProps> = ({
  open,
  onOpenChange,
  onSwitchToSignup,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn, signInWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await signIn(email, password);
    
    if (error) {
      setError('Email ou mot de passe incorrect');
    } else {
      onOpenChange(false);
      // Navigation vers Home sera gérée par App.tsx
    }
    
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    
    const { error } = await signInWithGoogle();
    
    if (error) {
      setError('Erreur lors de la connexion avec Google');
    }
    
    setLoading(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
      
      <div className="relative bg-white dark:bg-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 text-gray-700 dark:text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold  text-blackdark:text-white mb-2">Se connecter</h2>
          <p className="text-gray-600 dark:text-gray-400">Accédez à votre espace de gestion</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-700 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-zinc-100 dark:bg-gray-800 border border-gray-400 rounded-lg text-gray-700 dark:text-white placeholder-gray-400 focus:outline-none "
                placeholder="votre@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-zinc-100 dark:bg-gray-800 border border-gray-400 rounded-lg text-gray-700 dark:text-white placeholder-gray-400 focus:outline-none"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="w-4 h-4 text-blue-700 bg-gray-800 border-gray-600 rounded focus:ring-blue-500" />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Se souvenir de moi</span>
            </label>
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-300"
              onClick={() => {
                onOpenChange(false);
                // Navigation vers forgot-password sera ajoutée
              }}
            >
              Mot de passe oublié ?
            </button>
          </div>

          <button
            type="submit"     
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 font-semibold w-full rounded-lg"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-zinc-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400">Ou continuer avec</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="mt-4 flex items-center justify-center space-x-2 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-500 "
          >
            <Chrome size={20} />
            <span>Continue avec Google</span>
          </button>
        </div>

        <div className="mt-6 text-center">
          <span className="text-gray-800 dark:text-gray-400">Pas encore de compte ? </span>
          <button
            onClick={onSwitchToSignup}
            className="text-blue-700 hover:text-blue-500 font-medium"
          >
            S'inscrire
          </button>
        </div>
      </div>
    </div>
  );
};