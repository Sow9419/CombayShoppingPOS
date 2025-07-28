import { useState } from 'react';
import Home from './pages/Home';
import { useAuth } from './hooks/useAuth';
import Button from './components/common/Button';
import { HeroGeometric } from './components/ui/shape-landing-hero';
import { LoginDialog } from './components/dialogs/LoginDialog';
import { SignupDialog } from './components/dialogs/SignupDialog';

function AuthWrapper() {
  const { user, loading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleStartClick = () => {
    if (user) {
      return;
    } else {
      setShowLogin(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Chargement...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <Home />;
  }

  return (
    <div className="w-full">
      <div className="absolute top-8 right-4 z-20 flex gap-2">
        <Button
          variant="secondary"
          onClick={() => setShowLogin(true)}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          Se connecter
        </Button>
        <Button
          onClick={() => setShowSignup(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          S'inscrire
        </Button>
      </div>

      <HeroGeometric 
        badge="Créé par MagicUX"
        title1="Élevez Votre"
        title2="Vision Numérique"
        onStartClick={handleStartClick}
      />

      <LoginDialog
        open={showLogin}
        onOpenChange={setShowLogin}
        onSwitchToSignup={() => {
          setShowLogin(false);
          setShowSignup(true);
        }}
      />

      <SignupDialog
        open={showSignup}
        onOpenChange={setShowSignup}
        onSwitchToLogin={() => {
          setShowSignup(false);
          setShowLogin(true);
        }}
      />
    </div>
  );
}

function App() {
  return <AuthWrapper />;
}

export default App;