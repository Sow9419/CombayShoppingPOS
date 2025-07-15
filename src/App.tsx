import React from 'react';
import Layout from './components/layout/Layout';
import { useNavigation } from './hooks/useNavigation';

// Pages
import CaissePage from './pages/CaissePage';
import VentesPage from './pages/VentesPage';
import ProduitsPage from './pages/ProduitsPage';
import DashboardPage from './pages/DashboardPage';
import ContactsPage from './pages/ContactsPage';

function App() {
  const { currentPath, navigate } = useNavigation();

  const renderPage = () => {
    switch (currentPath) {
      case '/caisse':
        return <CaissePage />;
      case '/ventes':
        return <VentesPage />;
      case '/produits':
        return <ProduitsPage />;
      case '/dashboard':
        return <DashboardPage />;
      case '/contacts':
        return <ContactsPage />;
      default:
        return <CaissePage />;
    }
  };

  return (
    <Layout currentPath={currentPath} onNavigate={navigate}>
      {renderPage()}
    </Layout>
  );
}

export default App;