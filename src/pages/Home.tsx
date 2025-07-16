import React from 'react';
import Layout from '../components/layout/Layout';
import { useNavigation } from '../hooks/useNavigation';

// Pages
import CaissePage from './CaissePage';
import VentesPage from './VentesPage';
import ProduitsPage from './ProduitsPage';
import DashboardPage from './DashboardPage';
import ContactsPage from './ContactsPage';

const Home: React.FC = () => {
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
};

export default Home;