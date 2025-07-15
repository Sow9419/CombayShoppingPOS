import React from 'react';
import { TrendingUp, TrendingDown, Users, Package, ShoppingCart, Euro } from 'lucide-react';
import Card from '../components/common/Card';
import { mockSales, mockProducts, mockCustomers } from '../data/mockData';

const DashboardPage: React.FC = () => {
  // Calculs des statistiques
  const totalRevenue = mockSales
    .filter(sale => sale.status === 'completed')
    .reduce((sum, sale) => sum + sale.total, 0);

  const totalSales = mockSales.filter(sale => sale.status === 'completed').length;
  const pendingSales = mockSales.filter(sale => sale.status === 'pending').length;
  const totalCustomers = mockCustomers.length;
  const totalProducts = mockProducts.length;
  const lowStockProducts = mockProducts.filter(p => p.stock < 10).length;

  // Ventes récentes
  const recentSales = mockSales.slice(0, 5);

  // Produits populaires (simulé)
  const popularProducts = mockProducts.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Tableau de Bord</h1>
        <div className="mt-4 md:mt-0 text-gray-400">
          Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Chiffre d'affaires</p>
              <p className="text-2xl font-bold text-green-400">{totalRevenue.toFixed(2)}€</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="text-green-400 mr-1" size={16} />
                <span className="text-green-400 text-sm">+12.5%</span>
              </div>
            </div>
            <Euro className="text-green-400" size={32} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Ventes Totales</p>
              <p className="text-2xl font-bold text-white">{totalSales}</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="text-green-400 mr-1" size={16} />
                <span className="text-green-400 text-sm">+8.2%</span>
              </div>
            </div>
            <ShoppingCart className="text-blue-400" size={32} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Clients</p>
              <p className="text-2xl font-bold text-white">{totalCustomers}</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="text-green-400 mr-1" size={16} />
                <span className="text-green-400 text-sm">+5.1%</span>
              </div>
            </div>
            <Users className="text-purple-400" size={32} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Produits</p>
              <p className="text-2xl font-bold text-white">{totalProducts}</p>
              <div className="flex items-center mt-1">
                <TrendingDown className="text-red-400 mr-1" size={16} />
                <span className="text-red-400 text-sm">{lowStockProducts} en rupture</span>
              </div>
            </div>
            <Package className="text-orange-400" size={32} />
          </div>
        </Card>
      </div>

      {/* Ventes en attente */}
      {pendingSales > 0 && (
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Ventes en Attente</h2>
            <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm">
              {pendingSales} vente(s)
            </span>
          </div>
          <p className="text-gray-400 mt-2">
            Vous avez {pendingSales} vente(s) en attente de paiement qui nécessitent votre attention.
          </p>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ventes récentes */}
        <Card>
          <h2 className="text-xl font-semibold text-white mb-4">Ventes Récentes</h2>
          <div className="space-y-3">
            {recentSales.map(sale => {
              const customer = mockCustomers.find(c => c.id === sale.customerId);
              return (
                <div key={sale.id} className="p-3 bg-gray-700 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-white">
                        {customer?.name || 'Client anonyme'}
                      </p>
                      <p className="text-sm text-gray-400">
                        {new Date(sale.date).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-400">{sale.total.toFixed(2)}€</p>
                      <p className="text-sm text-gray-400 capitalize">{sale.paymentMethod}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Produits populaires */}
        <Card>
          <h2 className="text-xl font-semibold text-white mb-4">Produits Populaires</h2>
          <div className="space-y-3">
            {popularProducts.map((product, index) => (
              <div key={product.id} className="p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium text-white">{product.name}</p>
                      <p className="text-sm text-gray-400">{product.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-400">{product.price.toFixed(2)}€</p>
                    <p className="text-sm text-gray-400">Stock: {product.stock}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Graphique des ventes (placeholder) */}
      <Card>
        <h2 className="text-xl font-semibold text-white mb-4">Évolution des Ventes</h2>
        <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="text-blue-400 mx-auto mb-2" size={48} />
            <p className="text-gray-400">Graphique des ventes</p>
            <p className="text-sm text-gray-500">Fonctionnalité à implémenter</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;