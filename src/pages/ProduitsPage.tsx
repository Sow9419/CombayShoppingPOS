import React, { useState } from 'react';
import { Plus, Search, Edit, Package, AlertTriangle } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { mockProducts } from '../data/mockData';

const ProduitsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = ['all', ...new Set(mockProducts.map(p => p.category))];
  
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku?.includes(searchTerm);
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const lowStockProducts = mockProducts.filter(p => p.stock < 10);
  const totalProducts = mockProducts.length;
  const totalValue = mockProducts.reduce((sum, p) => sum + (p.price * p.stock), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Gestion des Produits</h1>
        <Button className="mt-4 md:mt-0 flex items-center space-x-2">
          <Plus size={20} />
          <span>Ajouter un produit</span>
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Produits</p>
              <p className="text-2xl font-bold text-white">{totalProducts}</p>
            </div>
            <Package className="text-blue-400" size={32} />
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Valeur du Stock</p>
              <p className="text-2xl font-bold text-green-400">{totalValue.toFixed(2)}€</p>
            </div>
            <Package className="text-green-400" size={32} />
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Stock Faible</p>
              <p className="text-2xl font-bold text-red-400">{lowStockProducts.length}</p>
            </div>
            <AlertTriangle className="text-red-400" size={32} />
          </div>
        </Card>
      </div>

      {/* Alertes stock faible */}
      {lowStockProducts.length > 0 && (
        <Card>
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="text-red-400" size={24} />
            <h2 className="text-xl font-semibold text-white">Alertes Stock Faible</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lowStockProducts.map(product => (
              <div key={product.id} className="p-4 bg-red-900/20 border border-red-700 rounded-lg">
                <h3 className="font-medium text-white">{product.name}</h3>
                <p className="text-sm text-gray-400 mt-1">{product.category}</p>
                <p className="text-red-400 font-bold mt-2">Stock: {product.stock}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Filtres et recherche */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher par nom ou code-barres..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'Toutes les catégories' : category}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Liste des produits */}
      <Card>
        <h2 className="text-xl font-semibold text-white mb-4">Inventaire</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <div key={product.id} className="p-4 bg-gray-700 rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-medium text-white">{product.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{product.category}</p>
                  {product.sku && (
                    <p className="text-xs text-gray-500 mt-1">Code: {product.sku}</p>
                  )}
                </div>
                <Button size="sm" variant="secondary" className="ml-2">
                  <Edit size={16} />
                </Button>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-bold text-green-400">{product.price.toFixed(2)}€</p>
                  <p className={`text-sm ${product.stock < 10 ? 'text-red-400' : 'text-gray-400'}`}>
                    Stock: {product.stock}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Valeur</p>
                  <p className="font-medium text-white">{(product.price * product.stock).toFixed(2)}€</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ProduitsPage;